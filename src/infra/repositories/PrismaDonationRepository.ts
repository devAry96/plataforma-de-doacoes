import { Donation, DonationRepository } from '../../domain/entities/Donation';
import { prisma } from '../prisma/prisma';


export class PrismaDonationRepository implements DonationRepository {
  async findById(id: string): Promise<Donation | null> {
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return donation;
  }

  async findAll(): Promise<Donation[]> {
    const donations = await prisma.donation.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return donations;
  }

  async findByUserId(userId: string): Promise<Donation[]> {
    const donations = await prisma.donation.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return donations;
  }

  async findWithPagination(params: { page: number; limit: number; userId?: string }): Promise<Donation[]> {
    const { page, limit, userId } = params;
    const offset = (page - 1) * limit;
    const where = userId ? { userId } : {};
    const donations = await prisma.donation.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: offset,
      take: limit
    });
    return donations;
  }

  async count(userId?: string): Promise<number> {
    const where = userId ? { userId } : {};
    return prisma.donation.count({ where });
  }

  async create(donationData: Omit<Donation, 'id' | 'createdAt' | 'user'>): Promise<Donation> {
    const donation = await prisma.donation.create({
      data: donationData,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return donation;
  }

  async update(id: string, donationData: Partial<Omit<Donation, 'id' | 'createdAt' | 'user'>>): Promise<Donation> {
    const donation = await prisma.donation.update({
      where: { id },
      data: donationData,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return donation;
  }

  async delete(id: string): Promise<void> {
    await prisma.donation.delete({
      where: { id }
    });
  }

  async getStats(): Promise<{
    totalDonations: number;
    totalAmount: number;
    recentDonations: number;
  }> {
    const [totalDonations, totalAmount, recentDonations] = await Promise.all([
      prisma.donation.count(),
      prisma.donation.aggregate({
        _sum: {
          amount: true
        }
      }),
      prisma.donation.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 dias atrás
          }
        }
      })
    ]);

    return {
      totalDonations,
      totalAmount: totalAmount._sum.amount || 0,
      recentDonations
    };
  }
}
