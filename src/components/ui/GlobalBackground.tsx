'use client';

import { BackgroundIcons } from './BackgroundIcons';
import { useIsDesktop } from '@/hooks/useBreakpoint';

export function GlobalBackground() {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return null;

  return <BackgroundIcons />;
}
