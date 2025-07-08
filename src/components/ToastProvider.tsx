// ToastProvider.tsx
'use client'

import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3500}
      TransitionComponent={Slide}
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  );
}