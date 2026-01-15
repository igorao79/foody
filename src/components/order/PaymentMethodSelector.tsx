'use client';

import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';

const MotionBox = motion(Box);

interface PaymentMethodSelectorProps {
  selectedMethod: 'card' | 'cash';
  onMethodSelect: (method: 'card' | 'cash') => void;
}

export function PaymentMethodSelector({ selectedMethod, onMethodSelect }: PaymentMethodSelectorProps) {
  return (
    <VStack align="stretch" gap="var(--space-4)">
      <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
        Способ оплаты
      </Text>

      <VStack align="stretch" gap="var(--space-2)">
        {/* Оплата картой */}
        <MotionBox
          as="button"
          onClick={() => onMethodSelect('card')}
          cursor="pointer"
          p="var(--space-4)"
          borderRadius="var(--radius-lg)"
          border={selectedMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--gray-200)'}
          bg={selectedMethod === 'card' ? 'var(--gray-50)' : 'var(--white)'}
          textAlign="left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HStack gap="var(--space-3)">
            <Box color="var(--secondary)" mt="2px">
              <FiCreditCard size={20} />
            </Box>
            <VStack align="flex-start" gap="var(--space-1)">
              <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                Банковской картой
              </Text>
              <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                Оплата при получении заказа
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Оплата наличными */}
        <MotionBox
          as="button"
          onClick={() => onMethodSelect('cash')}
          cursor="pointer"
          p="var(--space-4)"
          borderRadius="var(--radius-lg)"
          border={selectedMethod === 'cash' ? '2px solid var(--primary)' : '1px solid var(--gray-200)'}
          bg={selectedMethod === 'cash' ? 'var(--gray-50)' : 'var(--white)'}
          textAlign="left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HStack gap="var(--space-3)">
            <Box color="var(--accent)" mt="2px">
              <FiDollarSign size={20} />
            </Box>
            <VStack align="flex-start" gap="var(--space-1)">
              <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                Наличными курьеру
              </Text>
              <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                Подготовьте точную сумму
              </Text>
            </VStack>
          </HStack>
        </MotionBox>
      </VStack>
    </VStack>
  );
}
