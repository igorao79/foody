'use client';

import { Box, Text, VStack, Icon, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Category } from '@/types';

const MotionBox = motion(Box);

interface CategoryScrollProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
}

export function CategoryScroll({ categories, selectedCategory, onCategorySelect }: CategoryScrollProps) {
  const itemWidth = useBreakpointValue({ base: '80px', md: '100px' });

  return (
    <Box
      px="var(--space-4)"
      py="var(--space-3)"
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
    >
      <Box display="flex" gap="var(--space-3)" minW="max-content">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id;

          return (
            <MotionBox
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              as="button"
              onClick={() => onCategorySelect?.(category.id)}
              minW={itemWidth}
              p="var(--space-3)"
              borderRadius="var(--radius-lg)"
              bg={isSelected ? 'var(--primary)' : 'var(--white)'}
              color={isSelected ? 'var(--white)' : 'var(--primary)'}
              border={isSelected ? 'none' : '1px solid var(--gray-200)'}
              boxShadow={isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              _hover={{
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <VStack gap="var(--space-1)">
                {typeof category.icon === 'function' ? (
                  <category.icon size={24} color={isSelected ? 'var(--white)' : category.color} />
                ) : (
                  <Icon as={category.icon} boxSize={6} />
                )}
                <Text
                  fontSize="var(--font-xs)"
                  fontWeight="var(--font-medium)"
                  textAlign="center"
                  lineHeight="1.2"
                  overflow="hidden"
                  display="-webkit-box"
                  style={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                  }}
                >
                  {category.name}
                </Text>
              </VStack>
            </MotionBox>
          );
        })}
      </Box>
    </Box>
  );
}
