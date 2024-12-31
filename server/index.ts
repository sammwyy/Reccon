import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import type { SearchResult } from "../src/types";
import { getTargets, searchUsername } from "./finder";
import { SearchQueue } from "./queue/SearchQueue";
import imageProxyRouter from "./routes/imageProxy";
import { ProxyManager } from "./services/proxyManager";
import { ResultCache } from "./services/resultCache";
import { ServerMonitor } from "./services/serverMonitor";

const app = express();
const httpServer = createServer(app);

app.use("/api", imageProxyRouter);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const searchQueue = new SearchQueue();
const resultCache = new ResultCache();
const proxyManager = new ProxyManager();
const serverMonitor = new ServerMonitor(proxyManager);

// Start server monitoring
serverMonitor.start();

// Update all clients when server status changes
serverMonitor.on("statusUpdate", (status) => {
  io.emit("serverStatus", status);
});

searchQueue.on("process", async ({ socketId, username }) => {
  const socket = io.sockets.sockets.get(socketId);
  if (!socket) return;

  try {
    // Check cache first
    const cachedResults = resultCache.get(username);
    if (cachedResults) {
      cachedResults.forEach((result) => socket.emit("searchResult", result));
      socket.emit("searchComplete");
      searchQueue.completeProcessing(socketId);
      return;
    }

    const results: SearchResult[] = [];
    const progress = {
      current: 0,
      total: Object.keys(getTargets()).length,
      found: 0,
      notFound: 0,
    };

    socket.emit("searchProgress", progress);

    await searchUsername(proxyManager, username, (result: SearchResult) => {
      progress.current++;
      progress.found += result.exists ? 1 : 0;
      progress.notFound += result.exists ? 0 : 1;

      if (result.exists) {
        results.push(result);
        socket.emit("searchResult", result);
      }
      socket.emit("searchProgress", progress);
    });

    // Cache results
    resultCache.set(username, results);
    socket.emit("searchComplete");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    socket.emit("searchError", errorMessage);
  } finally {
    searchQueue.completeProcessing(socketId);
  }
});

searchQueue.on("position", ({ socketId, position }) => {
  const socket = io.sockets.sockets.get(socketId);
  if (socket) {
    socket.emit("queuePosition", position);
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  serverMonitor.addClient(socket);

  // Send initial server status
  socket.emit("serverStatus", serverMonitor.getStatus());

  socket.on("startSearch", async ({ username }) => {
    const position = searchQueue.enqueue(socket.id, username);
    serverMonitor.addTask(socket.id, username);
    socket.emit("queuePosition", position);
  });

  socket.on("leaveQueue", () => {
    searchQueue.dequeue(socket.id);
    serverMonitor.removeTask(socket.id);
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected:", socket.id);
    searchQueue.dequeue(socket.id);
    serverMonitor.removeClient(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cleanup on shutdown
process.on("SIGTERM", () => {
  serverMonitor.stop();
  proxyManager.stopProxyTesting();
  httpServer.close();
});
