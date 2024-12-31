import React from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import type { SearchProgress } from '../types/progress';

interface StatsProps {
  progress: SearchProgress;
}

export function Stats({ progress }: StatsProps) {
  const percentage = Math.round((progress.current / progress.total) * 100) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-dark-600 dark:text-dark-400 font-sans">Progress</p>
            <p className="text-2xl font-semibold font-mono">
              {percentage}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-dark-600 dark:text-dark-400 font-sans">Found</p>
            <p className="text-2xl font-semibold font-mono">
              {progress.found}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-dark-600 dark:text-dark-400 font-sans">Not Found</p>
            <p className="text-2xl font-semibold font-mono">
              {progress.notFound}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}