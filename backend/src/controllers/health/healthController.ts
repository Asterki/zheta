import type { NextFunction, Request, Response } from "express";
import { healthQuerySchema, success, type HealthResponse } from "@shared";

import { getHealthStatus } from "../../services/health/service";
import { HttpError } from "../../utils/httpError";

export const healthCheck = (
  req: Request,
  res: Response<HealthResponse>,
  next: NextFunction,
): void => {
  const parsedQuery = healthQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    next(new HttpError(400, "Invalid query parameters", parsedQuery.error.issues));
    return;
  }

  const data = getHealthStatus(parsedQuery.data);

  res.status(200).json(success(data));
};
