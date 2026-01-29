/**
 * Vercel Serverless API Entry Point
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import the Express app from server
import { createApp } from '../server/_core/app';

const app = createApp();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
