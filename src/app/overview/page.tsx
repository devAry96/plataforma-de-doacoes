import { Layout } from '@/components/Layout'
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent,
  Container
} from '@mui/material'
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Support as SupportIcon
} from '@mui/icons-material'
import Link from 'next/link'
import ChartStats from '@/components/ChartStats'

export default function DashboardPage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2, md: 4 } }}>
        <Box mb={{ xs: 3, sm: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, wordBreak: 'break-word' }}>
            Painel de Controle
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
            Bem-vindo ao seu painel de doações
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 4 }} mb={{ xs: 4, sm: 6 }} alignItems="stretch" direction={{ xs: 'column', md: 'row' }} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, mb: { xs: 2, md: 0 }, width: '100%', maxWidth: 400, textAlign: 'center', mx: 'auto' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                Ações Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  component={Link}
                  href="/donations" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                >
                  Ver Todas as Doações
                </Button>
                <Button 
                  component={Link}
                  href="/profile" 
                  variant="outlined" 
                  color="primary" 
                  fullWidth
                >
                  Editar Perfil
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, width: '100%', maxWidth: 400, textAlign: 'center', mx: 'auto' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                Atividade Recente
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%' }} />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Nova doação recebida
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Há 2 minutos
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: 'info.main', borderRadius: '50%' }} />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Perfil atualizado
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Há 1 hora
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* Remover bloco Estatísticas daqui */}
        </Grid>
        {/* Estatísticas com largura máxima */}
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, width: '100%', maxWidth: 900, mx: 'auto', mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                Estatísticas
              </Typography>
              <Box sx={{ width: '100%', overflowX: { xs: 'auto', md: 'visible' } }}>
                <ChartStats />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box mb={{ xs: 3, sm: 4 }} alignItems="center" textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
            Visão Geral da Plataforma
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            Aqui você pode ver as principais métricas e estatísticas da nossa plataforma de doações.
          </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Visão Geral da Plataforma
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.light', color: 'white', textAlign: 'center', mb: { xs: 2, md: 0 }, width: '100%', maxWidth: 340, mx: 'auto' }}>
              <CardContent>
                <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  150+
                </Typography>
                <Typography variant="body2">
                  Doadores Totais
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.light', color: 'white', textAlign: 'center', mb: { xs: 2, md: 0 }, width: '100%', maxWidth: 340, mx: 'auto' }}>
              <CardContent>
                <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  Kz 950.420
                </Typography>
                <Typography variant="body2">
                  Total Arrecadado
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'secondary.light', color: 'white', textAlign: 'center', mb: { xs: 2, md: 0 }, width: '100%', maxWidth: 340, mx: 'auto' }}>
              <CardContent>
                <DashboardIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  89%
                </Typography>
                <Typography variant="body2">
                  Taxa de Sucesso
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.light', color: 'white', textAlign: 'center', width: '100%', maxWidth: 340, mx: 'auto' }}>
              <CardContent>
                <SupportIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  24/7
                </Typography>
                <Typography variant="body2">
                  Suporte
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </Box>
      </Container>
    </Layout>
  )
} 