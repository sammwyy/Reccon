import React from 'react';
import { motion } from 'framer-motion';
import type { SearchResult } from '../types';
import type { SearchProgress } from '../types/progress';
import { SearchBar } from './SearchBar';
import { Stats } from './Stats';
import { ResultList } from './ResultList';

interface SearchViewProps {
  username: string;
  results: SearchResult[];
  isSearching: boolean;
  error: string | null;
  progress: SearchProgress;
  onSearch: (username: string) => void;
}

export function SearchView({
  username,
  results,
  isSearching,
  error,
  progress,
  onSearch
}: SearchViewProps) {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Results for "{username}"
          </h2>
          <SearchBar
            username={username}
            isSearching={isSearching}
            onSearch={onSearch}
          />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl text-red-400"
          >
            {error}
          </motion.div>
        )}

        <Stats progress={progress} />
        <ResultList results={results} username={username} />
      </div>
    </motion.main>
  );
}