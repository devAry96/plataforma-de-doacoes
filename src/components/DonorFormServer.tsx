'use sever'

import React, { useTransition } from 'react';
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
import { createDonation } from '@/lib/actions';

export function DonorFormServer() {
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createDonation(formData);
      
      if (result.success) {
        enqueueSnackbar('Doação enviada com sucesso!', { variant: 'success' });
        // Resetar formulário
        const form = document.getElementById('donation-form') as HTMLFormElement;
        form?.reset();
      } else {
        enqueueSnackbar(result.error || 'Erro ao enviar doação', { variant: 'error' });
      }
    });
  };

  return (
    <Box component="form" action={handleSubmit} id="donation-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Valor (Kz)"
        type="number"
        name="amount"
        required
        inputProps={{ 
          min: 1, 
          step: 0.01,
          max: 100000
        }}
        placeholder="Digite o valor em Kz"
        fullWidth
      />

      <TextField
        label="Mensagem (Opcional)"
        name="message"
        multiline
        rows={3}
        placeholder="Deixe uma mensagem..."
        fullWidth
        inputProps={{ maxLength: 500 }}
      />

      <FormControlLabel
        control={
          <Checkbox name="anonymous" value="true" />
        }
        label="Fazer esta doação anonimamente"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending}
        size="large"
        sx={{ mt: 2 }}
      >
        {isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Enviar Doação'
        )}
      </Button>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          Esta versão usa Server Actions para melhor performance e segurança.
        </Typography>
      </Alert>
    </Box>
  );
} 