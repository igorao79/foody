'use client';

import { Box, Text, VStack, HStack, Badge, AspectRatio, Icon } from '@chakra-ui/react';
import { FiCoffee } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Restaurant } from '@/types';
import { Rating } from './Rating';

const MotionBox = motion(Box);

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      as="button"
      onClick={onClick}
      mx="var(--space-4)"
      mb="var(--space-4)"
      borderRadius="var(--radius-lg)"
      overflow="hidden"
      bg="var(--white)"
      boxShadow="var(--shadow-sm)"
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      whileTap={{ scale: 0.98 }}
    >
      <AspectRatio ratio={16 / 10}>
        <Box
          bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 50%, var(--light) 100%)"
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
            <Icon as={FiCoffee} boxSize={12} />
          </Box>

          {/* Статус открытия */}
          <Box position="absolute" top="var(--space-3)" right="var(--space-3)">
            <Badge
              colorScheme={restaurant.isOpen ? 'green' : 'red'}
              variant="solid"
              borderRadius="var(--radius-full)"
              px="var(--space-3)"
              py="var(--space-1)"
              fontSize="var(--font-xs)"
            >
              {restaurant.isOpen ? 'Открыто' : 'Закрыто'}
            </Badge>
          </Box>
        </Box>
      </AspectRatio>

      <VStack align="stretch" p="var(--space-4)" gap="var(--space-2)">
        <HStack justify="space-between" align="flex-start">
          <VStack align="flex-start" gap="var(--space-1)" flex={1}>
            <Text
              fontSize="var(--font-lg)"
              fontWeight="var(--font-semibold)"
              color="var(--primary)"
              lineHeight="1.2"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {restaurant.name}
            </Text>
            <Text
              fontSize="var(--font-sm)"
              color="var(--gray-600)"
              lineHeight="1.3"
              overflow="hidden"
              display="-webkit-box"
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
              }}
            >
              {restaurant.cuisines.join(' • ')}
            </Text>
          </VStack>
          <Rating value={restaurant.rating} size="sm" />
        </HStack>

        <HStack justify="space-between" align="center">
          <HStack gap="var(--space-3)">
            <Text fontSize="var(--font-sm)" color="var(--gray-600)">
              {restaurant.deliveryTime}
            </Text>
            <Text fontSize="var(--font-sm)" color="var(--gray-600)">
              •
            </Text>
            <Text fontSize="var(--font-sm)" color="var(--gray-600)">
              {restaurant.deliveryFee}₽ доставка
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </MotionBox>
  );
}
