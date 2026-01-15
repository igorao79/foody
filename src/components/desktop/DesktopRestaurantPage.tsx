'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Box, VStack, HStack, Text, Container, Grid, GridItem, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MenuTabs } from '@/components/restaurant/MenuTabs';
import { DesktopHeader } from './DesktopHeader';
import { Rating } from '@/components/ui/feedback/Rating';
import { ReviewsModal } from '@/components/ui/modals/ReviewsModal';
import { SupportChatWidget } from '@/components/ui/SupportChatWidget';
import { restaurants, dishes } from '@/utils/mockData';

const MotionBox = motion(Box);

export function DesktopRestaurantPage() {
  const params = useParams();
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  const restaurantId = params?.id as string;
  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <Container maxW="1400px" py="var(--space-6)">
        <Text fontSize="var(--font-lg)" color="var(--gray-600)">
          Ресторан не найден
        </Text>
      </Container>
    );
  }

  // Фильтруем блюда по restaurantId
  const restaurantDishes = dishes.filter(dish => dish.restaurantId === restaurantId);

  const handleRatingClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsReviewsModalOpen(true);
  };

  // handleDishClick больше не используется, модальное окно открывается в MenuTabs

  return (
    <>
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        restaurantName={restaurant.name}
      />

      <DesktopHeader showOrderType={false} />

      <Container maxW="1400px" py="var(--space-6)" pt="120px">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <Grid templateColumns="300px 1fr" gap="var(--space-6)">
          {/* Левая колонка - Информация о ресторане */}
          <GridItem>
            <Box
              position="sticky"
              top="var(--space-6)"
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-5)"
              boxShadow="var(--shadow-md)"
            >
              <VStack align="stretch" gap="var(--space-4)">
                {/* Фото ресторана */}
                <Box
                  w="100%"
                  h="200px"
                  borderRadius="var(--radius-lg)"
                  position="relative"
                  overflow="hidden"
                >
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1200px) 300px, 300px"
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

                {/* Информация о ресторане */}
                <VStack align="flex-start" gap="var(--space-3)">
                  <Text
                    fontSize="var(--font-xl)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                  >
                    {restaurant.name}
                  </Text>

                  <Text
                    fontSize="var(--font-sm)"
                    color="var(--gray-600)"
                  >
                    {restaurant.cuisines.join(' • ')}
                  </Text>

                  <HStack gap="var(--space-4)">
                    <HStack gap="var(--space-1)">
                      <Rating
                        value={restaurant.rating}
                        size="sm"
                        variant="outline"
                        clickable
                        onClick={handleRatingClick}
                      />
                    </HStack>
                    <HStack gap="var(--space-1)">
                      <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)" color="var(--primary)">
                        🕐 {restaurant.deliveryTime}
                      </Text>
                    </HStack>
                    <HStack gap="var(--space-1)">
                      <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)" color="var(--primary)">
                        💰 {restaurant.deliveryFee}₽ доставка
                      </Text>
                    </HStack>
                  </HStack>

                  {restaurant.description && (
                    <Text
                      fontSize="var(--font-sm)"
                      color="var(--gray-600)"
                      lineHeight="1.4"
                    >
                      {restaurant.description}
                    </Text>
                  )}
                </VStack>
              </VStack>
            </Box>
          </GridItem>

          {/* Правая колонка - Меню */}
          <GridItem>
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              boxShadow="var(--shadow-md)"
              overflow="hidden"
            >
              <MenuTabs
                dishes={restaurantDishes}
              />
            </Box>
          </GridItem>
        </Grid>
        </MotionBox>
      </Container>

      {/* Виджет поддержки */}
      <SupportChatWidget />
    </>
  );
}
