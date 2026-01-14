'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { BottomNavigation } from './BottomNavigation';
import { Footer } from './Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  showFooter?: boolean;
  bg?: string;
}

export function Layout({
  children,
  showBottomNav = true,
  showFooter = false,
  bg = 'var(--background)'
}: LayoutProps) {
  return (
    <Box minH="100vh" bg={bg} display="flex" flexDirection="column">
      <Box
        flex={1}
        w="100%"
        pb={showBottomNav ? '80px' : 0} // Padding для bottom navigation
      >
        {children}
      </Box>
      {showFooter && <Footer />}
      {showBottomNav && <BottomNavigation />}
    </Box>
  );
}
