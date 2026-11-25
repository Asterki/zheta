import type { Request, RequestHandler } from "express";
import type { ZodType } from "zod";

import { HttpError } from "../utils/httpError";

type RequestInput = "body" | "params" | "query";

const setValidatedInput = (req: Request, source: RequestInput, data: unknown): void => {
  if (source === "query") {
    Object.defineProperty(req, "query", {
      value: data,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    return;
  }

  if (source === "params") {
    req.params = data as Request["params"];
    return;
  }

  req.body = data;
};

export const validate = <T>(schema: ZodType<T>, source: RequestInput): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      next(new HttpError(400, `Invalid ${source}`, result.error.issues));
      return;
    }

    setValidatedInput(req, source, result.data);
    next();
  };
};

export const validateBody = <T>(schema: ZodType<T>): RequestHandler =>
  validate(schema, "body");

export const validateQuery = <T>(schema: ZodType<T>): RequestHandler =>
  validate(schema, "query");

export const validateParams = <T>(schema: ZodType<T>): RequestHandler =>
  validate(schema, "params");
