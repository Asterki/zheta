import { z } from "zod";

export const healthQuerySchema = z.object({
  verbose: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
});

export type HealthQuery = z.infer<typeof healthQuerySchema>;

export const healthDetailsSchema = z.object({
  uptimeSeconds: z.number().nonnegative(),
  memoryUsageMb: z.number().nonnegative(),
  nodeVersion: z.string(),
});

export type HealthDetails = z.infer<typeof healthDetailsSchema>;

export const healthDataSchema = z.object({
  service: z.string(),
  environment: z.enum(["development", "test", "production"]),
  timestamp: z.iso.datetime(),
  details: healthDetailsSchema.optional(),
});

export type HealthData = z.infer<typeof healthDataSchema>;
