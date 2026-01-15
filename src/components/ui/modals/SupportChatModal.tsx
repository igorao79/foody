'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiSend, FiMinimize2, FiHelpCircle } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Здравствуйте! Я ваш виртуальный помощник. Чем могу помочь?',
    sender: 'support',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 минут назад
  },
];

export function SupportChatModal({ isOpen, onClose }: SupportChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Имитация ответа поддержки (но ничего не делаем, как просил пользователь)
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      bottom="var(--space-6)"
      right="var(--space-6)"
      zIndex={1000}
      w="350px"
      h="500px"
      bg="var(--white)"
      borderRadius="var(--radius-xl)"
      boxShadow="var(--shadow-xl)"
      border="1px solid var(--gray-200)"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Заголовок чата */}
      <Box
        p="var(--space-4)"
        bg="var(--primary)"
        color="var(--white)"
        borderTopRadius="var(--radius-xl)"
      >
        <HStack justify="space-between" align="center">
          <HStack gap="var(--space-3)">
            <Box
              w="8px"
              h="8px"
              borderRadius="var(--radius-full)"
              bg="var(--accent)"
            />
            <VStack align="flex-start" gap="0">
              <Text fontSize="var(--font-sm)" fontWeight="var(--font-semibold)">
                Поддержка Фуди
              </Text>
              <Text fontSize="var(--font-xs)" opacity={0.8}>
                Онлайн
              </Text>
            </VStack>
          </HStack>
          <Button
            size="sm"
            variant="ghost"
            color="var(--white)"
            cursor="pointer"
            onClick={onClose}
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            minW="auto"
            h="auto"
            p="var(--space-1)"
          >
            <Icon as={FiMinimize2} boxSize={4} />
          </Button>
        </HStack>
      </Box>

      {/* Сообщения */}
      <Box flex={1} overflowY="auto" p="var(--space-4)" bg="var(--gray-50)">
        <VStack gap="var(--space-3)" align="stretch">
          {messages.map((message) => (
            <HStack
              key={message.id}
              justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              align="flex-start"
              gap="var(--space-2)"
            >
              {message.sender === 'support' && (
                <Box
                  w="24px"
                  h="24px"
                  borderRadius="var(--radius-full)"
                  bg="var(--primary)"
                  color="var(--white)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="var(--font-xs)"
                  flexShrink={0}
                >
                  <Icon as={FiHelpCircle} boxSize={3} />
                </Box>
              )}

              <Box
                maxW="70%"
                p="var(--space-3)"
                borderRadius="var(--radius-lg)"
                bg={message.sender === 'user' ? 'var(--primary)' : 'var(--white)'}
                color={message.sender === 'user' ? 'var(--white)' : 'var(--gray-800)'}
                boxShadow="var(--shadow-sm)"
              >
                <Text fontSize="var(--font-sm)" lineHeight="1.4">
                  {message.text}
                </Text>
                <Text
                  fontSize="var(--font-xs)"
                  opacity={0.6}
                  mt="var(--space-1)"
                  textAlign="right"
                >
                  {message.timestamp.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </Box>

              {message.sender === 'user' && (
                <Box
                  w="24px"
                  h="24px"
                  borderRadius="var(--radius-full)"
                  bg="var(--gray-400)"
                  color="var(--white)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="var(--font-xs)"
                  flexShrink={0}
                >
                  👤
                </Box>
              )}
            </HStack>
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Поле ввода */}
      <Box p="var(--space-4)" borderTop="1px solid var(--gray-200)" bg="var(--white)">
        <HStack gap="var(--space-2)">
          <Input
            placeholder="Напишите сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            borderRadius="var(--radius-xl)"
            border="1px solid var(--gray-300)"
            _focus={{
              borderColor: 'var(--primary)',
              boxShadow: '0 0 0 1px var(--primary)',
            }}
            flex={1}
          />
          <Button
            size="sm"
            bg="var(--primary)"
            color="var(--white)"
            borderRadius="var(--radius-full)"
            cursor="pointer"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            _hover={{ bg: 'var(--primary-dark)' }}
            _disabled={{
              bg: 'var(--gray-300)',
              cursor: 'not-allowed',
            }}
            w="40px"
            h="40px"
            minW="40px"
          >
            <Icon as={FiSend} boxSize={4} />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
