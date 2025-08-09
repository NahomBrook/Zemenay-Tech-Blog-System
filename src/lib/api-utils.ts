export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message);
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: error.statusCode 
      }),
      { status: error.statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.error('Unhandled error:', error);
  return new Response(
    JSON.stringify({ 
      error: 'Internal server error',
      status: 500 
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};
