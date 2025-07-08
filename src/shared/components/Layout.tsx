// Layout component
"use client";
import { ReactNode } from 'react';
import { Container } from '@mui/material';
import { Navbar } from './Navbar';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
