// User entity
export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role: 'free' | 'pro';
  createdAt: string;
  updatedAt: string;
}