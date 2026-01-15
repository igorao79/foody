'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Text, VStack, HStack, Badge, AspectRatio, Icon } from '@chakra-ui/react';
import { FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Restaurant } from '@/types';
import { Rating } from '../feedback/Rating';
import { ReviewsModal } from '../modals/ReviewsModal';
import { useOrder } from '@/contexts/OrderContext';
import { useIsDesktop } from '@/hooks/useBreakpoint';

const MotionBox = motion(Box);

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const { orderType } = useOrder();
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const handleRatingClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Предотвращаем всплытие события к карточке
    setIsReviewsModalOpen(true);
  };

  // Форматируем расстояние
  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${distance}м`;
    }
    return `${(distance / 1000).toFixed(1)}км`;
  };

  return (
    <>
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        restaurantName={restaurant.name}
      />
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      as={restaurant.isOpen ? "button" : "div"}
      onClick={restaurant.isOpen ? onClick : undefined}
      cursor={restaurant.isOpen ? "pointer" : "not-allowed"}
      mx="var(--space-4)"
      mb="var(--space-4)"
      borderRadius="var(--radius-lg)"
      overflow="hidden"
      bg={restaurant.isOpen ? "var(--white)" : "var(--gray-50)"}
      boxShadow="var(--shadow-sm)"
      opacity={restaurant.isOpen ? 1 : 0.6}
      zIndex={10}
      whileHover={restaurant.isOpen ? { y: -4, boxShadow: 'var(--shadow-lg)' } : {}}
      whileTap={restaurant.isOpen ? { scale: 0.98 } : {}}
    >
      <AspectRatio ratio={16 / 10}>
        <Box position="relative" opacity={restaurant.isOpen ? 1 : 0.6}>
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

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
          <Rating
            value={restaurant.rating}
            size="sm"
            variant="outline"
            clickable
            onClick={handleRatingClick}
          />
        </HStack>

        <HStack justify="space-between" align="center">
          <HStack gap="var(--space-3)">
            <HStack gap="var(--space-1)" align="center">
              <Icon as={FiClock} boxSize={3} color="var(--gray-600)" />
              <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                {restaurant.deliveryTime}
              </Text>
            </HStack>
            <Text fontSize="var(--font-sm)" color="var(--gray-600)">
              •
            </Text>
            <Box minH="20px" minW={isDesktop ? "200px" : "180px"}>
              {orderType === 'pickup' && restaurant.distance ? (
                <HStack gap="var(--space-1)" align="center" justify="flex-start">
                  <Icon as={FiMapPin} boxSize={3} color="var(--gray-600)" />
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)" whiteSpace="nowrap">
                    {formatDistance(restaurant.distance)}
                  </Text>
                </HStack>
              ) : (
                <HStack gap="var(--space-1)" align="center" justify="flex-start">
                  <Icon as={FiDollarSign} boxSize={3} color="var(--gray-600)" />
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)" whiteSpace="nowrap">
                    {restaurant.deliveryFee}₽ доставка
                  </Text>
                </HStack>
              )}
            </Box>
          </HStack>
        </HStack>
      </VStack>
    </MotionBox>
    </>
  );
}
