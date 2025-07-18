'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Box, 
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { z } from 'zod';
import api from '@/infra/axios/api';
import Link from 'next/link';

// Schema de validação
const donationSchema = z.object({
  amount: z.number().min(1, 'Valor deve ser maior que R$ 1,00').max(100000, 'Valor máximo é R$ 100.000,00'),
  message: z.string().max(500, 'Mensagem deve ter no máximo 500 caracteres').optional(),
  anonymous: z.boolean()
});

type FormData = {
  amount: string;
  message: string;
  anonymous: boolean;
};

type FormErrors = {
  amount?: string;
  message?: string;
};

export function DonorForm() {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    message: '',
    anonymous: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder igual no server e client para evitar erro de hydration
    return <div style={{ minHeight: 300 }} />;
  }

  const validateForm = (): boolean => {
    try {
      const validatedData = donationSchema.parse({
        amount: parseFloat(formData.amount) || 0,
        message: formData.message,
        anonymous: formData.anonymous
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'amount') {
            newErrors.amount = err.message;
          } else if (err.path[0] === 'message') {
            newErrors.message = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      enqueueSnackbar('Por favor, corrija os erros no formulário', { variant: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/api/donations', {
        ...formData,
        amount: parseFloat(formData.amount)
      });

      if (response.status === 200) {
        setFormData({ amount: '', message: '', anonymous: false });
        enqueueSnackbar('Doação enviada com sucesso!', { variant: 'success' });
      } else {
        enqueueSnackbar(response.data?.error || 'Erro ao enviar doação', { variant: 'error' });
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      console.error('Erro:', err);
      enqueueSnackbar(err?.response?.data?.error || 'Erro de conexão. Tente novamente.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 }, width: '100%', maxWidth: 400, mx: 'auto', p: { xs: 1, sm: 2 } }}>
      <TextField
        label="Valor (Kz)"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
        inputProps={{ 
          min: 1, 
          step: 0.01,
          max: 100000
        }}
        placeholder="Digite o valor em Kz"
        fullWidth
        error={!!errors.amount}
        helperText={errors.amount}
        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
      />

      <TextField
        label="Mensagem (Opcional)"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={3}
        placeholder="Deixe uma mensagem..."
        fullWidth
        error={!!errors.message}
        helperText={errors.message || `${formData.message.length}/500`}
        inputProps={{ maxLength: 500 }}
        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
        }
        label="Fazer esta doação anonimamente"
        sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading || !formData.amount}
        size="large"
        sx={{ mt: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Enviar Doação'
        )}
      </Button>

      {!session && (
        <Alert severity="info" sx={{ mt: 2, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          <Typography variant="body2">
            <Link href="/auth/signin" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Faça login
            </Link>{' '}
            para acompanhar suas doações
          </Typography>
        </Alert>
      )}
    </Box>
  );
}