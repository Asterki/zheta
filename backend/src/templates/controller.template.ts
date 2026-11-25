/**
 * CONTROLLER TEMPLATE
 *
 * Copy this file to `src/controllers/<category>/<name>.ts` and replace the
 * Category placeholders with the real schema/API types.
 *
 * Rules:
 * - Keep one controller file per category while the domain is small.
 * - Split it into one file per action when the category becomes a god file.
 * - Validation happens in the route file, not here.
 * - Controllers are thin: consume validated input, call services, return a shared response.
 * - Never put business logic or direct database access here.
 */

import type { RequestHandler } from "express";
import { success, type CategoryQuery, type CategoryResponse } from "@shared";

import { getCategory } from "../../services/category/service";
import { getValidatedQuery } from "../../utils/validatedInput";

export const getCategoryController: RequestHandler<
  Record<string, string>,
  CategoryResponse
> = (req, res) => {
  const query = getValidatedQuery<CategoryQuery>(req);
  const data = getCategory(query);

  res.status(200).json(success(data));
};

// For a validated body, read it with:
// const body = getValidatedBody<CategoryBody>(req);
