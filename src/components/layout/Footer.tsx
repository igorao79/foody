'use client';

import React from 'react';
import { Box, VStack, HStack, Text, Link, Icon, Container, Button } from '@chakra-ui/react';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiSmartphone } from 'react-icons/fi';

export function Footer() {
  return (
    <Box
      bg="linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)"
      color="var(--white)"
      mt="auto"
    >
      <Container maxW="1200px" py="var(--space-8)">
        <VStack gap="var(--space-6)" align="stretch">
          {/* Основная информация */}
          <HStack
            justify="space-between"
            align="flex-start"
            gap="var(--space-6)"
            flexWrap="wrap"
          >
            {/* Логотип и описание */}
            <VStack align="flex-start" gap="var(--space-3)" flex={1} minW="250px">
              <Text fontSize="var(--font-2xl)" fontWeight="var(--font-bold)">
                Фуди
              </Text>
              <Text fontSize="var(--font-sm)" opacity={0.9} lineHeight="1.5">
                Быстрая доставка вкусной еды из лучших ресторанов вашего города.
                Мы заботимся о качестве и скорости обслуживания.
              </Text>
            </VStack>

            {/* Контакты */}
            <VStack align="flex-start" gap="var(--space-3)" flex={1} minW="200px">
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)">
                Контакты
              </Text>
              <VStack align="flex-start" gap="var(--space-2)">
                <HStack gap="var(--space-2)">
                  <Icon as={FiPhone} boxSize={4} />
                  <Text fontSize="var(--font-sm)">+7 (999) 123-45-67</Text>
                </HStack>
                <HStack gap="var(--space-2)">
                  <Icon as={FiMail} boxSize={4} />
                  <Text fontSize="var(--font-sm)">info@fudi.ru</Text>
                </HStack>
                <HStack gap="var(--space-2)">
                  <Icon as={FiMapPin} boxSize={4} />
                  <Text fontSize="var(--font-sm)">г. Москва, ул. Примерная, 1</Text>
                </HStack>
              </VStack>
            </VStack>

            {/* Быстрые ссылки */}
            <VStack align="flex-start" gap="var(--space-3)" flex={1} minW="150px">
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)">
                Ссылки
              </Text>
              <VStack align="flex-start" gap="var(--space-2)">
                <Link
                  fontSize="var(--font-sm)"
                  opacity={0.9}
                  _hover={{ opacity: 1, textDecoration: 'underline' }}
                  href="/about"
                >
                  О нас
                </Link>
                <Link
                  fontSize="var(--font-sm)"
                  opacity={0.9}
                  _hover={{ opacity: 1, textDecoration: 'underline' }}
                  href="/restaurants"
                >
                  Рестораны
                </Link>
                <Link
                  fontSize="var(--font-sm)"
                  opacity={0.9}
                  _hover={{ opacity: 1, textDecoration: 'underline' }}
                  href="/careers"
                >
                  Вакансии
                </Link>
                <Link
                  fontSize="var(--font-sm)"
                  opacity={0.9}
                  _hover={{ opacity: 1, textDecoration: 'underline' }}
                  href="/support"
                >
                  Поддержка
                </Link>
              </VStack>
            </VStack>

            {/* Социальные сети */}
            <VStack align="flex-start" gap="var(--space-3)" flex={1} minW="150px">
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)">
                Мы в соцсетях
              </Text>
              <HStack gap="var(--space-3)">
                <Link
                  p="var(--space-2)"
                  borderRadius="var(--radius-full)"
                  bg="rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(10px)"
                  color="var(--white)"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  transition="all 0.2s ease"
                  href="#"
                  aria-label="Facebook"
                >
                  <Icon as={FiFacebook} boxSize={4} />
                </Link>
                <Link
                  p="var(--space-2)"
                  borderRadius="var(--radius-full)"
                  bg="rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(10px)"
                  color="var(--white)"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  transition="all 0.2s ease"
                  href="#"
                  aria-label="Instagram"
                >
                  <Icon as={FiInstagram} boxSize={4} />
                </Link>
                <Link
                  p="var(--space-2)"
                  borderRadius="var(--radius-full)"
                  bg="rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(10px)"
                  color="var(--white)"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                  transition="all 0.2s ease"
                  href="#"
                  aria-label="Twitter"
                >
                  <Icon as={FiTwitter} boxSize={4} />
                </Link>
              </HStack>
            </VStack>
          </HStack>

          {/* Скачать приложение */}
          <VStack align="center" gap="var(--space-4)" py="var(--space-4)">
            <HStack gap="var(--space-2)" align="center">
              <Icon as={FiSmartphone} boxSize={5} />
              <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)">
                Скачайте наше приложение
              </Text>
            </HStack>
            <Text fontSize="var(--font-sm)" opacity={0.9} textAlign="center" maxW="400px">
              Заказывайте еду быстрее и удобнее через мобильное приложение Фуди
            </Text>
            <HStack gap="var(--space-4)" flexWrap="wrap" justify="center">
              {/* Google Play */}
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  bg="var(--white)"
                  color="var(--primary)"
                  borderRadius="var(--radius-lg)"
                  px="var(--space-4)"
                  py="var(--space-3)"
                  fontSize="var(--font-sm)"
                  fontWeight="var(--font-medium)"
                  _hover={{
                    bg: 'var(--accent)',
                    color: 'var(--white)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(92, 219, 149, 0.3)'
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.3s ease"
                  minW="140px"
                >
                  <HStack gap="var(--space-2)">
                    <Text fontSize="var(--font-lg)">📱</Text>
                    <Text>Google Play</Text>
                  </HStack>
                </Button>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  bg="var(--white)"
                  color="var(--primary)"
                  borderRadius="var(--radius-lg)"
                  px="var(--space-4)"
                  py="var(--space-3)"
                  fontSize="var(--font-sm)"
                  fontWeight="var(--font-medium)"
                  _hover={{
                    bg: 'var(--accent)',
                    color: 'var(--white)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(92, 219, 149, 0.3)'
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.3s ease"
                  minW="140px"
                >
                  <HStack gap="var(--space-2)">
                    <Text fontSize="var(--font-lg)">🍎</Text>
                    <Text>App Store</Text>
                  </HStack>
                </Button>
              </a>
            </HStack>
          </VStack>

          <Box borderTop="1px solid rgba(255, 255, 255, 0.4)" />

          {/* Нижняя часть */}
          <HStack justify="space-between" align="center" flexWrap="wrap" gap="var(--space-4)">
            <Text fontSize="var(--font-sm)" opacity={0.9}>
              © 2026 Фуди. Все права защищены.
            </Text>
            <HStack gap="var(--space-6)" flexWrap="wrap">
              <Link
                fontSize="var(--font-sm)"
                opacity={0.9}
                _hover={{ opacity: 1, textDecoration: 'underline' }}
                href="/privacy"
              >
                Политика конфиденциальности
              </Link>
              <Link
                fontSize="var(--font-sm)"
                opacity={0.9}
                _hover={{ opacity: 1, textDecoration: 'underline' }}
                href="/terms"
              >
                Условия использования
              </Link>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
