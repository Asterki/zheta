/**
 * CONTROLLER TEMPLATE
 *
 * Copy this file to `src/controllers/<category>/<name>.ts` and replace the
 * Category placeholders with the real schema/API types.
 *
 * Rules:
 * - Keep one controller file per category while the domain is small.
 * - Split it into one file per action when the category becomes a god file.
 * - Controllers are thin: validate input, call services, return a shared response.
 * - Never put business logic or direct database access here.
 */

import type { NextFunction, Request, Response } from "express";
import { categoryQuerySchema, success, type CategoryResponse } from "@shared";

import { getCategory } from "../../services/category/service";
import { HttpError } from "../../utils/httpError";

export const getCategoryController = (
  req: Request,
  res: Response<CategoryResponse>,
  next: NextFunction,
): void => {
  const input = categoryQuerySchema.safeParse(req.query);

  if (!input.success) {
    next(new HttpError(400, "Invalid query parameters", input.error.issues));
    return;
  }

  const data = getCategory(input.data);

  res.status(200).json(success(data));
};
