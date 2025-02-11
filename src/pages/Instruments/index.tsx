import React from 'react';
import { Typography, Card, Row, Col, Space, Statistic, Steps, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  SwapOutlined,
  RobotOutlined,
  SafetyOutlined,
  DollarOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  BankOutlined,
  LockOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title, Paragraph, Text } = Typography;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: #000000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 32px 0;
  padding: 24px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: #000000;
  margin-bottom: 24px;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .ant-tabs-tab {
    color: rgba(0, 0, 0, 0.65);
    
    &:hover {
      color: #000000;
    }
  }
  
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #000000 !important;
    }
  }
  
  .ant-tabs-ink-bar {
    background: #000000;
  }
`;

const StyledSteps = styled(Steps)`
  .ant-steps-item-container {
    .ant-steps-item-content {
      .ant-steps-item-title {
        color: rgba(0, 0, 0, 0.85) !important;
        font-size: 18px;
        font-weight: 500;
      }
      .ant-steps-item-description {
        color: rgba(0, 0, 0, 0.65) !important;
        font-size: 16px;
      }
    }
    .ant-steps-item-icon {
      background: rgba(0, 0, 0, 0.05);
      border-color: #000000;
      
      .ant-steps-icon {
        color: #000000;
      }
    }
    .ant-steps-item-tail::after {
      background-color: rgba(0, 0, 0, 0.1) !important;
    }
  }
  
  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background: #000000;
      
      .ant-steps-icon {
        color: #FFFFFF;
      }
    }
    .ant-steps-item-tail::after {
      background-color: #000000 !important;
    }
  }
`;

const demoData = [
  { date: '2023-10', value: 4000 },
  { date: '2023-11', value: 4500 },
  { date: '2023-12', value: 5000 },
  { date: '2024-01', value: 5500 },
  { date: '2024-02', value: 6000 },
  { date: '2024-03', value: 6500 }
];

const Instruments: React.FC = () => {
  const { t } = useTranslation();

  const arbitrageSteps = [
    {
      title: 'Exchange Connection',
      description: 'System connects to multiple cryptocurrency exchanges via API',
      icon: <SwapOutlined />
    },
    {
      title: 'Spread Analysis',
      description: 'Algorithm analyzes price differences across exchanges',
      icon: <LineChartOutlined />
    },
    {
      title: 'Liquidity Check',
      description: 'Verification of sufficient trading volumes for transactions',
      icon: <SafetyOutlined />
    },
    {
      title: 'Trade Execution',
      description: 'Automatic execution of arbitrage trades',
      icon: <CheckCircleOutlined />
    }
  ];

  const algorithmicSteps = [
    {
      title: 'Market Analysis',
      description: 'Algorithms analyze current market state and trends',
      icon: <LineChartOutlined />
    },
    {
      title: 'Risk Assessment',
      description: 'System evaluates potential risks and returns',
      icon: <SafetyOutlined />
    },
    {
      title: 'Decision Making',
      description: 'AI makes decisions based on data analysis',
      icon: <RobotOutlined />
    },
    {
      title: 'Trade Execution',
      description: 'Automatic execution of trading operations',
      icon: <CheckCircleOutlined />
    }
  ];

  const stakingSteps = [
    {
      title: 'Project Selection',
      description: 'Choose a reliable project for staking',
      icon: <SafetyOutlined />
    },
    {
      title: 'Fund Locking',
      description: 'Place funds in staking pool',
      icon: <LockOutlined />
    },
    {
      title: 'Reward Collection',
      description: 'Regular reward accrual',
      icon: <DollarOutlined />
    },
    {
      title: 'Reinvestment',
      description: 'Automatic profit reinvestment',
      icon: <CheckCircleOutlined />
    }
  ];

  const renderChart = (data: typeof demoData, title: string) => (
    <ChartContainer>
      <Title level={4} style={{ marginBottom: 24 }}>{title}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(0, 0, 0, 0.45)"
            tick={{ fill: 'rgba(0, 0, 0, 0.45)' }}
          />
          <YAxis
            stroke="rgba(0, 0, 0, 0.45)"
            tick={{ fill: 'rgba(0, 0, 0, 0.45)' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => [`$${value}`, 'Value']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#000000"
            strokeWidth={2}
            dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#000000', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );

  const renderArbitrageStrategy = () => (
    <div>
      <Title level={3}>{t('strategies.arbitrage.title')}</Title>
      <Paragraph>{t('strategies.arbitrage.description')}</Paragraph>
      {renderChart(demoData, 'Arbitrage Strategy Returns')}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Monthly Return"
              value={4}
              suffix="%"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Number of Exchanges"
              value={12}
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Successful Trades"
              value={99.8}
              suffix="%"
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={3} style={{ marginBottom: 32 }}>
          How it Works
        </Title>
        <StyledSteps
          direction="vertical"
          current={4}
          items={arbitrageSteps}
        />
      </StyledCard>
    </div>
  );

  const renderAlgorithmicStrategy = () => (
    <div>
      <Title level={3}>{t('strategies.algorithmic.title')}</Title>
      <Paragraph>{t('strategies.algorithmic.description')}</Paragraph>
      {renderChart(demoData, 'Algorithmic Strategy Returns')}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Monthly Return"
              value={10}
              suffix="%"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Forecast Accuracy"
              value={94.5}
              suffix="%"
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Successful Trades"
              value={98.2}
              suffix="%"
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={3} style={{ marginBottom: 32 }}>
          How it Works
        </Title>
        <StyledSteps
          direction="vertical"
          current={4}
          items={algorithmicSteps}
        />
      </StyledCard>
    </div>
  );

  const renderStakingStrategy = () => (
    <div>
      <Title level={3}>{t('strategies.staking.title')}</Title>
      <Paragraph>{t('strategies.staking.description')}</Paragraph>
      {renderChart(demoData, 'Staking Returns')}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Annual Return"
              value={71.52}
              suffix="%"
              prefix={<BankOutlined />}
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Number of Projects"
              value={25}
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title="Minimum Term"
              value={30}
              suffix="days"
              valueStyle={{ color: '#000000', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={3} style={{ marginBottom: 32 }}>
          How it Works
        </Title>
        <StyledSteps
          direction="vertical"
          current={4}
          items={stakingSteps}
        />
      </StyledCard>
    </div>
  );

  const items = [
    {
      key: '1',
      label: (
        <Space>
          <SwapOutlined />
          {t('strategies.arbitrage.title')}
        </Space>
      ),
      children: renderArbitrageStrategy()
    },
    {
      key: '2',
      label: (
        <Space>
          <RobotOutlined />
          {t('strategies.algorithmic.title')}
        </Space>
      ),
      children: renderAlgorithmicStrategy()
    },
    {
      key: '3',
      label: (
        <Space>
          <SafetyOutlined />
          {t('strategies.staking.title')}
        </Space>
      ),
      children: renderStakingStrategy()
    }
  ];

  return (
    <Container>
      <StyledTabs
        defaultActiveKey="1"
        items={items}
        size="large"
      />
    </Container>
  );
};

export default Instruments;