'use client';

import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Icon } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Header } from '@/components/ui/navigation/Header';
import { CartItem } from '@/components/cart/CartItem';
import { PromoCodeInput } from '@/components/cart/PromoCodeInput';
import { useCart } from '@/contexts/CartContext';

const MotionBox = motion(Box);

export function MobileCartPage() {
  const router = useRouter();
  const { cart, updateItem, removeItem, applyPromo, removePromo } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handlePromoApply = (code: string) => {
    const discount = code === 'DISCOUNT30' ? 150 : 50;
    applyPromo(code, discount);
  };

  const handlePromoRemove = () => {
    removePromo();
  };

  if (cart.items.length === 0) {
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header title="Корзина" showBackButton />

        <VStack
          gap="var(--space-4)"
          p="var(--space-4)"
          align="center"
          justify="center"
          minH="60vh"
        >
          <Text
            fontSize="var(--font-4xl)"
            opacity={0.5}
            mb="var(--space-4)"
          >
<Icon as={FiShoppingCart} boxSize={12} />
          </Text>
          <Text
            fontSize="var(--font-xl)"
            fontWeight="var(--font-semibold)"
            color="var(--primary)"
            textAlign="center"
          >
            Корзина пуста
          </Text>
          <Text
            fontSize="var(--font-base)"
            color="var(--gray-600)"
            textAlign="center"
            mb="var(--space-4)"
          >
            Добавьте блюда из ресторанов, чтобы оформить заказ
          </Text>
          <Button
            bg="var(--primary)"
            color="var(--white)"
            borderRadius="var(--radius-lg)"
            px="var(--space-6)"
            py="var(--space-3)"
            fontSize="var(--font-base)"
            fontWeight="var(--font-semibold)"
            _hover={{ bg: 'var(--secondary)' }}
            onClick={() => router.push('/')}
          >
            Выбрать ресторан
          </Button>
        </VStack>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header title="Корзина" showBackButton />

      <Box p="var(--space-4)" pb="120px">
        <VStack align="stretch" gap="var(--space-4)">
          {/* Список товаров */}
          <VStack align="stretch" gap="var(--space-3)">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateItem}
                onRemove={removeItem}
              />
            ))}
          </VStack>

          {/* Промокод */}
          <PromoCodeInput
            currentPromo={cart.promoCode}
            onApplyPromo={handlePromoApply}
            onRemovePromo={handlePromoRemove}
          />

          {/* Итоговая сумма */}
          <Box
            p="var(--space-4)"
            borderRadius="var(--radius-lg)"
            bg="var(--gray-50)"
            border="1px solid var(--gray-200)"
          >
            <VStack align="stretch" gap="var(--space-3)">
              <HStack justify="space-between">
                <Text fontSize="var(--font-base)" color="var(--gray-600)">
                  Товары ({cart.items.reduce((sum, item) => sum + item.quantity, 0)})
                </Text>
                <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                  {cart.items.reduce((sum, item) => sum + item.totalPrice, 0)}₽
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="var(--font-base)" color="var(--gray-600)">
                  Доставка
                </Text>
                <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                  {cart.deliveryFee}₽
                </Text>
              </HStack>

              {cart.discount > 0 && (
                <HStack justify="space-between">
                  <Text fontSize="var(--font-base)" color="var(--accent)">
                    Скидка
                  </Text>
                  <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--accent)">
                    -{cart.discount}₽
                  </Text>
                </HStack>
              )}

              <Box borderTop="1px solid var(--gray-300)" my="var(--space-3)" />

              <HStack justify="space-between">
                <Text fontSize="var(--font-lg)" fontWeight="var(--font-bold)" color="var(--primary)">
                  Итого
                </Text>
                <Text fontSize="var(--font-xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                  {cart.total}₽
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Fixed Checkout Button */}
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="var(--white)"
        borderTop="1px solid var(--gray-200)"
        p="var(--space-4)"
        boxShadow="var(--shadow-lg)"
      >
        <Button
          w="100%"
          size="lg"
          bg="var(--primary)"
          color="var(--white)"
          borderRadius="var(--radius-lg)"
          fontSize="var(--font-lg)"
          fontWeight="var(--font-bold)"
          py="var(--space-4)"
          _hover={{ bg: 'var(--secondary)' }}
          _active={{ bg: 'var(--secondary)' }}
          onClick={handleCheckout}
        >
          Оформить заказ • {cart.total}₽
        </Button>
      </Box>
    </MotionBox>
  );
}
