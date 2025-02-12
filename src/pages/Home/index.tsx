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
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    
    // Убираем форсированный перенос каждого слова
    word-spacing: normal;
    max-width: 100%;
    padding-right: 1rem;
    white-space: pre-line; // Сохраняем переносы строк, но объединяем пробелы
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: 2rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    padding-right: 1rem;
  }
`;

const StrategyCard = styled(Card)`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.2}s;
  
  .ant-card-body {
    padding: 32px;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardTitle = styled(Title)`
  &.ant-typography {
    color: ${({ theme }) => theme.colors.text};
    font-size: 24px;
    margin-bottom: 16px;
    font-weight: 500;
  }
`;

const CardText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  line-height: 1.5;
`;

const IconWrapper = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`;

const CalculatorCard = styled(Card)`
  margin-top: 64px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  
  .ant-typography {
    color: ${({ theme }) => theme.colors.text};
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
      <MainTitle>
        {t('home.title', {
          // Заменяем обычные пробелы на неразрывные там, где нужно
          replace: {
            'Fund with': 'Fund\u00A0with',
            'Investment Strategies': 'Investment\u00A0Strategies'
          }
        })}
      </MainTitle>
      <Description>{t('home.description')}</Description>

      <Row gutter={[32, 32]}>
        {strategies.map((strategy, index) => (
          <Col xs={24} md={8} key={index}>
            <StrategyCard 
              onClick={() => navigate(strategy.path)}
              index={index}
              className="scale-in"
            >
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