import type { SearchResult } from "../src/types";
import type { Target } from "../src/types/schema";
import { ProxyManager } from "./services/proxyManager";
import { Proxy } from "./types/proxy";
import { loadTargets } from "./utils/configUtils";
import { getErrorMessage } from "./utils/errors";
import { makeRequest } from "./utils/http";

const targets = loadTargets();

function isStatusCodeOK(code: number) {
  return code >= 200 && code < 400;
}

export function getTargets() {
  return targets;
}

async function checkSite(
  proxy: Proxy,
  site: string,
  config: Target,
  username: string
): Promise<SearchResult> {
  const url = config.url.replace("{}", username);
  const claimed_url = config.url.replace("{}", config.username_claimed);

  try {
    const claimed = await makeRequest(proxy, site, config, claimed_url);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const response = await makeRequest(proxy, site, config, url);

    let exists = false;

    if (isStatusCodeOK(claimed.status)) {
      switch (config.errorType) {
        case "status_code":
          const match = response.status == claimed.status;
          const isErr = response.status == config.errorCode;
          exists = match && !isErr;
          /**
          if (exists)
            console.log(
              `[Finder :: checkSite] ${site} exists! (${response.status})`
            ); */
          break;
        case "message":
          exists = !Array.isArray(config.errorMsg)
            ? !response.data.includes(config.errorMsg)
            : !config.errorMsg.some((msg) => response.data.includes(msg));

          /**
          if (exists)
            console.log(
              `[Finder :: checkSite] ${site} exists! ${config.errorMsg} not in ${response.data}`
            ); */
          break;
        case "response_url":
          exists = response.request.res.responseUrl !== config.errorUrl;
          /**
          if (exists)
            console.log(
              `[Finder :: checkSite] ${site} exists! (${response.request.res.responseUrl})`
            );
           */
          break;
      }
    }

    return {
      site,
      url: url,
      exists,
      favicon: config.favicon,
    };
  } catch (error) {
    return {
      site,
      url: config.urlMain,
      exists: false,
      error: getErrorMessage(error, site),
      favicon: config.favicon,
    };
  }
}

export async function searchUsername(
  proxies: ProxyManager,
  username: string,
  onProgress?: (result: SearchResult) => void
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  for (const [site, config] of Object.entries(targets)) {
    if (config.regexCheck && !new RegExp(config.regexCheck).test(username)) {
      continue;
    }

    const proxy = proxies.getRandomProxy();
    if (!proxy) {
      onProgress?.({
        exists: false,
        site,
        url: config.urlMain,
        error: "No proxies available",
      });
      break;
    }

    const result = await checkSite(proxy, site, config, username);
    results.push(result);
    onProgress?.(result);
  }

  return results;
}
