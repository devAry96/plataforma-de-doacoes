import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const buf = await req.arrayBuffer();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      const user = await prisma.user.findFirst({
        where: { subscriptions: { some: { stripeSubId: subscription.id } } },
      });
      if (user) {
        await prisma.subscription.updateMany({
          where: { stripeSubId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
        if (subscription.status === 'active') {
          await prisma.user.update({ where: { id: user.id }, data: { role: 'pro' } });
        } else {
          await prisma.user.update({ where: { id: user.id }, data: { role: 'free' } });
        }
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.subscription.updateMany({
        where: { stripeSubId: subscription.id },
        data: { status: 'canceled' },
      });
      const user = await prisma.user.findFirst({
        where: { subscriptions: { some: { stripeSubId: subscription.id } } },
      });
      if (user) {
        await prisma.user.update({ where: { id: user.id }, data: { role: 'free' } });
      }
      break;
    }
    default:
      break;
  }
  return NextResponse.json({ received: true });
}