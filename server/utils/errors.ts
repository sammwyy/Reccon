export class SiteError extends Error {
  constructor(
    message: string,
    public readonly site: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'SiteError';
  }
}

export function getErrorMessage(error: unknown, site: string): string {
  if (error instanceof SiteError) {
    return `${site}: ${error.message}`;
  }
  
  if (error instanceof Error) {
    if (error.message.includes('ECONNREFUSED')) {
      return `${site}: Connection refused`;
    }
    if (error.message.includes('ETIMEDOUT')) {
      return `${site}: Request timed out`;
    }
    if (error.message.includes('530')) {
      return `${site}: Site protected by Cloudflare`;
    }
    return `${site}: ${error.message}`;
  }
  
  return `${site}: Unknown error occurred`;
}