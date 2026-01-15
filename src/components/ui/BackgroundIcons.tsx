'use client';

import React, { useMemo } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import {
  FaUtensils,
  FaPizzaSlice,
  FaIceCream,
  FaCoffee,
  FaGlassWhiskey,
  FaHamburger,
  FaHotdog,
  FaDrumstickBite,
  FaFish,
  FaLeaf,
  FaAppleAlt,
  FaCarrot,
  FaPepperHot,
  FaBreadSlice,
  FaCheese,
  FaWineBottle,
  FaCocktail,
  FaMugHot,
  FaCookieBite,
  FaCandyCane,
  FaBirthdayCake,
  FaLemon,
  FaEgg,
  FaBacon,
  FaBeer,
  FaWineGlass,
  FaCookie,
  FaSeedling,
  FaWater,
  FaGlassMartini
} from 'react-icons/fa';

const foodIcons = [
  FaUtensils,
  FaPizzaSlice,
  FaIceCream,
  FaCoffee,
  FaGlassWhiskey,
  FaHamburger,
  FaHotdog,
  FaDrumstickBite,
  FaFish,
  FaLeaf,
  FaAppleAlt,
  FaCarrot,
  FaPepperHot,
  FaBreadSlice,
  FaCheese,
  FaWineBottle,
  FaCocktail,
  FaMugHot,
  FaCookieBite,
  FaCandyCane,
  FaBirthdayCake,
  FaLemon,
  FaEgg,
  FaBacon,
  FaBeer,
  FaWineGlass,
  FaCookie,
  FaSeedling,
  FaWater,
  FaGlassMartini
];

// Функция для генерации фиксированного набора иконок
const generateBackgroundIcons = () => {
  const rows = 15;
  const cols = 10;
  const iconsArray = [];

  // Используем простой seed-based генератор для консистентности
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Рандомная иконка из массива
      const randomIcon = foodIcons[Math.floor(random() * foodIcons.length)];

      // Рандомный поворот
      const rotation = random() * 360;

      // Рандомный размер (от 16px до 32px)
      const size = 16 + random() * 16;

      // Позиция по сетке с небольшим рандомным смещением
      const baseX = (col * 100) / cols;
      const baseY = (row * 100) / rows;
      const offsetX = (random() - 0.5) * 8; // смещение ±4%
      const offsetY = (random() - 0.5) * 8;

      const x = Math.max(2, Math.min(98, baseX + offsetX)); // ограничиваем в пределах 2-98%
      const y = Math.max(2, Math.min(98, baseY + offsetY));

      iconsArray.push({
        id: `icon-${row}-${col}`,
        icon: randomIcon,
        x,
        y,
        rotation,
        size
      });
    }
  }

  return iconsArray;
};

export function BackgroundIcons() {
  const icons = useMemo(() => generateBackgroundIcons(), []);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      pointerEvents="none"
      overflow="hidden"
    >
      {icons.map((iconItem) => (
        <Box
          key={iconItem.id}
          position="absolute"
          left={`${iconItem.x}%`}
          top={`${iconItem.y}%`}
          transform={`translate(-50%, -50%) rotate(${iconItem.rotation}deg)`}
          opacity={0.1} // очень прозрачные
          color="var(--secondary)"
        >
          <Icon as={iconItem.icon} boxSize={`${iconItem.size}px`} />
        </Box>
      ))}
    </Box>
  );
}
