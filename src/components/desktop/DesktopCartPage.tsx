'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button, Container, Grid, GridItem, Icon, Input, NativeSelect, Textarea, Circle, Stack } from '@chakra-ui/react';
import { FiShoppingCart, FiMapPin, FiCheck, FiClock, FiShoppingBag, FiTruck, FiMapPin as FiMapPinIcon, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '@/components/cart/CartItem';
import { PromoCodeInput } from '@/components/cart/PromoCodeInput';
import { DesktopHeader } from './DesktopHeader';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { restaurants } from '@/utils/mockData';

const MotionBox = motion(Box);

export function DesktopCartPage() {
  const router = useRouter();
  const { cart, updateItem, removeItem, applyPromo, removePromo, clearCart } = useCart();
  const { orderType } = useOrder();

  console.log('DesktopCartPage orderType:', orderType); // Debug

  // Находим адрес ресторана с наибольшим количеством товаров для pickup
  const getPickupAddress = () => {
    if (cart.items.length === 0) return 'Адрес ресторана';

    const restaurantCounts: { [key: string]: number } = {};
    cart.items.forEach(item => {
      restaurantCounts[item.dish.restaurantId] = (restaurantCounts[item.dish.restaurantId] || 0) + item.quantity;
    });

    const mainRestaurantId = Object.entries(restaurantCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    const restaurant = restaurants.find(r => r.id === mainRestaurantId);
    return restaurant?.address || 'Адрес ресторана';
  };
  const [showCheckout, setShowCheckout] = useState(false);
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
    { label: 'Заказ получен', icon: FiMapPinIcon },
  ];

  const pickupSteps = [
    { label: 'Заказ передан в ресторан', icon: FiShoppingBag },
    { label: 'Заказ готовится', icon: FiClock },
    { label: 'Заказ получен', icon: FiMapPinIcon },
  ];

  const steps = orderType === 'pickup' ? pickupSteps : deliverySteps;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

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

  const handlePromoApplyWrapper = (code: string) => {
    return applyPromo(code);
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
        <DesktopHeader showOrderType={true} />
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

  // Если корзина пуста, показываем пустое состояние
  if (cart.items.length === 0) {
    return (
      <>
        <DesktopHeader showOrderType={true} />
        <Container maxW="1400px" py="var(--space-6)" pt="120px">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            py="var(--space-12)"
          >
            <Icon as={FiShoppingCart} boxSize={16} color="var(--gray-300)" mb="var(--space-4)" />
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
      <DesktopHeader showOrderType={true} />
      <Container maxW="1400px" py="var(--space-6)" pt="120px" pb="120px">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <HStack gap="var(--space-3)" align="center" mb="var(--space-6)">
          {showCheckout && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleBackToCart}
              cursor="pointer"
              p="var(--space-2)"
              borderRadius="var(--radius-md)"
              _hover={{ bg: 'var(--gray-100)' }}
            >
              ←
            </Button>
          )}
          <Text
            fontSize="var(--font-3xl)"
            fontWeight="var(--font-bold)"
            color="var(--primary)"
          >
            {showCheckout ? 'Оформление заказа' : 'Корзина'}
          </Text>
        </HStack>

        {showCheckout ? (
          // Форма оформления заказа
          <Box maxW="600px" mx="auto" bg="var(--white)" p="var(--space-8)" borderRadius="var(--radius-xl)" boxShadow="var(--shadow-lg)">
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
                    <option value="online">Оплатить онлайн</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Box>

              {/* Комментарий */}
              <Box>
                <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-3)">
                  Комментарий к заказу
                </Text>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Укажите дополнительные пожелания или инструкции для курьера..."
                  bg="var(--gray-50)"
                  border="1px solid var(--gray-200)"
                  borderRadius="var(--radius-lg)"
                  fontSize="var(--font-base)"
                  minH="80px"
                  _focus={{
                    borderColor: 'var(--primary)',
                    boxShadow: 'var(--shadow-sm)',
                    bg: 'var(--white)'
                  }}
                  resize="none"
                />
              </Box>

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

                  {(() => {
                    console.log('Rendering delivery/pickup block with orderType:', orderType);
                    return orderType === 'delivery' ? (
                      <HStack justify="space-between" key="delivery">
                        <Text fontSize="var(--font-base)" color="var(--gray-600)">
                          Доставка
                        </Text>
                        <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                          {cart.deliveryFee}₽
                        </Text>
                      </HStack>
                    ) : (
                      <VStack align="flex-start" gap="var(--space-1)" key="pickup">
                        <Text fontSize="var(--font-base)" color="var(--gray-600)">
                          Самовывоз
                        </Text>
                        <Text fontSize="var(--font-sm)" color="var(--primary)">
                          Адрес: {getPickupAddress()}
                        </Text>
                      </VStack>
                    );
                  })()}

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

              <Button
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
                w="100%"
              >
                {!selectedAddress.trim() ? 'Введите адрес доставки' : `Оформить заказ • ${cart.total}₽`}
              </Button>
            </VStack>
          </Box>
        ) : (
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
                  onApplyPromo={handlePromoApplyWrapper}
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
                  cursor="pointer"
                  _hover={{ bg: 'var(--secondary)' }}
                  _active={{ bg: 'var(--secondary)' }}
                  onClick={handleCheckout}
                >
                  Оформить заказ • {cart.total}₽
                </Button>
              </VStack>
            </Box>
          </GridItem>
          </Grid>
        )}
        </MotionBox>
      </Container>

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
                  <Stack direction="column" gap="0" w="100%" align="stretch">
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
    </>
  );
}
 