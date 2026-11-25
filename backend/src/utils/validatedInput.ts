import type { Request } from "express";

/**
 * Read input that has already been parsed by the validation middleware.
 * The route definition is responsible for pairing these accessors with the
 * matching `validateQuery` / `validateBody` / `validateParams` middleware.
 */
export const getValidatedQuery = <T>(req: Request): T => req.query as unknown as T;

export const getValidatedBody = <T>(req: Request): T => req.body as T;

export const getValidatedParams = <T>(req: Request): T => req.params as unknown as T;
