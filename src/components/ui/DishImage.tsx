'use client';

import { Box, Text, AspectRatio, Icon } from '@chakra-ui/react';
import { FiCoffee } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface DishImageProps {
  name: string;
}

export function DishImage({ name }: DishImageProps) {
  return (
    <MotionBox
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AspectRatio ratio={1}>
        <Box
          bg="linear-gradient(135deg, var(--secondary) 0%, var(--accent) 50%, var(--light) 100%)"
          borderRadius="var(--radius-xl)"
          overflow="hidden"
          position="relative"
        >
          {/* Плейсхолдер для изображения */}
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
            <Icon as={FiCoffee} boxSize={12} />
          </Box>

          {/* Название блюда на изображении */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p="var(--space-4)"
            bg="linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
            color="var(--white)"
          >
            <Text
              fontSize="var(--font-xl)"
              fontWeight="var(--font-bold)"
              lineHeight="1.2"
              textShadow="0 2px 4px rgba(0,0,0,0.5)"
            >
              {name}
            </Text>
          </Box>
        </Box>
      </AspectRatio>
    </MotionBox>
  );
}
