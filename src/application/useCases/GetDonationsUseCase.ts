import { Donation, DonationRepository } from '../../domain/entities/Donation';

export interface GetDonationsRequest {
  page?: number;
  limit?: number;
  userId?: string;
}

export interface GetDonationsResponse {
  donations: Donation[];
  total: number;
  page: number;
  limit: number;
}

export class GetDonationsUseCase {
  constructor(private donationRepository: DonationRepository) {}

  async execute(request: GetDonationsRequest = {}): Promise<GetDonationsResponse> {
    const { page = 1, limit = 10, userId } = request;
    
    // Validar parâmetros
    if (page < 1 || limit < 1 || limit > 100) {
      throw new Error('Parâmetros de paginação inválidos');
    }

    // Calcular offset
    const offset = (page - 1) * limit;

    // Buscar doações com paginação
    const [donations, total] = await Promise.all([
      this.donationRepository.findWithPagination({
        page,
        limit,
        userId
      }),
      this.donationRepository.count(userId)
    ]);

    return {
      donations,
      total,
      page,
      limit
    };
  }
} 