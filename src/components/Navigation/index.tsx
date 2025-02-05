import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Row, Col, Button, Space } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  ToolOutlined,
  RobotOutlined,
  TeamOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import rafLogo from '../../assets/images/RAF_logo.svg';

const NavContainer = styled(Row)`
  height: 96px;
  padding: 0 48px;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.colors.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 96px;
  width: auto;
  margin-right: 24px;
  filter: invert(1);
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledMenu = styled(Menu)`
  &.ant-menu {
    background: transparent;
    border: none;
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 500;
    
    .ant-menu-item {
      padding: 0 24px;
      margin: 0 4px;
      color: ${({ theme }) => theme.colors.textSecondary};
      
      &:hover {
        color: ${({ theme }) => theme.colors.text} !important;
        
        .anticon {
          animation: glow 1.5s ease-in-out infinite;
        }
      }
      
      &.ant-menu-item-selected {
        color: ${({ theme }) => theme.colors.primary} !important;
        background: transparent;
        
        &::after {
          border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
        }
        
        .anticon {
          color: ${({ theme }) => theme.colors.primary};
          filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.primary});
        }
      }
      
      .anticon {
        font-size: 18px;
        margin-right: 8px;
        transition: all 0.3s ease;
      }
    }
  }
`;

const ActionButton = styled(Button)`
  &.ant-btn {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    
    .anticon {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
    
    &:hover {
      background: ${({ theme }) => theme.colors.cardBgHover};
      border-color: ${({ theme }) => theme.colors.primary};
      
      .anticon {
        color: ${({ theme }) => theme.colors.primary};
        animation: glow 1.5s ease-in-out infinite;
      }
    }
    
    &.active {
      background: ${({ theme }) => `${theme.colors.primary}1A`};
      border-color: ${({ theme }) => theme.colors.primary};
      
      .anticon {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('navigation.home')
    },
    {
      key: '/instruments',
      icon: <ToolOutlined />,
      label: t('navigation.instruments')
    },
    {
      key: '/market-ai',
      icon: <RobotOutlined />,
      label: t('navigation.marketAI')
    }
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <NavContainer justify="space-between" align="middle">
      <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
        <LogoImage src={rafLogo} alt="RAF Logo" onClick={() => navigate('/')} />
        <StyledMenu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Col>
      <Col>
        <Space size={16}>
          <ActionButton
            type="text"
            icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
          />
          <ActionButton 
            type="text" 
            icon={<UserOutlined />} 
            onClick={() => navigate('/profile')}
            className={location.pathname === '/profile' ? 'active' : ''}
          />
        </Space>
      </Col>
    </NavContainer>
  );
};

export default Navigation; 