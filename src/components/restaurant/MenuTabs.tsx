'use client';

import { useState } from 'react';
import { Box, Text, HStack, VStack, Icon } from '@chakra-ui/react';
import { FiCoffee, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Dish } from '@/types';

const MotionBox = motion(Box);

interface MenuTabsProps {
  dishes: Dish[];
  onDishClick?: (dish: Dish) => void;
}

export function MenuTabs({ dishes, onDishClick }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Группируем блюда по категориям
  const categories = ['all', ...Array.from(new Set(dishes.map(dish => dish.category)))];
  const filteredDishes = activeTab === 'all'
    ? dishes
    : dishes.filter(dish => dish.category === activeTab);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
  };

  return (
    <Box>
      {/* Табы */}
      <Box
        px="var(--space-4)"
        py="var(--space-3)"
        borderBottom="1px solid var(--gray-200)"
        bg="var(--white)"
        position="sticky"
        top="0"
        zIndex={10}
      >
        <HStack gap="var(--space-4)" overflowX="auto" pb="var(--space-2)">
          {categories.map((category) => {
            const isActive = activeTab === category;
            const categoryName = category === 'all' ? 'Все' : category;

            return (
              <MotionBox
                key={category}
                as="button"
                onClick={() => handleTabClick(category)}
                px="var(--space-3)"
                py="var(--space-2)"
                borderRadius="var(--radius-md)"
                bg={isActive ? 'var(--primary)' : 'var(--gray-100)'}
                color={isActive ? 'var(--white)' : 'var(--primary)'}
                fontSize="var(--font-sm)"
                fontWeight="var(--font-medium)"
                whiteSpace="nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                minW="fit-content"
              >
                {categoryName}
              </MotionBox>
            );
          })}
        </HStack>
      </Box>

      {/* Список блюд */}
      <VStack gap={0} bg="var(--white)">
        {filteredDishes.map((dish) => (
          <MotionBox
            key={dish.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            as="button"
            onClick={() => onDishClick?.(dish)}
            w="100%"
            p="var(--space-4)"
            borderBottom="1px solid var(--gray-100)"
            _hover={{ bg: 'var(--gray-50)' }}
            _last={{ borderBottom: 'none' }}
            textAlign="left"
          >
            <HStack gap="var(--space-4)" align="flex-start">
              {/* Фото блюда */}
              <Box
                w="80px"
                h="80px"
                borderRadius="var(--radius-md)"
                bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)"
                flexShrink={0}
                position="relative"
                overflow="hidden"
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
                  <Icon as={FiCoffee} boxSize={8} />
                </Box>
              </Box>

              {/* Информация о блюде */}
              <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                <HStack justify="space-between" align="flex-start" w="100%">
                  <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                    <Text
                      fontSize="var(--font-lg)"
                      fontWeight="var(--font-semibold)"
                      color="var(--primary)"
                      lineHeight="1.2"
                    >
                      {dish.name}
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
                      {dish.description}
                    </Text>
                    <HStack gap="var(--space-2)">
                      {dish.isPopular && (
                        <Text
                          fontSize="var(--font-xs)"
                          color="var(--accent)"
                          fontWeight="var(--font-medium)"
                        >
                          🔥 Популярное
                        </Text>
                      )}
                      {dish.isVegetarian && (
                        <Text
                          fontSize="var(--font-xs)"
                          color="var(--secondary)"
                          fontWeight="var(--font-medium)"
                        >
                          🌱 Вегетарианское
                        </Text>
                      )}
                                  {dish.isSpicy && (
                                    <HStack gap="var(--space-1)" align="center">
                                      <Icon as={FiZap} boxSize={3} color="var(--primary)" />
                                      <Text
                                        fontSize="var(--font-xs)"
                                        color="var(--primary)"
                                        fontWeight="var(--font-medium)"
                                      >
                                        Острый
                                      </Text>
                                    </HStack>
                                  )}
                    </HStack>
                  </VStack>

                  <Text
                    fontSize="var(--font-lg)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                  >
                    {dish.price}₽
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
}
