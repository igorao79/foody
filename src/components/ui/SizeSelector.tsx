'use client';

import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DishSize } from '@/types';

const MotionBox = motion(Box);

interface SizeSelectorProps {
  sizes: DishSize[];
  selectedSize?: DishSize;
  onSizeSelect: (size: DishSize) => void;
}

export function SizeSelector({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) {
  if (sizes.length <= 1) {
    return null;
  }

  return (
    <VStack align="stretch" gap="var(--space-3)">
      <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
        Размер порции
      </Text>

      <VStack align="stretch" gap="var(--space-2)">
        {sizes.map((size, index) => {
          const isSelected = selectedSize?.id === size.id;

          return (
            <MotionBox
              key={size.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              as="button"
              onClick={() => onSizeSelect(size)}
              p="var(--space-3)"
              borderRadius="var(--radius-lg)"
              border={isSelected ? '2px solid var(--primary)' : '1px solid var(--gray-200)'}
              bg={isSelected ? 'var(--primary)' : 'var(--white)'}
              color={isSelected ? 'var(--white)' : 'var(--primary)'}
              textAlign="left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              _hover={{
                borderColor: 'var(--primary)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <HStack justify="space-between" align="center">
                <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                  <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)">
                    {size.name}
                  </Text>
                  {size.calories && (
                    <Text fontSize="var(--font-sm)" opacity={isSelected ? 0.9 : 0.7}>
                      {size.calories} ккал
                    </Text>
                  )}
                </VStack>

                <Text fontSize="var(--font-lg)" fontWeight="var(--font-bold)">
                  +{size.price}₽
                </Text>
              </HStack>
            </MotionBox>
          );
        })}
      </VStack>
    </VStack>
  );
}
