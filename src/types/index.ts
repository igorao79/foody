export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  distance?: number; // в метрах
  cuisines: string[];
  tags?: string[];
  isOpen: boolean;
  description?: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  restaurantId: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  sizes?: DishSize[];
  addons?: DishAddon[];
}

export interface DishSize {
  id: string;
  name: string;
  price: number;
  calories?: number;
}

export interface DishAddon {
  id: string;
  name: string;
  price: number;
  category: string; // "sauce", "side", "drink", etc.
}

export interface CartItem {
  id: string;
  dish: Dish;
  quantity: number;
  selectedSize?: DishSize;
  selectedAddons: DishAddon[];
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  deliveryFee: number;
  discount: number;
  promoCode?: string;
}

export interface OrderAddress {
  id: string;
  street: string;
  building: string;
  apartment: string;
  entrance?: string;
  floor?: string;
  comment?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  address: OrderAddress;
  paymentMethod: 'card' | 'cash';
  deliveryTime: 'asap' | string;
  comment?: string;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery: Date;
}

import { IconType } from 'react-icons';
import { ComponentType } from 'react';

export interface Category {
  id: string;
  name: string;
  icon: IconType | ComponentType<{ size?: number; color?: string }>;
  color: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  description: string;
  image: string;
  discount?: number;
  validUntil?: Date;
}
