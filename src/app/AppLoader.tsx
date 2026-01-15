'use client';

import { AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/LoadingContext';
import { Loader } from '@/components/ui/loaders/Loader';

export function AppLoader() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && <Loader message="Добро пожаловать в Фуди!" />}
    </AnimatePresence>
  );
}

