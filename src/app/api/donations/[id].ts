// Donations API - get/update/delete
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const donation = await prisma.donation.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!donation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(donation);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const donation = await prisma.donation.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!donation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  await prisma.donation.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}