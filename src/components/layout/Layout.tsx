'use client';

import { Box } from '@chakra-ui/react';
import { BottomNavigation } from './BottomNavigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  bg?: string;
}

export function Layout({ children, showBottomNav = true, bg = 'var(--background)' }: LayoutProps) {
  return (
    <Box
      minH="100vh"
      bg={bg}
      pb={showBottomNav ? '80px' : 0} // Padding для bottom navigation
    >
      {children}
      {showBottomNav && <BottomNavigation />}
    </Box>
  );
}
