import { jest } from '@jest/globals';
import { CompanyRepository } from '../../src/routes/company/company.repository';

let mockPrisma = {
  company: {
    findMany: jest.fn(),
  },
};

let companyRepositoryInstance = new CompanyRepository(mockPrisma);

describe('Company Repository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getCompanies Method', () => {
    const mockCompaniesReturn = [
      { id: 1, name: 'Company1', fluctuationRate: 10.5 },
      { id: 2, name: 'Company2', fluctuationRate: 9.5 },
      { id: 3, name: 'Company3', fluctuationRate: 8.5 },
    ];

    test('should successfully fetch companies', async () => {
      mockPrisma.company.findMany.mockResolvedValue(mockCompaniesReturn);

      const result = await companyRepositoryInstance.getCompanies();

      expect(mockPrisma.company.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCompaniesReturn);
    });

    test('should handle errors when fetching companies', async () => {
      const errorMessage = 'Error fetching companies';
      mockPrisma.company.findMany.mockRejectedValue(new Error(errorMessage));

      await expect(companyRepositoryInstance.getCompanies()).rejects.toThrow(errorMessage);

      expect(mockPrisma.company.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCompanyName Method', () => {
    const mockCompanyNameReturn = [{ name: 'Company1' }];

    test('should successfully fetch company name by companyId', async () => {
      const companyId = 1;
      mockPrisma.company.findMany.mockResolvedValue(mockCompanyNameReturn);

      const result = await companyRepositoryInstance.getCompanyName(companyId);

      expect(mockPrisma.company.findMany).toHaveBeenCalledWith({
        select: { name: true },
        where: { companyId: companyId },
      });
      expect(result).toEqual(mockCompanyNameReturn);
    });

    test('should return an empty array if the company does not exist', async () => {
      const companyId = 999;
      mockPrisma.company.findMany.mockResolvedValue([]);

      const result = await companyRepositoryInstance.getCompanyName(companyId);

      expect(mockPrisma.company.findMany).toHaveBeenCalledWith({
        select: { name: true },
        where: { companyId: companyId },
      });
      expect(result).toEqual([]);
    });

    test('should handle errors when fetching company name', async () => {
      const companyId = 1;
      const errorMessage = 'Error fetching company name';
      mockPrisma.company.findMany.mockRejectedValue(new Error(errorMessage));

      await expect(companyRepositoryInstance.getCompanyName(companyId)).rejects.toThrow(errorMessage);

      expect(mockPrisma.company.findMany).toHaveBeenCalledWith({
        select: { name: true },
        where: { companyId: companyId },
      });
    });
  });
});
