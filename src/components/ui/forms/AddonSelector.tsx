'use client';

import React from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DishAddon } from '@/types';

const MotionBox = motion(Box);

interface AddonSelectorProps {
  addons: DishAddon[];
  selectedAddons: DishAddon[];
  onAddonToggle: (addon: DishAddon) => void;
}

export function AddonSelector({ addons, selectedAddons, onAddonToggle }: AddonSelectorProps) {
  if (addons.length === 0) {
    return null;
  }

  // Группируем дополнения по категориям
  const categories = Array.from(new Set(addons.map(addon => addon.category)));

  return (
    <VStack align="stretch" gap="var(--space-4)">
      <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
        Дополнения
      </Text>

      {categories.map((category) => {
        const categoryAddons = addons.filter(addon => addon.category === category);

        return (
          <VStack key={category} align="stretch" gap="var(--space-2)">
            <Text
              fontSize="var(--font-base)"
              fontWeight="var(--font-medium)"
              color="var(--gray-700)"
              textTransform="capitalize"
            >
              {category === 'sauce' ? 'Соусы' :
               category === 'side' ? 'Гарниры' :
               category === 'drink' ? 'Напитки' :
               category}
            </Text>

            <VStack align="stretch" gap="var(--space-2)">
              {categoryAddons.map((addon, index) => {
                const isSelected = selectedAddons.some(selected => selected.id === addon.id);

                return (
                  <MotionBox
                    key={addon.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <HStack
                      as="button"
                      onClick={() => onAddonToggle(addon)}
                      p="var(--space-3)"
                      borderRadius="var(--radius-lg)"
                      border="1px solid var(--gray-200)"
                      bg={isSelected ? 'var(--gray-50)' : 'var(--white)'}
                      transition="all 0.2s ease"
                      _hover={{
                        borderColor: 'var(--primary)',
                        bg: 'var(--gray-50)',
                      }}
                      w="100%"
                      justify="space-between"
                      align="center"
                    >
                      <HStack gap="var(--space-3)" flex={1}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onAddonToggle(addon)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: 'var(--radius-sm)',
                            border: '2px solid var(--gray-300)',
                            backgroundColor: isSelected ? 'var(--primary)' : 'var(--white)',
                            pointerEvents: 'none',
                          }}
                        />
                        <VStack align="flex-start" gap="var(--space-1)" flex={1}>
                          <Text
                            fontSize="var(--font-base)"
                            fontWeight="var(--font-medium)"
                            color="var(--primary)"
                          >
                            {addon.name}
                          </Text>
                        </VStack>
                      </HStack>

                      <Text
                        fontSize="var(--font-base)"
                        fontWeight="var(--font-semibold)"
                        color="var(--primary)"
                      >
                        +{addon.price}₽
                      </Text>
                    </HStack>
                  </MotionBox>
                );
              })}
            </VStack>
          </VStack>
        );
      })}
    </VStack>
  );
}
