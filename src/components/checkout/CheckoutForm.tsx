'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Textarea, Icon, SimpleGrid } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { AddressSelector } from '@/components/order/AddressSelector';
import { DeliveryTimeSelector } from '@/components/order/DeliveryTimeSelector';
import { PaymentMethodSelector } from '@/components/order/PaymentMethodSelector';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { OrderAddress } from '@/types';
import { Input } from '@chakra-ui/react';

const MotionBox = motion(Box);

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const router = useRouter();
  const { cart, clearCart, applyPromo, removePromo } = useCart();
  const { orderType } = useOrder();

  console.log('CheckoutForm orderType:', orderType); // Debug

  const [selectedAddress, setSelectedAddress] = useState<OrderAddress>();
  const [deliveryTime, setDeliveryTime] = useState<'asap' | string>('asap');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [comment, setComment] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleAddressSelect = (address: OrderAddress) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    // В реальном приложении здесь открывался бы модал или страница добавления адреса
    console.log('Add new address');
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    const result = applyPromo(promoCode.trim());
    if (result.success) {
      setPromoCode('');
      setPromoError(null);
    } else {
      setPromoError(result.error || 'Ошибка применения промокода');
    }
  };

  const handleRemovePromo = () => {
    removePromo();
    setPromoError(null);
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

  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      w="100%"
    >
      {/* Header с кнопкой назад */}
      <Box
        position="sticky"
        top="80px"
        zIndex={10}
        bg="var(--white)"
        borderBottom="1px solid var(--gray-200)"
        p="var(--space-4)"
      >
        <HStack gap="var(--space-3)" align="center">
          <Button
            size="sm"
            variant="ghost"
            onClick={onBack}
            cursor="pointer"
            p="var(--space-2)"
            borderRadius="var(--radius-md)"
            _hover={{ bg: 'var(--gray-100)' }}
          >
            <Icon as={FiArrowLeft} boxSize={4} />
          </Button>
          <Text
            fontSize="var(--font-xl)"
            fontWeight="var(--font-bold)"
            color="var(--primary)"
          >
            Оформление заказа
          </Text>
        </HStack>
      </Box>

      <Box p="var(--space-6)" pb="120px">
        <VStack align="stretch" gap="var(--space-6)">
          {/* Адрес доставки и Время доставки в одной строке */}
          <SimpleGrid columns={2} gap="var(--space-6)">
            <AddressSelector
              selectedAddress={selectedAddress}
              onAddressSelect={handleAddressSelect}
              onAddNewAddress={handleAddNewAddress}
            />
            <DeliveryTimeSelector
              selectedTime={deliveryTime}
              onTimeSelect={setDeliveryTime}
            />
          </SimpleGrid>

          {/* Способ оплаты и Комментарий в одной строке */}
          <SimpleGrid columns={2} gap="var(--space-6)">
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodSelect={setPaymentMethod}
            />

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
          </SimpleGrid>

          {/* Промокод */}
          <VStack align="stretch" gap="var(--space-3)">
            <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
              Промокод
            </Text>
            {!cart.promoCode ? (
              <HStack gap="var(--space-2)">
                <Input
                  placeholder="Введите промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  bg="var(--white)"
                  border="1px solid var(--gray-200)"
                  borderRadius="var(--radius-lg)"
                  fontSize="var(--font-base)"
                  _focus={{
                    borderColor: 'var(--primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                />
                <Button
                  onClick={handleApplyPromo}
                  colorScheme="primary"
                  variant="outline"
                  size="md"
                  disabled={!promoCode.trim()}
                >
                  Применить
                </Button>
              </HStack>
            ) : (
              <HStack justify="space-between" align="center">
                <HStack gap="var(--space-2)">
                  <Text fontSize="var(--font-base)" color="var(--primary)">
                    🎟️ {cart.promoCode}
                  </Text>
                  <Text fontSize="var(--font-sm)" color="var(--accent)">
                    -{cart.discount}₽
                  </Text>
                </HStack>
                <Button
                  onClick={handleRemovePromo}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                >
                  Удалить
                </Button>
              </HStack>
            )}
            {promoError && (
              <Box
                p="var(--space-3)"
                bg="var(--red-50)"
                color="var(--red-700)"
                borderRadius="var(--radius-md)"
                border="1px solid var(--red-200)"
                fontSize="var(--font-sm)"
              >
                {promoError}
              </Box>
            )}
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

              {orderType === 'delivery' ? (
                <HStack justify="space-between">
                  <Text fontSize="var(--font-base)" color="var(--gray-600)">
                    Доставка
                  </Text>
                  <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                    {cart.deliveryFee}₽
                  </Text>
                </HStack>
              ) : (
                <VStack align="flex-start" gap="var(--space-1)">
                  <Text fontSize="var(--font-base)" color="var(--gray-600)">
                    Самовывоз
                  </Text>
                  <Text fontSize="var(--font-sm)" color="var(--primary)">
                    Адрес ресторана: ул. Примерная, 1
                  </Text>
                </VStack>
              )}

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
                    {cart.items.reduce((sum, item) => sum + item.totalPrice, 0) + (orderType === 'delivery' ? cart.deliveryFee : 0) - cart.discount}₽
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
          cursor="pointer"
          _hover={{ bg: !selectedAddress ? 'var(--gray-400)' : 'var(--secondary)' }}
          _active={{ bg: !selectedAddress ? 'var(--gray-400)' : 'var(--secondary)' }}
          onClick={handlePlaceOrder}
          disabled={!selectedAddress}
          >
            {!selectedAddress ? 'Выберите адрес доставки' : `Оформить заказ • ${cart.items.reduce((sum, item) => sum + item.totalPrice, 0) + (orderType === 'delivery' ? cart.deliveryFee : 0) - cart.discount}₽`}
          </Button>
      </Box>
    </MotionBox>
  );
}
