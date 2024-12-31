export interface ServerStatus {
  connectedClients: number;
  runningTasks: string[];
  proxiesCount: number;
  workingProxiesCount: number;
  lastProxyTest: string;
}
