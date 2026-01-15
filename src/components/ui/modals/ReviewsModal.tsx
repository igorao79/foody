'use client';

import React from 'react';
import {
  Dialog,
  VStack,
  HStack,
  Text,
  Box,
  Icon,
  Separator,
  Portal,
} from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  reviews?: Review[];
}

// Моковые отзывы для Итальянского двора
const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Анна Петрова',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Потрясающая пицца! Маргарита была просто идеальной - тонкое тесто, свежие ингредиенты. Обязательно вернусь за карбонарой.',
    date: '15 янв 2025',
  },
  {
    id: '2',
    userName: 'Михаил Иванов',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    comment: 'Хорошая итальянская кухня. Пицца вкусная, но доставили чуть позже заявленного времени. Атмосфера в ресторане приятная.',
    date: '12 янв 2025',
  },
  {
    id: '3',
    userName: 'Елена Смирнова',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Лучшая паста в городе! Карбонара просто шедевр. Официанты внимательные, порции щедрые. Рекомендую всем!',
    date: '10 янв 2025',
  },
  {
    id: '4',
    userName: 'Дмитрий Козлов',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    comment: 'Отличное место для романтического ужина. Кухня аутентичная, цены адекватные. Единственный минус - шумно, когда много посетителей.',
    date: '8 янв 2025',
  },
];

export function ReviewsModal({ isOpen, onClose, restaurantName, reviews = mockReviews }: ReviewsModalProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        as={FiStar}
        boxSize={4}
        color={index < rating ? 'var(--accent)' : 'var(--gray-300)'}
        fill={index < rating ? 'var(--accent)' : 'none'}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Dialog.Root open={isOpen} onOpenChange={onClose} size="lg">
          <Dialog.Backdrop />
          <Dialog.Content
            borderRadius="var(--radius-xl)"
            maxH="80vh"
            overflow="hidden"
            maxW="600px"
            w="90%"
          >
            <Dialog.Header color="var(--primary)" fontSize="var(--font-xl)">
              Отзывы о {restaurantName}
            </Dialog.Header>
            <Dialog.CloseTrigger />

            <Dialog.Body pb="var(--space-6)" maxH="60vh" overflowY="auto">
              <VStack gap="var(--space-6)" align="stretch">
                {reviews.map((review, index) => (
                  <Box key={review.id}>
                    <HStack gap="var(--space-3)" align="flex-start">
                      <Box
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        bg="var(--gray-300)"
                        border="2px solid var(--gray-200)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="var(--font-lg)"
                        fontWeight="bold"
                        color="var(--primary)"
                      >
                        {review.userName.charAt(0).toUpperCase()}
                      </Box>

                      <VStack align="flex-start" gap="var(--space-2)" flex={1}>
                        <HStack justify="space-between" w="100%" align="center">
                          <Text fontWeight="var(--font-semibold)" color="var(--primary)">
                            {review.userName}
                          </Text>
                          <Text fontSize="var(--font-sm)" color="var(--gray-500)">
                            {review.date}
                          </Text>
                        </HStack>

                        <HStack gap="var(--space-1)">
                          {renderStars(review.rating)}
                          <Text fontSize="var(--font-sm)" color="var(--gray-600)" ml="var(--space-1)">
                            {review.rating}.0
                          </Text>
                        </HStack>

                        <Text fontSize="var(--font-base)" color="var(--gray-700)" lineHeight="1.5">
                          {review.comment}
                        </Text>
                      </VStack>
                    </HStack>

                    {index < reviews.length - 1 && (
                      <Separator mt="var(--space-4)" />
                    )}
                  </Box>
                ))}
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </Portal>
  );
}
