'use client';

import { useIsDesktop } from '@/hooks/useBreakpoint';
import { Layout } from '@/components/layout/Layout';
import { DesktopRestaurantPage } from '@/components/desktop/DesktopRestaurantPage';
import { MobileRestaurantPage } from '@/components/mobile/MobileRestaurantPage';

export default function RestaurantPage() {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopRestaurantPage />;
  }

  return (
    <Layout showBottomNav={false}>
      <MobileRestaurantPage />
    </Layout>
  );
}
