'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, HStack, VStack, Text, Input, Icon } from '@chakra-ui/react';
import { FiSearch, FiShoppingBag, FiTruck, FiHome, FiMinus, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { restaurants, dishes, categories } from '@/utils/mockData';

interface MobileHeaderProps {
  onSearch?: (query: string) => void;
}

const MotionBox = motion(Box);

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const router = useRouter();
  const { getItemCount, addItem, getItemQuantity, removeItemByDishId } = useCart();
  const { orderType, setOrderType } = useOrder();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const itemCount = getItemCount();
  const displayCount = itemCount > 10 ? '10+' : itemCount.toString();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();

    // Поиск по блюдам
    const matchingDishes = dishes.filter(dish =>
      dish.name.toLowerCase().includes(lowerQuery) ||
      dish.description.toLowerCase().includes(lowerQuery) ||
      dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerQuery)) ||
      dish.category.toLowerCase().includes(lowerQuery)
    );

    // Группируем результаты по ресторанам
    const dishResults = matchingDishes
      .map(dish => {
        const restaurant = restaurants.find(r => r.id === dish.restaurantId);
        return restaurant ? {
          type: 'dish',
          dish,
          restaurant
        } : null;
      })
      .filter(Boolean);

    // Поиск по ресторанам
    const matchingRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(lowerQuery) ||
      restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(lowerQuery)) ||
      restaurant.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      restaurant.description?.toLowerCase().includes(lowerQuery)
    );

    const restaurantResults = matchingRestaurants.map(restaurant => ({
      type: 'restaurant',
      restaurant
    }));

    const allResults = [...dishResults, ...restaurantResults];
    setSearchResults(allResults);
    setShowSearchDropdown(allResults.length > 0);
  };

  const handleDishClick = (dish?: any) => {
    // Теперь блюда добавляются через кнопки + в dropdown
    // Этот обработчик можно оставить пустым или удалить
  };

  const handleRestaurantClickFromSearch = (restaurantId: string) => {
    setShowSearchDropdown(false);
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/restaurant/${restaurantId}`);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };


  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg="var(--white)"
      borderBottom="1px solid var(--gray-200)"
      boxShadow="var(--shadow-sm)"
    >
      {/* Верхняя часть с логотипом и типом заказа */}
      <Box px="var(--space-4)" py="var(--space-3)">
        <HStack justify="space-between" align="center">
          {/* Логотип */}
          <Box
            as="button"
            onClick={() => router.push('/')}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
          >
            <HStack gap="var(--space-2)">
              <Box
                w="32px"
                h="32px"
                bg="var(--white)"
                borderRadius="var(--radius-lg)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Image
                  src="/images/logo.webp"
                  alt="Фуди"
                  width={24}
                  height={24}
                  style={{
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
              </Box>
              <VStack align="flex-start" gap={0}>
                <Text
                  fontSize="var(--font-sm)"
                  fontWeight="var(--font-bold)"
                  color="var(--primary)"
                  lineHeight="1"
                >
                  Фуди
                </Text>
                <Text
                  fontSize="var(--font-xs)"
                  color="var(--gray-600)"
                  lineHeight="1"
                >
                  Быстрая доставка
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Переключатель типа заказа */}
          <Box
            position="relative"
            bg="var(--gray-100)"
            borderRadius="var(--radius-full)"
            p="var(--space-2)"
            display="flex"
            cursor="pointer"
            onClick={() => setOrderType(orderType === 'delivery' ? 'pickup' : 'delivery')}
            transition="all 0.3s ease"
            _hover={{
              bg: 'var(--gray-200)',
            }}
          >
            {/* Ползунок */}
            <Box
              position="absolute"
              top="var(--space-1)"
              left={orderType === 'delivery' ? 'var(--space-1)' : 'calc(50% + var(--space-1))'}
              w="calc(50% - var(--space-1))"
              h="calc(100% - var(--space-2))"
              bg="var(--primary)"
              borderRadius="var(--radius-full)"
              transition="all 0.3s ease"
              boxShadow="var(--shadow-sm)"
            />

            {/* Доставка */}
            <HStack
              flex={1}
              justify="center"
              gap="var(--space-1)"
              p="var(--space-2)"
              borderRadius="var(--radius-full)"
              position="relative"
              zIndex={1}
              color={orderType === 'delivery' ? 'var(--white)' : 'var(--gray-700)'}
              transition="color 0.3s ease"
            >
              <Icon as={FiTruck} boxSize={4} />
              <Text fontSize="var(--font-xs)" fontWeight="var(--font-medium)">
                Доставка
              </Text>
            </HStack>

            {/* Самовывоз */}
            <HStack
              flex={1}
              justify="center"
              gap="var(--space-1)"
              p="var(--space-2)"
              borderRadius="var(--radius-full)"
              position="relative"
              zIndex={1}
              color={orderType === 'pickup' ? 'var(--white)' : 'var(--gray-700)'}
              transition="color 0.3s ease"
            >
              <Icon as={FiHome} boxSize={4} />
              <Text fontSize="var(--font-xs)" fontWeight="var(--font-medium)">
                Самовывоз
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>

      {/* Поисковая строка и корзина */}
      <Box px="var(--space-4)" pb="var(--space-3)">
        <HStack gap="var(--space-3)">
          <Box flex={1} position="relative">
            <Input
              placeholder="Найти рестораны, блюда..."
              value={searchQuery}
              onChange={handleSearchChange}
              bg="var(--gray-50)"
              border="2px solid var(--gray-200)"
              borderRadius="var(--radius-xl)"
              fontSize="var(--font-sm)"
              px="var(--space-4)"
              py="var(--space-3)"
              pl="40px"
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
              <FiSearch size={16} />
            </Box>
          </Box>

            <Box position="relative">
              <Box
                as="button"
                aria-label="Корзина"
                onClick={handleCartClick}
                p="var(--space-3)"
                border="2px solid var(--gray-200)"
                borderRadius="var(--radius-lg)"
                bg="transparent"
                color="var(--primary)"
                cursor="pointer"
                _hover={{
                  bg: 'var(--primary)',
                  color: 'var(--white)',
                  borderColor: 'var(--primary)',
                }}
                transition="all 0.2s ease"
              >
                <FiShoppingBag size={20} />
              </Box>
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
        </HStack>
      </Box>

      {/* Dropdown с результатами поиска */}
      {showSearchDropdown && searchResults.length > 0 && (
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          position="absolute"
          top="100%"
          left="var(--space-4)"
          right="var(--space-4)"
          bg="var(--white)"
          borderRadius="var(--radius-lg)"
          boxShadow="var(--shadow-xl)"
          border="1px solid var(--gray-200)"
          zIndex={100}
          maxH="300px"
          overflowY="auto"
        >
          <VStack align="stretch" gap={0}>
            {searchResults.slice(0, 6).map((result, index) => {
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
              } else if (result.dish) {
                return (
                  <Box
                    key={`dish-${result.dish.id}-${index}`}
                    p="var(--space-3)"
                    cursor="pointer"
                    _hover={{ bg: 'var(--gray-50)' }}
                    onClick={() => handleDishClick(result.dish)}
                    borderBottom={index < searchResults.length - 1 ? "1px solid var(--gray-100)" : "none"}
                  >
                              <VStack align="flex-start" gap="var(--space-1)">
                                <HStack justify="space-between" w="100%" align="flex-start">
                                  <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                                    <HStack gap="var(--space-2)">
                                      <Icon
                                        as={categories.find(cat => cat.name === result.dish.category)?.icon}
                                        boxSize={4}
                                        color="var(--primary)"
                                      />
                                      <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                                        {result.dish.name}
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
                                        const currentQuantity = getItemQuantity(result.dish.id);
                                        if (currentQuantity > 0) {
                                          removeItemByDishId(result.dish.id);
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
                                      opacity={getItemQuantity(result.dish.id) === 0 ? 0.5 : 1}
                                      cursor={getItemQuantity(result.dish.id) === 0 ? 'not-allowed' : 'pointer'}
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
                                      {getItemQuantity(result.dish.id)}
                                    </Text>
                                    <Box
                                      as="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addItem(result.dish, 1);
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
                                  {result.dish.price}₽
                                </Text>
                              </VStack>
                  </Box>
                );
              }
              return null;
            })}
          </VStack>
        </MotionBox>
      )}
    </Box>
  );
}
