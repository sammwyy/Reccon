import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { SearchResult } from "./types";
import type { SearchProgress } from "./types/progress";
import type { ServerStatus } from "./types/serverStatus";
// import type { QueueStatus } from './types/queue';
import { LandingView } from "./components/LandingView";
import { Navbar } from "./components/Navbar";
import { QueueStatus } from "./components/QueueStatus";
import { SearchView } from "./components/SearchView";
import { ServerStatusBar } from "./components/ServerStatusBar";
import "./styles/background-pattern.css";

const socket = io("https://reccon.sammwy.com/");

const initialProgress = {
  current: 0,
  total: 0,
  found: 0,
  notFound: 0,
};

export default function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<SearchProgress>(initialProgress);
  const [isSearchView, setIsSearchView] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [queuePosition, setQueuePosition] = useState(0);

  useEffect(() => {
    socket.on("searchResult", (result: SearchResult) => {
      if (result.exists) {
        setResults((prev) => [...prev, result]);
      }
    });

    socket.on("searchProgress", (progress: SearchProgress) => {
      setProgress(progress);
    });

    socket.on("searchComplete", () => {
      setIsSearching(false);
      setQueuePosition(0);
    });

    socket.on("searchError", (error: string) => {
      setError(error);
      setIsSearching(false);
      setQueuePosition(0);
    });

    socket.on("serverStatus", (status: ServerStatus) => {
      setServerStatus(status);
    });

    socket.on("queuePosition", (position: number) => {
      setQueuePosition(position);
    });

    // Cleanup queue position when leaving the page
    const handleBeforeUnload = () => {
      socket.emit("leaveQueue");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("searchResult");
      socket.off("searchProgress");
      socket.off("searchComplete");
      socket.off("searchError");
      socket.off("serverStatus");
      socket.off("queuePosition");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSearch = (searchUsername: string) => {
    if (!searchUsername.trim()) return;

    setUsername(searchUsername);
    setResults([]);
    setError(null);
    setIsSearching(true);
    setProgress(initialProgress);
    setIsSearchView(true);
    socket.emit("startSearch", { username: searchUsername });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 text-dark-950 dark:text-dark-100 font-mono transition-colors duration-200">
      <div className="relative pb-12">
        <Navbar />
        <AnimatePresence mode="wait">
          {isSearchView ? (
            <>
              <AnimatePresence>
                {queuePosition > 0 && <QueueStatus position={queuePosition} />}
              </AnimatePresence>
              <SearchView
                key="search"
                username={username}
                results={results}
                isSearching={isSearching}
                error={error}
                progress={progress}
                onSearch={handleSearch}
              />
            </>
          ) : (
            <LandingView key="landing" onSearch={handleSearch} />
          )}
        </AnimatePresence>
        <ServerStatusBar status={serverStatus} />
      </div>
    </div>
  );
}
