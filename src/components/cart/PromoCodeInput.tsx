'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Text, HStack, Input, Button, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTag, FiCheck, FiX } from 'react-icons/fi';

const MotionBox = motion(Box);

interface PromoCodeInputProps {
  currentPromo?: string;
  onApplyPromo: (code: string) => { success: boolean; error?: string };
  onRemovePromo: () => void;
}

export function PromoCodeInput({ currentPromo, onApplyPromo, onRemovePromo }: PromoCodeInputProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleApply = () => {
    if (promoCode.trim()) {
      const result = onApplyPromo(promoCode.trim());
      setPromoCode('');
      setIsExpanded(false);

      if (result.success) {
        setNotification({ type: 'success', message: 'Промокод успешно применён!' });
      } else {
        setNotification({ type: 'error', message: result.error || 'Ошибка применения промокода' });
      }

      // Скрываем уведомление через 3 секунды
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemove = () => {
    onRemovePromo();
  };

  if (currentPromo) {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        p="var(--space-4)"
        borderRadius="var(--radius-lg)"
        bg="var(--accent)"
        color="var(--white)"
      >
        <HStack justify="space-between" align="center">
          <HStack gap="var(--space-2)">
            <FiTag />
            <VStack align="flex-start" gap="0">
              <Text fontSize="var(--font-sm)" fontWeight="var(--font-medium)">
                Промокод применён
              </Text>
              <Text fontSize="var(--font-base)" fontWeight="var(--font-bold)">
                {currentPromo.toUpperCase()}
              </Text>
            </VStack>
          </HStack>

          <Button
            size="sm"
            variant="ghost"
            color="var(--white)"
            opacity={0.8}
            cursor="pointer"
            _hover={{ opacity: 1, bg: 'rgba(255,255,255,0.1)' }}
            onClick={handleRemove}
          >
            Убрать
          </Button>
        </HStack>
      </MotionBox>
    );
  }

  return (
    <VStack align="stretch" gap="var(--space-3)">
      {!isExpanded ? (
        <MotionBox
          as="button"
          onClick={() => setIsExpanded(true)}
          cursor="pointer"
          p="var(--space-3)"
          borderRadius="var(--radius-lg)"
          border="1px dashed var(--gray-300)"
          bg="var(--gray-50)"
          color="var(--gray-600)"
          textAlign="left"
          _hover={{
            borderColor: 'var(--primary)',
            bg: 'var(--gray-100)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HStack gap="var(--space-2)">
            <FiTag />
            <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)">
              У меня есть промокод
            </Text>
          </HStack>
        </MotionBox>
      ) : (
        <MotionBox
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <VStack align="stretch" gap="var(--space-3)">
            <HStack gap="var(--space-2)">
              <Input
                placeholder="Введите промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                bg="var(--white)"
                border="1px solid var(--gray-200)"
                borderRadius="var(--radius-md)"
                fontSize="var(--font-base)"
                _focus={{
                  borderColor: 'var(--primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleApply();
                  }
                }}
              />
              <Button
                onClick={handleApply}
                cursor="pointer"
                bg="var(--primary)"
                color="var(--white)"
                borderRadius="var(--radius-md)"
                px="var(--space-4)"
                _hover={{ bg: 'var(--secondary)' }}
                disabled={!promoCode.trim()}
              >
                Применить
              </Button>
            </HStack>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              cursor="pointer"
              color="var(--gray-500)"
            >
              Отмена
            </Button>
          </VStack>
        </MotionBox>
      )}

      {/* Notification Portal */}
      {notification && createPortal(
        <AnimatePresence>
          <MotionBox
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            position="fixed"
            top="var(--space-4)"
            right="var(--space-4)"
            zIndex={9999}
            minW="300px"
            maxW="400px"
          >
            <Box
              p="var(--space-4)"
              borderRadius="var(--radius-lg)"
              bg={notification.type === 'success' ? 'var(--accent)' : 'var(--red-500)'}
              color="var(--white)"
              boxShadow="var(--shadow-lg)"
              border="1px solid rgba(255,255,255,0.2)"
            >
              <HStack gap="var(--space-3)" align="center">
                {notification.type === 'success' ? (
                  <FiCheck size={20} />
                ) : (
                  <FiX size={20} />
                )}
                <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)">
                  {notification.message}
                </Text>
              </HStack>
            </Box>
          </MotionBox>
        </AnimatePresence>,
        document.body
      )}
    </VStack>
  );
}
