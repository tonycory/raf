import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  ToolOutlined,
  ShopOutlined,
  UserOutlined,
  MoreOutlined
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
  flex: 0 0 96px;
  color: #000000;
`;

const StyledMenu = styled(Menu)`
  &.ant-menu {
    flex: 1;
    display: flex;
    justify-content: center;
    background: transparent;
    border: none;
    font-size: 16px;
    font-weight: 500;
    
    .ant-menu-item {
      height: 64px;
      line-height: 64px;
      padding: 0 24px;
      margin: 0;
      
      &:hover {
        color: #000000 !important;
        background: transparent;
      }
      
      &.ant-menu-item-selected {
        font-weight: 600;
        color: #000000;
        
        &::after {
          border-bottom: 2px solid #000000;
        }
      }
      
      .anticon {
        margin-right: 8px;
      }
    }
  }
`;

const MoreButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 0 0 96px;
  padding: 0;
  
  .anticon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const Navigation: React.FC = () => {
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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <NavContainer>
      <Logo onClick={() => navigate('/')}>RAF.</Logo>
      <StyledMenu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
      <MoreButton>
        <MoreOutlined />
      </MoreButton>
    </NavContainer>
  );
};

export default Navigation; 