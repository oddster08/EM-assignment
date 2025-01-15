export interface ErrorResponse {
  success: boolean;
  message: string;
  errors: ErrorDetail[];
}

export interface ErrorDetail {
  field: string;
  message: string;
}
