'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Icon } from '@chakra-ui/react';
import { FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { DishImage } from '@/components/ui/cards/DishImage';
import { SizeSelector } from '@/components/ui/forms/SizeSelector';
import { AddonSelector } from '@/components/ui/forms/AddonSelector';
import { QuantitySelector } from '@/components/ui/forms/QuantitySelector';
import { useCart } from '@/contexts/CartContext';
import { dishes, dishAddons } from '@/utils/mockData';
import { DishSize, DishAddon } from '@/types';

const MotionBox = motion(Box);

export default function DishPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const dishId = params?.id as string;
  const restaurantId = searchParams?.get('restaurant');

  const dish = dishes.find(d => d.id === dishId);
  const availableAddons = dish ? (dishAddons as Record<string, DishAddon[]>)[dish.id] || [] : [];

  const [selectedSize, setSelectedSize] = useState<DishSize | undefined>(
    dish?.sizes && dish.sizes.length > 0 ? dish.sizes[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<DishAddon[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!dish) {
    return (
      <Layout>
        <Box p="var(--space-4)">
          <Header title="Блюдо не найдено" showBackButton />
        </Box>
      </Layout>
    );
  }

  const handleSizeSelect = (size: DishSize) => {
    setSelectedSize(size);
  };

  const handleAddonToggle = (addon: DishAddon) => {
    setSelectedAddons(prev =>
      prev.some(selected => selected.id === addon.id)
        ? prev.filter(selected => selected.id !== addon.id)
        : [...prev, addon]
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedSize?.price || dish.price;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return (basePrice + addonsPrice) * quantity;
  };

  const handleAddToCart = () => {
    addItem(dish, quantity, selectedSize, selectedAddons);

    // Анимация успеха
    // Можно добавить toast или redirect

    // Возврат к ресторану или корзине
    if (restaurantId) {
      router.push(`/restaurant/${restaurantId}`);
    } else {
      router.back();
    }
  };

  return (
    <Layout showBottomNav={false}>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Header showBackButton />

        {/* Dish Image */}
        <Box p="var(--space-4)">
          <DishImage name={dish.name} />
        </Box>

        {/* Dish Content */}
        <Box p="var(--space-4)" pb="120px">
          <VStack align="stretch" gap="var(--space-5)">
            {/* Основная информация */}
            <VStack align="stretch" gap="var(--space-3)">
              <HStack justify="space-between" align="flex-start">
                <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                  <Text
                    fontSize="var(--font-2xl)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                    lineHeight="1.2"
                  >
                    {dish.name}
                  </Text>
                  <Text
                    fontSize="var(--font-base)"
                    color="var(--gray-600)"
                    lineHeight="1.4"
                  >
                    {dish.description}
                  </Text>
                </VStack>

                <Text
                  fontSize="var(--font-2xl)"
                  fontWeight="var(--font-bold)"
                  color="var(--primary)"
                >
                  {calculateTotalPrice()}₽
                </Text>
              </HStack>

              {/* Ингредиенты */}
              <VStack align="stretch" gap="var(--space-2)">
                <Text
                  fontSize="var(--font-base)"
                  fontWeight="var(--font-semibold)"
                  color="var(--primary)"
                >
                  Состав:
                </Text>
                <Text
                  fontSize="var(--font-sm)"
                  color="var(--gray-600)"
                  lineHeight="1.4"
                >
                  {dish.ingredients.join(', ')}
                </Text>
              </VStack>

              {/* Бейджи */}
              <HStack gap="var(--space-2)">
                {dish.isPopular && (
                  <Box
                    px="var(--space-2)"
                    py="var(--space-1)"
                    bg="var(--accent)"
                    color="var(--white)"
                    borderRadius="var(--radius-full)"
                    fontSize="var(--font-xs)"
                    fontWeight="var(--font-medium)"
                  >
                    🔥 Популярное
                  </Box>
                )}
                {dish.isVegetarian && (
                  <Box
                    px="var(--space-2)"
                    py="var(--space-1)"
                    bg="var(--secondary)"
                    color="var(--white)"
                    borderRadius="var(--radius-full)"
                    fontSize="var(--font-xs)"
                    fontWeight="var(--font-medium)"
                  >
                    🌱 Вегетарианское
                  </Box>
                )}
                {dish.isSpicy && (
                  <Box
                    px="var(--space-2)"
                    py="var(--space-1)"
                    bg="var(--primary)"
                    color="var(--white)"
                    borderRadius="var(--radius-full)"
                    fontSize="var(--font-xs)"
                    fontWeight="var(--font-medium)"
                  >
                    <HStack gap="var(--space-1)" align="center">
                      <Icon as={FiZap} boxSize={3} color="var(--primary)" />
                      <Text>Острый</Text>
                    </HStack>
                  </Box>
                )}
              </HStack>
            </VStack>

            {/* Size Selector */}
            {dish.sizes && dish.sizes.length > 0 && (
              <SizeSelector
                sizes={dish.sizes}
                selectedSize={selectedSize}
                onSizeSelect={handleSizeSelect}
              />
            )}

            {/* Addon Selector */}
            {availableAddons.length > 0 && (
              <AddonSelector
                addons={availableAddons}
                selectedAddons={selectedAddons}
                onAddonToggle={handleAddonToggle}
              />
            )}

            {/* Quantity Selector */}
            <VStack align="stretch" gap="var(--space-3)">
              <Text
                fontSize="var(--font-lg)"
                fontWeight="var(--font-semibold)"
                color="var(--primary)"
              >
                Количество
              </Text>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </VStack>
          </VStack>
        </Box>

        {/* Fixed Add to Cart Button */}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg="var(--white)"
          borderTop="1px solid var(--gray-200)"
          p="var(--space-4)"
          boxShadow="var(--shadow-lg)"
        >
          <Button
            w="100%"
            size="lg"
            bg="var(--primary)"
            color="var(--white)"
            borderRadius="var(--radius-lg)"
            fontSize="var(--font-lg)"
            fontWeight="var(--font-bold)"
            py="var(--space-4)"
            _hover={{ bg: 'var(--secondary)' }}
            _active={{ bg: 'var(--secondary)' }}
            onClick={handleAddToCart}
          >
            Добавить в корзину • {calculateTotalPrice()}₽
          </Button>
        </Box>
      </MotionBox>
    </Layout>
  );
}
