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
import PerformanceChart from '../../components/Charts/PerformanceChart';

const { Title, Paragraph, Text } = Typography;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(31, 31, 43, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: #00F2FE;
  margin-bottom: 24px;
  filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.3));
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .ant-tabs-tab {
    color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      color: #00F2FE;
    }
  }
  
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #00F2FE !important;
    }
  }
  
  .ant-tabs-ink-bar {
    background: #00F2FE;
  }
`;

const StyledSteps = styled(Steps)`
  .ant-steps-item-container {
    .ant-steps-item-content {
      .ant-steps-item-title {
        color: white !important;
        font-size: 18px;
        font-weight: 500;
      }
      .ant-steps-item-description {
        color: rgba(255, 255, 255, 0.8) !important;
        font-size: 16px;
      }
    }
    .ant-steps-item-icon {
      background: rgba(0, 242, 254, 0.1);
      border-color: #00F2FE;
      
      .ant-steps-icon {
        color: #00F2FE;
      }
    }
    .ant-steps-item-tail::after {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background: #00F2FE;
      
      .ant-steps-icon {
        color: #1F1F2B;
      }
    }
    .ant-steps-item-tail::after {
      background-color: #00F2FE !important;
    }
  }
`;

const demoData = [
  { date: '2023-10-01', value: 4000 },
  { date: '2023-11-01', value: 4500 },
  { date: '2023-12-01', value: 5000 },
  { date: '2024-01-01', value: 5500 },
  { date: '2024-02-01', value: 6000 },
  { date: '2024-03-01', value: 6500 }
];

const Instruments: React.FC = () => {
  const { t } = useTranslation();

  const arbitrageSteps = [
    {
      title: 'Подключение к биржам',
      description: 'Система подключается к нескольким криптовалютным биржам через API',
      icon: <SwapOutlined />
    },
    {
      title: 'Анализ спредов',
      description: 'Алгоритм анализирует разницу цен на разных биржах',
      icon: <LineChartOutlined />
    },
    {
      title: 'Проверка ликвидности',
      description: 'Проверяется достаточность объемов для совершения сделок',
      icon: <SafetyOutlined />
    },
    {
      title: 'Исполнение сделок',
      description: 'Автоматическое выполнение арбитражных сделок',
      icon: <CheckCircleOutlined />
    }
  ];

  const algorithmicSteps = [
    {
      title: 'Анализ рынка',
      description: 'Алгоритмы анализируют текущее состояние рынка и тренды',
      icon: <LineChartOutlined />
    },
    {
      title: 'Оценка рисков',
      description: 'Система оценивает потенциальные риски и доходность',
      icon: <SafetyOutlined />
    },
    {
      title: 'Принятие решений',
      description: 'ИИ принимает решения на основе анализа данных',
      icon: <RobotOutlined />
    },
    {
      title: 'Исполнение сделок',
      description: 'Автоматическое выполнение торговых операций',
      icon: <CheckCircleOutlined />
    }
  ];

  const stakingSteps = [
    {
      title: 'Выбор проекта',
      description: 'Выбор надежного проекта для стейкинга',
      icon: <SafetyOutlined />
    },
    {
      title: 'Блокировка средств',
      description: 'Размещение средств в стейкинг-пул',
      icon: <LockOutlined />
    },
    {
      title: 'Получение наград',
      description: 'Регулярное начисление вознаграждений',
      icon: <DollarOutlined />
    },
    {
      title: 'Реинвестирование',
      description: 'Автоматическое реинвестирование прибыли',
      icon: <CheckCircleOutlined />
    }
  ];

  const renderArbitrageStrategy = () => (
    <div>
      <Title level={3}>{t('strategies.arbitrage.title')}</Title>
      <Paragraph>{t('strategies.arbitrage.description')}</Paragraph>
      <PerformanceChart data={demoData} title="Доходность арбитражной стратегии" />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Месячная доходность</Text>}
              value={4}
              suffix="%"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Количество бирж</Text>}
              value={12}
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Успешных сделок</Text>}
              value={99.8}
              suffix="%"
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={3} style={{ color: 'white', marginBottom: 32 }}>
          Как это работает
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
      <PerformanceChart data={demoData} title="Доходность алгоритмической стратегии" />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Месячная доходность</Text>}
              value={10}
              suffix="%"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Точность прогнозов</Text>}
              value={94.5}
              suffix="%"
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Успешных сделок</Text>}
              value={98.2}
              suffix="%"
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={3} style={{ color: 'white', marginBottom: 32 }}>
          Как это работает
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
      <PerformanceChart data={demoData} title="Доходность стейкинга" />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Годовая доходность</Text>}
              value={71.52}
              suffix="%"
              prefix={<BankOutlined />}
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Количество проектов</Text>}
              value={25}
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Минимальный срок</Text>}
              value={30}
              suffix="дней"
              valueStyle={{ color: '#00F2FE', fontSize: '36px' }}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={3} style={{ color: 'white', marginBottom: 32 }}>
          Как это работает
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