// Layout.tsx
import React from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from './Navbar';
import { Footer } from '@/shared/components/Footer';


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 8, sm: 10 },
          pb: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        {children}
      </Container>
      <Footer/>
    </Box>
  );
}