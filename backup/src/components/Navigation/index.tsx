import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Row, Col, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  ToolOutlined,
  RobotOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('navigation.home'),
      style: { color: location.pathname === '/' ? '#1890ff' : 'inherit' }
    },
    {
      key: '/instruments',
      icon: <ToolOutlined />,
      label: t('navigation.instruments'),
      style: { color: location.pathname === '/instruments' ? '#1890ff' : 'inherit' }
    },
    {
      key: '/market-ai',
      icon: <RobotOutlined />,
      label: t('navigation.marketAI'),
      style: { color: location.pathname === '/market-ai' ? '#1890ff' : 'inherit' }
    },
    {
      key: '/team',
      icon: <TeamOutlined />,
      label: t('navigation.team'),
      style: { color: location.pathname === '/team' ? '#1890ff' : 'inherit' }
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Row justify="space-between" align="middle" style={{ height: '100%', padding: '0 24px' }}>
      <Col flex="auto">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            fontWeight: 500
          }}
        />
      </Col>
      <Col>
        <Button 
          type="text" 
          icon={<UserOutlined />} 
          onClick={() => navigate('/profile')}
          style={{ 
            fontSize: '20px',
            color: location.pathname === '/profile' ? '#1890ff' : 'inherit'
          }}
        />
      </Col>
    </Row>
  );
};

export default Navigation; 