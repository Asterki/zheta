import type { z } from "zod";

import { healthDataSchema, healthQuerySchema } from "../schemas/health.schema";
import type { ApiResponse } from "./response";

export type HealthRequest = z.infer<typeof healthQuerySchema>;

export type HealthResponseData = z.infer<typeof healthDataSchema>;

export type HealthResponse = ApiResponse<HealthResponseData>;
