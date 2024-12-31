export interface Proxy {
  host: string;
  port: number;
  protocol: "http" | "https" | "socks4" | "socks5";
}
