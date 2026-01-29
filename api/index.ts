/**
 * Vercel Serverless Function Entry Point
 * This wraps the Express app for Vercel's serverless environment
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/_core/app';

const app = createApp();

export default function handler(req: VercelRequest, res: VercelResponse) {
  // @ts-ignore - Express app can handle Vercel request/response
  return app(req, res);
}
