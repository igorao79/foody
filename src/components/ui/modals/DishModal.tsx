'use client';

import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  AspectRatio,
  Badge,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal';
import { FiCoffee, FiZap, FiPlus, FiMinus } from 'react-icons/fi';
import { Dish } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: Dish | null;
}

export function DishModal({ isOpen, onClose, dish }: DishModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!dish) return null;

  const handleAddToCart = () => {
    addItem(dish, quantity);
    onClose();
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = dish.price * quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="var(--radius-xl)" overflow="hidden">
        <ModalHeader p={0}>
          <AspectRatio ratio={16 / 10}>
            <Box
              bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)"
              position="relative"
            >
              {/* Плейсхолдер для изображения */}
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
                <Icon as={FiCoffee} boxSize={12} />
              </Box>
            </Box>
          </AspectRatio>
          <ModalCloseButton
            position="absolute"
            top="var(--space-3)"
            right="var(--space-3)"
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(10px)"
            borderRadius="var(--radius-full)"
            _hover={{ bg: 'var(--white)' }}
          />
        </ModalHeader>

        <ModalBody p="var(--space-6)">
          <VStack align="stretch" gap="var(--space-4)">
            {/* Название и цена */}
            <VStack align="stretch" gap="var(--space-2)">
              <HStack justify="space-between" align="flex-start">
                <Text
                  fontSize="var(--font-xl)"
                  fontWeight="var(--font-bold)"
                  color="var(--primary)"
                  flex={1}
                >
                  {dish.name}
                </Text>
                <Text
                  fontSize="var(--font-xl)"
                  fontWeight="var(--font-bold)"
                  color="var(--primary)"
                >
                  {dish.price}₽
                </Text>
              </HStack>

              {/* Бейджи */}
              <HStack gap="var(--space-2)" wrap="wrap">
                {dish.isPopular && (
                  <Badge
                    colorScheme="orange"
                    variant="subtle"
                    borderRadius="var(--radius-full)"
                    px="var(--space-2)"
                    py="var(--space-1)"
                    fontSize="var(--font-xs)"
                  >
                    🔥 Популярное
                  </Badge>
                )}
                {dish.isVegetarian && (
                  <Badge
                    colorScheme="green"
                    variant="subtle"
                    borderRadius="var(--radius-full)"
                    px="var(--space-2)"
                    py="var(--space-1)"
                    fontSize="var(--font-xs)"
                  >
                    🌱 Вегетарианское
                  </Badge>
                )}
                {dish.isSpicy && (
                  <Badge
                    colorScheme="red"
                    variant="subtle"
                    borderRadius="var(--radius-full)"
                    px="var(--space-2)"
                    py="var(--space-1)"
                    fontSize="var(--font-xs)"
                    display="flex"
                    alignItems="center"
                    gap="var(--space-1)"
                  >
                    <Icon as={FiZap} boxSize={3} />
                    Острый
                  </Badge>
                )}
              </HStack>
            </VStack>

            {/* Описание */}
            <Text
              fontSize="var(--font-base)"
              color="var(--gray-600)"
              lineHeight="1.5"
            >
              {dish.description}
            </Text>

            {/* Количество и цена */}
            <Box
              border="1px solid var(--gray-200)"
              borderRadius="var(--radius-lg)"
              p="var(--space-4)"
              bg="var(--gray-50)"
            >
              <HStack justify="space-between" align="center">
                <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                  Количество:
                </Text>

                <HStack gap="var(--space-2)" align="center">
                  <Box
                    as="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    w="36px"
                    h="36px"
                    borderRadius="var(--radius-full)"
                    bg="var(--white)"
                    border="2px solid var(--gray-300)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="var(--primary)"
                    _hover={{ bg: 'var(--primary)', color: 'var(--white)' }}
                    opacity={quantity <= 1 ? 0.4 : 1}
                    cursor={quantity <= 1 ? 'not-allowed' : 'pointer'}
                    transition="all 0.2s ease"
                  >
                    <FiMinus size={16} />
                  </Box>

                  <Box
                    w="50px"
                    textAlign="center"
                    bg="var(--white)"
                    borderRadius="var(--radius-md)"
                    py="var(--space-2)"
                    border="2px solid var(--gray-300)"
                  >
                    <Text fontSize="var(--font-lg)" fontWeight="var(--font-bold)" color="var(--primary)">
                      {quantity}
                    </Text>
                  </Box>

                  <Box
                    as="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    w="36px"
                    h="36px"
                    borderRadius="var(--radius-full)"
                    bg="var(--white)"
                    border="2px solid var(--gray-300)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="var(--primary)"
                    _hover={{ bg: 'var(--primary)', color: 'var(--white)' }}
                    opacity={quantity >= 10 ? 0.4 : 1}
                    cursor={quantity >= 10 ? 'not-allowed' : 'pointer'}
                    transition="all 0.2s ease"
                  >
                    <FiPlus size={16} />
                  </Box>
                </HStack>
              </HStack>

              <HStack justify="space-between" align="center" mt="var(--space-3)">
                <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                  Итого:
                </Text>
                <Text fontSize="var(--font-xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                  {totalPrice}₽
                </Text>
              </HStack>
            </Box>

            {/* Кнопка добавления в корзину */}
            <Button
              onClick={handleAddToCart}
              bg="var(--primary)"
              color="var(--white)"
              size="lg"
              w="100%"
              borderRadius="var(--radius-lg)"
              py="var(--space-4)"
              fontSize="var(--font-lg)"
              fontWeight="var(--font-semibold)"
              _hover={{
                bg: 'var(--secondary)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(55, 147, 57, 0.3)'
              }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.2s ease"
            >
              Добавить в корзину
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
