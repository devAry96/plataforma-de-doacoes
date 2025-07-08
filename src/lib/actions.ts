"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from './prisma'

// Schema de validação para doação
const donationSchema = z.object({
  amount: z.number().min(1, 'Valor deve ser maior que zero').max(100000, 'Valor máximo é R$ 100.000,00'),
  message: z.string().max(500, 'Mensagem deve ter no máximo 500 caracteres').optional(),
  anonymous: z.boolean().default(false)
})

// Server Action para criar doação
export async function createDonation(formData: FormData) {
  try {
    // Extrair dados do formulário
    const amount = parseFloat(formData.get('amount') as string)
    const message = formData.get('message') as string
    const anonymous = formData.get('anonymous') === 'true'

    // Validar dados
    const validatedData = donationSchema.parse({
      amount,
      message: message || undefined,
      anonymous
    })

    // Criar doação no banco
    const donation = await prisma.donation.create({
      data: {
        amount: validatedData.amount,
        message: validatedData.message,
        anonymous: validatedData.anonymous
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Revalidar cache da página
    revalidatePath('/')
    revalidatePath('/donations')

    return { success: true, donation }
  } catch (error) {
    console.error('Erro ao criar doação:', error)
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Dados inválidos',
        details: error.errors 
      }
    }
    
    return { 
      success: false, 
      error: 'Erro interno do servidor' 
    }
  }
}

// Server Action para deletar doação
export async function deleteDonation(donationId: string) {
  try {
    await prisma.donation.delete({
      where: { id: donationId }
    })

    // Revalidar cache
    revalidatePath('/donations')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar doação:', error)
    return { 
      success: false, 
      error: 'Erro ao deletar doação' 
    }
  }
}

// Server Action para buscar estatísticas
export async function getDonationStats() {
  try {
    const [totalDonations, totalAmount, recentDonations] = await Promise.all([
      prisma.donation.count(),
      prisma.donation.aggregate({
        _sum: { amount: true }
      }),
      prisma.donation.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ])

    return {
      success: true,
      stats: {
        totalDonations,
        totalAmount: totalAmount._sum.amount || 0,
        recentDonations
      }
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { 
      success: false, 
      error: 'Erro ao buscar estatísticas' 
    }
  }
} 