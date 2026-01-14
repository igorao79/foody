'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Cart, Dish, DishSize, DishAddon } from '@/types';

type CartState = Cart;

type CartAction =
  | { type: 'ADD_ITEM'; payload: { dish: Dish; quantity: number; selectedSize?: DishSize; selectedAddons?: DishAddon[] } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_PROMO'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_PROMO' };

const initialState: CartState = {
  items: [],
  total: 0,
  deliveryFee: 150, // рубли
  discount: 0,
  promoCode: undefined,
};

function calculateItemTotal(dish: Dish, quantity: number, selectedSize?: DishSize, selectedAddons: DishAddon[] = []): number {
  const basePrice = selectedSize?.price || dish.price;
  const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  return (basePrice + addonsPrice) * quantity;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { dish, quantity, selectedSize, selectedAddons = [] } = action.payload;

      const itemId = `${dish.id}-${selectedSize?.id || 'default'}-${selectedAddons.map(a => a.id).sort().join('-')}`;
      const totalPrice = calculateItemTotal(dish, quantity, selectedSize, selectedAddons);

      const existingItemIndex = state.items.findIndex(item => item.id === itemId);

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: calculateItemTotal(dish, newQuantity, selectedSize, selectedAddons),
        };

        const newTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

        return {
          ...state,
          items: updatedItems,
          total: newTotal + state.deliveryFee - state.discount,
        };
      } else {
        const newItem: CartItem = {
          id: itemId,
          dish,
          quantity,
          selectedSize,
          selectedAddons,
          totalPrice,
        };

        const newItems = [...state.items, newItem];
        const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);

        return {
          ...state,
          items: newItems,
          total: newTotal + state.deliveryFee - state.discount,
        };
      }
    }

    case 'UPDATE_ITEM': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }

      const updatedItems = state.items.map(item =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: calculateItemTotal(item.dish, quantity, item.selectedSize, item.selectedAddons),
            }
          : item
      );

      const newTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: updatedItems,
        total: newTotal + state.deliveryFee - state.discount,
      };
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotal = filteredItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: filteredItems,
        total: newTotal + state.deliveryFee - state.discount,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'APPLY_PROMO': {
      const { code, discount } = action.payload;
      return {
        ...state,
        promoCode: code,
        discount,
        total: state.items.reduce((sum, item) => sum + item.totalPrice, 0) + state.deliveryFee - discount,
      };
    }

    case 'REMOVE_PROMO': {
      const itemsTotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      return {
        ...state,
        promoCode: undefined,
        discount: 0,
        total: itemsTotal + state.deliveryFee,
      };
    }

    default:
      return state;
  }
}

interface CartContextType {
  cart: CartState;
  addItem: (dish: Dish, quantity: number, selectedSize?: DishSize, selectedAddons?: DishAddon[]) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  applyPromo: (code: string, discount: number) => void;
  removePromo: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (dish: Dish, quantity: number, selectedSize?: DishSize, selectedAddons?: DishAddon[]) => {
    dispatch({ type: 'ADD_ITEM', payload: { dish, quantity, selectedSize, selectedAddons } });
  };

  const updateItem = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyPromo = (code: string, discount: number) => {
    dispatch({ type: 'APPLY_PROMO', payload: { code, discount } });
  };

  const removePromo = () => {
    dispatch({ type: 'REMOVE_PROMO' });
  };

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        applyPromo,
        removePromo,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
