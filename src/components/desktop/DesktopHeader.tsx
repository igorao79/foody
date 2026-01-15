'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, HStack, VStack, Text, Input, Icon, IconButton } from '@chakra-ui/react';
import { FiSearch, FiUser, FiShoppingBag, FiTruck, FiHome, FiMapPin, FiPlus, FiMinus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { useMounted } from '@/hooks/useMounted';
import { Dish, Restaurant } from '@/types';
import { restaurants, dishes } from '@/utils/mockData';
import { DishPreviewModal } from '@/components/ui/modals/DishPreviewModal';

interface DesktopHeaderProps {
  onSearch?: (query: string) => void;
  onDishClick?: (dish: Dish) => void;
  showOrderType?: boolean;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DesktopHeader({ onSearch, onDishClick, showOrderType = true }: DesktopHeaderProps) {
  const router = useRouter();
  const { getItemCount, addItem, removeItemByDishId, getItemQuantity } = useCart();
  const { orderType, setOrderType } = useOrder();
  const mounted = useMounted();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{type: 'restaurant' | 'dish', restaurant: Restaurant, dish?: Dish}>>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemCount = mounted ? getItemCount() : 0;
  const displayCount = itemCount > 10 ? '10+' : itemCount.toString();

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

  const handleAddDish = (dish: Dish) => {
    addItem(dish, 1);
    setShowSearchDropdown(false);
  };

  const handleRemoveDish = (dish: Dish) => {
    const currentQuantity = getItemQuantity(dish.id);
    if (currentQuantity > 0) {
      // Используем removeItemByDishId для уменьшения количества
      removeItemByDishId(dish.id);
    }
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


  const handleUserClick = () => {
    router.push('/profile');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="var(--white)"
      borderBottom="1px solid var(--gray-200)"
      boxShadow="var(--shadow-sm)"
      py="var(--space-4)"
    >
      <Box maxW="1400px" mx="auto" px="var(--space-6)">
        <HStack justify="space-between" align="center" gap="var(--space-6)">
          {/* Левая часть - Логотип и переключатель */}
          <HStack gap="var(--space-6)">
            {/* Логотип */}
            <Box
              as="button"
              onClick={() => router.push('/')}
              cursor="pointer"
              _hover={{ opacity: 0.8 }}
            >
              <HStack gap="var(--space-2)">
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="var(--radius-lg)"
                  overflow="hidden"
                  bg="var(--white)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/images/logo.webp"
                    alt="Фуди"
                    width={32}
                    height={32}
                    style={{
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                </Box>
                <VStack align="flex-start" gap={0}>
                  <Text
                    fontSize="var(--font-lg)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                    lineHeight="1.1"
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
            {showOrderType && (
              <Box
                position="relative"
                bg="var(--gray-50)"
                borderRadius="var(--radius-lg)"
                border="1px solid var(--gray-200)"
                p="var(--space-1)"
                display="flex"
                cursor="pointer"
                onClick={() => {
                  setOrderType(orderType === 'delivery' ? 'pickup' : 'delivery');
                }}
                transition="all 0.2s ease"
                _hover={{
                  borderColor: 'var(--gray-300)',
                  bg: 'var(--gray-100)',
                }}
              >
                {/* Ползунок */}
                <Box
                  position="absolute"
                  top="var(--space-1)"
                  left={orderType === 'delivery' ? 'var(--space-1)' : 'calc(47% - 4px)'}
                  w={orderType === 'delivery' ? 'calc(45% - var(--space-1))' : 'calc(55% - var(--space-1))'}
                  h="calc(100% - var(--space-2))"
                  bg="var(--primary)"
                  borderRadius="var(--radius-md)"
                  transition="all 0.3s ease"
                  boxShadow="0 1px 3px rgba(0,0,0,0.1)"
                />

                {/* Доставка */}
                <HStack
                  flex={1}
                  justify="center"
                  gap="var(--space-1)"
                  p="var(--space-2)"
                  borderRadius="var(--radius-md)"
                  position="relative"
                  zIndex={1}
                  color={orderType === 'delivery' ? 'var(--white)' : 'var(--gray-600)'}
                  transition="color 0.2s ease"
                >
                  <Icon as={FiTruck} boxSize={4} />
                  <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                    Доставка
                  </Text>
                </HStack>

                {/* Самовывоз */}
                <HStack
                  flex={1}
                  justify="center"
                  gap="var(--space-1)"
                  p="var(--space-2)"
                  borderRadius="var(--radius-md)"
                  position="relative"
                  zIndex={1}
                  color={orderType === 'pickup' ? 'var(--white)' : 'var(--gray-600)'}
                  transition="color 0.2s ease"
                >
                  <Icon as={FiHome} boxSize={4} />
                  <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                    Самовывоз
                  </Text>
                </HStack>
              </Box>
            )}

            {/* Геолокация */}
            <HStack
              gap="var(--space-2)"
              color="var(--gray-600)"
              fontSize="var(--font-sm)"
              cursor="pointer"
              _hover={{ color: 'var(--primary)' }}
              transition="color 0.2s ease"
            >
              <Icon as={FiMapPin} boxSize={4} />
              <Text fontWeight="var(--font-medium)">Москва</Text>
            </HStack>
          </HStack>

          {/* Центральная часть - Поиск */}
          <Box flex={1} maxW="500px" mx="var(--space-6)">
            <Box position="relative">
              <Input
                placeholder="Найти рестораны, блюда..."
                value={searchQuery}
                onChange={handleSearchChange}
                bg="var(--gray-50)"
                border="2px solid var(--gray-200)"
                borderRadius="var(--radius-xl)"
                fontSize="var(--font-base)"
                px="var(--space-5)"
                py="var(--space-3)"
                pl="50px"
                _focus={{
                  borderColor: 'var(--primary)',
                  boxShadow: 'var(--shadow-md)',
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

              {/* Dropdown с результатами поиска */}
              <AnimatePresence>
                {showSearchDropdown && searchResults.length > 0 && (
                  <MotionBox
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    position="absolute"
                    top="calc(100% + var(--space-2))"
                    left={0}
                    right={0}
                    bg="var(--white)"
                    borderRadius="var(--radius-lg)"
                    boxShadow="var(--shadow-lg)"
                    border="1px solid var(--gray-200)"
                    zIndex={1000}
                    maxH="400px"
                    overflowY="auto"
                    ref={dropdownRef}
                  >
                    <VStack align="stretch" gap={0}>
                      {searchResults.map((result, index) => (
                        <Box
                          key={`${result.type}-${result.restaurant.id}-${result.dish?.id || ''}-${index}`}
                          p="var(--space-3)"
                          _hover={{ bg: 'var(--gray-50)' }}
                          cursor="pointer"
                          borderBottom={index < searchResults.length - 1 ? "1px solid var(--gray-100)" : "none"}
                          onClick={() => result.type === 'restaurant'
                            ? handleRestaurantClick(result.restaurant.id)
                            : handleDishClick(result.dish!)
                          }
                        >
                          <HStack gap="var(--space-3)" align="flex-start">
                            <Box
                              w="40px"
                              h="40px"
                              borderRadius="var(--radius-md)"
                              overflow="hidden"
                              flexShrink={0}
                              position="relative"
                            >
                              <Image
                                src={result.type === 'restaurant' ? result.restaurant.image : result.dish!.image}
                                alt={result.type === 'restaurant' ? result.restaurant.name : result.dish!.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="40px"
                              />
                            </Box>

                            <VStack align="flex-start" gap="var(--space-1)" flex={1} minW={0}>
                              <HStack justify="space-between" align="flex-start" w="100%">
                                <Text
                                  fontSize="var(--font-sm)"
                                  fontWeight="var(--font-medium)"
                                  color="var(--primary)"
                                  wordBreak="break-word"
                                >
                                  {result.type === 'restaurant' ? result.restaurant.name : result.dish!.name}
                                </Text>
                                <Text fontSize="var(--font-xs)" color="var(--gray-500)">
                                  {result.type === 'restaurant' ? 'Ресторан' : 'Блюдо'}
                                </Text>
                              </HStack>

                              <Text fontSize="var(--font-xs)" color="var(--gray-600)">
                                {result.type === 'restaurant'
                                  ? `${result.restaurant.cuisines.join(' • ')} • ${result.restaurant.deliveryTime}`
                                  : result.dish!.description
                                }
                              </Text>

                              {result.type === 'dish' && (
                                <HStack gap="var(--space-1)" align="center" mt="var(--space-1)">
                                  <Text fontSize="var(--font-sm)" fontWeight="var(--font-semibold)" color="var(--primary)">
                                    {result.dish!.price}₽
                                  </Text>
                                  <HStack gap="var(--space-1)">
                                    <IconButton
                                      aria-label="Уменьшить количество"
                                      size="xs"
                                      variant="outline"
                                      colorScheme="red"
                                      borderRadius="var(--radius-full)"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveDish(result.dish!);
                                      }}
                                    >
                                      <FiMinus size={10} />
                                    </IconButton>

                                    {/* Счетчик количества */}
                                    <Box
                                      px="var(--space-2)"
                                      py="var(--space-1)"
                                      bg="var(--gray-50)"
                                      borderRadius="var(--radius-md)"
                                      minW="30px"
                                      textAlign="center"
                                    >
                                      <Text
                                        fontSize="var(--font-xs)"
                                        fontWeight="var(--font-semibold)"
                                        color="var(--primary)"
                                      >
                                        {getItemQuantity(result.dish!.id) || 0}
                                      </Text>
                                    </Box>

                                    <IconButton
                                      aria-label="Добавить в корзину"
                                      size="xs"
                                      variant="outline"
                                      colorScheme="primary"
                                      borderRadius="var(--radius-full)"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddDish(result.dish!);
                                      }}
                                    >
                                      <FiPlus size={10} />
                                    </IconButton>
                                  </HStack>
                                </HStack>
                              )}
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>
          </Box>

          {/* Правая часть - Пользователь и корзина */}
          <HStack gap="var(--space-3)">
            <Box
              as="button"
              aria-label="Профиль пользователя"
              onClick={handleUserClick}
              p="var(--space-3)"
              borderRadius="var(--radius-md)"
              color="var(--gray-600)"
              cursor="pointer"
              _hover={{
                bg: 'var(--gray-100)',
                color: 'var(--primary)',
              }}
              transition="all 0.2s ease"
            >
              <FiUser size={20} />
            </Box>

            <Box position="relative">
              <Box
                as="button"
                aria-label="Корзина"
                onClick={handleCartClick}
                p="var(--space-3)"
                borderRadius="var(--radius-md)"
                color="var(--gray-600)"
                cursor="pointer"
                _hover={{
                  bg: 'var(--gray-100)',
                  color: 'var(--primary)',
                }}
                transition="all 0.2s ease"
              >
                <FiShoppingBag size={20} />
              </Box>
              {mounted && itemCount > 0 && (
                <Box
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
                </Box>
              )}
            </Box>
          </HStack>
        </HStack>

        <DishPreviewModal
          isOpen={isDishModalOpen}
          onClose={() => {
            setIsDishModalOpen(false);
            setSelectedDish(null);
          }}
          dish={selectedDish}
        />

      </Box>
    </Box>
  );
}