import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  message: string;
  stack?: string;
  statusCode?: number;
}

export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  const errorResponse: ErrorResponse = {
    message: err.message || "Server Error",
  };

  // Add stack trace in development environment
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    error: errorResponse,
  });
};

export default errorHandler;
