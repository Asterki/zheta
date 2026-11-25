import type { RequestHandler } from "express";
import { success, type HealthQuery, type HealthResponse } from "@shared";

import { getHealthStatus } from "../../services/health/service";
import { getValidatedQuery } from "../../utils/validatedInput";

export const healthCheck: RequestHandler<Record<string, string>, HealthResponse> = (req, res) => {
  const query = getValidatedQuery<HealthQuery>(req);
  const data = getHealthStatus(query);

  res.status(200).json(success(data));
};
