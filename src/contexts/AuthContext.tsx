'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  email: string;
  name?: string;
  phone?: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Функция для загрузки пользователя из localStorage
function loadUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return { ...user, isLoggedIn: true };
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
  }

  return null;
}

// Функция для сохранения пользователя в localStorage
function saveUserToStorage(user: User | null) {
  if (typeof window === 'undefined') return;

  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUserFromStorage());
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Имитация API вызова - в реальном приложении здесь был бы запрос к серверу
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Для теста - любой email и пароль принимаются
      const user: User = {
        email,
        name: email.split('@')[0], // Используем часть email как имя
        phone: undefined,
        isLoggedIn: true,
      };

      saveUserToStorage(user);
      setUser(user);

      return { success: true };
    } catch {
      return { success: false, error: 'Ошибка входа в систему' };
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    saveUserToStorage(null);
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    saveUserToStorage(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
