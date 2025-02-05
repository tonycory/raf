import React from 'react';
import { Typography, Card, Row, Col, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InvestmentCalculator } from '../../components/InvestmentCalculator';
import {
  SwapOutlined,
  RobotOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  background: linear-gradient(180deg, #0B0B0F 0%, #1F1F2B 100%);
  min-height: 100vh;
`;

const MainTitle = styled(Title)`
  &.ant-typography {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 64px;
    line-height: 1.1;
    color: #FFFFFF;
    margin-bottom: 24px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
`;

const Description = styled(Text)`
  font-size: 20px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-bottom: 64px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const StrategyCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: 32px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    border-color: #00F2FE;
  }
`;

const CardTitle = styled(Title)`
  &.ant-typography {
    color: #FFFFFF;
    font-size: 24px;
    margin-bottom: 16px;
    font-weight: 500;
  }
`;

const CardText = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.5;
`;

const IconWrapper = styled.div`
  font-size: 40px;
  color: #00F2FE;
  margin-bottom: 24px;
  filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.3));
`;

const CalculatorCard = styled(Card)`
  margin-top: 64px;
  background: rgba(31, 31, 43, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  
  .ant-typography {
    color: #FFFFFF;
  }
`;

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const strategies = [
    {
      icon: <SwapOutlined />,
      title: t('strategies.arbitrage.title'),
      description: t('strategies.arbitrage.advantages.profitability.value'),
      path: '/instruments'
    },
    {
      icon: <RobotOutlined />,
      title: t('strategies.algorithmic.title'),
      description: t('strategies.algorithmic.advantages.profitability.value'),
      path: '/instruments'
    },
    {
      icon: <SafetyOutlined />,
      title: t('strategies.staking.title'),
      description: t('strategies.staking.profitability.projects.carv.apr'),
      path: '/instruments'
    }
  ];

  return (
    <Container>
      <MainTitle level={1}>{t('home.title')}</MainTitle>
      <Description>{t('home.description')}</Description>

      <Row gutter={[32, 32]}>
        {strategies.map((strategy, index) => (
          <Col xs={24} md={8} key={index}>
            <StrategyCard onClick={() => navigate(strategy.path)}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <IconWrapper>{strategy.icon}</IconWrapper>
                <CardTitle level={4}>{strategy.title}</CardTitle>
                <CardText>{strategy.description}</CardText>
              </Space>
            </StrategyCard>
          </Col>
        ))}
      </Row>

      <CalculatorCard>
        <Title level={2}>{t('calculator.title')}</Title>
        <InvestmentCalculator />
      </CalculatorCard>
    </Container>
  );
};

export default Home; 