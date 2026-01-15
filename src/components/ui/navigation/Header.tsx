'use client';

import React from 'react';
import { Box, Flex, IconButton, Text, HStack } from '@chakra-ui/react';
import { FiArrowLeft, FiHeart, FiShare2, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const MotionBox = motion(Box);

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showFavorites?: boolean;
  showShare?: boolean;
  showCart?: boolean;
  onBackClick?: () => void;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
  onCartClick?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({
  title,
  showBackButton = false,
  showFavorites = false,
  showShare = false,
  showCart = false,
  onBackClick,
  onFavoriteClick,
  onShareClick,
  onCartClick,
  rightElement,
}: HeaderProps) {
  const router = useRouter();
  const { getItemCount } = useCart();

  const itemCount = getItemCount();
  const displayCount = itemCount > 10 ? '10+' : itemCount.toString();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      router.push('/cart');
    }
  };

  return (
    <MotionBox
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      position="sticky"
      top={0}
      zIndex={100}
      bg="var(--white)"
      borderBottom="1px solid var(--gray-200)"
      px="var(--space-4)"
      py="var(--space-3)"
      boxShadow="var(--shadow-sm)"
    >
      <Flex align="center" justify="space-between" minH="44px">
        <HStack gap="var(--space-3)">
          {showBackButton && (
            <IconButton
              aria-label="Назад"
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              color="var(--primary)"
              _hover={{ bg: 'var(--gray-100)' }}
            >
              <FiArrowLeft />
            </IconButton>
          )}
          {title && (
            <Text
              fontSize="var(--font-lg)"
              fontWeight="var(--font-semibold)"
              color="var(--primary)"
            >
              {title}
            </Text>
          )}
        </HStack>

        <HStack gap="var(--space-2)">
          {showFavorites && (
            <IconButton
              aria-label="Избранное"
              variant="ghost"
              size="sm"
              onClick={onFavoriteClick}
              color="var(--gray-600)"
              _hover={{ bg: 'var(--gray-100)', color: 'var(--accent)' }}
            >
              <FiHeart />
            </IconButton>
          )}
          {showShare && (
            <IconButton
              aria-label="Поделиться"
              variant="ghost"
              size="sm"
              onClick={onShareClick}
              color="var(--gray-600)"
              _hover={{ bg: 'var(--gray-100)' }}
            >
              <FiShare2 />
            </IconButton>
          )}
          {showCart && (
            <Box position="relative">
              <IconButton
                aria-label="Корзина"
                variant="ghost"
                size="sm"
                onClick={handleCartClick}
                color="var(--gray-600)"
                _hover={{ bg: 'var(--gray-100)', color: 'var(--primary)' }}
              >
                <FiShoppingCart />
              </IconButton>
              <AnimatePresence>
                {itemCount > 0 && (
                  <MotionBox
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    bg="var(--primary)"
                    color="var(--white)"
                    borderRadius="var(--radius-full)"
                    minW="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="var(--font-xs)"
                    fontWeight="var(--font-bold)"
                    px="var(--space-1)"
                    boxShadow="0 2px 8px rgba(5, 56, 107, 0.3)"
                  >
                    {displayCount}
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>
          )}
          {rightElement}
        </HStack>
      </Flex>
    </MotionBox>
  );
}
