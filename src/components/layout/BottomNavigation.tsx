'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHome, FiShoppingBag, FiUser, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const MotionBox = motion(Box);

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Главная', icon: FiHome, path: '/' },
    { id: 'cart', label: 'Корзина', icon: FiShoppingBag, path: '/cart' },
    { id: 'profile', label: user ? 'Профиль' : 'Вход', icon: user ? FiUser : FiLogIn, path: user ? '/profile' : '/login' },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="var(--white)"
      borderTop="1px solid var(--gray-200)"
      zIndex={1000}
      px="var(--space-3)"
      py="var(--space-2)"
      boxShadow="var(--shadow-lg)"
    >
      <Flex justify="space-around" align="center">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <MotionBox
              key={item.id}
              as="button"
              onClick={() => handleNavigate(item.path)}
              cursor="pointer"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p="var(--space-1)"
              borderRadius="var(--radius-md)"
              bg={isActive ? 'var(--primary)' : 'transparent'}
              color={isActive ? 'var(--white)' : 'var(--gray-600)'}
              minW="60px"
              minH="60px"
              whileTap={{ scale: 0.95 }}
              _hover={{
                bg: isActive ? 'var(--primary)' : 'var(--gray-100)',
              }}
            >
              <Icon as={item.icon} boxSize={6} mb="2px" />
              <Text fontSize="var(--font-xs)" fontWeight="medium">
                {item.label}
              </Text>
            </MotionBox>
          );
        })}
      </Flex>
    </Box>
  );
}
