import type { RequestHandler } from "express";
import type { ZodType } from "zod";

import { HttpError } from "../utils/httpError";

export const validateBody = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(new HttpError(400, "Validation failed", result.error.issues));
      return;
    }

    req.body = result.data;
    next();
  };
};
