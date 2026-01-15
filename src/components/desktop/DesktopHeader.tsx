'use client';

import { useState } from 'react';
import { Box, HStack, VStack, Text, Input, Icon } from '@chakra-ui/react';
import { FiSearch, FiUser, FiShoppingBag, FiTruck, FiHome, FiMapPin } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { useMounted } from '@/hooks/useMounted';
import { Dish } from '@/types';

interface DesktopHeaderProps {
  onSearch?: (query: string) => void;
  onDishClick?: (dish: Dish) => void;
  showOrderType?: boolean;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DesktopHeader({ onSearch, onDishClick, showOrderType = true }: DesktopHeaderProps) {
  const router = useRouter();
  const { getItemCount } = useCart();
  const { orderType, setOrderType } = useOrder();
  const mounted = useMounted();
  const [searchQuery, setSearchQuery] = useState('');

  const itemCount = mounted ? getItemCount() : 0;
  const displayCount = itemCount > 10 ? '10+' : itemCount.toString();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

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
                onClick={() => setOrderType(orderType === 'delivery' ? 'pickup' : 'delivery')}
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
      </Box>
    </Box>
  );
}