'use client';

import { useParams, useRouter } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { RestaurantHeader } from '@/components/restaurant/RestaurantHeader';
import { MenuTabs } from '@/components/restaurant/MenuTabs';
import { FloatingCartButton } from '@/components/cart/FloatingCartButton';
import { useCart } from '@/contexts/CartContext';
import { restaurants, dishes } from '@/utils/mockData';

const MotionBox = motion(Box);

export function MobileRestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const { cart, getItemCount } = useCart();

  const restaurantId = params?.id as string;
  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <Box p="var(--space-4)">
        <Header title="Ресторан не найден" showBackButton />
      </Box>
    );
  }

  const handleDishClick = (dish: { id: string }) => {
    router.push(`/dish/${dish.id}?restaurant=${restaurantId}`);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

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
      />

      {/* Restaurant Header */}
      <RestaurantHeader restaurant={restaurant} />

      {/* Menu Tabs */}
      <MenuTabs
        dishes={dishes}
        onDishClick={handleDishClick}
      />

      {/* Floating Cart Button */}
      <FloatingCartButton
        itemCount={getItemCount()}
        totalPrice={cart.total}
        onClick={handleCartClick}
      />
    </MotionBox>
  );
}
