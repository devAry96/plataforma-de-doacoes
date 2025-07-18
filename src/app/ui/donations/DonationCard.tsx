import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

export interface DonationCardProps {
  amount: number;
  message?: string;
  anonymous?: boolean;
  createdAt: string;
}

export default function DonationCard({ amount, message, anonymous, createdAt }: DonationCardProps) {
  return (
    <Card sx={{ minWidth: 250, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="primary">
          {anonymous ? 'Anonymous' : 'Donor'} donated Kz {amount.toFixed(2)}
        </Typography>
        {message && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            "{message}"
          </Typography>
        )}
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}