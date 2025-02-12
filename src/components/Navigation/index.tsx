import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Drawer, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  ToolOutlined,
  ShopOutlined,
  UserOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #FFFFFF;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  color: #000000;
`;

const StyledMenu = styled(Menu)`
  &.ant-menu {
    flex: 1;
    display: flex;
    justify-content: center;
    background: transparent;
    border: none;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const MobileMenuButton = styled(Button)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
  
  .ant-menu-item {
    height: 50px;
    line-height: 50px;
  }
`;

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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
      icon: <ShopOutlined />,
      label: t('navigation.marketAI')
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: t('navigation.profile')
    }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <NavContainer>
      <Logo onClick={() => navigate('/')}>RAF.</Logo>
      
      {/* Desktop Menu */}
      <StyledMenu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
      />
      
      {/* Mobile Menu Button */}
      <MobileMenuButton
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen(true)}
      />
      
      {/* Mobile Menu Drawer */}
      <StyledDrawer
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        width={250}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </StyledDrawer>
    </NavContainer>
  );
};

export default Navigation; 