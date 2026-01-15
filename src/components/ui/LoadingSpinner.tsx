'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export function LoadingSpinner() {
  const [hideSpinner, setHideSpinner] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1️⃣ Скрываем велосипед через 600ms
    const spinnerTimer = setTimeout(() => {
      setHideSpinner(true);
    }, 600);

    // 2️⃣ Скрываем фон через 900ms
    const overlayTimer = setTimeout(() => {
      setHideOverlay(true);
    }, 900);

    // 3️⃣ Убираем компонент через 1300ms
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1300);

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(overlayTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="var(--background)"
      transition="opacity 0.4s ease"
      opacity={hideOverlay ? 0 : 1}
    >
      {/* 🧱 ОБЁРТКА ДЛЯ АНИМАЦИИ */}
      <Box
        transition="transform 0.3s ease, opacity 0.3s ease"
        transform={hideSpinner ? 'scale(0.4)' : 'scale(1)'}
        opacity={hideSpinner ? 0 : 1}
      >
        {/* 🚲 САМ ЛОАДЕР */}
        <Box className="loader" />
      </Box>
    </Box>
  );
}
