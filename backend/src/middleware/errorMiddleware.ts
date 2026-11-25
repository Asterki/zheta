import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { error as errorResponse } from "@zheta/shared";

import { env } from "../config/env";
import { HttpError } from "../utils/httpError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  let statusCode = 500;
  let message = "Internal server error";
  let details: unknown;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    details = err.issues;
  } else if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err instanceof Error && env.NODE_ENV !== "production") {
    message = err.message;
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json(
    errorResponse({
      message,
      ...(details === undefined ? {} : { details }),
    }),
  );
};
