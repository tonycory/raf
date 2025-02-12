import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FadeInContainer = styled.div<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? 0 : '20px')});
  transition: all 0.6s ease-out;
`;

export const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <FadeInContainer ref={domRef} isVisible={isVisible}>
      {children}
    </FadeInContainer>
  );
}; 