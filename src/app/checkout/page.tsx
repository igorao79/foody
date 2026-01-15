'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, VStack, Text, HStack, Button, Input, NativeSelect, Textarea, Icon, Circle, Stack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiClock, FiShoppingBag, FiTruck, FiMapPin, FiX } from 'react-icons/fi';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';

const MotionBox = motion(Box);

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { orderType } = useOrder();

  const [selectedAddress, setSelectedAddress] = useState('Ленинский проспект, 1');
  const [deliveryTime, setDeliveryTime] = useState('asap');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [comment, setComment] = useState('');
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

  const handlePlaceOrder = () => {
    if (!selectedAddress.trim()) {
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
          // Убираем редирект, оставляем модалку открытой
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

        <Box p="var(--space-6)" pb="120px" position="relative">
          <VStack align="stretch" gap="var(--space-6)">
            {/* Форма с белым фоном */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-6)"
              boxShadow="var(--shadow-sm)"
            >
              <VStack align="stretch" gap="var(--space-6)">
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
              </VStack>
            </Box>

            {/* Итоговая сумма */}
            <Box
              p="var(--space-6)"
              borderRadius="var(--radius-lg)"
              bg="var(--white)"
              border="1px solid var(--gray-200)"
              boxShadow="var(--shadow-sm)"
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
                        mt={index === 0 ? 0 : "var(--space-50)"}
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
    </Layout>
  );
}
