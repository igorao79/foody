'use client';

import React, { useState, useEffect } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          position="fixed"
          bottom="var(--space-8)"
          right="var(--space-2)"
          zIndex={999}
          w="50px"
          h="50px"
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
          onClick={scrollToTop}
          _hover={{
            bg: 'var(--primary-dark)',
          }}
        >
          <Icon as={FiArrowUp} boxSize={5} />
        </MotionBox>
      )}
    </AnimatePresence>
  );
}

