import { NextRequest } from 'next/server';
import { DonationController } from '../../../presentation/controllers/DonationController';

const donationController = new DonationController();

export async function GET(request: NextRequest) {
  return donationController.getDonations(request);
}

export async function POST(request: NextRequest) {
  return donationController.createDonation(request);
} 