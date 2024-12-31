import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, User } from 'lucide-react';
import type { SearchResult } from '../types';

interface ResultListProps {
  results: SearchResult[];
  username: string;
}

export function ResultList({ results, username }: ResultListProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <h3 className="text-xl font-semibold mb-4">Found Profiles</h3>
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-white/80 dark:bg-dark-900/80 border border-dark-200 dark:border-dark-800/50 rounded-xl flex items-center justify-between group hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            {result.favicon ? (
              <img
                src={`/api/proxy-image?url=${encodeURIComponent(result.favicon)}`}
                alt={`${result.site} logo`}
                className="w-6 h-6"
              />
            ) : (
              <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}
            <div>
              <h3 className="font-medium font-mono text-indigo-600 dark:text-indigo-400">
                {result.site}
              </h3>
              <a
                href={result.url.replace('{username}', username)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-dark-500 hover:text-indigo-600 dark:text-dark-400 dark:hover:text-indigo-400 font-sans transition-colors flex items-center gap-1"
              >
                View Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={result.url.replace('{username}', username)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              Visit Profile
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}