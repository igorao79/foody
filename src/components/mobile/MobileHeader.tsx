'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, HStack, VStack, Text, Input, Icon } from '@chakra-ui/react';
import { FiSearch, FiShoppingBag, FiTruck, FiHome } from 'react-icons/fi';
import Image from 'next/image';

interface MobileHeaderProps {
  onSearch?: (query: string) => void;
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [orderType, setOrderType] = useState('delivery');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
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
                  style={{ objectFit: 'contain' }}
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
            p="var(--space-1)"
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
              p="var(--space-1)"
              borderRadius="var(--radius-full)"
              position="relative"
              zIndex={1}
              color={orderType === 'delivery' ? 'var(--white)' : 'var(--gray-700)'}
              transition="color 0.3s ease"
            >
              <Icon as={FiTruck} boxSize={3} />
            </HStack>

            {/* Самовывоз */}
            <HStack
              flex={1}
              justify="center"
              gap="var(--space-1)"
              p="var(--space-1)"
              borderRadius="var(--radius-full)"
              position="relative"
              zIndex={1}
              color={orderType === 'pickup' ? 'var(--white)' : 'var(--gray-700)'}
              transition="color 0.3s ease"
            >
              <Icon as={FiHome} boxSize={3} />
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
        </HStack>
      </Box>
    </Box>
  );
}
