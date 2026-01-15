'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Box, Text, HStack, VStack, Icon, Input } from '@chakra-ui/react';
import { FiZap, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Dish } from '@/types';
import { DishModal } from '@/components/ui/modals/DishModal';
import { DishPreviewModal } from '@/components/ui/modals/DishPreviewModal';
import { CompactQuantitySelector } from '@/components/ui/forms/CompactQuantitySelector';
import { useCart } from '@/contexts/CartContext';

const MotionBox = motion(Box);

interface MenuTabsProps {
  dishes: Dish[];
}

export function MenuTabs({ dishes }: MenuTabsProps) {
  const { getItemQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Группируем блюда по категориям
  const categories = ['all', ...Array.from(new Set(dishes.map(dish => dish.category)))];
  const filteredDishes = useMemo(() => {
    let result = activeTab === 'all'
      ? dishes
      : dishes.filter(dish => dish.category === activeTab);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(dish =>
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [dishes, activeTab, searchQuery]);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
  };

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsPreviewModalOpen(true);
  };


  const handleQuantityChange = () => {
    // Обновление количества обрабатывается в CompactQuantitySelector через CartContext
  };

  return (
    <Box>
      {/* Поиск */}
      <Box
        px="var(--space-4)"
        py="var(--space-3)"
        bg="var(--white)"
        borderBottom="1px solid var(--gray-200)"
      >
        <Box position="relative">
          <Input
            placeholder="Найти блюдо..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="var(--gray-50)"
            border="1px solid var(--gray-200)"
            borderRadius="var(--radius-lg)"
            fontSize="var(--font-base)"
            px="var(--space-4)"
            py="var(--space-3)"
            pl="50px"
            _focus={{
              borderColor: 'var(--primary)',
              boxShadow: 'var(--shadow-sm)',
              bg: 'var(--white)',
            }}
            _hover={{
              borderColor: 'var(--gray-300)',
            }}
          />
          <Box
            position="absolute"
            left="var(--space-3)"
            top="50%"
            transform="translateY(-50%)"
            color="var(--gray-400)"
          >
            <FiSearch size={20} />
          </Box>
        </Box>
      </Box>

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
                cursor="pointer"
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
        {filteredDishes.map((dish) => {
          const quantity = getItemQuantity(dish.id);
          return (
            <MotionBox
              key={dish.id}
              onClick={(e) => {
                // Предотвращаем открытие модалки если клик был на кнопках количества
                if ((e.target as HTMLElement).closest('[data-quantity-controls]')) {
                  return;
                }
                handleDishClick(dish);
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              w="100%"
              p="var(--space-4)"
              borderBottom="1px solid var(--gray-100)"
              _last={{ borderBottom: 'none' }}
              textAlign="left"
              cursor="pointer"
              _hover={{ bg: 'var(--gray-50)' }}
              _active={{ bg: 'var(--gray-100)' }}
            >
            <HStack gap="var(--space-4)" align="flex-start">
              {/* Фото блюда */}
              <Box
                position="relative"
                w="80px"
                h="70px"
                borderRadius="var(--radius-md)"
                overflow="hidden"
                flexShrink={0}
              >
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="80px"
                  quality={85}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
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
                        <Text fontSize="var(--font-xs)" color="var(--accent)" fontWeight="var(--font-medium)">
                          🔥 Популярное
                        </Text>
                      )}
                      {dish.isVegetarian && (
                        <Text fontSize="var(--font-xs)" color="var(--secondary)" fontWeight="var(--font-medium)">
                          🌱 Вегетарианское
                        </Text>
                      )}
                      {dish.isSpicy && (
                        <HStack gap="var(--space-1)" align="center">
                          <Icon as={FiZap} boxSize={3} color="var(--primary)" />
                          <Text fontSize="var(--font-xs)" color="var(--primary)" fontWeight="var(--font-medium)">
                            Острый
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </VStack>

                  <VStack align="center" gap="var(--space-1)" data-quantity-controls>
                    <Text
                      fontSize="var(--font-lg)"
                      fontWeight="var(--font-bold)"
                      color="var(--primary)"
                      textAlign="center"
                    >
                      {dish.price}₽
                    </Text>
                    <CompactQuantitySelector
                      dish={dish}
                      quantity={quantity}
                      onQuantityChange={handleQuantityChange}
                    />
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </MotionBox>
          );
        })}
      </VStack>

      {/* Модальное окно предварительного просмотра блюда */}
      <DishPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        dish={selectedDish}
      />

      {/* Модальное окно блюда */}
      <DishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dish={selectedDish}
      />
    </Box>
  );
}
