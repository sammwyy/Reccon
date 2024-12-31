import axios from "axios";

import type { Proxy } from "../types/proxy";

const TEST_URL = "https://api.ipify.org/";
const TIMEOUT = 10000;

export async function testProxy(proxy: Proxy): Promise<boolean> {
  try {
    const res = await axios({
      url: TEST_URL,
      proxy: {
        host: proxy.host,
        port: proxy.port,
        protocol: proxy.protocol,
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: TIMEOUT,
    });
    const match = res.data == proxy.host;
    if (match) {
      console.log(
        `[ProxyUtils :: testProxy] Proxy ${proxy.host}:${proxy.port} is working`
      );
    } else {
      console.log(
        `[ProxyUtils :: testProxy] Proxy ${proxy.host}:${proxy.port} is working (No match, is a proxy chain?) (${res.data})`
      );
    }
    return true;
  } catch (error) {
    console.warn(
      `[ProxyUtils :: testProxy] Proxy ${proxy.host}:${proxy.port} is not working (No response)`
    );
    return false;
  }
}

export async function testProxies(proxies: Proxy[]): Promise<Proxy[]> {
  const results = await Promise.allSettled(
    proxies.map((proxy) => testProxy(proxy))
  );

  return proxies.filter((_, index) => {
    const result = results[index];
    return result.status === "fulfilled" && result.value;
  });
}
