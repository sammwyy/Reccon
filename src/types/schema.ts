export type ErrorType = "message" | "response_url" | "status_code";
export type RequestMethod = "GET" | "POST" | "HEAD" | "PUT";
export type Tag = "adult" | "gaming";

export interface Target {
  url: string;
  urlMain: string;
  urlProbe?: string;
  username_claimed: string;
  regexCheck?: string;
  isNSFW?: boolean;
  headers?: Record<string, string>;
  request_payload?: Record<string, unknown>;
  __comment__?: string;
  tags?: Tag | Tag[];
  request_method?: RequestMethod;
  errorType: ErrorType;
  errorMsg?: string | string[];
  errorCode?: number;
  errorUrl?: string;
  response_url?: string;
  favicon?: string;
}
