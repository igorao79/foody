'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHome, FiSearch, FiShoppingBag, FiUser, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: string | number }>;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Главная', icon: FiHome, path: '/' },
  { id: 'search', label: 'Поиск', icon: FiSearch, path: '/search' },
  { id: 'orders', label: 'Заказы', icon: FiShoppingBag, path: '/orders' },
  { id: 'favorites', label: 'Избранное', icon: FiHeart, path: '/favorites' },
  { id: 'profile', label: 'Профиль', icon: FiUser, path: '/profile' },
];

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

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
