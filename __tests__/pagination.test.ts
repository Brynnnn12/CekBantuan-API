import { PaginationUtil } from '../src/utils/pagination';

describe('PaginationUtil', () => {
  describe('getPaginationOptions', () => {
    it('should return default pagination options', () => {
      const result = PaginationUtil.getPaginationOptions();

      expect(result).toEqual({
        page: 1,
        skip: 0,
        limit: 10,
      });
    });

    it('should return custom pagination options', () => {
      const options = { page: 2, limit: 20 };
      const result = PaginationUtil.getPaginationOptions(options);

      expect(result).toEqual({
        page: 2,
        skip: 20,
        limit: 20,
      });
    });

    it('should handle page 1 correctly', () => {
      const options = { page: 1, limit: 5 };
      const result = PaginationUtil.getPaginationOptions(options);

      expect(result).toEqual({
        page: 1,
        skip: 0,
        limit: 5,
      });
    });
  });

  describe('createPaginationResult', () => {
    it('should create pagination result correctly', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const total = 25;
      const options = { page: 1, limit: 10 };

      const result = PaginationUtil.createPaginationResult(data, total, options);

      expect(result).toEqual({
        data,
        pagination: {
          page: 1,
          limit: 10,
          total: 25,
          totalPages: 3,
          hasNext: true,
          hasPrev: false,
        },
      });
    });

    it('should handle last page correctly', () => {
      const data = [{ id: 1 }];
      const total = 21;
      const options = { page: 3, limit: 10 };

      const result = PaginationUtil.createPaginationResult(data, total, options);

      expect(result.pagination).toEqual({
        page: 3,
        limit: 10,
        total: 21,
        totalPages: 3,
        hasNext: false,
        hasPrev: true,
      });
    });
  });
});
