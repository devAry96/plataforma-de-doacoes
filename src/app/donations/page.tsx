import { Layout } from '@/components/Layout'
import { DonationCard } from '@/components/DonationCard'
import { Box, Typography, Paper, Container } from '@mui/material'

export default function DonationsPage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 0.5, sm: 1 }, px: { xs: 1, sm: 2, md: 4 } }}>
        <Box mb={0}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, wordBreak: 'break-word' }}>
            Todas as Doações
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>
            Visualize todas as doações feitas à nossa plataforma
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 2, width: '100%', maxWidth: { xs: '100%', sm: 600, md: 900 }, mx: 'auto', textAlign: 'center', mb: 0 }}>
          <Box sx={{ p: { xs: 0.5, sm: 1 }, borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Doações Recentes
            </Typography>
          </Box>
          <Box sx={{ p: { xs: 0.5, sm: 1 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <DonationCard />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  )
} 