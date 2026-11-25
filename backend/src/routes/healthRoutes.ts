import { Router } from "express";

import { healthCheck } from "../controllers/health/healthController";

export const healthRouter = Router();

healthRouter.get("/", healthCheck);
