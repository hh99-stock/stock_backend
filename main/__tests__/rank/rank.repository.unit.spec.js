import { jest } from '@jest/globals';
import { RankRepository } from '../../src/routes/rank/rank.repository.js';
let mockPrisma;
let mockPrismaReplica = {
  rank: {
    findMany: jest.fn(),
  },
  user: {
    findMany: jest.fn(),
  },
};

let rankRepositoryInstance = new RankRepository(mockPrisma, mockPrismaReplica);

describe('Rank Repository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('userRanking Method', () => {
    const mockRankingReturn = [
      { userId: 1, ranking: 1 },
      { userId: 2, ranking: 2 },
      { userId: 3, ranking: 3 },
      { userId: 4, ranking: 4 },
      { userId: 5, ranking: 5 },
    ];

    test('should successfully fetch user rankings', async () => {
      mockPrismaReplica.rank.findMany.mockResolvedValue(mockRankingReturn);

      const result = await rankRepositoryInstance.userRanking();

      expect(mockPrismaReplica.rank.findMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaReplica.rank.findMany).toHaveBeenCalledWith({ orderBy: { ranking: 'asc' } });
      expect(result).toEqual(mockRankingReturn);
    });

    test('should handle errors when fetching user rankings', async () => {
      const errorMessage = 'Error fetching rankings';
      mockPrismaReplica.rank.findMany.mockRejectedValue(new Error(errorMessage));

      await expect(rankRepositoryInstance.userRanking()).rejects.toThrow(errorMessage);

      expect(mockPrismaReplica.rank.findMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaReplica.rank.findMany).toHaveBeenCalledWith({ orderBy: { ranking: 'asc' } });
    });
  });

  describe('usermmrRanking Method', () => {
    const mockUsermmrRankingReturn = [
      { userId: 1, mmr: 500 },
      { userId: 2, mmr: 450 },
      { userId: 3, mmr: 400 },
      { userId: 4, mmr: 350 },
      { userId: 5, mmr: 300 },
    ];

    test('should successfully fetch MMR rankings', async () => {
      mockPrismaReplica.user.findMany.mockResolvedValue(mockUsermmrRankingReturn);

      const result = await rankRepositoryInstance.usermmrRanking();

      expect(mockPrismaReplica.user.findMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaReplica.user.findMany).toHaveBeenCalledWith({
        orderBy: { mmr: 'desc' },
        take: 5,
      });
      expect(result).toEqual(mockUsermmrRankingReturn);
    });

    test('should handle errors when fetching MMR rankings', async () => {
      const errorMessage = 'Error fetching MMR rankings';
      mockPrismaReplica.user.findMany.mockRejectedValue(new Error(errorMessage));

      await expect(rankRepositoryInstance.usermmrRanking()).rejects.toThrow(errorMessage);

      expect(mockPrismaReplica.user.findMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaReplica.user.findMany).toHaveBeenCalledWith({
        orderBy: { mmr: 'desc' },
        take: 5,
      });
    });
  });
});
