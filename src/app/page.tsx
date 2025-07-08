import { Layout } from '@/components/Layout'
import { DonorForm } from '@/components/DonorForm'
import ChartStats from '@/components/ChartStats'
import { Box, Typography, Grid, Paper, Container, Card } from '@mui/material'
import CarrosselDoacao from '@/components/carrosselDoacao';

export default function HomePage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Box textAlign="center" mb={{ xs: 4, sm: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Bem-vindo à Nossa Plataforma de Doações
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Apoie nossa causa e faça a diferença. Cada doação conta para criar mudanças positivas.
          </Typography>
        </Box>
        
      <Grid container spacing={{ xs: 2, sm: 4 }} mb={{ xs: 4, sm: 6 }}>
      <Card sx={{ width: '100%', borderRadius: 2, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
  {/* Formulário */}
  <Grid item xs={12} lg={6}>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Faça uma Doação
      </Typography>
      <DonorForm />
    </Paper>
  </Grid>

  {/* Carrossel lado a lado */}
  <Grid item xs={12} lg={6}>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Seja um Apoiador
      </Typography>
      <CarrosselDoacao />
    </Paper>
  </Grid>
</Card>
  {/* Estatísticas (linha de baixo em telas grandes) */}
  <Grid item xs={12}>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Estatísticas de Doações
      </Typography>
      <ChartStats />
    </Paper>
  </Grid>
</Grid>
        
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 6 }, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.3rem', sm: '2rem' } }}>
            Por que Doar?
          </Typography>
          <Grid 
  container 
  spacing={{ xs: 2, sm: 4 }} 
  mt={2} 
  justifyContent="center"  // Centraliza os items horizontalmente
  alignItems="center"      // Centraliza os items verticalmente
  direction="row"          // Garante que os grids fiquem em linha (row)
>
  {/* Grid 1 - Apoio Comunitário */}
  <Grid item xs={12} md={4}>
    <Box 
      p={{ xs: 1, sm: 2 }} 
      sx={{ 
        backgroundColor: '#FFEB3B', // Cor amarela
        borderRadius: 2,            // Bordas arredondadas
        boxShadow: 2,               // Sombra suave para destaque
        display: 'flex',            // Usando Flexbox para centralizar conteúdo
        flexDirection: 'column',    // Direção da coluna para centralizar textos
        alignItems: 'center',       // Alinha o conteúdo ao centro
        justifyContent: 'center',   // Alinha o conteúdo ao centro
        height: '100%',             // Garante que o box ocupe a altura total disponível
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
        backgroundColor: '#4CAF50', // Cor verde
        borderRadius: 2,            // Bordas arredondadas
        boxShadow: 2,               // Sombra suave para destaque
        display: 'flex',            // Usando Flexbox para centralizar conteúdo
        flexDirection: 'column',    // Direção da coluna para centralizar textos
        alignItems: 'center',       // Alinha o conteúdo ao centro
        justifyContent: 'center',   // Alinha o conteúdo ao centro
        height: '100%',             // Garante que o box ocupe a altura total disponível
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
        backgroundColor: '#81C784', // Cor verde clara
        borderRadius: 2,            // Bordas arredondadas
        boxShadow: 2,               // Sombra suave para destaque
        display: 'flex',            // Usando Flexbox para centralizar conteúdo
        flexDirection: 'column',    // Direção da coluna para centralizar textos
        alignItems: 'center',       // Alinha o conteúdo ao centro
        justifyContent: 'center',   // Alinha o conteúdo ao centro
        height: '100%',             // Garante que o box ocupe a altura total disponível
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
      </Container>
    </Layout>
  )
} 