export interface Donation {
  id: string;
  amount: number;
  message: string | null;
  anonymous: boolean;
  userId: string | null;
  createdAt: Date;
  user?: {
    name: string | null;
    email: string | null;
  } | null;
}

export interface DonationRepository {
  findById(id: string): Promise<Donation | null>;
  findAll(): Promise<Donation[]>;
  findByUserId(userId: string): Promise<Donation[]>;
  findWithPagination(params: { page: number; limit: number; userId?: string }): Promise<Donation[]>;
  count(userId?: string): Promise<number>;
  create(donation: Omit<Donation, 'id' | 'createdAt' | 'user'>): Promise<Donation>;
  update(id: string, donation: Partial<Donation>): Promise<Donation>;
  delete(id: string): Promise<void>;
  getStats(): Promise<{
    totalDonations: number;
    totalAmount: number;
    recentDonations: number;
  }>;
} 