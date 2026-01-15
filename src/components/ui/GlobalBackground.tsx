'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BackgroundIcons } from './BackgroundIcons';
import { LoadingSpinner } from './LoadingSpinner';

export function GlobalBackground() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);

    // Имитируем загрузку контента (можно убрать, если не нужно)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300); // 1.3 секунды загрузки (чтобы лоадер успел исчезнуть)

    return () => clearTimeout(timer);
  }, []);

  // Показываем лоадер пока компонент не готов
  if (!isClient || isLoading) {
    return <LoadingSpinner />;
  }

  return <BackgroundIcons />;
}
