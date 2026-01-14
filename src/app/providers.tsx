'use client';

import { Provider } from '@/components/ui/provider';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <CartProvider>
        {children}
      </CartProvider>
    </Provider>
  );
}
