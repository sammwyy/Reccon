import React, { useState } from 'react';
import { Search, Globe2, Shield, Zap } from 'lucide-react';

interface LandingViewProps {
  onSearch: (username: string) => void;
}

export function LandingView({ onSearch }: LandingViewProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <main className="container mx-auto px-4">
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Find Your Digital Footprint
        </h1>
        <p className="text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto mb-12 font-sans">
          Search across multiple social networks and discover where your username appears online. Fast, secure, and comprehensive.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-16">
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username to search"
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 text-dark-950 dark:text-dark-100 placeholder:text-dark-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 font-mono shadow-sm"
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-mono shadow-sm"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </form>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Globe2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Global Search</h3>
            <p className="text-dark-600 dark:text-dark-400 font-sans">
              Search across multiple social networks and platforms simultaneously
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Results</h3>
            <p className="text-dark-600 dark:text-dark-400 font-sans">
              Get instant feedback as results come in from each platform
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
            <p className="text-dark-600 dark:text-dark-400 font-sans">
              No data storage, all searches are ephemeral and secure
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}