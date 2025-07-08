import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar estatísticas básicas
    const [totalDonations, totalAmount, recentDonations] = await Promise.all([
      prisma.donation.count(),
      prisma.donation.aggregate({
        _sum: {
          amount: true
        }
      }),
      prisma.donation.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 dias atrás
          }
        }
      })
    ]);

    // Buscar dados mensais dos últimos 6 meses
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyDonations = await prisma.donation.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      _sum: {
        amount: true
      }
    });

    // Processar dados mensais
    const monthlyData = [];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = months[date.getMonth()];
      
      const monthTotal = monthlyDonations
        .filter(d => {
          const donationDate = new Date(d.createdAt);
          return donationDate.getMonth() === date.getMonth() && 
                 donationDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, d) => sum + (d._sum.amount || 0), 0);
      
      monthlyData.push({
        month: monthKey,
        amount: monthTotal
      });
    }

    // Buscar dados de anônimas vs identificadas
    const [anonymousCount, identifiedCount] = await Promise.all([
      prisma.donation.count({
        where: { anonymous: true }
      }),
      prisma.donation.count({
        where: { anonymous: false }
      })
    ]);

    const anonymousVsIdentified = [
      { name: 'Anônimas', value: anonymousCount },
      { name: 'Identificadas', value: identifiedCount }
    ];

    return NextResponse.json({
      totalDonations,
      totalAmount: totalAmount._sum.amount || 0,
      recentDonations,
      monthlyData,
      anonymousVsIdentified
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar estatísticas' },
      { status: 500 }
    );
  }
} 