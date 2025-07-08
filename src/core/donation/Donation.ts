// Donation entity
export interface Donation {
  id: string;
  amount: number;
  message?: string;
  anonymous: boolean;
  userId?: string | null;
  createdAt: string;
}

export function createDonation(data: Omit<Donation, 'id' | 'createdAt'>): Donation {
  return {
    ...data,
    id: '',
    createdAt: new Date().toISOString(),
  };
}