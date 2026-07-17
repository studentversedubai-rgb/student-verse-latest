import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { supabase } from "./supabase";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.post("/api/survey", async (req, res) => {
    const payload = req.body;
    const requiredFields = [
      "status",
      "type",
      "livesituation",
      "university",
      "studycity",
      "livecity",
      "name",
      "email",
    ];

    for (const field of requiredFields) {
      if (!payload[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const record = {
      status: payload.status,
      type: payload.type,
      livesituation: payload.livesituation,
      university: payload.university,
      studycity: payload.studycity,
      livecity: payload.livecity,
      name: payload.name,
      email: payload.email,
      intent: payload.intent || null,
      budget: payload.budget || null,
      placetype: payload.placetype || null,
      priority: payload.priority || null,
      frustration: payload.frustration || null,
      channels: Array.isArray(payload.channels) ? payload.channels.join(", ") : payload.channels || null,
      wand: payload.wand || null,
      optin: payload.optin || null,
      submitted_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("survey_responses").insert([record]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.json({ ok: true, data });
  });

  // serve the standalone survey at /survey by redirecting to /survey.html
  app.get("/survey", (_req, res) => {
    // prefer the client/public copy which is available in dev and production
    const surveyPublic = path.resolve(process.cwd(), "client", "public", "survey.html");
    if (fs.existsSync(surveyPublic)) {
      // send the static file directly
      return res.sendFile(surveyPublic);
    }

    // if not present, attempt to serve the source file in workspace root
    const surveyFromCwd = path.resolve(process.cwd(), "SVHabitats_Survey_Final (1) (1).html");
    if (fs.existsSync(surveyFromCwd)) {
      return res.sendFile(surveyFromCwd);
    }

    // fallback to redirect to /survey.html (let the client middleware handle it)
    res.redirect('/survey.html');
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
