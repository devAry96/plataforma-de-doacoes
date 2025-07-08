"use client"

import { Box, Container, Grid, Typography, Link, IconButton, Stack } from "@mui/material"
import { Facebook, Instagram, LinkedIn, Email, Phone, LocationOn } from "@mui/icons-material"
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
export const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#00394f", color: "#fff", pt: 6, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* COLUNA 1 - Descrição */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                <VolunteerActivismIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              PLATAFORMA DE <span style={{ color: "#00e5ff" }}>DOAÇÕES</span>
            </Typography>
            <Typography variant="body2" gutterBottom>
             Plataforma comprometida com causas sociais,<br/>
             ajudando milhares de pessoas a contribuírem para um mundo melhor.
            </Typography>

          </Grid>

          {/* COLUNA 2 - Links principais */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Links Principais
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Início</Link>
              <Link href="#" color="inherit" underline="hover">Overview</Link>
              <Link href="#" color="inherit" underline="hover">Doações</Link>
            </Stack>
          </Grid>

          {/* COLUNA 3 - Serviços */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Serviços
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Estatísticas</Link>
              <Link href="#" color="inherit" underline="hover">Parcerias</Link>
              <Link href="#" color="inherit" underline="hover">Sobre a Plataforma</Link>
            </Stack>
          </Grid>

          {/* COLUNA 4 - Contatos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contatos
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="body2">+244 941 171 567</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="body2">arstunna@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="body2">Luanda, Angola</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        
        {/* LINHA INFERIOR */}
        <Box
          mt={6}
          pt={2}
          borderTop="1px solid #1976d2"
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        ></Box>
        {/* REDES SOCIAIS */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" gutterBottom>
            Siga-nos nas Redes Sociais
          </Typography>
          <Box>
            <IconButton color="inherit" href="#"><Facebook /></IconButton>
            <IconButton color="inherit" href="#"><Instagram /></IconButton>
            <IconButton color="inherit" href="#"><LinkedIn /></IconButton>
          </Box>
        </Box>

        {/* LINHA INFERIOR */}
        <Box
          mt={6}
          pt={2}
          borderTop="1px solid #1976d2"
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">
            © 2025 Todos os direitos reservados.
          </Typography>
          <Stack direction="row" spacing={2} mt={{ xs: 1, sm: 0 }}>
            <Link href="#" color="inherit" underline="hover">Termos e Condições</Link>
            <Link href="#" color="inherit" underline="hover">Política de Privacidade</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
