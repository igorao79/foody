'use client';

import { Box, Text, VStack, HStack, IconButton, Icon } from '@chakra-ui/react';
import { FiCoffee } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { CartItem as CartItemType } from '@/types';

const MotionBox = motion(Box);

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
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
    >
      <HStack gap="var(--space-4)" align="flex-start">
        {/* Изображение блюда */}
        <Box
          w="80px"
          h="80px"
          borderRadius="var(--radius-md)"
          bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)"
          flexShrink={0}
          position="relative"
          overflow="hidden"
        >
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

        {/* Информация о товаре */}
        <VStack align="flex-start" gap="var(--space-1)" flex={1}>
          <Text
            fontSize="var(--font-lg)"
            fontWeight="var(--font-semibold)"
            color="var(--primary)"
            lineHeight="1.2"
          >
            {item.dish.name}
          </Text>

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

          {/* Цена за единицу */}
          <Text fontSize="var(--font-sm)" color="var(--gray-600)">
            {item.totalPrice / item.quantity}₽ × {item.quantity}
          </Text>
        </VStack>

        {/* Управление количеством и ценой */}
        <VStack align="flex-end" gap="var(--space-2)">
          <Text
            fontSize="var(--font-lg)"
            fontWeight="var(--font-bold)"
            color="var(--primary)"
          >
            {item.totalPrice}₽
          </Text>

          <HStack gap="var(--space-1)">
            <IconButton
              aria-label="Уменьшить количество"
              onClick={handleDecrement}
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
        </VStack>

        {/* Кнопка удаления */}
        <IconButton
          aria-label="Удалить из корзины"
          onClick={() => onRemove(item.id)}
          size="sm"
          variant="ghost"
          color="var(--gray-400)"
          _hover={{
            color: 'var(--primary)',
            bg: 'var(--gray-50)',
          }}
        >
          <FiTrash2 />
        </IconButton>
      </HStack>
    </MotionBox>
  );
}
