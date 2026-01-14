'use client';

import { Box, Text, VStack, HStack, AspectRatio, Badge, Icon } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Restaurant } from '@/types';
import { Rating } from '@/components/ui/feedback/Rating';

const MotionBox = motion(Box);

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >
      {/* Фото ресторана */}
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
            <Icon as={FiHome} boxSize={12} />
          </Box>

          {/* Градиент для лучшей читаемости текста */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="60%"
            bg="linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
          />
        </Box>
      </AspectRatio>

      {/* Информация о ресторане */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="var(--space-4)"
        color="var(--white)"
      >
        <VStack align="flex-start" gap="var(--space-2)">
          <HStack justify="space-between" align="flex-start" w="100%">
            <VStack align="flex-start" gap="var(--space-1)" flex={1}>
              <Text
                fontSize="var(--font-2xl)"
                fontWeight="var(--font-bold)"
                lineHeight="1.2"
                textShadow="0 2px 4px rgba(0,0,0,0.5)"
              >
                {restaurant.name}
              </Text>
              <Text
                fontSize="var(--font-sm)"
                opacity={0.9}
                textShadow="0 1px 2px rgba(0,0,0,0.5)"
              >
                {restaurant.cuisines.join(' • ')}
              </Text>
            </VStack>
            <Rating value={restaurant.rating} size="md" />
          </HStack>

          <HStack gap="var(--space-4)">
            <HStack gap="var(--space-1)">
              <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                {restaurant.deliveryTime}
              </Text>
            </HStack>
            <HStack gap="var(--space-1)">
              <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                {restaurant.deliveryFee}₽ доставка
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>

      {/* Статус открытия */}
      <Box position="absolute" top="var(--space-4)" right="var(--space-4)">
        <Badge
          colorScheme={restaurant.isOpen ? 'green' : 'red'}
          variant="solid"
          borderRadius="var(--radius-full)"
          px="var(--space-3)"
          py="var(--space-1)"
          fontSize="var(--font-xs)"
          fontWeight="var(--font-medium)"
        >
          {restaurant.isOpen ? 'Открыто' : 'Закрыто'}
        </Badge>
      </Box>
    </MotionBox>
  );
}
