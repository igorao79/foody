'use client';

import { useState } from 'react';
import { Box, Text, HStack, Icon, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGift, FiPercent, FiStar, FiZap } from 'react-icons/fi';
import { PersonalOffersModal } from './PersonalOffersModal';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: React.ElementType;
  color: string;
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'Скидка 20% на пиццу',
    description: 'На все виды пиццы в ресторане "Итальянская кухня"',
    discount: '-20%',
    icon: FiPercent,
    color: 'var(--accent)'
  },
  {
    id: '2',
    title: 'Бесплатная доставка',
    description: 'При заказе от 1000₽',
    discount: 'Бесплатно',
    icon: FiGift,
    color: 'var(--secondary)'
  },
  {
    id: '3',
    title: 'Специальное предложение',
    description: 'Попробуйте новое блюдо со скидкой 15%',
    discount: '-15%',
    icon: FiStar,
    color: 'var(--primary)'
  },
  {
    id: '4',
    title: 'Скоростная доставка',
    description: 'Доставим ваш заказ за 20 минут',
    discount: 'Быстрее',
    icon: FiZap,
    color: 'var(--accent)'
  },
  {
    id: '5',
    title: 'VIP скидка',
    description: 'Персональная скидка для постоянных клиентов',
    discount: '-25%',
    icon: FiStar,
    color: 'var(--secondary)'
  }
];

export function PersonalOffersMarquee() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box
        as="button"
        onClick={() => setIsModalOpen(true)}
        cursor="pointer"
        position="relative"
        overflow="hidden"
        bg="linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)"
        borderRadius="var(--radius-lg)"
        p="var(--space-3)"
        mb="var(--space-4)"
        boxShadow="var(--shadow-md)"
        _hover={{
          boxShadow: 'var(--shadow-lg)',
          transform: 'translateY(-2px)'
        }}
        transition="all 0.3s ease"
      >
        {/* Анимированная полоска */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
        >
          <motion.div
            animate={{
              x: ['100%', '-100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            {/* Дублируем предложения для бесконечной анимации */}
            {[...offers, ...offers, ...offers].map((offer, index) => (
              <HStack
                key={`${offer.id}-${index}`}
                gap="var(--space-2)"
                color="var(--white)"
                opacity={0.9}
                flexShrink={0}
              >
                <Icon as={offer.icon} boxSize={4} />
                <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                  {offer.title}
                </Text>
                <Badge
                  bg="rgba(255,255,255,0.2)"
                  color="var(--white)"
                  borderRadius="var(--radius-sm)"
                  fontSize="var(--font-xs)"
                  px="var(--space-2)"
                  py="var(--space-1)"
                >
                  {offer.discount}
                </Badge>
              </HStack>
            ))}
          </motion.div>
        </Box>

        {/* Полупрозрачный оверлей с текстом */}
        <Box
          position="relative"
          zIndex={1}
          textAlign="center"
          py="var(--space-1)"
        >
          <HStack justify="center" gap="var(--space-2)">
            <Icon as={FiGift} boxSize={4} color="var(--white)" />
            <Text fontSize="var(--font-sm)" fontWeight="var(--font-bold)" color="var(--white)">
              Персональные предложения
            </Text>
            <Text fontSize="var(--font-sm)" color="rgba(255,255,255,0.8)">
              Нажмите, чтобы посмотреть все
            </Text>
          </HStack>
        </Box>
      </Box>

      <PersonalOffersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offers={offers}
      />
    </>
  );
}
