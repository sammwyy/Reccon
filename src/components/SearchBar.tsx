import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  username: string;
  isSearching: boolean;
  onSearch: (username: string) => void;
}

export function SearchBar({ username: initialUsername, isSearching, onSearch }: SearchBarProps) {
  const [username, setUsername] = useState(initialUsername);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md ml-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username to search"
          className="flex-1 px-4 py-2 rounded-xl bg-white/80 dark:bg-dark-900/80 border border-dark-200 dark:border-dark-800/50 text-dark-950 dark:text-dark-100 placeholder:text-dark-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 font-mono backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={isSearching || !username.trim()}
          className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl flex items-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-mono"
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}