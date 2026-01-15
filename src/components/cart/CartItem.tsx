'use client';

import { Box, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { CartItem as CartItemType } from '@/types';
import Image from 'next/image';
import { useIsDesktop } from '@/hooks/useBreakpoint';

const MotionBox = motion(Box);

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const isDesktop = useIsDesktop();

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      p="var(--space-4)"
      borderRadius="var(--radius-lg)"
      bg="var(--white)"
      boxShadow="var(--shadow-sm)"
      border="1px solid var(--gray-100)"
      position="relative"
      zIndex={2}
    >
      {isDesktop ? (
        /* Desktop layout - все в одной строке */
        <Box position="relative">
          <HStack gap="var(--space-4)" align="flex-start">
          {/* Изображение блюда */}
          <Box
            w="80px"
            h="80px"
            borderRadius="var(--radius-md)"
            flexShrink={0}
            position="relative"
            overflow="hidden"
          >
            <Image
              src={item.dish.image}
              alt={item.dish.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="80px"
            />
          </Box>

          {/* Информация о товаре */}
          <VStack align="flex-start" gap="var(--space-1)" flex={1}>
            <HStack justify="space-between" align="flex-start" w="100%">
              <Text
                fontSize="var(--font-lg)"
                fontWeight="var(--font-semibold)"
                color="var(--primary)"
                lineHeight="1.2"
              >
                {item.dish.name}
              </Text>

              {/* Кнопка удаления в углу карточки */}
              <IconButton
                aria-label="Удалить из корзины"
                onClick={() => onRemove(item.id)}
                cursor="pointer"
                size="sm"
                variant="ghost"
                color="var(--gray-500)"
                position="absolute"
                top="-30px"
                right="-20px"
                zIndex={3}
                _hover={{
                  bg: 'var(--red-50)',
                  color: 'var(--red-500)',
                }}
              >
                <FiTrash2 />
              </IconButton>
            </HStack>

            {/* Размер и дополнения */}
            <VStack align="flex-start" gap="var(--space-1)">
              {item.selectedSize && (
                <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                  Размер: {item.selectedSize.name}
                </Text>
              )}
              {item.selectedAddons.length > 0 && (
                <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                  Дополнения: {item.selectedAddons.map(addon => addon.name).join(', ')}
                </Text>
              )}
            </VStack>

            {/* Управление количеством и цена */}
            <HStack justify="space-between" align="center" w="100%" mt="var(--space-2)">
              <HStack gap="var(--space-1)">
                <IconButton
                  aria-label="Уменьшить количество"
                  onClick={handleDecrement}
                  cursor="pointer"
                  size="sm"
                  variant="outline"
                  borderColor="var(--gray-300)"
                  color="var(--primary)"
                  _hover={{
                    bg: 'var(--primary)',
                    color: 'var(--white)',
                  }}
                >
                  <FiMinus />
                </IconButton>

                <Box
                  px="var(--space-3)"
                  py="var(--space-1)"
                  bg="var(--gray-50)"
                  borderRadius="var(--radius-md)"
                  minW="40px"
                  textAlign="center"
                >
                  <Text
                    fontSize="var(--font-base)"
                    fontWeight="var(--font-semibold)"
                    color="var(--primary)"
                  >
                    {item.quantity}
                  </Text>
                </Box>

                <IconButton
                  aria-label="Увеличить количество"
                  onClick={handleIncrement}
                  cursor="pointer"
                  size="sm"
                  variant="outline"
                  borderColor="var(--gray-300)"
                  color="var(--primary)"
                  _hover={{
                    bg: 'var(--primary)',
                    color: 'var(--white)',
                  }}
                >
                  <FiPlus />
                </IconButton>
              </HStack>

              {/* Цена */}
              <VStack align="flex-end" gap="var(--space-1)">
                <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                  {item.totalPrice / item.quantity}₽ × {item.quantity}
                </Text>
                <Text
                  fontSize="var(--font-lg)"
                  fontWeight="var(--font-bold)"
                  color="var(--primary)"
                >
                  {item.totalPrice}₽
                </Text>
              </VStack>
            </HStack>
          </VStack>

        </HStack>
        </Box>
      ) : (
        /* Mobile layout - вертикальный */
        <VStack gap="var(--space-3)" align="stretch">
          {/* Верхняя часть с изображением, названием и кнопкой удаления */}
          <HStack gap="var(--space-3)" align="flex-start">
            <Box
              w="60px"
              h="60px"
              borderRadius="var(--radius-md)"
              flexShrink={0}
              position="relative"
              overflow="hidden"
            >
              <Image
                src={item.dish.image}
                alt={item.dish.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="60px"
              />
            </Box>

            <VStack align="flex-start" gap="var(--space-1)" flex={1}>
              <Text
                fontSize="var(--font-base)"
                fontWeight="var(--font-semibold)"
                color="var(--primary)"
                lineHeight="1.2"
              >
                {item.dish.name}
              </Text>

              {/* Размер и дополнения */}
              <VStack align="flex-start" gap="var(--space-1)">
                {item.selectedSize && (
                  <Text fontSize="var(--font-xs)" color="var(--gray-600)">
                    Размер: {item.selectedSize.name}
                  </Text>
                )}
                {item.selectedAddons.length > 0 && (
                  <Text fontSize="var(--font-xs)" color="var(--gray-600)">
                    Дополнения: {item.selectedAddons.map(addon => addon.name).join(', ')}
                  </Text>
                )}
              </VStack>
            </VStack>

            {/* Кнопка удаления */}
            <IconButton
              aria-label="Удалить из корзины"
              onClick={() => onRemove(item.id)}
              cursor="pointer"
              size="sm"
              variant="ghost"
              color="var(--gray-500)"
              _hover={{
                color: 'var(--accent)',
                bg: 'rgba(92, 219, 149, 0.1)',
              }}
            >
              <FiTrash2 />
            </IconButton>
          </HStack>

          {/* Нижняя часть с ценой и управлением количеством */}
          <HStack justify="space-between" align="center">
            <Text fontSize="var(--font-sm)" color="var(--gray-600)">
              {item.totalPrice / item.quantity}₽ × {item.quantity}
            </Text>

            <HStack gap="var(--space-2)">
              <IconButton
                aria-label="Уменьшить количество"
                onClick={handleDecrement}
                cursor="pointer"
                size="xs"
                variant="outline"
                borderColor="var(--gray-300)"
                color="var(--primary)"
                _hover={{
                  bg: 'var(--primary)',
                  color: 'var(--white)',
                }}
              >
                <FiMinus />
              </IconButton>

              <Box
                px="var(--space-2)"
                py="var(--space-1)"
                bg="var(--gray-50)"
                borderRadius="var(--radius-md)"
                minW="32px"
                textAlign="center"
              >
                <Text
                  fontSize="var(--font-sm)"
                  fontWeight="var(--font-semibold)"
                  color="var(--primary)"
                >
                  {item.quantity}
                </Text>
              </Box>

              <IconButton
                aria-label="Увеличить количество"
                onClick={handleIncrement}
                cursor="pointer"
                size="xs"
                variant="outline"
                borderColor="var(--gray-300)"
                color="var(--primary)"
                _hover={{
                  bg: 'var(--primary)',
                  color: 'var(--white)',
                }}
              >
                <FiPlus />
              </IconButton>
            </HStack>

            <Text
              fontSize="var(--font-lg)"
              fontWeight="var(--font-bold)"
              color="var(--primary)"
            >
              {item.totalPrice}₽
            </Text>
          </HStack>
        </VStack>
      )}
    </MotionBox>
  );
}
