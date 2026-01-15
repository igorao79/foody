'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, VStack, Text, HStack, Badge, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Header } from '@/components/ui/navigation/Header';
import { DesktopHeader } from '@/components/desktop/DesktopHeader';
import { useIsDesktop } from '@/hooks/useBreakpoint';
import { useAuth } from '@/contexts/AuthContext';
import { FiUser } from 'react-icons/fi';

const MotionBox = motion(Box);


export default function ProfilePage() {
  const isDesktop = useIsDesktop();
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Show loading or redirect while checking auth
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };



  return (
    <>
      {isDesktop ? (
        <DesktopHeader showOrderType={true} />
      ) : (
        <Layout showBottomNav={false}>
          <Header title="Профиль" showBackButton showCart />
        </Layout>
      )}

      <Box pt={isDesktop ? "120px" : "0"} minH="100vh" position="relative" zIndex={1}>
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
                    {user.name || user.email.split('@')[0]}
                  </Text>
                  {user.phone && (
                    <Text fontSize="var(--font-base)" color="var(--gray-600)">
                      {user.phone}
                    </Text>
                  )}
                  <Text fontSize="var(--font-sm)" color="var(--gray-500)">
                    {user.email}
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

            {/* Кнопка выхода */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-6)"
              boxShadow="var(--shadow-sm)"
              mb="var(--space-6)"
            >
              <Button
                onClick={handleLogout}
                cursor="pointer"
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

            {/* Персональные предложения */}
          </MotionBox>
        </Box>
      </Box>

    </>
  );
}
