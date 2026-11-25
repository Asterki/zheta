import { createServer } from "node:http";

import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { errorHandler } from "./middleware/errorMiddleware";
import { notFoundHandler } from "./middleware/notFoundMiddleware";
import { requestLogger } from "./middleware/requestLoggerMiddleware";
import { apiRouter } from "./routes";

const app = express();

app.disable("x-powered-by");

app.use(cors({ origin: env.corsOrigins }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const server = createServer(app);

server.listen(env.PORT, env.HOST, () => {
  console.log(`API listening on http://${env.HOST}:${env.PORT} (${env.NODE_ENV})`);
  console.log(`Health check: http://${env.HOST}:${env.PORT}/api/health`);
});

const shutdown = (signal: NodeJS.Signals): void => {
  console.log(`\n${signal} received. Closing HTTP server...`);

  server.close((error) => {
    if (error) {
      console.error("Failed to close HTTP server:", error);
      process.exit(1);
    }

    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
