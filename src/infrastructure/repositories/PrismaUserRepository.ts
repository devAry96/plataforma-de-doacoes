import { User, UserRepository } from '../../domain/entities/User';
import { prisma } from '../database/prisma';

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return user;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await prisma.user.create({
      data: userData
    });
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: userData
    });
    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }
}
