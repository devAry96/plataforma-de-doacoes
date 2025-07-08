'use client'

import { Layout } from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  Paper, 
  Container,
  Divider
} from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Aqui você normalmente atualizaria o perfil do usuário
    console.log('Perfil atualizado:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!session) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Por favor, faça login
            </Typography>
            <Typography color="text.secondary">
              Você precisa estar logado para visualizar seu perfil.
            </Typography>
          </Box>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Perfil
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Gerencie as configurações da sua conta
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={3} mb={4}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="medium">
                {session.user?.name}
              </Typography>
              <Typography color="text.secondary">
                {session.user?.email}
              </Typography>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            <Box display="flex" gap={2}>
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Salvar Alterações
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                    size="large"
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                  size="large"
                >
                  Editar Perfil
                </Button>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Informações da Conta
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Tipo de Conta:</Typography>
              <Typography fontWeight="medium">Gratuita</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Membro Desde:</Typography>
              <Typography fontWeight="medium">
                {session.user?.email ? 'Recentemente' : 'Desconhecido'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">Status:</Typography>
              <Typography color="success.main" fontWeight="medium">
                Ativo
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  )
} 