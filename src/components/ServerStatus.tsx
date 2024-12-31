import React from 'react';
import { Users, Activity, Shield } from 'lucide-react';
import type { ServerStatus } from '../types/serverStatus';

interface ServerStatusProps {
  status: ServerStatus | null;
}

export function ServerStatus({ status }: ServerStatusProps) {
  if (!status) return null;

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h3 className="text-xl font-semibold mb-4">Server Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-dark-600 dark:text-dark-400">Connected Clients</p>
              <p className="text-lg font-semibold">{status.connectedClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-dark-600 dark:text-dark-400">Running Tasks</p>
              <p className="text-lg font-semibold">{status.runningTasks.length}</p>
            </div>
          </div>
          {status.runningTasks.length > 0 && (
            <div className="mt-2 text-sm text-dark-500">
              {status.runningTasks.map(task => (
                <div key={task} className="truncate">
                  Searching: {task}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm text-dark-600 dark:text-dark-400">Working Proxies</p>
              <p className="text-lg font-semibold">{status.workingProxiesCount}</p>
              <p className="text-xs text-dark-500">Last tested: {new Date(status.lastProxyTest).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}