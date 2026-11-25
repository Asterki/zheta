/**
 * ROUTE TEMPLATE
 *
 * Copy this file to `src/routes/<category>Routes.ts` and register the router
 * in `src/routes/index.ts`:
 *
 *   apiRouter.use("/<category>", categoryRouter);
 *
 * Routes only wire HTTP methods and paths to controllers.
 */

import { Router } from "express";

import { getCategoryController } from "../controllers/category/categoryController";

export const categoryRouter = Router();

categoryRouter.get("/", getCategoryController);
