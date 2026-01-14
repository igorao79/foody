'use client';

import { Provider } from '@/components/ui/layout/provider';
import { CartProvider } from '@/contexts/CartContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <CartProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </CartProvider>
    </Provider>
  );
}
