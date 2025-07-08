import { prisma } from '@/lib/prisma';
import { User } from '@/core/user/User';
import { UserRepositoryPort } from '@/core/user/UserService';

export class UserRepository implements UserRepositoryPort {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  async updateProfile(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }
  async updateRole(id: string, role: 'free' | 'pro'): Promise<User> {
    return prisma.user.update({ where: { id }, data: { role } });
  }
}