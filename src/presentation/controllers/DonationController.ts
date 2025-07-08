import { NextRequest, NextResponse } from 'next/server';
import { CreateDonationUseCase } from '../../application/useCases/CreateDonationUseCase';
import { GetDonationsUseCase } from '../../application/useCases/GetDonationsUseCase';
import { z } from 'zod';
import { PrismaDonationRepository } from '@/infra/repositories/PrismaDonationRepository';
import { PrismaUserRepository } from '@/infra/repositories/PrismaUserRepository';


// Schema de validação para criação de doação
const createDonationSchema = z.object({
  amount: z.number().min(1, 'Valor deve ser maior que zero').max(100000, 'Valor máximo é R$ 100.000,00'),
  message: z.string().max(500, 'Mensagem deve ter no máximo 500 caracteres').optional(),
  anonymous: z.boolean().default(false)
});

export class DonationController {
  private createDonationUseCase: CreateDonationUseCase;
  private getDonationsUseCase: GetDonationsUseCase;

  constructor() {
    const donationRepository = new PrismaDonationRepository();
    const userRepository = new PrismaUserRepository();
    
    this.createDonationUseCase = new CreateDonationUseCase(donationRepository, userRepository);
    this.getDonationsUseCase = new GetDonationsUseCase(donationRepository);
  }

  async getDonations(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const userId = searchParams.get('userId');

      // Validar parâmetros
      if (page < 1 || limit < 1 || limit > 100) {
        return NextResponse.json(
          { error: 'Parâmetros inválidos' },
          { status: 400 }
        );
      }

      const result = await this.getDonationsUseCase.execute({
        page,
        limit,
        userId: userId || undefined
      });

      return NextResponse.json({
        donations: result.donations,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit)
      });
    } catch (error) {
      console.error('Erro ao buscar doações:', error);
      return NextResponse.json(
        { error: 'Falha ao buscar doações' },
        { status: 500 }
      );
    }
  }

  async createDonation(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();
      
      // Validar dados de entrada
      const validatedData = createDonationSchema.parse(body);
      
      const donation = await this.createDonationUseCase.execute({
        amount: validatedData.amount,
        message: validatedData.message,
        anonymous: validatedData.anonymous
      });

      return NextResponse.json({
        success: true,
        donation,
        message: 'Doação criada com sucesso'
      }, { status: 201 });
    } catch (error) {
      console.error('Erro ao criar doação:', error);
      
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: 'Dados inválidos',
            details: error.errors 
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Falha ao criar doação' },
        { status: 500 }
      );
    }
  }
} 