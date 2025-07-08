'use client'

import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DonationStats {
  totalDonations: number;
  totalAmount: number;
  recentDonations: number;
  monthlyData: Array<{ month: string; amount: number }>;
  anonymousVsIdentified: Array<{ name: string; value: number }>;
}

const COLORS = ['#0088FE', '#00C49F'];

export default function ChartStats() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/donations/stats');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar estatísticas');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
        setError('Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!mounted) {
    // Placeholder igual no server e client para evitar erro de hydration
    return <div style={{ minHeight: 300 }} />;
  }

  if (loading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Carregando estatísticas...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert severity="error">
            {error}
          </Alert>
        </Grid>
      </Grid>
    );
  }

  if (!stats) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert severity="info">
            Nenhuma estatística disponível
          </Alert>
        </Grid>
      </Grid>
    );
  }

  // Dados para os gráficos
  const monthlyData = stats.monthlyData || [
    { month: 'Jan', amount: 0 },
    { month: 'Fev', amount: 0 },
    { month: 'Mar', amount: 0 },
    { month: 'Abr', amount: 0 },
    { month: 'Mai', amount: 0 },
    { month: 'Jun', amount: 0 },
  ];

  const anonymousData = stats.anonymousVsIdentified || [
    { name: 'Anônimas', value: 0 },
    { name: 'Identificadas', value: 0 },
  ];

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={4} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Doações por Mês</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#1976d2" 
                strokeWidth={3}
                dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={4} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Anônimas vs Identificadas</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={anonymousData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {anonymousData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [value, 'Doações']}
              />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Resumo Geral</Typography>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" color="primary" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
                {stats.totalDonations}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Doações
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" color="success.main" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
                R$ {stats.totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Valor Total Arrecadado
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" color="info.main" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
                {stats.recentDonations}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Doações nos Últimos 7 Dias
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}