'use client';

import { useIsDesktop } from '@/hooks/useBreakpoint';
import { useMounted } from '@/hooks/useMounted';
import { Layout } from '@/components/layout/Layout';
import { DesktopHomePage } from '@/components/desktop/DesktopHomePage';
import { MobileHomePage } from '@/components/mobile/MobileHomePage';
import { MobileHeader } from '@/components/mobile/MobileHeader';

export default function Home() {
  const isDesktop = useIsDesktop();
  const mounted = useMounted();

  const handleSearch = (query: string) => {
    // Поиск обрабатывается в компонентах MobileHeader и DesktopHomePage
    console.log('Search query:', query);
  };

  // Показываем мобильную версию по умолчанию на сервере, чтобы избежать flash десктопной версии
  if (!mounted) {
    return (
      <Layout showBottomNav={true} showFooter={true}>
        <MobileHeader onSearch={handleSearch} />
        <MobileHomePage onSearch={handleSearch} />
      </Layout>
    );
  }

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
