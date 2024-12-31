import { EventEmitter } from "events";

import type { Proxy } from "../types/proxy";
import { loadProxies } from "../utils/configUtils";
import { testProxies } from "../utils/proxyUtils";

export class ProxyManager extends EventEmitter {
  private proxies: Proxy[] = [];
  private workingProxies: Proxy[] = [];
  private proxyTestInterval: NodeJS.Timeout | null = null;
  private lastProxyTestTime: string = new Date().toISOString();

  constructor() {
    super();
    this.startProxyTesting();
  }

  startProxyTesting() {
    // Make initial testing.
    this.runProxyTest();

    // Test proxies every 10 minutes
    this.proxyTestInterval = setInterval(async () => {
      await this.runProxyTest();
    }, 10 * 60 * 1000);
  }

  stopProxyTesting() {
    if (this.proxyTestInterval) {
      clearInterval(this.proxyTestInterval);
      this.proxyTestInterval = null;
    }
  }

  private loadProxies() {
    this.proxies = loadProxies();
  }

  private async runProxyTest() {
    this.loadProxies();

    try {
      this.workingProxies = await testProxies(this.proxies);
      this.lastProxyTestTime = new Date().toISOString();
      this.emit("proxyUpdate");
    } catch (error) {
      console.error("Proxy testing failed:", error);
    }
  }

  getProxiesCount(): number {
    return this.proxies.length;
  }

  getWorkingProxiesCount(): number {
    return this.workingProxies.length;
  }

  getLastProxyTestTime(): string {
    return this.lastProxyTestTime;
  }

  getRandomProxy(): Proxy | null {
    const randomIndex = Math.floor(Math.random() * this.workingProxies.length);
    return this.workingProxies[randomIndex];
  }
}
