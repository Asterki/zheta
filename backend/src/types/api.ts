import type { ApiResponse, ErrorData } from "@zheta/shared";

export type ApiSuccessResponse<T> = ApiResponse<T>;

export type ApiErrorResponse = ApiResponse<ErrorData>;
