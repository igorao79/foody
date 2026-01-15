'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Field,
  Alert,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { DesktopHeader } from '@/components/desktop/DesktopHeader';
import { useIsDesktop } from '@/hooks/useBreakpoint';
import { useAuth } from '@/contexts/AuthContext';

const MotionBox = motion(Box);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Ошибка входа');
    }

    setIsSubmitting(false);
  };


  return (
    <>
      {isDesktop ? (
        <DesktopHeader showOrderType={true} />
      ) : (
        <Layout showBottomNav={false}>
          <Header title="Вход" showBackButton />
        </Layout>
      )}

      <Box pt={isDesktop ? "120px" : "0"} minH="100vh" bg="var(--background)" py="var(--space-6)">
        <Box maxW="400px" mx="auto" px="var(--space-4)">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack gap="var(--space-6)" align="stretch">
              <Box textAlign="center">
                <Text fontSize="var(--font-3xl)" fontWeight="var(--font-bold)" color="var(--primary)" mb="var(--space-2)">
                  Добро пожаловать
                </Text>
                <Text fontSize="var(--font-base)" color="var(--gray-600)">
                  Войдите в свой аккаунт
                </Text>
              </Box>

              {error && (
                <Alert.Root status="error" borderRadius="var(--radius-lg)">
                  <Alert.Indicator />
                  <Alert.Title>{error}</Alert.Title>
                </Alert.Root>
              )}

              <Box as="form" onSubmit={handleLogin}>
                <VStack gap="var(--space-4)" align="stretch">
                  <Field.Root required>
                    <Field.Label color="var(--primary)">Email</Field.Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      bg="var(--white)"
                      borderColor="var(--gray-300)"
                      _focus={{
                        borderColor: 'var(--primary)',
                        boxShadow: '0 0 0 1px var(--primary)'
                      }}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label color="var(--primary)">Пароль</Field.Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ваш пароль"
                      bg="var(--white)"
                      borderColor="var(--gray-300)"
                      _focus={{
                        borderColor: 'var(--primary)',
                        boxShadow: '0 0 0 1px var(--primary)'
                      }}
                    />
                  </Field.Root>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    w="100%"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Вход..."
                    bg="var(--primary)"
                    _hover={{ bg: 'var(--primary-dark)' }}
                  >
                    Войти
                  </Button>
                </VStack>
              </Box>

              <Box textAlign="center">
                <Text fontSize="var(--font-sm)" color="var(--gray-500)">
                  Для тестирования введите любой email и пароль
                </Text>
                <Text fontSize="var(--font-sm)" color="var(--gray-500)" mt="var(--space-2)">
                  Email будет сохранен в профиле
                </Text>
              </Box>
            </VStack>
          </MotionBox>
        </Box>
      </Box>
    </>
  );
}
