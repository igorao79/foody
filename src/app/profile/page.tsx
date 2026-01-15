'use client';

import { Box, VStack, Text, HStack, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { DesktopHeader } from '@/components/desktop/DesktopHeader';
import { PersonalOffersMarquee } from '@/components/ui/carousel/PersonalOffersMarquee';
import { useIsDesktop } from '@/hooks/useBreakpoint';
import { FiUser, FiMapPin, FiCreditCard, FiHeart, FiShoppingBag, FiSettings } from 'react-icons/fi';

const MotionBox = motion(Box);

interface ProfileOption {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
}

const profileOptions: ProfileOption[] = [
  {
    id: 'orders',
    label: 'Мои заказы',
    icon: FiShoppingBag,
    description: 'История заказов и текущие',
    badge: '3'
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: FiHeart,
    description: 'Любимые рестораны и блюда',
    badge: '12'
  },
  {
    id: 'addresses',
    label: 'Адреса доставки',
    icon: FiMapPin,
    description: 'Управление адресами'
  },
  {
    id: 'payment',
    label: 'Способы оплаты',
    icon: FiCreditCard,
    description: 'Карты и платежные методы'
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: FiSettings,
    description: 'Настройки аккаунта'
  }
];

export default function ProfilePage() {
  const isDesktop = useIsDesktop();

  const handleOptionClick = (optionId: string) => {
    // В будущем можно добавить навигацию к соответствующим страницам
    console.log('Selected option:', optionId);
  };

  const handleLogout = () => {
    // Логика выхода из аккаунта
    console.log('Logout');
  };

  return (
    <>
      {isDesktop ? (
        <DesktopHeader showOrderType={false} />
      ) : (
        <Layout showBottomNav={false}>
          <Header title="Профиль" showBackButton showCart />
        </Layout>
      )}

      <Box pt={isDesktop ? "120px" : "0"} minH="100vh" bg="var(--background)">
        <Box maxW="1400px" mx="auto" px={isDesktop ? "var(--space-6)" : "var(--space-4)"} py="var(--space-6)">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Профиль пользователя */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-6)"
              boxShadow="var(--shadow-sm)"
              mb="var(--space-6)"
            >
              <HStack gap="var(--space-4)" align="flex-start">
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="var(--radius-full)"
                  bg="var(--primary)"
                  color="var(--white)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="var(--font-2xl)"
                >
                  <FiUser size={32} />
                </Box>

                <VStack align="flex-start" flex={1} gap="var(--space-2)">
                  <Text fontSize="var(--font-2xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                    Александр Петров
                  </Text>
                  <Text fontSize="var(--font-base)" color="var(--gray-600)">
                    +7 (999) 123-45-67
                  </Text>
                  <Text fontSize="var(--font-sm)" color="var(--gray-500)">
                    alex.petrov@email.com
                  </Text>

                  <HStack gap="var(--space-3)" mt="var(--space-2)">
                    <Badge colorScheme="green" borderRadius="var(--radius-full)" px="var(--space-3)" py="var(--space-1)">
                      Gold статус
                    </Badge>
                    <Badge variant="outline" borderRadius="var(--radius-full)" px="var(--space-3)" py="var(--space-1)">
                      2 года с нами
                    </Badge>
                  </HStack>
                </VStack>
              </HStack>
            </Box>

            {/* Статистика */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-6)"
              boxShadow="var(--shadow-sm)"
              mb="var(--space-6)"
            >
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-4)">
                Статистика
              </Text>

              <HStack gap="var(--space-6)" justify="space-around">
                <VStack gap="var(--space-1)">
                  <Text fontSize="var(--font-2xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                    47
                  </Text>
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                    Заказов
                  </Text>
                </VStack>

                <VStack gap="var(--space-1)">
                  <Text fontSize="var(--font-2xl)" fontWeight="var(--font-bold)" color="var(--accent)">
                    12450₽
                  </Text>
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                    Сэкономлено
                  </Text>
                </VStack>

                <VStack gap="var(--space-1)">
                  <Text fontSize="var(--font-2xl)" fontWeight="var(--font-bold)" color="var(--secondary)">
                    4.9
                  </Text>
                  <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                    Средний рейтинг
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Персональные предложения */}
            <PersonalOffersMarquee />

            {/* Опции профиля */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-6)"
              boxShadow="var(--shadow-sm)"
            >
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)" mb="var(--space-4)">
                Управление аккаунтом
              </Text>

              <VStack gap="var(--space-3)" align="stretch">
                {profileOptions.map((option, index) => (
                  <MotionBox
                    key={option.id}
                    as="button"
                    onClick={() => handleOptionClick(option.id)}
                    p="var(--space-4)"
                    borderRadius="var(--radius-lg)"
                    bg="var(--gray-50)"
                    _hover={{
                      bg: 'var(--gray-100)',
                      transform: 'translateX(4px)'
                    }}
                    textAlign="left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <HStack justify="space-between" align="center">
                      <HStack gap="var(--space-3)">
                        <Box
                          p="var(--space-2)"
                          borderRadius="var(--radius-md)"
                          bg="var(--primary)"
                          color="var(--white)"
                        >
                          <option.icon size={20} />
                        </Box>

                        <VStack align="flex-start" gap="0">
                          <HStack gap="var(--space-2)">
                            <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                              {option.label}
                            </Text>
                            {option.badge && (
                              <Badge colorScheme="red" borderRadius="var(--radius-full)" fontSize="var(--font-xs)">
                                {option.badge}
                              </Badge>
                            )}
                          </HStack>
                          <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                            {option.description}
                          </Text>
                        </VStack>
                      </HStack>

                      <Box color="var(--gray-400)" fontSize="var(--font-lg)">
                        →
                      </Box>
                    </HStack>
                  </MotionBox>
                ))}
              </VStack>

              <Box my="var(--space-6)" borderTop="1px solid var(--gray-200)" />

              {/* Кнопка выхода */}
              <Button
                onClick={handleLogout}
                variant="outline"
                colorScheme="red"
                w="100%"
                borderRadius="var(--radius-lg)"
                py="var(--space-3)"
                _hover={{
                  bg: 'red.50',
                  borderColor: 'red.300'
                }}
              >
                Выйти из аккаунта
              </Button>
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}
