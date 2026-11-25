/**
 * ROUTE TEMPLATE
 *
 * Copy this file to `src/routes/<category>Routes.ts` and register the router
 * in `src/routes/index.ts`:
 *
 *   apiRouter.use("/<category>", categoryRouter);
 *
 * Routes only wire HTTP methods, validation middleware, and controllers.
 * Validation MUST be declared here, before the controller.
 */

import { Router } from "express";
import { categoryQuerySchema } from "@shared";

import { getCategoryController } from "../controllers/category/categoryController";
import { validateQuery } from "../middleware/validateMiddleware";

export const categoryRouter = Router();

categoryRouter.get("/", validateQuery(categoryQuerySchema), getCategoryController);

// For a validated body:
// categoryRouter.post("/", validateBody(categoryBodySchema), createCategoryController);
