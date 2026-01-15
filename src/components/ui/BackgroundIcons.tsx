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
  const iconsArray = [];
  const totalIcons = 120; // 120 иконок для плотного покрытия

  // Фиксированные значения для 100% консистентности
  const fixedValues = [
    0.3, 0.7, 0.2, 0.8, 0.1, 0.9, 0.4, 0.6, 0.5, 0.3,
    0.7, 0.2, 0.8, 0.1, 0.9, 0.4, 0.6, 0.5, 0.3, 0.7,
    0.2, 0.8, 0.1, 0.9, 0.4, 0.6, 0.5, 0.3, 0.7, 0.2,
    0.8, 0.1, 0.9, 0.4, 0.6, 0.5, 0.3, 0.7, 0.2, 0.8,
    0.1, 0.9, 0.4, 0.6, 0.5, 0.3, 0.7, 0.2, 0.8, 0.1,
    0.9, 0.4, 0.6, 0.5, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9
  ];

  for (let i = 0; i < totalIcons; i++) {
    // Детерминированная иконка на основе индекса
    const iconIndex = Math.floor(fixedValues[i % fixedValues.length] * foodIcons.length);
    const icon = foodIcons[Math.max(0, Math.min(foodIcons.length - 1, iconIndex))];

    // Детерминированный поворот
    const rotation = fixedValues[i % fixedValues.length] * 360;

    // Детерминированный размер (от 12px до 24px для мобильной адаптивности)
    const size = 12 + fixedValues[i % fixedValues.length] * 12;

    // Равномерное распределение по сетке 12x10
    const cols = 12;
    const rows = 10;
    const col = i % cols;
    const row = Math.floor(i / cols);

    const baseX = (col * 100) / cols;
    const baseY = (row * 100) / rows;

    // Маленькое смещение для естественности
    const offsetX = (fixedValues[i % fixedValues.length] - 0.5) * 6;
    const offsetY = (fixedValues[(i + 1) % fixedValues.length] - 0.5) * 6;

    const x = Math.max(1, Math.min(99, baseX + offsetX));
    const y = Math.max(1, Math.min(99, baseY + offsetY));

    iconsArray.push({
      id: `icon-${i}`,
      icon,
      x,
      y,
      rotation,
      size
    });
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
          opacity={0.1} // очень прозрачные для мобильной адаптивности
          color="var(--secondary)"
        >
          <Icon as={iconItem.icon} boxSize={`${iconItem.size}px`} />
        </Box>
      ))}
    </Box>
  );
}
