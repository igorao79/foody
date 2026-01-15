'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Input, NativeSelect, Textarea, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { useCart } from '@/contexts/CartContext';

const MotionBox = motion(Box);

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState('Ленинский проспект, 1');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [comment, setComment] = useState('');

  const handlePlaceOrder = () => {
    if (!selectedAddress.trim()) {
      return;
    }
    // Имитация создания заказа
    clearCart();
    router.push('/success');
  };

  // Проверяем, есть ли товары в корзине
  if (cart.items.length === 0) {
    return (
      <Layout>
        <Header title="Оформление заказа" showBackButton />
        <Box p="var(--space-4)" textAlign="center">
          <Text fontSize="var(--font-lg)" color="var(--gray-600)">
            Корзина пуста. Добавьте товары для оформления заказа.
          </Text>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout showBottomNav={false}>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header title="Оформление заказа" showBackButton />

        <Box p="var(--space-6)" pb="120px">
          <VStack align="stretch" gap="var(--space-6)">
            {/* Адрес доставки и Время доставки в одной строке */}
            <SimpleGrid columns={2} gap="var(--space-6)">
              {/* Адрес доставки */}
              <Box>
                <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-3)">
                  Адрес доставки
                </Text>
                <Input
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  placeholder="Введите адрес доставки"
                  bg="var(--gray-50)"
                  border="1px solid var(--gray-200)"
                  borderRadius="var(--radius-lg)"
                  fontSize="var(--font-base)"
                  _focus={{
                    borderColor: 'var(--primary)',
                    boxShadow: 'var(--shadow-sm)',
                    bg: 'var(--white)'
                  }}
                />
              </Box>

              {/* Время доставки */}
              <Box>
                <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-3)">
                  Время доставки
                </Text>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    bg="var(--gray-50)"
                    border="1px solid var(--gray-200)"
                    borderRadius="var(--radius-lg)"
                    fontSize="var(--font-base)"
                    _focus={{
                      borderColor: 'var(--primary)',
                      boxShadow: 'var(--shadow-sm)',
                      bg: 'var(--white)'
                    }}
                  >
                    <option value="asap">Как можно скорее</option>
                    <option value="30min">Через 30 минут</option>
                    <option value="1hour">Через 1 час</option>
                    <option value="2hours">Через 2 часа</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Box>
            </SimpleGrid>

            {/* Способ оплаты и Комментарий в одной строке */}
            <SimpleGrid columns={2} gap="var(--space-6)">
              {/* Способ оплаты */}
              <Box>
                <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-3)">
                  Способ оплаты
                </Text>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    bg="var(--gray-50)"
                    border="1px solid var(--gray-200)"
                    borderRadius="var(--radius-lg)"
                    fontSize="var(--font-base)"
                    _focus={{
                      borderColor: 'var(--primary)',
                      boxShadow: 'var(--shadow-sm)',
                      bg: 'var(--white)'
                    }}
                  >
                    <option value="card">Картой при получении</option>
                    <option value="cash">Наличными при получении</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Box>

              {/* Комментарий к заказу */}
              <Box>
                <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-3)">
                  Комментарий к заказу
                </Text>
                <Textarea
                  placeholder="Укажите дополнительные пожелания..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  bg="var(--gray-50)"
                  border="1px solid var(--gray-200)"
                  borderRadius="var(--radius-lg)"
                  fontSize="var(--font-base)"
                  minH="100px"
                  _focus={{
                    borderColor: 'var(--primary)',
                    boxShadow: 'var(--shadow-sm)',
                    bg: 'var(--white)'
                  }}
                  resize="none"
                />
              </Box>
            </SimpleGrid>

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
                    Итого к оплате
                  </Text>
                  <Text fontSize="var(--font-xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                    {cart.total}₽
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Fixed Place Order Button */}
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
            bg={!selectedAddress.trim() ? 'var(--gray-400)' : 'var(--primary)'}
            color="var(--white)"
            borderRadius="var(--radius-lg)"
            fontSize="var(--font-lg)"
            fontWeight="var(--font-bold)"
            py="var(--space-4)"
            cursor="pointer"
            _hover={{ bg: !selectedAddress.trim() ? 'var(--gray-400)' : 'var(--secondary)' }}
            _active={{ bg: !selectedAddress.trim() ? 'var(--gray-400)' : 'var(--secondary)' }}
            onClick={handlePlaceOrder}
            disabled={!selectedAddress.trim()}
          >
            {!selectedAddress.trim() ? 'Выберите адрес доставки' : `Оформить заказ • ${cart.total}₽`}
          </Button>
        </Box>
      </MotionBox>
    </Layout>
  );
}
