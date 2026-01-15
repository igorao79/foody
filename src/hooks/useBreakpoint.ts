import { useBreakpointValue } from '@chakra-ui/react';

export function useBreakpoint() {
  return useBreakpointValue({
    base: 'mobile',
    md: 'tablet',
    lg: 'desktop',
  }) as 'mobile' | 'tablet' | 'desktop';
}

export function useIsMobile() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'mobile';
}

export function useIsDesktop() {
  const breakpoint = useBreakpoint();
  return breakpoint === 'desktop';
}

