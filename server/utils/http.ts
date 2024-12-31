import axios, { AxiosRequestConfig } from "axios";

import type { Target } from "../../src/types/schema";
import { Proxy } from "../types/proxy";
import { SiteError } from "./errors";

const TIMEOUT = 10000; // 10 seconds

export async function makeRequest(
  proxy: Proxy,
  site: string,
  config: Target,
  url: string
) {
  const requestConfig: AxiosRequestConfig = {
    method: config.request_method || "GET",
    url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
      Connection: "keep-alive",
      Referer: "https://google.com/",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Host: site,
      ...config.headers,
    },
    proxy: {
      host: proxy.host,
      port: proxy.port,
      protocol: proxy.protocol,
    },
    data: config.request_payload,
    timeout: TIMEOUT,
    validateStatus: null,
    maxRedirects: 3,
    transformResponse: (data) => data,
  };

  try {
    const response = await axios(requestConfig);

    if (response.status === 530) {
      throw new SiteError("Protected by Cloudflare", site, 530);
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new SiteError(
        error.response?.status
          ? `HTTP ${error.response.status}`
          : error.message,
        site,
        error.response?.status
      );
    }
    throw error;
  }
}
