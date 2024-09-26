export type ApiResponse<T = unknown> = {
  message: string;
  data?: T;
};
export type SuccessResponse<T = unknown> = ApiResponse<T>;
export type ErrorResponse = ApiResponse<null>;
export type SignalHandler = (signal: string) => void;