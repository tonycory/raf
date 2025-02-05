import React from 'react';
import { Typography, Card, Row, Col, Space } from 'antd';
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

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  height: 100%;
  
  .ant-card-body {
    padding: 32px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    transition: all 0.3s ease;
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

const CalculatorCard = styled(StyledCard)`
  margin-top: 64px;
  
  .ant-typography {
    color: #FFFFFF;
  }
`;

const Home: React.FC = () => {
  const { t } = useTranslation();

  const renderStrategyCard = (icon: React.ReactNode, title: string, description: string) => (
    <StyledCard>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {React.cloneElement(icon as React.ReactElement, { 
          style: { 
            fontSize: 40, 
            color: '#00F2FE',
            marginBottom: 24,
            filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.3))'
          } 
        })}
        <CardTitle level={4}>{title}</CardTitle>
        <CardText>{description}</CardText>
      </Space>
    </StyledCard>
  );

  return (
    <Container>
      <MainTitle level={1}>{t('home.title')}</MainTitle>
      <Description>{t('home.description')}</Description>

      {/* Strategy Overview */}
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          {renderStrategyCard(
            <SwapOutlined />,
            t('strategies.arbitrage.title'),
            t('strategies.arbitrage.advantages.profitability.value')
          )}
        </Col>
        <Col xs={24} md={8}>
          {renderStrategyCard(
            <RobotOutlined />,
            t('strategies.algorithmic.title'),
            t('strategies.algorithmic.advantages.profitability.value')
          )}
        </Col>
        <Col xs={24} md={8}>
          {renderStrategyCard(
            <SafetyOutlined />,
            t('strategies.staking.title'),
            t('strategies.staking.profitability.projects.carv.apr')
          )}
        </Col>
      </Row>

      {/* Calculator */}
      <CalculatorCard>
        <Title level={2}>{t('calculator.title')}</Title>
        <InvestmentCalculator />
      </CalculatorCard>
    </Container>
  );
};

export default Home; 