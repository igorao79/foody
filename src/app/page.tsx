'use client';

import { useIsDesktop } from '@/hooks/useBreakpoint';
import { Layout } from '@/components/layout/Layout';
import { DesktopHomePage } from '@/components/desktop/DesktopHomePage';
import { MobileHomePage } from '@/components/mobile/MobileHomePage';
import { MobileHeader } from '@/components/mobile/MobileHeader';

export default function Home() {
  const isDesktop = useIsDesktop();

  const handleSearch = (query: string) => {
    // Поиск обрабатывается в компонентах MobileHeader и DesktopHomePage
    console.log('Search query:', query);
  };

  if (isDesktop) {
    return <DesktopHomePage />;
  }

  return (
    <Layout showBottomNav={true} showFooter={true}>
      <MobileHeader onSearch={handleSearch} />
      <MobileHomePage onSearch={handleSearch} />
    </Layout>
  );
}
