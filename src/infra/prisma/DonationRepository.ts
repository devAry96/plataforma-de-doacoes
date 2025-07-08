import { prisma } from '@/lib/prisma';
import { Donation } from '@/core/donation/Donation';
import { DonationRepositoryPort } from '@/core/donation/DonationService';

export class DonationRepository implements DonationRepositoryPort {
  async findAllByUser(userId: string): Promise<Donation[]> {
    return prisma.donation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findById(id: string): Promise<Donation | null> {
    return prisma.donation.findUnique({ where: { id } });
  }
  async create(data: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> {
    return prisma.donation.create({ data });
  }
  async delete(id: string, userId: string): Promise<void> {
    await prisma.donation.deleteMany({ where: { id, userId } });
  }
}