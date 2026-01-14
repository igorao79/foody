'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Badge,
  Button
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiChevronRight, FiX } from 'react-icons/fi';

const MotionBox = motion(Box);

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: React.ElementType;
  color: string;
}

interface PersonalOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: Offer[];
}

export function PersonalOffersModal({ isOpen, onClose, offers }: PersonalOffersModalProps) {
  const handleOfferClick = (offerId: string) => {
    // В будущем можно добавить логику применения предложения
    console.log('Offer clicked:', offerId);
    onClose();
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

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0,0,0,0.5)"
        zIndex={1000}
        display="flex"
        alignItems="center"
        justifyContent="center"
      p="var(--space-4)"
      onClick={onClose}
    >
      <Box
        bg="var(--white)"
        borderRadius="var(--radius-xl)"
        maxW="500px"
        w="100%"
        maxH="80vh"
        overflow="auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Box p="var(--space-6)" borderBottom="1px solid var(--gray-200)">
          <HStack justify="space-between" align="center">
            <HStack gap="var(--space-3)">
              <Icon as={FiGift} boxSize={6} color="var(--primary)" />
              <VStack align="flex-start" gap="0">
                <Text fontSize="var(--font-xl)" fontWeight="var(--font-bold)" color="var(--primary)">
                  Персональные предложения
                </Text>
                <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                  Специально для вас
                </Text>
              </VStack>
            </HStack>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon as={FiX} boxSize={5} />
            </Button>
          </HStack>
        </Box>

        <Box p="var(--space-6)">
          <VStack gap="var(--space-4)" align="stretch">
            {offers.map((offer, index) => (
              <MotionBox
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Box
                  as="button"
                  onClick={() => handleOfferClick(offer.id)}
                  p="var(--space-4)"
                  borderRadius="var(--radius-lg)"
                  bg="var(--gray-50)"
                  border="2px solid var(--gray-200)"
                  _hover={{
                    borderColor: offer.color,
                    bg: `${offer.color}10`,
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                  transition="all 0.3s ease"
                  textAlign="left"
                  w="100%"
                >
                  <HStack gap="var(--space-4)" align="flex-start">
                    <Box
                      p="var(--space-3)"
                      borderRadius="var(--radius-lg)"
                      bg={offer.color}
                      color="var(--white)"
                      flexShrink={0}
                    >
                      <offer.icon size={24} />
                    </Box>

                    <VStack align="flex-start" flex={1} gap="var(--space-2)">
                      <HStack justify="space-between" align="flex-start" w="100%">
                        <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
                          {offer.title}
                        </Text>
                        <Badge
                          bg={offer.color}
                          color="var(--white)"
                          borderRadius="var(--radius-full)"
                          px="var(--space-3)"
                          py="var(--space-1)"
                          fontSize="var(--font-sm)"
                          fontWeight="var(--font-bold)"
                        >
                          {offer.discount}
                        </Badge>
                      </HStack>

                      <Text fontSize="var(--font-sm)" color="var(--gray-600)" lineHeight="1.4">
                        {offer.description}
                      </Text>
                    </VStack>

                    <Icon as={FiChevronRight} boxSize={5} color="var(--gray-400)" />
                  </HStack>
                </Box>
              </MotionBox>
            ))}

            <Box borderTop="1px solid var(--gray-200)" my="var(--space-4)" />

            <VStack gap="var(--space-3)">
              <Text fontSize="var(--font-base)" color="var(--gray-600)" textAlign="center">
                Предложения обновляются ежедневно
              </Text>
              <Button
                onClick={onClose}
                variant="outline"
                borderColor="var(--primary)"
                color="var(--primary)"
                borderRadius="var(--radius-lg)"
                px="var(--space-6)"
                _hover={{
                  bg: 'var(--primary)',
                  color: 'var(--white)'
                }}
              >
                Понятно
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
    </AnimatePresence>,
    document.body
  );
}
