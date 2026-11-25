import type { HealthData, HealthQuery } from "@shared";

import { env } from "../../config/env";

const SERVICE_NAME = "zheta-backend";

export const getHealthStatus = (query: HealthQuery): HealthData => {
  const data: HealthData = {
    service: SERVICE_NAME,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  if (query.verbose) {
    const memoryUsage = process.memoryUsage();

    data.details = {
      uptimeSeconds: Math.round(process.uptime()),
      memoryUsageMb: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
      nodeVersion: process.version,
    };
  }

  return data;
};
