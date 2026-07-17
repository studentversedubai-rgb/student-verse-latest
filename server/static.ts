import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // try several likely production build locations (client/dist, dist, server/public)
  const candidates = [
    path.resolve(process.cwd(), "client", "dist"),
    path.resolve(process.cwd(), "dist"),
    path.resolve(process.cwd(), "server", "public"),
    path.resolve(process.cwd(), "public"),
  ];

  const distPath = candidates.find(p => fs.existsSync(p));
  if (!distPath) {
    throw new Error(
      `Could not find the build directory (tried: ${candidates.join(', ')}). Make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
