import { readFileSync } from "fs";
import { join } from "path";

import type { Target } from "../../src/types/schema";
import { Proxy } from "../types/proxy";

export function loadTargets(): Record<string, Target> {
  const filePath = join(process.cwd(), "resources", "data.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

export function loadProxies(): Proxy[] {
  const filePath = join(process.cwd(), "resources", "proxies.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}
