import React from 'react';
import { Layout } from '@/components/Layout';
import { DonorForm } from '@/components/DonorForm';
import ChartStats from '@/components/ChartStats';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import CarrosselDoacao from '@/components/carrosselDoacao';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2, md: 4 } }}>
        <Box textAlign="center" mb={{ xs: 4, sm: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, wordBreak: 'break-word' }}>
            Bem-vindo à Nossa Plataforma de Doações
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
            Apoie nossa causa e faça a diferença. Cada doação conta para criar mudanças positivas.
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 4 }} mb={{ xs: 4, sm: 6 }} alignItems="stretch" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', mx: 'auto', width: '100%', maxWidth: { xs: '100%', sm: 500 }, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Faça uma Doação
              </Typography>
              <DonorForm />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', mx: 'auto', width: '100%', maxWidth: { xs: '100%', sm: 500 }, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Seja um Apoiador
              </Typography>
              <CarrosselDoacao />
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, mb: { xs: 4, sm: 6 }, mx: 'auto', width: '100%', maxWidth: 900, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                Estatísticas de Doações
              </Typography>
              <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
                <ChartStats />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 6 }, borderRadius: 2, textAlign: 'center', width: '100%', mx: 'auto', maxWidth: 900 }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
                Por que Doar?
              </Typography>
              <Grid 
                container 
                spacing={{ xs: 2, sm: 4 }} 
                mt={2} 
                justifyContent="center"
                alignItems="stretch"
                direction={{ xs: 'column', md: 'row' }}
              >
                {/* Grid 1 - Apoio Comunitário */}
                <Grid item xs={12} md={4}>
                  <Box 
                    p={{ xs: 1, sm: 2 }} 
                    sx={{ 
                      backgroundColor: '#FFEB3B',
                      borderRadius: 2,
                      boxShadow: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: { xs: 180, sm: 220 },
                    }}
                  >
                    <Typography variant="h2" mb={2} fontSize={{ xs: '2rem', sm: '2.5rem' }}>🤝</Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                      Apoio Comunitário
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                      Ajude a construir uma comunidade mais forte e solidária para todos.
                    </Typography>
                  </Box>
                </Grid>
                {/* Grid 2 - Inovação */}
                <Grid item xs={12} md={4}>
                  <Box 
                    p={{ xs: 1, sm: 2 }} 
                    sx={{ 
                      backgroundColor: '#4CAF50',
                      borderRadius: 2,
                      boxShadow: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: { xs: 180, sm: 220 },
                    }}
                  >
                    <Typography variant="h2" mb={2} fontSize={{ xs: '2rem', sm: '2.5rem' }}>💡</Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                      Inovação
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                      Financie projetos inovadores que criam impacto positivo duradouro.
                    </Typography>
                  </Box>
                </Grid>
                {/* Grid 3 - Sustentabilidade */}
                <Grid item xs={12} md={4}>
                  <Box 
                    p={{ xs: 1, sm: 2 }} 
                    sx={{ 
                      backgroundColor: '#81C784',
                      borderRadius: 2,
                      boxShadow: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: { xs: 180, sm: 220 },
                    }}
                  >
                    <Typography variant="h2" mb={2} fontSize={{ xs: '2rem', sm: '2.5rem' }}>🌱</Typography>
                    <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                      Sustentabilidade
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                      Apoie iniciativas sustentáveis que beneficiam as futuras gerações.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default HomePage; 