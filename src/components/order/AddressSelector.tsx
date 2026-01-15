'use client';

import { useState } from 'react';
import { Box, Text, VStack, HStack, Button, Input, Textarea } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPlus } from 'react-icons/fi';
import { OrderAddress } from '@/types';

const MotionBox = motion(Box);

interface AddressSelectorProps {
  selectedAddress?: OrderAddress;
  onAddressSelect: (address: OrderAddress) => void;
  onAddNewAddress: () => void;
}

// Моковые адреса
const mockAddresses: OrderAddress[] = [
  {
    id: '1',
    street: 'ул. Ленина, 15',
    building: '15',
    apartment: '42',
    comment: 'Домофон не работает, позвонить',
  },
  {
    id: '2',
    street: 'пр. Победы, 7',
    building: '7А',
    apartment: '125',
    entrance: '3',
    floor: '12',
  },
];

export function AddressSelector({ selectedAddress, onAddressSelect, onAddNewAddress }: AddressSelectorProps) {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  return (
    <VStack align="stretch" spacing="var(--space-4)">
      <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
        Адрес доставки
      </Text>

      {/* Существующие адреса */}
      <VStack align="stretch" spacing="var(--space-2)">
        {mockAddresses.map((address) => (
          <MotionBox
            key={address.id}
            as="button"
            onClick={() => onAddressSelect(address)}
            cursor="pointer"
            p="var(--space-4)"
            borderRadius="var(--radius-lg)"
            border={selectedAddress?.id === address.id ? '2px solid var(--primary)' : '1px solid var(--gray-200)'}
            bg={selectedAddress?.id === address.id ? 'var(--gray-50)' : 'var(--white)'}
            textAlign="left"
            transition="all 0.2s ease"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HStack spacing="var(--space-3)" align="flex-start">
              <Box color="var(--primary)" mt="2px">
                <FiMapPin size={20} />
              </Box>
              <VStack align="flex-start" spacing="var(--space-1)" flex={1}>
                <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                  {address.street}, кв. {address.apartment}
                </Text>
                {address.entrance && address.floor && (
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                    Подъезд {address.entrance}, этаж {address.floor}
                  </Text>
                )}
                {address.comment && (
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)" fontStyle="italic">
                    {address.comment}
                  </Text>
                )}
              </VStack>
            </HStack>
          </MotionBox>
        ))}
      </VStack>

      {/* Кнопка добавления нового адреса */}
      <Button
        variant="outline"
        borderColor="var(--gray-300)"
        color="var(--primary)"
        borderRadius="var(--radius-lg)"
        py="var(--space-4)"
        fontSize="var(--font-base)"
        leftIcon={<FiPlus />}
        onClick={onAddNewAddress}
        cursor="pointer"
        _hover={{
          bg: 'var(--primary)',
          color: 'var(--white)',
          borderColor: 'var(--primary)',
        }}
      >
        Добавить новый адрес
      </Button>
    </VStack>
  );
}
