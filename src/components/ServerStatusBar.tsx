import { Activity, Shield, Users } from "lucide-react";
import type { ServerStatus } from "../types/serverStatus";

interface ServerStatusBarProps {
  status: ServerStatus | null;
}

export function ServerStatusBar({ status }: ServerStatusBarProps) {
  if (!status) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border-t border-dark-200 dark:border-dark-800/50 py-1.5 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-dark-600 dark:text-dark-400">
                {status.connectedClients} connected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-dark-600 dark:text-dark-400">
                {status.runningTasks.length} active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span className="text-dark-600 dark:text-dark-400">
                {status.workingProxiesCount}/{status.proxiesCount} proxies
              </span>
            </div>
          </div>
          <div className="text-dark-500 text-xs">
            Last proxy test:{" "}
            {new Date(status.lastProxyTest).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
