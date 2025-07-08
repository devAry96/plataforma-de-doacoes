import { User } from './User';

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  updateProfile(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User>;
  updateRole(id: string, role: 'free' | 'pro'): Promise<User>;
}

export class UserService {
  constructor(private repo: UserRepositoryPort) {}

  async getUser(id: string) {
    return this.repo.findById(id);
  }

  async updateProfile(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) {
    return this.repo.updateProfile(id, data);
  }

  async upgradePlan(id: string) {
    return this.repo.updateRole(id, 'pro');
  }

  async downgradePlan(id: string) {
    return this.repo.updateRole(id, 'free');
  }
}