export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NetworkError extends AppError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR', 503);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', 401);
  }
}

export function handleError(error: Error | AppError): void {
  if (error instanceof AppError && error.isOperational) {
    // Обработка операционных ошибок
    console.error('Operational error:', {
      name: error.name,
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    });
  } else {
    // Обработка программных ошибок
    console.error('Programming error:', error);
    // Здесь можно добавить отправку ошибки в систему мониторинга
  }
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorHandler?: (error: Error) => void
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error as Error);
    } else {
      handleError(error as Error);
    }
    throw error;
  }
}

export function createErrorBoundary<T extends (...args: any[]) => Promise<any>>(
  fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  };
} 