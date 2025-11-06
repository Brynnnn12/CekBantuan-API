import { Response } from 'express';

export class ApiResponse {
  static success(
    res: Response,
    data: unknown = null,
    message = 'Success',
    statusCode = 200,
    pagination?: unknown,
  ) {
    const response: any = {
      success: true,
      message,
      data,
    };
    if (pagination) {
      response.pagination = pagination;
    }
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message = 'Error', statusCode = 500, errors: unknown = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
