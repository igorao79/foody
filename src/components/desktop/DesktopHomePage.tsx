'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, VStack, HStack, Grid, GridItem, Container, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { RestaurantCard } from '@/components/ui/RestaurantCard';
import { PromoCarousel } from '@/components/ui/PromoCarousel';
import { DesktopHeader } from './DesktopHeader';
import { categories, restaurants } from '@/utils/mockData';

const MotionBox = motion(Box);

export function DesktopHomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };


  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? undefined : categoryId);
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
      minH="100vh"
      bg="var(--background)"
    >
      <DesktopHeader onSearch={setSearchQuery} />

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
              <Box p="var(--space-4)" borderBottom="1px solid var(--gray-100)">
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
                          {typeof category.icon === 'function' ? (
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
                  <Text
                    fontSize="var(--font-base)"
                    color="var(--accent)"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Посмотреть все
                  </Text>
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
                        onClick={() => setSelectedCategory(undefined)}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        Показать все рестораны
                      </Text>
                    </Box>
                  )}
                </Grid>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </MotionBox>
  );
}
