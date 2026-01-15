'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Cart, Dish, DishSize, DishAddon } from '@/types';
import { promoCodes, PromoCode } from '@/utils/mockData';

type CartState = Cart;

type CartAction =
  | { type: 'ADD_ITEM'; payload: { dish: Dish; quantity: number; selectedSize?: DishSize; selectedAddons?: DishAddon[] } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_PROMO'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_PROMO' };

// Функция для загрузки корзины из localStorage
function loadCartFromStorage(): CartState {
  if (typeof window === 'undefined') {
    return {
      items: [],
      total: 0,
      deliveryFee: 150, // рубли
      discount: 0,
      promoCode: undefined,
    };
  }

  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Пересчитываем общую сумму на случай изменений в логике расчета
      const itemsTotal = parsedCart.items?.reduce((sum: number, item: CartItem) => sum + item.totalPrice, 0) || 0;
      return {
        ...parsedCart,
        total: itemsTotal + parsedCart.deliveryFee - parsedCart.discount,
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }

  return {
    items: [],
    total: 0,
    deliveryFee: 150, // рубли
    discount: 0,
    promoCode: undefined,
  };
}

// Функция для сохранения корзины в localStorage
function saveCartToStorage(cart: CartState) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

const initialState: CartState = loadCartFromStorage();

function calculateItemTotal(dish: Dish, quantity: number, selectedSize?: DishSize, selectedAddons: DishAddon[] = []): number {
  const basePrice = selectedSize?.price || dish.price;
  const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  return (basePrice + addonsPrice) * quantity;
}

function validatePromoCode(code: string, cartItems: CartItem[], orderTotal: number): { discount: number; promo: PromoCode | null; error?: string } {
  const promo = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase() && p.isActive);

  if (!promo) {
    return { discount: 0, promo: null, error: 'Промокод не найден' };
  }

  // Проверяем минимальную сумму заказа
  if (promo.minOrderAmount && orderTotal < promo.minOrderAmount) {
    return { discount: 0, promo: null, error: `Минимальная сумма заказа ${promo.minOrderAmount}₽` };
  }

  // Проверяем применимость к категориям
  if (promo.applicableCategories && promo.applicableCategories.length > 0) {
    const hasApplicableItems = cartItems.some(item => {
      const itemCategory = item.dish.category;
      return promo.applicableCategories!.includes(itemCategory);
    });

    if (!hasApplicableItems) {
      return { discount: 0, promo: null, error: 'Промокод не подходит к товарам в заказе' };
    }
  }

  // Рассчитываем скидку
  let discount = 0;
  if (promo.discountType === 'fixed') {
    discount = promo.discount;
  } else if (promo.discountType === 'percentage') {
    // Для процентной скидки применяем только к подходящим категориям
    if (promo.applicableCategories && promo.applicableCategories.length > 0) {
      const applicableTotal = cartItems
        .filter(item => promo.applicableCategories!.includes(item.dish.category))
        .reduce((sum, item) => sum + item.totalPrice, 0);
      discount = Math.round(applicableTotal * promo.discount / 100);
    } else {
      discount = Math.round(orderTotal * promo.discount / 100);
    }
  }

  return { discount, promo };
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
  removeItemByDishId: (dishId: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => { success: boolean; discount?: number; error?: string };
  removePromo: () => void;
  getItemCount: () => number;
  getItemQuantity: (dishId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addItem = (dish: Dish, quantity: number, selectedSize?: DishSize, selectedAddons?: DishAddon[]) => {
    dispatch({ type: 'ADD_ITEM', payload: { dish, quantity, selectedSize, selectedAddons } });
  };

  const updateItem = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const removeItemByDishId = (dishId: string) => {
    // Находим первый item с данным dishId и уменьшаем его количество на 1
    const item = cart.items.find(item => item.id.startsWith(`${dishId}-`));
    if (item) {
      if (item.quantity > 1) {
        updateItem(item.id, item.quantity - 1);
      } else {
        removeItem(item.id);
      }
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyPromo = (code: string) => {
    // Проверяем, есть ли уже примененный промокод
    if (cart.promoCode) {
      return { success: false, error: 'Можно применить только один промокод' };
    }

    const itemsTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const { discount, promo, error } = validatePromoCode(code, cart.items, itemsTotal);

    if (error || !promo) {
      return { success: false, error: error || 'Промокод не найден' };
    }

    dispatch({ type: 'APPLY_PROMO', payload: { code: promo.code, discount } });
    return { success: true, discount };
  };

  const removePromo = () => {
    dispatch({ type: 'REMOVE_PROMO' });
  };

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getItemQuantity = (dishId: string) => {
    // Ищем все items, которые начинаются с dishId (учитывая размеры и добавки)
    const items = cart.items.filter(item => item.id.startsWith(`${dishId}-`));
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateItem,
        removeItem,
        removeItemByDishId,
        clearCart,
        applyPromo,
        removePromo,
        getItemCount,
        getItemQuantity,
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
