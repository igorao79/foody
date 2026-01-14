'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { FiCheck, FiTruck } from 'react-icons/fi';
import { Layout } from '@/components/layout/Layout';

const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function SuccessPage() {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    // Запускаем анимацию через небольшую задержку
    const timer = setTimeout(() => {
      controls.start({
        scale: [0, 1.2, 1],
        rotate: [0, 180, 360],
        transition: { duration: 1, ease: "easeInOut" }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [controls]);

  const handleTrackOrder = () => {
    // В реальном приложении здесь была бы навигация к отслеживанию заказа
    console.log('Track order');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  // Генерируем номер заказа
  const [orderNumber] = useState(() => `FD${Date.now().toString().slice(-6)}`);

  return (
    <Layout showBottomNav={false}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="var(--space-4)"
      >
        <VStack gap="var(--space-6)" maxW="400px" textAlign="center">
          {/* Анимация успеха */}
          <MotionBox
            animate={controls}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="120px"
            h="120px"
            borderRadius="50%"
            bg="var(--accent)"
            color="var(--white)"
            boxShadow="var(--shadow-lg)"
          >
            <FiCheck size={60} />
          </MotionBox>

          {/* Заголовок */}
          <VStack gap="var(--space-2)">
            <MotionText
              fontSize="var(--font-2xl)"
              fontWeight="var(--font-bold)"
              color="var(--primary)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Заказ оформлен!
            </MotionText>
            <MotionText
              fontSize="var(--font-base)"
              color="var(--gray-600)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Спасибо за заказ. Мы уже готовим вашу еду!
            </MotionText>
          </VStack>

          {/* Информация о заказе */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            w="100%"
            p="var(--space-5)"
            borderRadius="var(--radius-lg)"
            bg="var(--white)"
            boxShadow="var(--shadow-md)"
            border="1px solid var(--gray-200)"
          >
            <VStack gap="var(--space-4)">
              {/* Номер заказа */}
              <VStack gap="var(--space-1)">
                <Text fontSize="var(--font-sm)" color="var(--gray-600)" fontWeight="var(--font-medium)">
                  Номер заказа
                </Text>
                <Text fontSize="var(--font-xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                  {orderNumber}
                </Text>
              </VStack>

              {/* Время доставки */}
              <VStack gap="var(--space-1)">
                <HStack gap="var(--space-2)" color="var(--secondary)">
                  <FiTruck size={18} />
                  <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                    Ожидаемое время доставки
                  </Text>
                </HStack>
                <Text fontSize="var(--font-base)" color="var(--primary)">
                  25-35 минут
                </Text>
              </VStack>
            </VStack>
          </MotionBox>

          {/* Кнопки действий */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            w="100%"
          >
            <VStack gap="var(--space-3)">
              <Button
                w="100%"
                size="lg"
                bg="var(--primary)"
                color="var(--white)"
                borderRadius="var(--radius-lg)"
                fontSize="var(--font-base)"
                fontWeight="var(--font-semibold)"
                py="var(--space-4)"
                _hover={{ bg: 'var(--secondary)' }}
                onClick={handleTrackOrder}
              >
                Отследить заказ
              </Button>

              <Button
                w="100%"
                variant="outline"
                borderColor="var(--gray-300)"
                color="var(--primary)"
                borderRadius="var(--radius-lg)"
                fontSize="var(--font-base)"
                fontWeight="var(--font-semibold)"
                py="var(--space-4)"
                _hover={{
                  bg: 'var(--primary)',
                  color: 'var(--white)',
                  borderColor: 'var(--primary)',
                }}
                onClick={handleGoHome}
              >
                Вернуться на главную
              </Button>
            </VStack>
          </MotionBox>
        </VStack>
      </MotionBox>
    </Layout>
  );
}
