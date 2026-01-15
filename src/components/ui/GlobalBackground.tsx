'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BackgroundIcons } from './BackgroundIcons';

export function GlobalBackground() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Показываем на всех устройствах после монтирования
  if (!isClient) return null;

  return <BackgroundIcons />;
}
