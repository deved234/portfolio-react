import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import contact from "./api/contact.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of [
    "RESEND_API_KEY",
    "CONTACT_FROM",
    "CONTACT_TO",
    "CONTACT_ORIGIN",
  ]) {
    if (env[key]) process.env[key] = env[key];
  }
  return {
    plugins: [
      react(),
      {
        name: "local-contact-api",
        configureServer(server) {
          server.middlewares.use("/api/contact", async (req, res) => {
            let body = "";
            for await (const chunk of req) {
              body += chunk;
              if (body.length > 12000) {
                res.writeHead(413, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Message is too large." }));
                return;
              }
            }
            req.body = body;
            const adapter = {
              setHeader: (key, value) => res.setHeader(key, value),
              status(code) {
                res.statusCode = code;
                return this;
              },
              json(data) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
              },
            };
            await contact(req, adapter);
          });
        },
      },
    ],
  };
});
