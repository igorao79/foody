'use client';

import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Container, Grid, GridItem, Icon } from '@chakra-ui/react';
import { FiShoppingCart, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { CartItem } from '@/components/cart/CartItem';
import { PromoCodeInput } from '@/components/cart/PromoCodeInput';
import { DesktopHeader } from './DesktopHeader';
import { useCart } from '@/contexts/CartContext';
import { restaurants } from '@/utils/mockData';

const MotionBox = motion(Box);

export function DesktopCartPage() {
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

  // Группируем товары по ресторанам
  const groupedItems = cart.items.reduce((acc, item) => {
    const restaurantId = item.dish.restaurantId;
    if (!acc[restaurantId]) {
      acc[restaurantId] = [];
    }
    acc[restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof cart.items>);

  if (cart.items.length === 0) {
    return (
      <>
        <DesktopHeader showOrderType={false} />
        <Container maxW="1400px" py="var(--space-6)" pt="120px">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            py="var(--space-12)"
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
            mb="var(--space-4)"
          >
            Корзина пуста
          </Text>
          <Text
            fontSize="var(--font-base)"
            color="var(--gray-600)"
            mb="var(--space-6)"
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
          </MotionBox>
        </Container>
      </>
    );
  }

  return (
    <>
      <DesktopHeader showOrderType={false} />
      <Container maxW="1400px" py="var(--space-6)" pt="120px">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <Text
          fontSize="var(--font-3xl)"
          fontWeight="var(--font-bold)"
          color="var(--primary)"
          mb="var(--space-6)"
        >
          Корзина
        </Text>

        <Grid templateColumns="2fr 1fr" gap="var(--space-6)">
          {/* Левая колонка - товары */}
          <GridItem>
            <VStack align="stretch" gap="var(--space-4)">
              {Object.entries(groupedItems).map(([restaurantId, items], index, array) => {
                const restaurant = restaurants.find(r => r.id === restaurantId);
                return (
                  <VStack key={restaurantId} align="stretch" gap="var(--space-4)">
                    {/* Название ресторана */}
                    <HStack gap="var(--space-2)" align="center">
                      <Icon as={FiMapPin} boxSize={4} color="var(--gray-500)" />
                      <Text
                        fontSize="var(--font-lg)"
                        fontWeight="var(--font-semibold)"
                        color="var(--primary)"
                      >
                        {restaurant?.name || 'Ресторан не найден'}
                      </Text>
                    </HStack>

                    {/* Товары из этого ресторана */}
                    <VStack align="stretch" gap="var(--space-4)">
                      {items.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          onUpdateQuantity={updateItem}
                          onRemove={removeItem}
                        />
                      ))}
                    </VStack>

                    {/* Разделительная линия, кроме последнего ресторана */}
                    {index < array.length - 1 && (
                      <Box borderTop="2px solid var(--gray-300)" my="var(--space-4)" />
                    )}
                  </VStack>
                );
              })}
            </VStack>
          </GridItem>

          {/* Правая колонка - итог и оформление */}
          <GridItem>
            <Box
              position="sticky"
              top="var(--space-6)"
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-6)"
              boxShadow="var(--shadow-md)"
            >
              <VStack align="stretch" gap="var(--space-6)">
                {/* Промокод */}
                <PromoCodeInput
                  currentPromo={cart.promoCode}
                  onApplyPromo={handlePromoApply}
                  onRemovePromo={handlePromoRemove}
                />

                {/* Итоговая сумма */}
                <Box
                  p="var(--space-5)"
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

                    <Box borderTop="1px solid var(--gray-300)" my="var(--space-2)" />

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

                {/* Кнопка оформления */}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  as={motion.button}
                >
                  Оформить заказ • {cart.total}₽
                </Button>
              </VStack>
            </Box>
          </GridItem>
          </Grid>
        </MotionBox>
      </Container>
    </>
  );
}
