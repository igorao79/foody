'use client';

import React from 'react';
import { Box, Flex, IconButton, Text, HStack } from '@chakra-ui/react';
import { FiArrowLeft, FiHeart, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MotionBox = motion(Box);

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showFavorites?: boolean;
  showShare?: boolean;
  onBackClick?: () => void;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({
  title,
  showBackButton = false,
  showFavorites = false,
  showShare = false,
  onBackClick,
  onFavoriteClick,
  onShareClick,
  rightElement,
}: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
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
          {rightElement}
        </HStack>
      </Flex>
    </MotionBox>
  );
}
