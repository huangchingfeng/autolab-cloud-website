import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/_core/app';

const app = createApp();

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Use Express app to handle the request
  return app(req, res);
}
