'use client';

import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface LoaderProps {
  message?: string;
}

export function Loader({ message = 'Загрузка...' }: LoaderProps) {
  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="var(--white)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <VStack gap="var(--space-4)" align="center">
        <Box as="span" className="custom-loader" />
        <Text
          fontSize="var(--font-lg)"
          fontWeight="var(--font-medium)"
          color="var(--primary)"
          textAlign="center"
        >
          {message}
        </Text>
      </VStack>
    </MotionBox>
  );
}
