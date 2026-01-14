'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Textarea } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { AddressSelector } from '@/components/order/AddressSelector';
import { DeliveryTimeSelector } from '@/components/order/DeliveryTimeSelector';
import { PaymentMethodSelector } from '@/components/order/PaymentMethodSelector';
import { useCart } from '@/contexts/CartContext';
import { OrderAddress } from '@/types';

const MotionBox = motion(Box);

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [selectedAddress, setSelectedAddress] = useState<OrderAddress>();
  const [deliveryTime, setDeliveryTime] = useState<'asap' | string>('asap');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [comment, setComment] = useState('');

  const handleAddressSelect = (address: OrderAddress) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    // В реальном приложении здесь открывался бы модал или страница добавления адреса
    console.log('Add new address');
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      // В реальном приложении показать ошибку
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

        <Box p="var(--space-4)" pb="120px">
          <VStack align="stretch" gap="var(--space-6)">
            {/* Адрес доставки */}
            <AddressSelector
              selectedAddress={selectedAddress}
              onAddressSelect={handleAddressSelect}
              onAddNewAddress={handleAddNewAddress}
            />

            {/* Время доставки */}
            <DeliveryTimeSelector
              selectedTime={deliveryTime}
              onTimeSelect={setDeliveryTime}
            />

            {/* Способ оплаты */}
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodSelect={setPaymentMethod}
            />

            {/* Комментарий к заказу */}
            <VStack align="stretch" gap="var(--space-3)">
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
                Комментарий к заказу
              </Text>
              <Textarea
                placeholder="Укажите дополнительные пожелания или инструкции для курьера..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                bg="var(--white)"
                border="1px solid var(--gray-200)"
                borderRadius="var(--radius-lg)"
                fontSize="var(--font-base)"
                minH="100px"
                _focus={{
                  borderColor: 'var(--primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                resize="none"
              />
            </VStack>

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
            bg={!selectedAddress ? 'var(--gray-400)' : 'var(--primary)'}
            color="var(--white)"
            borderRadius="var(--radius-lg)"
            fontSize="var(--font-lg)"
            fontWeight="var(--font-bold)"
            py="var(--space-4)"
            _hover={{ bg: !selectedAddress ? 'var(--gray-400)' : 'var(--secondary)' }}
            _active={{ bg: !selectedAddress ? 'var(--gray-400)' : 'var(--secondary)' }}
            onClick={handlePlaceOrder}
            disabled={!selectedAddress}
          >
            {!selectedAddress ? 'Выберите адрес доставки' : `Оформить заказ • ${cart.total}₽`}
          </Button>
        </Box>
      </MotionBox>
    </Layout>
  );
}
