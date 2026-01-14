'use client';

import React from 'react';
import { Box, Text, HStack, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus } from 'react-icons/fi';

const MotionBox = motion(Box);

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  minQuantity = 1,
  maxQuantity = 10
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <MotionBox
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HStack gap="var(--space-1)">
        <IconButton
          aria-label="Уменьшить количество"
          onClick={handleDecrement}
          disabled={quantity <= minQuantity}
          size="sm"
          variant="outline"
          borderColor="var(--gray-300)"
          color="var(--primary)"
          _hover={{
            bg: 'var(--primary)',
            color: 'var(--white)',
          }}
          _disabled={{
            opacity: 0.4,
            cursor: 'not-allowed',
          }}
        >
          <FiMinus />
        </IconButton>

        <Box
          px="var(--space-3)"
          py="var(--space-1)"
          bg="var(--gray-50)"
          borderRadius="var(--radius-md)"
          minW="60px"
          textAlign="center"
        >
          <Text
            fontSize="var(--font-lg)"
            fontWeight="var(--font-bold)"
            color="var(--primary)"
          >
            {quantity}
          </Text>
        </Box>

        <IconButton
          aria-label="Увеличить количество"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          size="sm"
          variant="outline"
          borderColor="var(--gray-300)"
          color="var(--primary)"
          _hover={{
            bg: 'var(--primary)',
            color: 'var(--white)',
          }}
          _disabled={{
            opacity: 0.4,
            cursor: 'not-allowed',
          }}
        >
          <FiPlus />
        </IconButton>
      </HStack>
    </MotionBox>
  );
}
