'use client';

import { useIsDesktop } from '@/hooks/useBreakpoint';
import { Layout } from '@/components/layout/Layout';
import { DesktopCartPage } from '@/components/desktop/DesktopCartPage';
import { MobileCartPage } from '@/components/mobile/MobileCartPage';

export default function CartPage() {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopCartPage />;
  }

  return (
    <Layout showBottomNav={false}>
      <MobileCartPage />
    </Layout>
  );
}
