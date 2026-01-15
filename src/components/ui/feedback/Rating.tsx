'use client';

import React from 'react';
import { HStack, Icon, Text } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  clickable?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: 'filled' | 'outline';
  textColor?: string;
}

export function Rating({
  value,
  size = 'md',
  showValue = true,
  clickable = false,
  onClick,
  variant = 'filled',
  textColor
}: RatingProps) {
  const sizeMap = {
    sm: 3,
    md: 4,
    lg: 5,
  };

  const starSize = sizeMap[size];

  const handleClick = (e?: React.MouseEvent) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  const cursor = clickable ? 'pointer' : 'default';

  return (
    <HStack
      gap="var(--space-1)"
      onClick={handleClick}
      cursor={cursor}
      borderRadius="var(--radius-md)"
      border={variant === 'outline' ? '1px solid var(--gray-300)' : 'none'}
      px={variant === 'outline' ? 'var(--space-2)' : '0'}
      py={variant === 'outline' ? 'var(--space-1)' : '0'}
      bg={variant === 'outline' ? 'var(--gray-50)' : 'transparent'}
      _hover={clickable ? { bg: 'var(--gray-100)' } : {}}
      transition="all 0.2s"
    >
      <Icon
        as={FiStar}
        boxSize={starSize}
        color="var(--accent)"
        fill="var(--accent)"
      />
      {showValue && (
        <Text fontSize="var(--font-sm)" fontWeight="medium" color={textColor || "var(--primary)"}>
          {value.toFixed(1)}
        </Text>
      )}
    </HStack>
  );
}