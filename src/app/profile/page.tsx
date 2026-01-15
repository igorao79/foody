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
import { PersonalOffersMarquee } from '@/components/ui/carousel/PersonalOffersMarquee';

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
        <Layout showBottomNav={true}>
          <Header title="Профиль" showBackButton showCart showSearch={true} />
        </Layout>
      )}

      <Box pt={isDesktop ? "120px" : "0"} minH="100vh" position="relative" zIndex={1}>
        {/* Анимированная акцентная полоска - только на десктопе */}
        {isDesktop && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            height="4px"
            bg="linear-gradient(90deg, var(--accent) 0%, var(--primary) 50%, var(--accent) 100%)"
            backgroundSize="200% 100%"
            animation="gradientShift 3s ease-in-out infinite"
            css={{
              '@keyframes gradientShift': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' }
              }
            }}
          />
        )}
        <Box maxW="1400px" mx="auto" px={isDesktop ? "var(--space-6)" : "var(--space-4)"} py={isDesktop ? "var(--space-6)" : "var(--space-4)"}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Профиль пользователя */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p={isDesktop ? "var(--space-6)" : "var(--space-4)"}
              boxShadow="var(--shadow-sm)"
              mb={isDesktop ? "var(--space-6)" : "var(--space-4)"}
            >
              <HStack gap={isDesktop ? "var(--space-4)" : "var(--space-3)"} align="flex-start">
                <Box
                  w={isDesktop ? "80px" : "60px"}
                  h={isDesktop ? "80px" : "60px"}
                  borderRadius="var(--radius-full)"
                  bg="var(--primary)"
                  color="var(--white)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={isDesktop ? "var(--font-2xl)" : "var(--font-xl)"}
                  flexShrink={0}
                >
                  <FiUser size={isDesktop ? 32 : 24} />
                </Box>

                <VStack align="flex-start" flex={1} gap="var(--space-2)" minW={0}>
                  <Text
                    fontSize={isDesktop ? "var(--font-2xl)" : "var(--font-xl)"}
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                    wordBreak="break-word"
                  >
                    {user.name || user.email.split('@')[0]}
                  </Text>
                  {user.phone && (
                    <Text fontSize={isDesktop ? "var(--font-base)" : "var(--font-sm)"} color="var(--gray-600)">
                      {user.phone}
                    </Text>
                  )}
                  <Text
                    fontSize={isDesktop ? "var(--font-sm)" : "var(--font-xs)"}
                    color="var(--gray-500)"
                    wordBreak="break-word"
                  >
                    {user.email}
                  </Text>

                  <HStack gap="var(--space-2)" mt="var(--space-2)" flexWrap="wrap">
                    <Badge
                      colorScheme="green"
                      borderRadius="var(--radius-full)"
                      px={isDesktop ? "var(--space-3)" : "var(--space-2)"}
                      py="var(--space-1)"
                      fontSize={isDesktop ? "var(--font-sm)" : "var(--font-xs)"}
                    >
                      Gold статус
                    </Badge>
                    <Badge
                      variant="outline"
                      borderRadius="var(--radius-full)"
                      px={isDesktop ? "var(--space-3)" : "var(--space-2)"}
                      py="var(--space-1)"
                      fontSize={isDesktop ? "var(--font-sm)" : "var(--font-xs)"}
                    >
                      2 года с нами
                    </Badge>
                  </HStack>
                </VStack>
              </HStack>
            </Box>

            {/* Персональные предложения */}
            <PersonalOffersMarquee />

            {/* Кнопка выхода */}
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p={isDesktop ? "var(--space-6)" : "var(--space-4)"}
              boxShadow="var(--shadow-sm)"
              mb={isDesktop ? "var(--space-6)" : "var(--space-4)"}
            >
              <Button
                onClick={handleLogout}
                cursor="pointer"
                variant="outline"
                colorScheme="red"
                w="100%"
                borderRadius="var(--radius-lg)"
                py={isDesktop ? "var(--space-3)" : "var(--space-2)"}
                fontSize={isDesktop ? "var(--font-base)" : "var(--font-sm)"}
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
