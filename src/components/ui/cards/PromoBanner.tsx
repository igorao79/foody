'use client';

import React from 'react';
import { Box, Text, VStack, AspectRatio, Icon } from '@chakra-ui/react';
import { FiGift } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { PromoBanner as PromoBannerType } from '@/types';

const MotionBox = motion(Box);

interface PromoBannerProps {
  banner: PromoBannerType;
  onClick?: () => void;
}

export function PromoBanner({ banner, onClick }: PromoBannerProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      as="button"
      onClick={onClick}
      cursor="pointer"
      mx="var(--space-4)"
      borderRadius="var(--radius-xl)"
      overflow="hidden"
      boxShadow="var(--shadow-md)"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      _hover={{
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <AspectRatio ratio={16 / 9}>
        <Box
          bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)"
          position="relative"
        >
          {/* Плейсхолдер для изображения */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="var(--gray-200)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={0.1}
          >
            <Icon as={FiGift} boxSize={12} />
          </Box>

          {/* Контент баннера */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            p="var(--space-4)"
            display="flex"
            alignItems="center"
          >
            <VStack align="flex-start" gap="var(--space-1)" color="var(--white)">
              <Text
                fontSize="var(--font-xl)"
                fontWeight="var(--font-bold)"
                lineHeight="1.2"
              >
                {banner.title}
              </Text>
            </VStack>
          </Box>
        </Box>
      </AspectRatio>
    </MotionBox>
  );
}
