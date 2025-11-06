import { ApiResponse } from '../src/utils/apiResponse';

describe('ApiResponse', () => {
  let mockRes: any;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('success', () => {
    it('should return success response with data', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Success message';
      const statusCode = 200;

      ApiResponse.success(mockRes, data, message, statusCode);

      expect(mockRes.status).toHaveBeenCalledWith(statusCode);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message,
        data,
      });
    });

    it('should return success response with pagination', () => {
      const data = [{ id: 1 }];
      const pagination = { page: 1, total: 10 };

      ApiResponse.success(mockRes, data, 'Success', 200, pagination);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Success',
        data,
        pagination,
      });
    });

    it('should use default values', () => {
      ApiResponse.success(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Success',
        data: null,
      });
    });
  });

  describe('error', () => {
    it('should return error response', () => {
      const message = 'Error message';
      const statusCode = 400;
      const errors = { field: 'required' };

      ApiResponse.error(mockRes, message, statusCode, errors);

      expect(mockRes.status).toHaveBeenCalledWith(statusCode);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message,
        errors,
      });
    });

    it('should use default values for error', () => {
      ApiResponse.error(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error',
        errors: null,
      });
    });
  });
});
