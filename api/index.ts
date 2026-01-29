/**
 * Vercel Serverless Function Entry Point
 * Routes all /api/* requests to the Express app
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

let app: any;

async function getApp() {
  if (!app) {
    try {
      const { createApp } = await import("../server/_core/app");
      app = createApp();
    } catch (error) {
      console.error("Failed to create app:", error);
      throw error;
    }
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const expressApp = await getApp();
    return expressApp(req, res);
  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error?.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error?.stack : undefined
    });
  }
}
