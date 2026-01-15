'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CategoryScroll } from '@/components/ui/navigation/CategoryScroll';
import { PromoBanner } from '@/components/ui/cards/PromoBanner';
import { RestaurantCard } from '@/components/ui/cards/RestaurantCard';
import { PersonalOffersMarquee } from '@/components/ui/carousel/PersonalOffersMarquee';
import { categories, promoBanners, restaurants, dishes } from '@/utils/mockData';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useCart } from '@/contexts/CartContext';

const MotionBox = motion(Box);

export function MobileHomePage({ onSearch }: { onSearch?: (query: string) => void }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  const handlePromoClick = (promoId: string) => {
    console.log('Promo clicked:', promoId);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? undefined : categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();

    // Поиск по блюдам только из открытых ресторанов
    const matchingDishes = dishes.filter(dish => {
      const restaurant = restaurants.find(r => r.id === dish.restaurantId);
      return restaurant?.isOpen && (
        dish.name.toLowerCase().includes(lowerQuery) ||
        dish.description.toLowerCase().includes(lowerQuery) ||
        dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerQuery)) ||
        dish.category.toLowerCase().includes(lowerQuery)
      );
    });

    // Группируем результаты по ресторанам
    const dishResults = matchingDishes.map(dish => {
      const restaurant = restaurants.find(r => r.id === dish.restaurantId);
      return {
        type: 'dish',
        dish,
        restaurant
      };
    });

    // Поиск только по открытым ресторанам
    const matchingRestaurants = restaurants.filter(restaurant =>
      restaurant.isOpen && (
        restaurant.name.toLowerCase().includes(lowerQuery) ||
        restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(lowerQuery)) ||
        restaurant.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        restaurant.description?.toLowerCase().includes(lowerQuery)
      )
    );

    const restaurantResults = matchingRestaurants.map(restaurant => ({
      type: 'restaurant',
      restaurant
    }));

    setSearchResults([...dishResults, ...restaurantResults]);
  };

  // Фильтрация ресторанов по выбранной категории
  const filteredRestaurants = selectedCategory
    ? restaurants.filter(restaurant => {
        const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name;
        return selectedCategoryName && restaurant.cuisines.includes(selectedCategoryName);
      })
    : restaurants;

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      pb="var(--space-16)" // Отступ для bottom navigation
    >
      {/* Персональные предложения */}
      <PersonalOffersMarquee />

      {/* Категории */}
      <Box>
        <HStack justify="space-between" align="center" px="var(--space-4)" mb="var(--space-2)">
          <Text
            fontSize="var(--font-lg)"
            fontWeight="var(--font-semibold)"
            color="var(--primary)"
          >
            Категории кухни
          </Text>
          <Text
            fontSize="var(--font-sm)"
            color="var(--accent)"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            Все категории
          </Text>
        </HStack>
        <CategoryScroll
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </Box>

      {/* Промо-баннеры */}
      <Box py="var(--space-3)">
        <Text
          fontSize="var(--font-lg)"
          fontWeight="var(--font-semibold)"
          color="var(--primary)"
          px="var(--space-4)"
          mb="var(--space-3)"
        >
          Специальные предложения
        </Text>
        <VStack gap="var(--space-3)">
          {promoBanners.map((banner) => (
            <PromoBanner
              key={banner.id}
              banner={banner}
              onClick={() => handlePromoClick(banner.id)}
            />
          ))}
        </VStack>
      </Box>

      {/* Рекомендуемые рестораны */}
      <Box py="var(--space-3)">
        <HStack justify="space-between" align="center" px="var(--space-4)" mb="var(--space-3)">
          <VStack align="flex-start" gap="var(--space-1)">
            <Text
              fontSize="var(--font-lg)"
              fontWeight="var(--font-semibold)"
              color="var(--primary)"
            >
              {selectedCategory
                ? `${categories.find(cat => cat.id === selectedCategory)?.name} рестораны`
                : 'Рекомендуемые рестораны'
              }
            </Text>
            {selectedCategory && (
              <Text
                fontSize="var(--font-sm)"
                color="var(--gray-600)"
                cursor="pointer"
                onClick={() => setSelectedCategory(undefined)}
                _hover={{ color: 'var(--primary)' }}
              >
                Сбросить фильтр ×
              </Text>
            )}
          </VStack>
        </HStack>

        <VStack gap={0}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant.id)}
              />
            ))
          ) : (
            <Box
              textAlign="center"
              py="var(--space-8)"
              px="var(--space-4)"
            >
              <Text
                fontSize="var(--font-base)"
                color="var(--gray-600)"
                mb="var(--space-4)"
              >
                Рестораны в этой категории не найдены
              </Text>
              <Text
                fontSize="var(--font-sm)"
                color="var(--accent)"
                cursor="pointer"
                onClick={() => setSelectedCategory(undefined)}
                _hover={{ textDecoration: 'underline' }}
              >
                Показать все рестораны
              </Text>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Кнопка прокрутки вверх */}
      <ScrollToTopButton />
    </MotionBox>
  );
}
