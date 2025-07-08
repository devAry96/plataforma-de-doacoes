import { Layout } from '@/components/Layout'
import { DonationCard } from '@/components/DonationCard'
import { Box, Typography, Paper, Container } from '@mui/material'

export default function DonationsPage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Todas as Doações
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Visualize todas as doações feitas à nossa plataforma
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h5">
              Doações Recentes
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <DonationCard />
          </Box>
        </Paper>
      </Container>
    </Layout>
  )
} 