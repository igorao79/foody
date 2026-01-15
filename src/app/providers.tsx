'use client';

import { Provider } from '@/components/ui/layout/provider';
import { CartProvider } from '@/contexts/CartContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { useState } from 'react';
import { GlobalBackground } from '@/components/ui/GlobalBackground';
import { SupportChatWidget } from '@/components/ui/SupportChatWidget';
import { SupportChatModal } from '@/components/ui/modals/SupportChatModal';
import { useIsDesktop } from '@/hooks/useBreakpoint';

function GlobalSupport() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isDesktop = useIsDesktop();

  if (!isDesktop) return null;

  return (
    <>
      <SupportChatWidget onChatOpen={() => setIsChatOpen(true)} />
      <SupportChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <OrderProvider>
        <AuthProvider>
          <CartProvider>
            <LoadingProvider>
              <GlobalBackground />
              <GlobalSupport />
              {children}
            </LoadingProvider>
          </CartProvider>
        </AuthProvider>
      </OrderProvider>
    </Provider>
  );
}
