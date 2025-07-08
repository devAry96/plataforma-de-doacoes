'use client'

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
export function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder igual no server e client para evitar erro de hydration
    return <div style={{ minHeight: 64 }} />; // altura padrão do AppBar
  }

  return (
    <AppBar position="fixed" sx={{bgcolor: "#00394f" }} elevation={2}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <VolunteerActivismIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            PLATAFORMA DE <span style={{ color: "#00e5ff" }}>DOAÇÕES</span>
          </Link>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} href="/">Início</Button>
          <Button color="inherit" component={Link} href="/overview">Overview</Button>
          <Button color="inherit" component={Link} href="/donations">Doações</Button>
          {session ? (
            <>
              <Button color="inherit" component={Link} href="/profile">Perfil</Button>
              <Button color="inherit" onClick={() => signOut({ callbackUrl: '/' })}>
                Sair
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/api/auth/signin">
              Entrar
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}