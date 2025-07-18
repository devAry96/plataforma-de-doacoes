'use client'

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  CircularProgress,
  Paper,
  Alert,
  Button
} from '@mui/material';
import { Favorite as FavoriteIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface Donation {
  id: string;
  amount: number;
  message: string | null;
  anonymous: boolean;
  createdAt: string;
  user?: {
    name: string | null;
    email: string | null;
  } | null;
}

interface DonationsResponse {
  donations: Donation[];
  total: number;
  page: number;
  limit: number;
}

export function DonationCard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDonations = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const response = await fetch('/api/donations');
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data: DonationsResponse = await response.json();
      setDonations(data.donations || []);
    } catch (error) {
      console.error('Erro ao buscar doações:', error);
      setError(error instanceof Error ? error.message : 'Erro ao carregar doações');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleRefresh = () => {
    fetchDonations(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `Há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInHours < 48) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getDonorName = (donation: Donation) => {
    if (donation.anonymous) {
      return 'Doador Anônimo';
    }
    return donation.user?.name || 'Doador';
  };

  const getDonorInitial = (donation: Donation) => {
    if (donation.anonymous) {
      return 'A';
    }
    return donation.user?.name?.charAt(0)?.toUpperCase() || 'D';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 }, width: '100%' }}>
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        {isLoading && <CircularProgress />}
      </Box>
      {error && (
        <Box textAlign="center" py={4}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Carregando...' : 'Tentar Novamente'}
          </Button>
        </Box>
      )}
      {!isLoading && !error && donations.length === 0 && (
        <Box textAlign="center" py={4}>
          <FavoriteIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Nenhuma doação ainda
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Seja o primeiro a fazer uma doação!
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Carregando...' : 'Atualizar'}
          </Button>
        </Box>
      )}
      {donations.map((donation) => (
        <Card key={donation.id} sx={{
          border: 1,
          borderColor: 'divider',
          mb: { xs: 2, sm: 3 },
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          },
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
        }}>
          <CardContent>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <Box display="flex" alignItems="center" gap={2} flex={1}>
                <Avatar sx={{
                  bgcolor: donation.anonymous ? 'grey.500' : 'primary.main',
                  width: 48,
                  height: 48
                }}>
                  {getDonorInitial(donation)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="medium" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                    {getDonorName(donation)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(donation.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box textAlign={{ xs: 'left', sm: 'right' }} mt={{ xs: 2, sm: 0 }}>
                <Typography variant="h4" color="success.main" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                  Kz {donation.amount.toFixed(2)}
                </Typography>
                <Chip
                  label={donation.anonymous ? "anônima" : "identificada"}
                  size="small"
                  color={donation.anonymous ? "default" : "success"}
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
            {donation.message && (
              <Paper sx={{ p: { xs: 1, sm: 2 }, mt: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body1" fontStyle="italic" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                  "{donation.message}"
                </Typography>
              </Paper>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 