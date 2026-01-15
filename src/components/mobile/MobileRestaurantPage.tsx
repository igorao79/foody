'use client';

import { useParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/navigation/Header';
import { RestaurantHeader } from '@/components/restaurant/RestaurantHeader';
import { MenuTabs } from '@/components/restaurant/MenuTabs';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { restaurants, dishes } from '@/utils/mockData';

const MotionBox = motion(Box);

export function MobileRestaurantPage() {
  const params = useParams();

  const restaurantId = params?.id as string;
  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <Box p="var(--space-4)">
        <Header title="Ресторан не найден" showBackButton />
      </Box>
    );
  }

  // Фильтруем блюда по restaurantId
  const restaurantDishes = dishes.filter(dish => dish.restaurantId === restaurantId);

  // handleDishClick больше не используется, модальное окно открывается в MenuTabs

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <Header
        showBackButton
        title={restaurant.name}
        showFavorites
        showShare
        showCart
      />

      {/* Restaurant Header */}
      <RestaurantHeader restaurant={restaurant} />

      {/* Menu Tabs */}
      <MenuTabs
        dishes={restaurantDishes}
      />

      {/* Кнопка прокрутки вверх */}
      <ScrollToTopButton />
    </MotionBox>
  );
}
