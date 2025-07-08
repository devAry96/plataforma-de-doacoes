// Plan-based route guard
'use client';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Typography } from '@mui/material';

type Props = {
  children: ReactNode;
  allowedPlan?: 'FREE' | 'PRO';
};

export function PlanGuard({ children, allowedPlan = 'PRO' }: Props) {
  const { data: session } = useSession();
  const plan = session?.user?.plan || 'FREE';

  if (allowedPlan === 'PRO' && plan !== 'PRO') {
    return <Typography>You need to upgrade to PRO to access this feature.</Typography>;
  }

  return <>{children}</>;
}
