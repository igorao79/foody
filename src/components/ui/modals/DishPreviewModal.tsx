'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  AspectRatio,
  Badge,
  Portal,
} from '@chakra-ui/react';
import { FiX, FiInfo, FiMinus, FiPlus } from 'react-icons/fi';
import { Dish } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface DishPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: Dish | null;
}

export function DishPreviewModal({ isOpen, onClose, dish }: DishPreviewModalProps) {
  const { addItem, removeItemByDishId, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!dish || !isOpen) return null;

  const currentQuantity = getItemQuantity(dish.id);
  const totalPrice = dish.price * quantity;

  const handleIncrement = () => {
    addItem(dish, 1);
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 0) {
      removeItemByDishId(dish.id);
      setQuantity(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <Portal>
      {/* Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="var(--space-4)"
        onClick={onClose}
      >
        {/* Modal Content */}
        <Box
          maxW="400px"
          w="90%"
          bg="var(--white)"
          borderRadius="var(--radius-xl)"
          boxShadow="var(--shadow-xl)"
          border="1px solid var(--gray-200)"
          position="relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Изображение блюда */}
          <Box position="relative">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                style={{
                  objectFit: 'cover',
                  borderTopLeftRadius: 'var(--radius-xl)',
                  borderTopRightRadius: 'var(--radius-xl)'
                }}
                sizes="(max-width: 400px) 100vw, 400px"
              />
            </AspectRatio>

            {/* Кнопка закрытия */}
            <Button
              position="absolute"
              top="var(--space-3)"
              right="var(--space-3)"
              size="sm"
              variant="solid"
              bg="rgba(0, 0, 0, 0.5)"
              color="var(--white)"
              borderRadius="var(--radius-full)"
              cursor="pointer"
              onClick={onClose}
              _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
              w="32px"
              h="32px"
              minW="32px"
            >
              <Icon as={FiX} boxSize={4} />
            </Button>
          </Box>

          {/* Содержимое */}
          <Box p="var(--space-6)">
            <VStack gap="var(--space-4)" align="stretch">
              {/* Название и цена */}
              <VStack gap="var(--space-2)" align="flex-start">
                <HStack justify="space-between" align="flex-start" w="100%">
                  <Text
                    fontSize="var(--font-xl)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                    lineHeight="1.2"
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
                      bg="var(--accent)"
                      color="var(--white)"
                      borderRadius="var(--radius-sm)"
                      px="var(--space-2)"
                      py="var(--space-1)"
                      fontSize="var(--font-xs)"
                      fontWeight="var(--font-medium)"
                    >
                      🔥 Популярное
                    </Badge>
                  )}
                  {dish.isVegetarian && (
                    <Badge
                      bg="var(--secondary)"
                      color="var(--white)"
                      borderRadius="var(--radius-sm)"
                      px="var(--space-2)"
                      py="var(--space-1)"
                      fontSize="var(--font-xs)"
                      fontWeight="var(--font-medium)"
                    >
                      🌱 Вегетарианское
                    </Badge>
                  )}
                  {dish.isSpicy && (
                    <Badge
                      bg="var(--primary)"
                      color="var(--white)"
                      borderRadius="var(--radius-sm)"
                      px="var(--space-2)"
                      py="var(--space-1)"
                      fontSize="var(--font-xs)"
                      fontWeight="var(--font-medium)"
                    >
                      🌶️ Острый
                    </Badge>
                  )}
                </HStack>
              </VStack>

              {/* Описание */}
              <Text
                fontSize="var(--font-base)"
                color="var(--gray-700)"
                lineHeight="1.5"
              >
                {dish.description}
              </Text>

              {/* Состав */}
              {dish.ingredients && dish.ingredients.length > 0 && (
                <VStack gap="var(--space-2)" align="flex-start">
                  <HStack gap="var(--space-2)" align="center">
                    <Icon as={FiInfo} boxSize={4} color="var(--gray-500)" />
                    <Text
                      fontSize="var(--font-sm)"
                      fontWeight="var(--font-semibold)"
                      color="var(--gray-700)"
                    >
                      Состав:
                    </Text>
                  </HStack>
                  <Text
                    fontSize="var(--font-sm)"
                    color="var(--gray-600)"
                    lineHeight="1.4"
                  >
                    {dish.ingredients.join(', ')}
                  </Text>
                </VStack>
              )}

              {/* Цена и управление количеством */}
              <HStack justify="space-between" align="center" pt="var(--space-2)">
                <Text
                  fontSize="var(--font-xl)"
                  fontWeight="var(--font-bold)"
                  color="var(--primary)"
                >
                  {totalPrice}₽
                </Text>

                <HStack gap="var(--space-2)">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="var(--gray-300)"
                    color="var(--gray-600)"
                    cursor="pointer"
                    onClick={handleDecrement}
                    disabled={currentQuantity === 0}
                    _hover={{
                      bg: currentQuantity === 0 ? 'transparent' : 'var(--gray-50)',
                      borderColor: 'var(--gray-400)'
                    }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }}
                    w="32px"
                    h="32px"
                    minW="32px"
                    borderRadius="var(--radius-md)"
                  >
                    <Icon as={FiMinus} boxSize={4} />
                  </Button>

                  <Text
                    fontSize="var(--font-base)"
                    fontWeight="var(--font-semibold)"
                    color="var(--gray-700)"
                    minW="24px"
                    textAlign="center"
                  >
                    {currentQuantity}
                  </Text>

                  <Button
                    size="sm"
                    bg="var(--primary)"
                    color="var(--white)"
                    cursor="pointer"
                    onClick={handleIncrement}
                    w="32px"
                    h="32px"
                    minW="32px"
                    borderRadius="var(--radius-md)"
                  >
                    <Icon as={FiPlus} boxSize={4} />
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
}
