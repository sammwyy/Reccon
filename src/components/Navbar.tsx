import { Github, Twitter } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="border-b border-dark-200 dark:border-dark-800/50 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold font-mono">Reccon</h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://github.com/sammwyy/reccon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800/50 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/sammwy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800/50 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
