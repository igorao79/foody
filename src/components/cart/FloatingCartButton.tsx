'use client';

import { Box, Text, HStack, VStack, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';

const MotionBox = motion(Box);

interface FloatingCartButtonProps {
  itemCount: number;
  totalPrice: number;
  onClick?: () => void;
}

export function FloatingCartButton({ itemCount, totalPrice, onClick }: FloatingCartButtonProps) {
  if (itemCount === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        position="fixed"
        bottom="100px" // Выше bottom navigation
        left="var(--space-4)"
        right="var(--space-4)"
        zIndex={50}
      >
        <MotionBox
          as="button"
          onClick={onClick}
          w="100%"
          bg="var(--primary)"
          color="var(--white)"
          borderRadius="var(--radius-xl)"
          p="var(--space-4)"
          boxShadow="var(--shadow-lg)"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <HStack justify="space-between" align="center">
            <HStack gap="var(--space-3)">
              <Box
                position="relative"
                bg="var(--white)"
                borderRadius="var(--radius-full)"
                p="var(--space-2)"
              >
                <Icon as={FiShoppingCart} boxSize={5} color="var(--primary)" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <MotionBox
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      position="absolute"
                      top="-8px"
                      right="-8px"
                      bg="var(--accent)"
                      color="var(--white)"
                      borderRadius="var(--radius-full)"
                      minW="20px"
                      h="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="var(--font-xs)"
                      fontWeight="var(--font-bold)"
                      px="var(--space-1)"
                    >
                      {itemCount}
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)">
                  {itemCount} {itemCount === 1 ? 'товар' : itemCount < 5 ? 'товара' : 'товаров'}
                </Text>
                <Text fontSize="var(--font-sm)" opacity={0.9}>
                  К оформлению заказа
                </Text>
              </VStack>
            </HStack>

            <Text fontSize="var(--font-lg)" fontWeight="var(--font-bold)">
              {totalPrice}₽
            </Text>
          </HStack>
        </MotionBox>
      </MotionBox>
    </AnimatePresence>
  );
}
