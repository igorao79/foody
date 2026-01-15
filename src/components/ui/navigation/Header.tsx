'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, IconButton, Text, HStack, Input, VStack } from '@chakra-ui/react';
import { FiArrowLeft, FiShoppingCart, FiSearch, FiPlus, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { restaurants, dishes } from '@/utils/mockData';
import { Restaurant, Dish } from '@/types';
import { DishPreviewModal } from '@/components/ui/modals/DishPreviewModal';

const MotionBox = motion(Box);

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  onBackClick?: () => void;
  onCartClick?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({
  title,
  showBackButton = false,
  showCart = false,
  showSearch = false,
  onBackClick,
  onCartClick,
  rightElement,
}: HeaderProps) {
  const router = useRouter();
  const { getItemCount, addItem, removeItemByDishId, getItemQuantity } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{type: 'restaurant' | 'dish', restaurant: Restaurant, dish?: Dish}>>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();

    // Поиск по ресторанам
    const matchingRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(lowerQuery) ||
      restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(lowerQuery)) ||
      (restaurant.tags && restaurant.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );

    // Поиск по блюдам
    const matchingDishes = dishes.filter(dish =>
      dish.name.toLowerCase().includes(lowerQuery) ||
      dish.description.toLowerCase().includes(lowerQuery) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerQuery)) ||
      dish.category.toLowerCase().includes(lowerQuery)
    );

    // Формируем результаты поиска
    const allResults: Array<{type: 'restaurant' | 'dish', restaurant: Restaurant, dish?: Dish}> = [
      ...matchingRestaurants.map(restaurant => ({ type: 'restaurant' as const, restaurant })),
      ...matchingDishes.map(dish => {
        const restaurant = restaurants.find(r => r.id === dish.restaurantId)!;
        return { type: 'dish' as const, restaurant, dish };
      })
    ];

    setSearchResults(allResults.slice(0, 8)); // Ограничиваем до 8 результатов
    setShowSearchDropdown(allResults.length > 0);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDishModalOpen(true);
    setShowSearchDropdown(false);
  };

  // Закрытие dropdown при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    if (showSearchDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchDropdown]);

  const itemCount = getItemCount();
  const displayCount = itemCount > 10 ? '10+' : itemCount.toString();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      router.push('/cart');
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
              cursor="pointer"
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
          {showCart && (
            <Box position="relative">
              <IconButton
                aria-label="Корзина"
                variant="ghost"
                size="sm"
                onClick={handleCartClick}
                cursor="pointer"
                color="var(--gray-600)"
                _hover={{ bg: 'var(--gray-100)', color: 'var(--primary)' }}
              >
                <FiShoppingCart />
              </IconButton>
              <AnimatePresence>
                {itemCount > 0 && (
                  <MotionBox
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    bg="var(--primary)"
                    color="var(--white)"
                    borderRadius="var(--radius-full)"
                    minW="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="var(--font-xs)"
                    fontWeight="var(--font-bold)"
                    px="var(--space-1)"
                    boxShadow="0 2px 8px rgba(5, 56, 107, 0.3)"
                  >
                    {displayCount}
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>
          )}
          {rightElement}
        </HStack>

        <DishPreviewModal
          isOpen={isDishModalOpen}
          onClose={() => {
            setIsDishModalOpen(false);
            setSelectedDish(null);
          }}
          dish={selectedDish}
        />

      </Flex>
    </MotionBox>
  );
}
