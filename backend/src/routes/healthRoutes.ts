import { Router } from "express";
import { healthQuerySchema } from "@shared";

import { healthCheck } from "../controllers/health/healthController";
import { validateQuery } from "../middleware/validateMiddleware";

export const healthRouter = Router();

healthRouter.get("/", validateQuery(healthQuerySchema), healthCheck);
