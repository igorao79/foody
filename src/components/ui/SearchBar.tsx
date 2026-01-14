'use client';

import { Box, Input } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Поиск ресторанов и блюд...",
  onSearch,
  value = '',
  onChange
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    onSearch?.(newValue);
  };

  return (
    <MotionBox
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      px="var(--space-4)"
      py="var(--space-3)"
    >
      <Box position="relative">
        <Box
          position="absolute"
          left="var(--space-3)"
          top="50%"
          transform="translateY(-50%)"
          color="var(--gray-400)"
          zIndex={1}
        >
          <FiSearch size={20} />
        </Box>
        <Input
          placeholder={placeholder}
          bg="var(--white)"
          border="1px solid var(--gray-200)"
          borderRadius="var(--radius-lg)"
          _focus={{
            borderColor: 'var(--primary)',
            boxShadow: 'var(--shadow-md)',
          }}
          _hover={{
            borderColor: 'var(--gray-300)',
          }}
          fontSize="var(--font-base)"
          px="var(--space-4)"
          py="var(--space-3)"
          pl="48px"
          value={value}
          onChange={handleChange}
        />
      </Box>
    </MotionBox>
  );
}
