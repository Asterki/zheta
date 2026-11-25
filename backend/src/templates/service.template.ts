/**
 * SERVICE TEMPLATE
 *
 * Copy this file to `src/services/<category>/service.ts`.
 *
 * Rules:
 * - Services own business logic and may call other services.
 * - Services never receive or return Express Request/Response objects.
 * - Keep a single `service.ts` while the domain is small.
 * - Split it into focused files (e.g. `createCategory.ts`, `getCategory.ts`)
 *   when the file becomes a god file.
 * - Cross-boundary input/output types must come from `@shared`.
 */

import type { CategoryData, CategoryQuery } from "@shared";

export const getCategory = (input: CategoryQuery): CategoryData => {
  void input;

  throw new Error("Not implemented");
};
