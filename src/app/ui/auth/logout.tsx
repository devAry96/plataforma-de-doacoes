'use client';
import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { CircularProgress, Typography, Stack, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutPage() {
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      hasLoggedOut.current = true;
      signOut({ callbackUrl: '/' });
    }
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '80vh', px: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 360,
        }}
      >
        <LogoutIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Signing out...
        </Typography>
        <CircularProgress color="error" />
      </Paper>
    </Stack>
  );
}
