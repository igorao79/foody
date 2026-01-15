'use client';

import React from 'react';
import {
  Box,
  Icon,
} from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface SupportChatWidgetProps {
  onChatOpen?: () => void;
}

export function SupportChatWidget({ onChatOpen }: SupportChatWidgetProps = {}) {
  return (
    <MotionBox
      as="button"
      position="fixed"
      bottom="var(--space-6)"
      right="var(--space-6)"
      zIndex={999}
      w="60px"
      h="60px"
      bg="var(--primary)"
      color="var(--white)"
      borderRadius="var(--radius-full)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      boxShadow="var(--shadow-lg)"
      whileHover={{
        scale: 1.1,
        boxShadow: '0 8px 25px rgba(5, 56, 107, 0.4)',
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (onChatOpen) {
          onChatOpen();
        }
      }}
    >
      <Icon as={FiHelpCircle} boxSize={6} />
    </MotionBox>
  );
}
