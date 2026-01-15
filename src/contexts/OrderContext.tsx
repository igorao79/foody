'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type OrderType = 'delivery' | 'pickup';

interface OrderContextType {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Функция для загрузки типа заказа из localStorage
function loadOrderTypeFromStorage(): OrderType {
  if (typeof window === 'undefined') {
    return 'delivery';
  }

  try {
    const saved = localStorage.getItem('orderType');
    if (saved === 'pickup' || saved === 'delivery') {
      return saved;
    }
  } catch (error) {
    console.error('Error loading orderType from localStorage:', error);
  }

  return 'delivery';
}

// Функция для сохранения типа заказа в localStorage
function saveOrderTypeToStorage(type: OrderType) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('orderType', type);
  } catch (error) {
    console.error('Error saving orderType to localStorage:', error);
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderType, setOrderTypeState] = useState<OrderType>(loadOrderTypeFromStorage);

  const setOrderType = (type: OrderType) => {
    console.log('OrderContext: setOrderType called with', type);
    setOrderTypeState(type);
    saveOrderTypeToStorage(type);
  };

  return (
    <OrderContext.Provider value={{ orderType, setOrderType }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
