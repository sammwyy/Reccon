import React from 'react';
import { Loader2 } from 'lucide-react';
import type { SearchProgress } from '../types/progress';

interface Props {
  progress: SearchProgress;
  isSearching: boolean;
}

export function SearchProgress({ progress, isSearching }: Props) {
  const percentage = Math.round((progress.current / progress.total) * 100);

  return (
    <div className="max-w-xl mx-auto mb-8">
      {isSearching && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-400">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
          <div className="text-green-400 text-2xl font-bold">{progress.found}</div>
          <div className="text-gray-400">Found</div>
        </div>
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
          <div className="text-red-400 text-2xl font-bold">{progress.notFound}</div>
          <div className="text-gray-400">Not Found</div>
        </div>
      </div>
    </div>
  );
}