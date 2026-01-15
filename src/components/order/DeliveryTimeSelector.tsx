'use client';

import { useState } from 'react';
import { Box, Text, VStack, HStack, Button, Select } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);

interface DeliveryTimeSelectorProps {
  selectedTime: 'asap' | string;
  onTimeSelect: (time: 'asap' | string) => void;
}

export function DeliveryTimeSelector({ selectedTime, onTimeSelect }: DeliveryTimeSelectorProps) {
  const [showCustomTime, setShowCustomTime] = useState(false);

  const handleTimeSelect = (time: 'asap' | string) => {
    onTimeSelect(time);
    setShowCustomTime(time !== 'asap');
  };

  // Генерируем варианты времени на ближайшие 2 часа
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    const startHour = now.getHours();
    const startMinute = Math.ceil(now.getMinutes() / 15) * 15; // Округляем до ближайших 15 минут

    for (let hour = startHour; hour < startHour + 2; hour++) {
      for (let minute = hour === startHour ? startMinute : 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <VStack align="stretch" spacing="var(--space-4)">
      <Text fontSize="var(--font-lg)" fontWeight="var(--font-semibold)" color="var(--primary)">
        Время доставки
      </Text>

      <VStack align="stretch" spacing="var(--space-3)">
        {/* Кнопка "Как можно скорее" */}
        <MotionBox
          as="button"
          onClick={() => handleTimeSelect('asap')}
          cursor="pointer"
          p="var(--space-4)"
          borderRadius="var(--radius-lg)"
          border={selectedTime === 'asap' ? '2px solid var(--primary)' : '1px solid var(--gray-200)'}
          bg={selectedTime === 'asap' ? 'var(--gray-50)' : 'var(--white)'}
          textAlign="left"
          transition="all 0.2s ease"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HStack spacing="var(--space-3)">
            <Box color="var(--accent)" mt="2px">
              <FiClock size={20} />
            </Box>
            <VStack align="flex-start" spacing="var(--space-1)">
              <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                Как можно скорее
              </Text>
              <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                Доставим в течение 25-35 минут
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Кнопка "К определенному времени" */}
        <MotionBox
          as="button"
          onClick={() => handleTimeSelect(timeOptions[0] || '12:00')}
          cursor="pointer"
          p="var(--space-4)"
          borderRadius="var(--radius-lg)"
          border={selectedTime !== 'asap' ? '2px solid var(--primary)' : '1px solid var(--gray-200)'}
          bg={selectedTime !== 'asap' ? 'var(--gray-50)' : 'var(--white)'}
          textAlign="left"
          transition="all 0.2s ease"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HStack spacing="var(--space-3)">
            <Box color="var(--secondary)" mt="2px">
              <FiClock size={20} />
            </Box>
            <VStack align="flex-start" spacing="var(--space-1)">
              <Text fontSize="var(--font-base)" fontWeight="var(--font-medium)" color="var(--primary)">
                К определенному времени
              </Text>
              <Text fontSize="var(--font-sm)" color="var(--gray-600)">
                Выберите удобное время доставки
              </Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Выбор времени */}
        {selectedTime !== 'asap' && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            p="var(--space-3)"
            borderRadius="var(--radius-md)"
            bg="var(--gray-50)"
          >
            <Select
              value={selectedTime}
              onChange={(e) => onTimeSelect(e.target.value)}
              bg="var(--white)"
              border="1px solid var(--gray-200)"
              borderRadius="var(--radius-md)"
              fontSize="var(--font-base)"
              _focus={{
                borderColor: 'var(--primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </MotionBox>
        )}
      </VStack>
    </VStack>
  );
}
