'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Typography,
  Stack,
  Avatar,
  Divider,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useSnackbar } from 'notistack';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (status === 'authenticated') {
      enqueueSnackbar('Login successful!', { variant: 'success' });
      router.push('/dashboard');
    }
  }, [status, router, enqueueSnackbar]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,rgb(28, 13, 46) 30%,rgb(32, 13, 23) 90%)',
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 360,
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Avatar
              src="/logo-social.png"
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
              }}
            />
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              Entre na sua conta
            </Typography>
          </Stack>

          <Stack spacing={2} mt={4}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => signIn('google')}
              fullWidth
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                bgcolor: '#DB4437',
                '&:hover': {
                  bgcolor: '#c23321',
                },
              }}
            >
              Entrar com o Google
            </Button>

            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={() => signIn('github')}
              fullWidth
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderColor: '#333',
                color: '#333',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              Entrar com o GitHub
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
           Você será redirecionado após o login.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
export const metadata = {
  title: 'Login',
  description: 'Faça login na sua conta para acessar o painel',
};