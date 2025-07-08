// Auth utilities
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User } from '@prisma/client';
import api from '@/infra/axios/api';


export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const res = await api.get(`/api/profile`);
  if (res.status !== 200) return null;
  const data = res.data;
  return data.user || null;
}
