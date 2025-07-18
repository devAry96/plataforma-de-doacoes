'use client'

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Container, Avatar } from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
// Ícones para o Drawer
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerLinks = [
    { text: 'Início', link: '/', icon: <HomeIcon /> },
    { text: 'Overview', link: '/overview', icon: <DashboardIcon /> },
    { text: 'Doações', link: '/donations', icon: <VolunteerActivismOutlinedIcon /> },
    ...(session ? [
      { text: 'Perfil', link: '/profile', icon: <PersonIcon /> },
      { text: 'Sair', link: undefined, action: () => signOut({ callbackUrl: '/' }), icon: <LogoutIcon /> }
    ] : [
      { text: 'Entrar', link: '/api/auth/signin', icon: <LoginIcon /> }
    ])
  ];

  if (!mounted) {
    // Placeholder igual no server e client para evitar erro de hydration
    return <div style={{ minHeight: 64 }} />; // altura padrão do AppBar
  }

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#00394f" }} elevation={2}>
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <VolunteerActivismIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                PLATAFORMA DE <span style={{ color: "#00e5ff" }}>DOAÇÕES</span>
              </Link>
            </Typography>
            {isMobile ? (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box>
                <Button color="inherit" component={Link} href="/" sx={{ position: 'relative', mx: 1, '&:hover': { bgcolor: '#002233' }, ...(pathname === '/' && { '&::after': { content: '""', position: 'absolute', left: 8, right: 8, bottom: 4, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, }) }}>
                  Início
                </Button>
                <Button color="inherit" component={Link} href="/overview" sx={{ position: 'relative', mx: 1, '&:hover': { bgcolor: '#002233' }, ...(pathname === '/overview' && { '&::after': { content: '""', position: 'absolute', left: 8, right: 8, bottom: 4, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, }) }}>
                  Overview
                </Button>
                <Button color="inherit" component={Link} href="/donations" sx={{ position: 'relative', mx: 1, '&:hover': { bgcolor: '#002233' }, ...(pathname === '/donations' && { '&::after': { content: '""', position: 'absolute', left: 8, right: 8, bottom: 4, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, }) }}>
                  Doações
                </Button>
                {session ? (
                  <>
                    <Button color="inherit" component={Link} href="/profile" sx={{ position: 'relative', mx: 1, '&:hover': { bgcolor: '#002233' }, ...(pathname === '/profile' && { '&::after': { content: '""', position: 'absolute', left: 8, right: 8, bottom: 4, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, }) }}>
                      Perfil
                    </Button>
                    <Button color="inherit" onClick={() => signOut({ callbackUrl: '/' })} sx={{ position: 'relative', mx: 1, '&:hover': { bgcolor: '#002233' } }}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button color="inherit" component={Link} href="/api/auth/signin" sx={{ position: 'relative', mx: 1, '&:hover': { bgcolor: '#002233' }, ...(pathname === '/api/auth/signin' && { '&::after': { content: '""', position: 'absolute', left: 8, right: 8, bottom: 4, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, }) }}>
                    Entrar
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 220, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} role="presentation" onClick={toggleDrawer(false)}>
          <Box>
            <List>
              {drawerLinks.map((item, idx) => {
                const isActive = item.link && pathname === item.link;
                return (
                <ListItem key={idx} disablePadding>
                  {item.action ? (
                      <ListItemButton onClick={item.action} aria-label={`Executar ${item.text}`} sx={{ position: 'relative', '&:hover': { bgcolor: '#002233' }, ...(isActive ? { '&::after': { content: '""', position: 'absolute', left: 16, right: 16, bottom: 2, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, } : {}) }}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  ) : (
                      <ListItemButton component={Link} href={item.link} aria-label={`Navegar para ${item.text}`} sx={{ position: 'relative', '&:hover': { bgcolor: '#002233' }, ...(isActive ? { '&::after': { content: '""', position: 'absolute', left: 16, right: 16, bottom: 2, height: 3, bgcolor: '#00e5ff', borderRadius: 2, }, } : {}) }}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  )}
                </ListItem>
                );
              })}
            </List>
          </Box>
          {session && session.user && (
            <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={session.user.image || undefined} alt={session.user.name || 'Avatar'} />
              <Box>
                <Typography variant="subtitle2" noWrap>{session.user.name}</Typography>
                <Typography variant="caption" color="text.secondary" noWrap>{session.user.email}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
      {/* Espaço para compensar o AppBar fixo */}
      <Box sx={{ minHeight: 64 }} />
    </>
  );
}