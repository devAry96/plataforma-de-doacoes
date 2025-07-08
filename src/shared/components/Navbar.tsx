// Navbar component
"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button
} from '@mui/material';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Donations SaaS
        </Typography>
        {session?.user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar alt={session.user.name!} src={session.user.image!} />
            <Button color="inherit" onClick={() => signOut()}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" href="/api/auth/signin">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
