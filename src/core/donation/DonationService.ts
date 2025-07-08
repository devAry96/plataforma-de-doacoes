import { Donation } from './Donation';

export interface DonationRepositoryPort {
  findAllByUser(userId: string): Promise<Donation[]>;
  findById(id: string): Promise<Donation | null>;
  create(donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation>;
  delete(id: string, userId: string): Promise<void>;
}

export class DonationService {
  constructor(private repo: DonationRepositoryPort) {}

  async listUserDonations(userId: string) {
    return this.repo.findAllByUser(userId);
  }

  async getDonation(id: string, userId: string) {
    const donation = await this.repo.findById(id);
    if (!donation || donation.userId !== userId) return null;
    return donation;
  }

  async createDonation(data: Omit<Donation, 'id' | 'createdAt'>) {
    return this.repo.create(data);
  }

  async deleteDonation(id: string, userId: string) {
    return this.repo.delete(id, userId);
  }
}