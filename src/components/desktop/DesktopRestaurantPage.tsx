'use client';

import { useParams, useRouter } from 'next/navigation';
import { Box, VStack, HStack, Text, Container, Grid, GridItem, Badge, Icon } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { MenuTabs } from '@/components/restaurant/MenuTabs';
import { FloatingCartButton } from '@/components/cart/FloatingCartButton';
import { DesktopHeader } from './DesktopHeader';
import { useCart } from '@/contexts/CartContext';
import { restaurants, dishes } from '@/utils/mockData';
import { Dish } from '@/types';

const MotionBox = motion(Box);

export function DesktopRestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const { cart, getItemCount } = useCart();

  const restaurantId = params?.id as string;
  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <Container maxW="1400px" py="var(--space-6)">
        <Text fontSize="var(--font-lg)" color="var(--gray-600)">
          Ресторан не найден
        </Text>
      </Container>
    );
  }

  const handleDishClick = (dish: Dish) => {
    router.push(`/dish/${dish.id}?restaurant=${restaurantId}`);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <>
      <DesktopHeader showOrderType={false} />

      <Container maxW="1400px" py="var(--space-6)" pt="120px">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <Grid templateColumns="300px 1fr" gap="var(--space-6)">
          {/* Левая колонка - Информация о ресторане */}
          <GridItem>
            <Box
              position="sticky"
              top="var(--space-6)"
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              p="var(--space-5)"
              boxShadow="var(--shadow-md)"
            >
              <VStack align="stretch" gap="var(--space-4)">
                {/* Фото ресторана */}
                <Box
                  w="100%"
                  h="200px"
                  borderRadius="var(--radius-lg)"
                  bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 50%, var(--light) 100%)"
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="var(--gray-200)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0.1}
                  >
                    <Icon as={FiHome} boxSize={12} />
                  </Box>

                  {/* Статус открытия */}
                  <Box position="absolute" top="var(--space-3)" right="var(--space-3)">
                    <Badge
                      colorScheme={restaurant.isOpen ? 'green' : 'red'}
                      variant="solid"
                      borderRadius="var(--radius-full)"
                      px="var(--space-3)"
                      py="var(--space-1)"
                      fontSize="var(--font-xs)"
                    >
                      {restaurant.isOpen ? 'Открыто' : 'Закрыто'}
                    </Badge>
                  </Box>
                </Box>

                {/* Информация о ресторане */}
                <VStack align="flex-start" gap="var(--space-3)">
                  <Text
                    fontSize="var(--font-xl)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                  >
                    {restaurant.name}
                  </Text>

                  <Text
                    fontSize="var(--font-sm)"
                    color="var(--gray-600)"
                  >
                    {restaurant.cuisines.join(' • ')}
                  </Text>

                  <HStack gap="var(--space-4)">
                    <HStack gap="var(--space-1)">
                      <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)" color="var(--primary)">
                        ⭐ {restaurant.rating}
                      </Text>
                    </HStack>
                    <HStack gap="var(--space-1)">
                      <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)" color="var(--primary)">
                        🕐 {restaurant.deliveryTime}
                      </Text>
                    </HStack>
                    <HStack gap="var(--space-1)">
                      <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)" color="var(--primary)">
                        💰 {restaurant.deliveryFee}₽ доставка
                      </Text>
                    </HStack>
                  </HStack>

                  {restaurant.description && (
                    <Text
                      fontSize="var(--font-sm)"
                      color="var(--gray-600)"
                      lineHeight="1.4"
                    >
                      {restaurant.description}
                    </Text>
                  )}
                </VStack>
              </VStack>
            </Box>
          </GridItem>

          {/* Правая колонка - Меню */}
          <GridItem>
            <Box
              bg="var(--white)"
              borderRadius="var(--radius-lg)"
              boxShadow="var(--shadow-md)"
              overflow="hidden"
            >
              <MenuTabs
                dishes={dishes}
                onDishClick={handleDishClick}
              />
            </Box>
          </GridItem>
        </Grid>

          {/* Floating Cart Button */}
          <FloatingCartButton
            itemCount={getItemCount()}
            totalPrice={cart.total}
            onClick={handleCartClick}
          />
        </MotionBox>
      </Container>
    </>
  );
}
