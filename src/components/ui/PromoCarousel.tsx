'use client';

import { useState } from 'react';
import { Box, Text, HStack, VStack } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiGift, FiPercent, FiStar } from 'react-icons/fi';
import { PromoModal } from './PromoModal';

interface PromoItem {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: React.ElementType;
  color: string;
  promoCode?: string;
}

const promoItems: PromoItem[] = [
  {
    id: '1',
    title: 'Скидка 30% на первое заказ',
    description: 'Специальное предложение для новых клиентов',
    discount: '-30%',
    icon: FiGift,
    color: 'var(--accent)',
    promoCode: 'FIRST30'
  },
  {
    id: '2',
    title: 'Бесплатная доставка',
    description: 'При заказе от 1000₽',
    discount: 'Бесплатно',
    icon: FiPercent,
    color: 'var(--secondary)',
    promoCode: 'FREEDELIVERY'
  },
  {
    id: '3',
    title: 'VIP программа лояльности',
    description: 'Накапливайте баллы и получайте скидки',
    discount: 'VIP',
    icon: FiStar,
    color: 'var(--primary)'
  },
  {
    id: '4',
    title: 'Скидка 50% на десерты',
    description: 'Только по воскресеньям',
    discount: '-50%',
    icon: FiPercent,
    color: 'var(--accent)'
  },
  {
    id: '5',
    title: 'Комбо обеды',
    description: 'Экономьте до 200₽ на комплексных обедах',
    discount: '-25%',
    icon: FiGift,
    color: 'var(--secondary)'
  }
];

interface PromoCarouselProps {
  itemsPerPage?: number;
}

export function PromoCarousel({ itemsPerPage = 1 }: PromoCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = Math.ceil(promoItems.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = promoItems.slice(startIndex, endIndex);


  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  const handlePromoClick = (promo: PromoItem) => {
    setSelectedPromo(promo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPromo(null);
  };

  return (
    <Box
      bg="var(--white)"
      borderRadius="var(--radius-lg)"
      p="var(--space-4)"
      boxShadow="var(--shadow-sm)"
      position="relative"
    >
      {/* Заголовок */}
      <Text
        fontSize="var(--font-lg)"
        fontWeight="var(--font-semibold)"
        color="var(--primary)"
        textAlign="center"
        mb="var(--space-2)"
      >
        Акции и скидки
      </Text>

      <VStack gap="var(--space-2)" align="stretch">
        {currentItems.map((item) => (
          <Box
            key={item.id}
            as="button"
            onClick={() => handlePromoClick(item)}
            p="var(--space-3)"
            borderRadius="var(--radius-md)"
            bg="var(--gray-50)"
            border="2px solid transparent"
            _hover={{
              borderColor: item.color,
              bg: `${item.color}10`,
              transform: 'translateY(-2px)'
            }}
            transition="all 0.3s ease"
            textAlign="left"
            w="100%"
          >
            <HStack gap="var(--space-2)" align="flex-start">
              <Box
                p="var(--space-2)"
                borderRadius="var(--radius-lg)"
                bg={item.color}
                color="var(--white)"
                flexShrink={0}
              >
                <item.icon size={20} />
              </Box>

              <VStack align="flex-start" gap="var(--space-1)" flex={1} minH="auto">
                <HStack justify="space-between" align="flex-start" w="100%">
                  <Text fontSize="var(--font-base)" fontWeight="var(--font-semibold)" color="var(--primary)">
                    {item.title}
                  </Text>
                  <Text fontSize="var(--font-sm)" fontWeight="var(--font-bold)" color={item.color}>
                    {item.discount}
                  </Text>
                </HStack>
                <Text fontSize="var(--font-sm)" color="var(--gray-600)" lineHeight="1.3">
                  {item.description}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Навигация */}
      <HStack justify="space-between" align="center" mt="var(--space-2)" px="var(--space-2)">
        {/* Стрелка влево */}
        <Box
          as="button"
          onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))}
          color="var(--gray-400)"
          _hover={{ color: 'var(--primary)' }}
          transition="color 0.2s ease"
          p="var(--space-1)"
        >
          <FiChevronLeft size={20} />
        </Box>

        {/* Пагинация */}
        <HStack gap="var(--space-1)">
          {Array.from({ length: totalPages }, (_, index) => (
            <Box
              key={index}
              as="button"
              onClick={() => handleDotClick(index)}
              w="8px"
              h="8px"
              borderRadius="var(--radius-full)"
              bg={index === currentPage ? 'var(--primary)' : 'var(--gray-300)'}
              transition="all 0.2s ease"
              _hover={{
                bg: index === currentPage ? 'var(--primary)' : 'var(--gray-400)'
              }}
            />
          ))}
        </HStack>

        {/* Стрелка вправо */}
        <Box
          as="button"
          onClick={() => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))}
          color="var(--gray-400)"
          _hover={{ color: 'var(--primary)' }}
          transition="color 0.2s ease"
          p="var(--space-1)"
        >
          <FiChevronRight size={20} />
        </Box>
      </HStack>

      <PromoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        promo={selectedPromo}
      />
    </Box>
  );
}
