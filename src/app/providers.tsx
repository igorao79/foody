'use client';

import { Provider } from '@/components/ui/layout/provider';
import { CartProvider } from '@/contexts/CartContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalBackground } from '@/components/ui/GlobalBackground';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <AuthProvider>
        <CartProvider>
          <LoadingProvider>
            <GlobalBackground />
            {children}
          </LoadingProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}
