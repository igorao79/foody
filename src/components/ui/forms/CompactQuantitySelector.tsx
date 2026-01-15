'use client';

import React from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { Dish } from '@/types';
import { useMounted } from '@/hooks/useMounted';

interface CompactQuantitySelectorProps {
  dish: Dish;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function CompactQuantitySelector({ dish, quantity, onQuantityChange }: CompactQuantitySelectorProps) {
  const mounted = useMounted();
  const { addItem, removeItemByDishId } = useCart();

  const handleDecrement = () => {
    if (quantity > 0) {
      removeItemByDishId(dish.id);
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    addItem(dish, 1);
    onQuantityChange(quantity + 1);
  };

  // SSR-safe: показываем placeholder до монтирования
  if (!mounted) {
    return <Box w="56px" h="24px" />;
  }

  return (
    <HStack
      gap="var(--space-1)"
      px="var(--space-1)"
      py="var(--space-1)"
      justify="center"
    >
      <Box
        as="button"
        onClick={(e) => {
          e.stopPropagation();
          if (quantity > 0) handleDecrement();
        }}
        w="24px"
        h="24px"
        bg="var(--gray-100)"
        color="var(--gray-700)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={quantity === 0 ? {} : { bg: 'var(--gray-200)' }}
        _active={quantity === 0 ? {} : { transform: 'scale(0.9)' }}
        opacity={quantity === 0 ? 0.5 : 1}
        transition="all 0.2s ease"
        cursor={quantity === 0 ? 'not-allowed' : 'pointer'}
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
        {quantity}
      </Text>

      <Box
        as="button"
        onClick={(e) => {
          e.stopPropagation();
          handleIncrement();
        }}
        cursor="pointer"
        w="24px"
        h="24px"
        bg="var(--gray-100)"
        color="var(--gray-700)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{ bg: 'var(--gray-200)' }}
        _active={{ transform: 'scale(0.9)' }}
        transition="all 0.2s ease"
      >
        <FiPlus size={12} />
      </Box>
    </HStack>
  );
}
