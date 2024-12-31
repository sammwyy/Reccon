import { EventEmitter } from "events";
import type { Socket } from "socket.io";
import type { ServerStatus } from "../types/serverStatus";
import { ProxyManager } from "./proxyManager";

export class ServerMonitor extends EventEmitter {
  private connectedClients: Map<string, Socket> = new Map();
  private runningTasks: Map<string, string> = new Map();
  private proxyManager: ProxyManager;

  constructor(proxyManager: ProxyManager) {
    super();
    this.proxyManager = proxyManager;

    // Listen for updates from ProxyManager
    this.proxyManager.on("proxyUpdate", () => {
      this.emitStatus();
    });
  }

  start() {
    this.proxyManager.startProxyTesting();
  }

  stop() {
    this.proxyManager.stopProxyTesting();
  }

  addClient(socket: Socket) {
    this.connectedClients.set(socket.id, socket);
    this.emitStatus();
  }

  removeClient(socketId: string) {
    this.connectedClients.delete(socketId);
    this.runningTasks.delete(socketId);
    this.emitStatus();
  }

  addTask(socketId: string, username: string) {
    this.runningTasks.set(socketId, username);
    this.emitStatus();
  }

  removeTask(socketId: string) {
    this.runningTasks.delete(socketId);
    this.emitStatus();
  }

  getStatus(): ServerStatus {
    return {
      connectedClients: this.connectedClients.size,
      runningTasks: Array.from(this.runningTasks.values()),
      proxiesCount: this.proxyManager.getProxiesCount(),
      workingProxiesCount: this.proxyManager.getWorkingProxiesCount(),
      lastProxyTest: this.proxyManager.getLastProxyTestTime(),
    };
  }

  private emitStatus() {
    const status = this.getStatus();
    this.emit("statusUpdate", status);
  }
}
