// PlanGuard.tsx
import { useSession } from 'next-auth/react';
import { Box, Alert, CircularProgress } from '@mui/material';

export default function PlanGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status === 'loading') return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (session?.user?.role !== 'pro') {
    return <Alert severity="warning">This page is exclusive to Pro plan users. <br /> <b>Upgrade your plan to access.</b></Alert>;
  }
  return <>{children}</>;
}