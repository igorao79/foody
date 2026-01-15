'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, VStack, HStack, Grid, GridItem, Container, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import { RestaurantCard } from '@/components/ui/cards/RestaurantCard';
import { PromoCarousel } from '@/components/ui/carousel/PromoCarousel';
import { DesktopHeader } from './DesktopHeader';
import { Footer } from '@/components/layout/Footer';
import { SupportChatWidget } from '@/components/ui/SupportChatWidget';
import { SupportChatModal } from '@/components/ui/modals/SupportChatModal';
import { DishPreviewModal } from '@/components/ui/modals/DishPreviewModal';
import { categories, restaurants, dishes } from '@/utils/mockData';
import { Restaurant, Dish } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';

const MotionBox = motion(Box);

export function DesktopHomePage() {
  const router = useRouter();
  const { addItem, getItemQuantity, removeItemByDishId } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<Array<{type: 'restaurant' | 'dish', restaurant: Restaurant, dish?: Dish}>>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };


  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
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
    const dishResults = matchingDishes
      .map(dish => {
        const restaurant = restaurants.find(r => r.id === dish.restaurantId);
        return restaurant ? {
          type: 'dish' as const,
          dish,
          restaurant
        } : null;
      })
      .filter(Boolean) as Array<{type: 'dish', restaurant: Restaurant, dish: Dish}>;

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
      type: 'restaurant' as const,
      restaurant
    }));

    const allResults = [...dishResults, ...restaurantResults];
    setSearchResults(allResults);
    setShowSearchDropdown(allResults.length > 0);
  };

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDishModalOpen(true);
  };

  const handleRestaurantClickFromSearch = (restaurantId: string) => {
    setShowSearchDropdown(false);
    setSearchResults([]);
    handleRestaurantClick(restaurantId);
  };

  // Фильтрация ресторанов по выбранной категории
  const filteredRestaurants = selectedCategory === 'all'
    ? restaurants
    : restaurants.filter(restaurant => {
        const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name;
        return selectedCategoryName && restaurant.cuisines.includes(selectedCategoryName);
      });

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      minH="100vh"
      bg="var(--background)"
    >
      <DesktopHeader onSearch={handleSearch} />

      <Container maxW="1400px" py="var(--space-6)" pt="120px">
        {/* Основной контент */}
        <Grid templateColumns="280px 1fr" gap="var(--space-6)">
          {/* Левая колонка - Категории и акции (фиксированные) */}
          <GridItem>
            <Box
              position="sticky"
              top="140px"
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              boxShadow="var(--shadow-md)"
            >
              {/* Категории кухни */}
              <Box pt="var(--space-4)" pr="var(--space-4)" pb="var(--space-2)" pl="var(--space-4)" borderBottom="1px solid var(--gray-100)">
                <Text
                  fontSize="var(--font-lg)"
                  fontWeight="var(--font-semibold)"
                  color="var(--primary)"
                  mb="var(--space-3)"
                >
                  Категории кухни
                </Text>
                <VStack align="stretch" gap="var(--space-2)">
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category.id;

                    return (
                      <MotionBox
                        key={category.id}
                        as="button"
                        onClick={() => handleCategorySelect(category.id)}
                        p="var(--space-3)"
                        borderRadius="var(--radius-md)"
                        bg={isSelected ? 'var(--primary)' : 'var(--gray-50)'}
                        color={isSelected ? 'var(--white)' : 'var(--primary)'}
                        textAlign="left"
                        cursor="pointer"
                        border="2px solid"
                        borderColor={isSelected ? 'var(--primary)' : 'transparent'}
                        initial={{ scale: 1 }}
                        animate={{ scale: isSelected ? 1.05 : 1 }}
                        _hover={{
                          bg: isSelected ? 'var(--primary)' : 'var(--gray-100)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--gray-300)',
                          transform: 'translateX(3px)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                        _active={{
                          transform: 'translateX(1px) scale(0.98)',
                        }}
                      >
                        <HStack gap="var(--space-3)">
                          {category.id === 'all' ? (
                            <Image
                              src="/images/logo.webp"
                              alt="Logo"
                              w="20px"
                              h="20px"
                              objectFit="contain"
                              borderRadius="var(--radius-sm)"
                            />
                          ) : typeof category.icon === 'function' ? (
                            <category.icon size={20} color={isSelected ? 'var(--white)' : category.color} />
                          ) : (
                            <Icon as={category.icon} boxSize={5} />
                          )}
                          <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)">
                            {category.name}
                          </Text>
                        </HStack>
                      </MotionBox>
                    );
                  })}
                </VStack>
              </Box>

              {/* Акции и скидки */}
              <Box p="var(--space-2)">
                <PromoCarousel />
              </Box>
            </Box>
          </GridItem>

          {/* Правая колонка - Контент */}
          <GridItem>
            <VStack align="stretch" gap="var(--space-6)">
              {/* Рекомендуемые рестораны */}
              <Box>
                <HStack justify="space-between" align="center" mb="var(--space-4)">
                  <VStack align="flex-start" gap="var(--space-1)">
                    <Text
                      fontSize="var(--font-xl)"
                      fontWeight="var(--font-semibold)"
                      color="var(--primary)"
                    >
                      {selectedCategory === 'all'
                        ? 'Рекомендуемые рестораны'
                        : `${categories.find(cat => cat.id === selectedCategory)?.name} рестораны`
                      }
                    </Text>
                    {selectedCategory !== 'all' && (
                      <Text
                        fontSize="var(--font-sm)"
                        color="var(--gray-600)"
                        cursor="pointer"
                        onClick={() => setSelectedCategory('all')}
                        _hover={{ color: 'var(--primary)' }}
                      >
                        Сбросить фильтр ×
                      </Text>
                    )}
                  </VStack>
                </HStack>

                <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap="var(--space-4)">
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
                      gridColumn="1 / -1"
                    >
                      <Text
                        fontSize="var(--font-lg)"
                        color="var(--gray-600)"
                        mb="var(--space-4)"
                      >
                        😔 Рестораны в этой категории не найдены
                      </Text>
                      <Text
                        fontSize="var(--font-base)"
                        color="var(--accent)"
                        cursor="pointer"
                        onClick={() => setSelectedCategory('all')}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        Показать все рестораны
                      </Text>
                    </Box>
                  )}
                </Grid>

                {/* Dropdown с результатами поиска */}
                {showSearchDropdown && searchResults.length > 0 && (
                  <MotionBox
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    position="fixed"
                    top="80px"
                    left="41%"
                    w="564px"
                    maxW="calc(100vw - var(--space-6))"
                    bg="var(--white)"
                    borderRadius="var(--radius-lg)"
                    boxShadow="var(--shadow-xl)"
                    border="1px solid var(--gray-200)"
                    zIndex={1000}
                    maxH="400px"
                    overflowY="auto"
                  >
                    <VStack align="stretch" gap={0}>
                      {searchResults.slice(0, 8).map((result, index) => {
                        if (result.type === 'restaurant') {
                          return (
                            <Box
                              key={`restaurant-${result.restaurant.id}`}
                              p="var(--space-3)"
                              cursor="pointer"
                              _hover={{ bg: 'var(--gray-50)' }}
                              onClick={() => handleRestaurantClickFromSearch(result.restaurant.id)}
                              borderBottom={index < searchResults.length - 1 ? "1px solid var(--gray-100)" : "none"}
                            >
                              <HStack gap="var(--space-3)">
                                <Icon as={FiShoppingBag} boxSize={4} color="var(--primary)" />
                                <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                                  {result.restaurant.name}
                                </Text>
                                <Text fontSize="var(--font-sm)" color="var(--gray-500)">
                                  Ресторан
                                </Text>
                              </HStack>
                            </Box>
                          );
                        } else if (result.type === 'dish' && result.dish) {
                          const dish = result.dish;
                          const categoryIcon = categories.find(cat => cat.name === dish.category)?.icon;
                          return (
                            <Box
                              key={`dish-${dish.id}-${index}`}
                              p="var(--space-3)"
                              cursor="pointer"
                              _hover={{ bg: 'var(--gray-50)' }}
                              onClick={() => handleDishClick(dish)}
                              borderBottom={index < searchResults.length - 1 ? "1px solid var(--gray-100)" : "none"}
                            >
                              <VStack align="flex-start" gap="var(--space-1)">
                                <HStack justify="space-between" w="100%" align="flex-start">
                                  <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                                    <HStack gap="var(--space-2)">
                                      {categoryIcon && (
                                        <Icon
                                          as={categoryIcon}
                                          boxSize={4}
                                          color="var(--primary)"
                                        />
                                      )}
                                      <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                                        {dish.name}
                                      </Text>
                                    </HStack>
                                    <Text fontSize="var(--font-sm)" color="var(--gray-600)" style={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: 'vertical' as const,
                                      overflow: 'hidden'
                                    }}>
                                      от {result.restaurant?.name}
                                    </Text>
                                  </VStack>
                                  <HStack gap="var(--space-1)" align="center">
                                    <Box
                                      as="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const currentQuantity = getItemQuantity(dish.id);
                                        if (currentQuantity > 0) {
                                          removeItemByDishId(dish.id);
                                        }
                                      }}
                                      w="24px"
                                      h="24px"
                                      bg="var(--gray-100)"
                                      color="var(--gray-700)"
                                      borderRadius="var(--radius-full)"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      _hover={{ bg: 'var(--gray-200)' }}
                                      _active={{ transform: 'scale(0.9)' }}
                                      opacity={getItemQuantity(dish.id) === 0 ? 0.5 : 1}
                                      cursor={getItemQuantity(dish.id) === 0 ? 'not-allowed' : 'pointer'}
                                      transition="all 0.2s ease"
                                    >
                                      <FiMinus size={12} />
                                    </Box>
                                    <Text
                                      fontSize="var(--font-sm)"
                                      fontWeight="var(--font-bold)"
                                      color="var(--gray-700)"
                                      minW="20px"
                                      textAlign="center"
                                    >
                                      {getItemQuantity(dish.id)}
                                    </Text>
                                    <Box
                                      as="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addItem(dish, 1);
                                      }}
                                      w="24px"
                                      h="24px"
                                      bg="var(--gray-100)"
                                      color="var(--gray-700)"
                                      borderRadius="var(--radius-full)"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      _hover={{ bg: 'var(--gray-200)' }}
                                      _active={{ transform: 'scale(0.9)' }}
                                      transition="all 0.2s ease"
                                      cursor="pointer"
                                    >
                                      <FiPlus size={12} />
                                    </Box>
                                  </HStack>
                                </HStack>
                                <Text fontSize="var(--font-sm)" fontWeight="var(--font-semibold)" color="var(--primary)" textAlign="right">
                                  {dish.price}₽
                                </Text>
                              </VStack>
                            </Box>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </VStack>
                  </MotionBox>
                )}
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
      <Footer />

      {/* Виджет поддержки */}
      <SupportChatWidget onChatOpen={() => setIsChatOpen(true)} />

      {/* Модалка блюда */}
      <DishPreviewModal
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        dish={selectedDish}
      />

      {/* Чат поддержки */}
      <SupportChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </MotionBox>
  );
}
