// Donations API - list/create
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const donations = await prisma.donation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(donations);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const data = await req.json();
  const { amount, message, anonymous } = data;
  let userId = session?.user?.id || null;
  if (anonymous) userId = null;
  const donation = await prisma.donation.create({
    data: {
      amount,
      message,
      anonymous: !!anonymous,
      userId,
    },
  });
  return NextResponse.json(donation, { status: 201 });
}