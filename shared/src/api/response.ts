import { z } from "zod";

export const responseStatusSchema = z.enum(["success", "error", "not_found"]);

export type ResponseStatus = z.infer<typeof responseStatusSchema>;

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  NOT_FOUND: "not_found",
} as const satisfies Record<string, ResponseStatus>;

export type ApiResponse<T = unknown, S extends string = ResponseStatus> = {
  status: S;
  data: T;
};

export type ErrorData = {
  message: string;
  details?: unknown;
};

export const errorDataSchema = z.object({
  message: z.string(),
  details: z.unknown().optional(),
});

export const apiResponseSchema = <T extends z.ZodType>(data: T) =>
  z.object({
    status: responseStatusSchema,
    data,
  });

export const customApiResponseSchema = <S extends z.ZodType, T extends z.ZodType>(
  status: S,
  data: T,
) =>
  z.object({
    status,
    data,
  });

export const custom = <S extends string, T>(status: S, data: T): ApiResponse<T, S> => ({
  status,
  data,
});

export const success = <T>(data: T): ApiResponse<T> => ({
  status: STATUS.SUCCESS,
  data,
});

export const error = <T>(data: T): ApiResponse<T> => ({
  status: STATUS.ERROR,
  data,
});

export const notFound = <T>(data: T): ApiResponse<T> => ({
  status: STATUS.NOT_FOUND,
  data,
});
