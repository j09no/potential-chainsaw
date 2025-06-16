import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import routes from "./routes";

// Add localStorage polyfill for server-side
if (typeof global.localStorage === 'undefined') {
  global.localStorage = {
    getItem: (key: string) => {
      try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data', `${key}.json`);
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf8');
        }
        return null;
      } catch (error) {
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        const fs = require('fs');
        const path = require('path');
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        const filePath = path.join(dataDir, `${key}.json`);
        fs.writeFileSync(filePath, value);
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    },
    removeItem: (key: string) => {
      try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data', `${key}.json`);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
    clear: () => {
      try {
        const fs = require('fs');
        const path = require('path');
        const dataDir = path.join(process.cwd(), 'data');
        if (fs.existsSync(dataDir)) {
          const files = fs.readdirSync(dataDir);
          files.forEach((file: string) => {
            fs.unlinkSync(path.join(dataDir, file));
          });
        }
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes for permanent PostgreSQL database
app.use(routes);

(async () => {
  const server = createServer(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();