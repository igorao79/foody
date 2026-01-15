'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box, VStack, Text, HStack, Button, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiX } from 'react-icons/fi';

const MotionBox = motion(Box);

interface PromoItem {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: any;
  color: string;
  promoCode?: string;
}

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  promo: PromoItem | null;
}

export function PromoModal({ isOpen, onClose, promo }: PromoModalProps) {
  const handleCopyCode = () => {
    if (promo?.promoCode) {
      navigator.clipboard.writeText(promo.promoCode);
      // Можно добавить уведомление о копировании
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!promo) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={2000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <MotionBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.6)"
          />

          <MotionBox
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            bg="var(--white)"
            borderRadius="var(--radius-xl)"
            maxW="sm"
            w="90%"
            p="var(--space-6)"
            boxShadow="var(--shadow-lg)"
            position="relative"
            zIndex={2001}
          >
            {/* Кнопка закрытия */}
            <Box
              position="absolute"
              top="var(--space-3)"
              right="var(--space-3)"
              as="button"
              onClick={onClose}
              cursor="pointer"
              color="var(--gray-400)"
              _hover={{ color: 'var(--gray-600)' }}
            >
              <FiX size={20} />
            </Box>

            {/* Иконка акции */}
            <Box
              w="80px"
              h="80px"
              borderRadius="var(--radius-full)"
              bg={promo.color}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb="var(--space-4)"
            >
              <Icon as={promo.icon} boxSize={10} color="var(--white)" />
            </Box>

            {/* Заголовок */}
            <Text
              fontSize="var(--font-xl)"
              fontWeight="var(--font-bold)"
              color="var(--primary)"
              textAlign="center"
              mb="var(--space-2)"
            >
              {promo.title}
            </Text>

            {/* Описание */}
            <Text
              fontSize="var(--font-base)"
              color="var(--gray-600)"
              textAlign="center"
              mb="var(--space-4)"
            >
              {promo.description}
            </Text>

            {/* Промокод */}
            {promo.promoCode && (
              <Box
                bg="var(--gray-50)"
                borderRadius="var(--radius-lg)"
                p="var(--space-4)"
                mb="var(--space-4)"
                textAlign="center"
              >
                <Text
                  fontSize="var(--font-sm)"
                  color="var(--gray-600)"
                  mb="var(--space-2)"
                >
                  Ваш промокод:
                </Text>
                <HStack
                  justify="center"
                  gap="var(--space-2)"
                  p="var(--space-3)"
                  bg="var(--white)"
                  borderRadius="var(--radius-md)"
                  border="2px dashed var(--gray-200)"
                >
                  <Text
                    fontSize="var(--font-lg)"
                    fontWeight="var(--font-bold)"
                    color="var(--primary)"
                    fontFamily="monospace"
                  >
                    {promo.promoCode}
                  </Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyCode}
                    cursor="pointer"
                    _hover={{ bg: 'var(--gray-100)' }}
                  >
                    <FiCopy size={16} />
                  </Button>
                </HStack>
              </Box>
            )}

            {/* Скидка */}
            <Box textAlign="center" mb="var(--space-4)">
              <Text
                fontSize="var(--font-2xl)"
                fontWeight="var(--font-bold)"
                color={promo.color}
              >
                {promo.discount}
              </Text>
            </Box>

            {/* Кнопка применения */}
            <Button
              w="100%"
              bg={promo.color}
              color="var(--white)"
              borderRadius="var(--radius-lg)"
              fontSize="var(--font-base)"
              fontWeight="var(--font-semibold)"
              py="var(--space-3)"
              _hover={{ bg: promo.color, opacity: 0.9 }}
              onClick={onClose}
              cursor="pointer"
            >
              Применить акцию
            </Button>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>,
    document.body
  );
}
