'use client';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export function Rating({ value, size = 'md', showValue = true }: RatingProps) {
  const sizeMap = {
    sm: 3,
    md: 4,
    lg: 5,
  };

  const starSize = sizeMap[size];

  return (
    <HStack gap="var(--space-1)">
      <Icon as={FiStar} boxSize={starSize} color="var(--accent)" fill="var(--accent)" />
      {showValue && (
        <Text fontSize="var(--font-sm)" fontWeight="medium" color="var(--primary)">
          {value.toFixed(1)}
        </Text>
      )}
    </HStack>
  );
}
