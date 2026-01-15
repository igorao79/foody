'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, VStack, Text, HStack, Button, Textarea, Icon, SimpleGrid, Circle, Stack } from '@chakra-ui/react';
import { FiArrowLeft, FiCheck, FiClock, FiShoppingBag, FiTruck, FiMapPin, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { AddressSelector } from '@/components/order/AddressSelector';
import { DeliveryTimeSelector } from '@/components/order/DeliveryTimeSelector';
import { PaymentMethodSelector } from '@/components/order/PaymentMethodSelector';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { OrderAddress } from '@/types';
import { Input } from '@chakra-ui/react';
import { restaurants } from '@/utils/mockData';

const MotionBox = motion(Box);

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { cart, clearCart, applyPromo, removePromo } = useCart();
  const { orderType } = useOrder();

  console.log('CheckoutForm orderType:', orderType); // Debug

  const [selectedAddress, setSelectedAddress] = useState<OrderAddress>();

  // Находим адрес ресторана с наибольшим количеством товаров для pickup
  const getPickupAddress = () => {
    const restaurantCounts: { [key: string]: number } = {};
    cart.items.forEach(item => {
      restaurantCounts[item.dish.restaurantId] = (restaurantCounts[item.dish.restaurantId] || 0) + item.quantity;
    });

    const mainRestaurantId = Object.entries(restaurantCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    const restaurant = restaurants.find(r => r.id === mainRestaurantId);
    return restaurant?.address || 'Адрес ресторана';
  };
  const [deliveryTime, setDeliveryTime] = useState<'asap' | string>('asap');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [comment, setComment] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const deliverySteps = [
    { label: 'Заказ передан в ресторан', icon: FiShoppingBag },
    { label: 'Заказ готовится', icon: FiClock },
    { label: 'Заказ едет к вам', icon: FiTruck },
    { label: 'Заказ получен', icon: FiMapPin },
  ];

  const pickupSteps = [
    { label: 'Заказ передан в ресторан', icon: FiShoppingBag },
    { label: 'Заказ готовится', icon: FiClock },
    { label: 'Заказ получен', icon: FiMapPin },
  ];

  const steps = orderType === 'pickup' ? pickupSteps : deliverySteps;

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
    setShowProgressModal(true);
    setCurrentStep(0);

    // Имитация прогресса заказа
    const progressInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(progressInterval);
          setTimeout(() => {
            clearCart();
          }, 1000);
          return prev;
        }
      });
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowProgressModal(false);
    setCurrentStep(0);
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
                    Адрес: {getPickupAddress()}
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

      {/* Progress Modal */}
      {showProgressModal && createPortal(
        <AnimatePresence>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.8)"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="var(--space-4)"
          >
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              bg="var(--white)"
              borderRadius="var(--radius-xl)"
              p="var(--space-8)"
              maxW="400px"
              w="100%"
              position="relative"
            >
              {/* Close button */}
              <Button
                position="absolute"
                top="var(--space-4)"
                right="var(--space-4)"
                variant="ghost"
                size="sm"
                onClick={handleCloseModal}
                cursor="pointer"
                minW="auto"
                h="auto"
                p="var(--space-2)"
              >
                <Icon as={FiX} boxSize={5} />
              </Button>

              <VStack gap="var(--space-6)" align="center">
                <Text fontSize="var(--font-xl)" fontWeight="var(--font-bold)" color="var(--primary)" textAlign="center">
                  Заказ оформлен!
                </Text>

                <Text fontSize="var(--font-base)" color="var(--gray-600)" textAlign="center">
                  Следите за статусом вашего заказа
                </Text>

                {/* Progress Steps */}
                <Box position="relative" w="100%" maxW="300px" minH="300px">
                  {/* Чекпоинты */}
                  <Stack direction="column" gap={0} w="100%" align="stretch">
                    {steps.map((step, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        w="100%"
                        position="relative"
                        mt={index === 0 ? 0 : "var(--space-40)"}
                        gap="var(--space-4)"
                      >
                        <Circle
                          size="40px"
                          bg={index <= currentStep ? 'var(--primary)' : 'var(--gray-200)'}
                          color={index <= currentStep ? 'var(--white)' : 'var(--gray-500)'}
                          transition="all 0.3s ease"
                          zIndex={2}
                          position="relative"
                          mb="30px"
                          flexShrink={0}
                        >
                          {index < currentStep ? (
                            <Icon as={FiCheck} boxSize={5} />
                          ) : (
                            <Icon as={step.icon} boxSize={5} />
                          )}
                        </Circle>

                        <Text
                          fontSize="var(--font-base)"
                          fontWeight={index <= currentStep ? 'var(--font-semibold)' : 'var(--font-normal)'}
                          color={index <= currentStep ? 'var(--primary)' : 'var(--gray-500)'}
                          transition="all 0.3s ease"
                          flex={1}
                          mb="20px"
                        >
                          {step.label}
                        </Text>
                      </Box>
                    ))}
                  </Stack>

                  {/* Вертикальная полоска прогресса */}
                  {steps.length > 1 && (
                    <Box
                      position="absolute"
                      left="20px"
                      top="20px"
                      bottom="20px"
                      w="4px"
                      bg="var(--gray-200)"
                      borderRadius="var(--radius-full)"
                      zIndex={1}
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h={`${(currentStep / (steps.length - 1)) * 100}%`}
                        bg="var(--primary)"
                        borderRadius="var(--radius-full)"
                        transition="height 0.4s ease"
                      />
                    </Box>
                  )}
                </Box>

                {currentStep === steps.length - 1 && (
                  <VStack gap="var(--space-3)" align="center">
                    <Text fontSize="var(--font-sm)" color="var(--accent)" textAlign="center">
                      ✅ Заказ успешно оформлен!
                    </Text>
                    <Button
                      onClick={handleCloseModal}
                      bg="var(--primary)"
                      color="var(--white)"
                      size="sm"
                      borderRadius="var(--radius-lg)"
                      _hover={{ bg: 'var(--secondary)' }}
                      cursor="pointer"
                    >
                      Понятно
                    </Button>
                  </VStack>
                )}
              </VStack>
            </MotionBox>
          </MotionBox>
        </AnimatePresence>,
        document.body
      )}
    </MotionBox>
  );
}
