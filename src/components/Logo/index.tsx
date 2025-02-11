import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

const LogoText = styled.span`
  font-family: var(--font-primary);
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: 700;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0, 242, 254, 0.3);
`;

const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <LogoContainer onClick={onClick}>
      <LogoIcon>R</LogoIcon>
      <LogoText>RAF</LogoText>
    </LogoContainer>
  );
};

export default Logo; 