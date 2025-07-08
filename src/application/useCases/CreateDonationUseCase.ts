import { Donation, DonationRepository } from '../../domain/entities/Donation';
import { UserRepository } from '../../domain/entities/User';

export interface CreateDonationRequest {
  amount: number;
  message?: string;
  anonymous: boolean;
  userEmail?: string;
}

export class CreateDonationUseCase {
  constructor(
    private donationRepository: DonationRepository,
    private userRepository: UserRepository
  ) {}

  async execute(request: CreateDonationRequest): Promise<Donation> {
    // Validações
    if (!request.amount || request.amount <= 0) {
      throw new Error('Valor da doação deve ser maior que zero');
    }

    let userId: string | undefined;

    // Se não for anônimo e tiver email, buscar ou criar usuário
    if (!request.anonymous && request.userEmail) {
      let user = await this.userRepository.findByEmail(request.userEmail);
      if (!user) {
        user = await this.userRepository.create({
          email: request.userEmail,
          name: request.userEmail.split('@')[0],
          role: 'free'
        });
      }
      userId = user.id;
    }

    // Criar a doação
    const donation = await this.donationRepository.create({
      amount: request.amount,
      message: request.message,
      anonymous: request.anonymous,
      userId
    });

    return donation;
  }
} 