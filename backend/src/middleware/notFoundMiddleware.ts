import type { RequestHandler } from "express";
import { notFound } from "@zheta/shared";

import type { ApiErrorResponse } from "../types/api";

export const notFoundHandler: RequestHandler = (req, res) => {
  const body: ApiErrorResponse = notFound({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });

  res.status(404).json(body);
};
