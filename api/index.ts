import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url || '/';

  // Health check
  if (path.includes('/health')) {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      hasDb: !!process.env.DATABASE_URL
    });
  }

  // Default response for other API paths
  return res.status(200).json({
    message: 'API is working',
    path,
    method: req.method
  });
}
