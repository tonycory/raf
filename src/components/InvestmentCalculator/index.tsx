import React, { useState } from 'react';
import { Card, Input, Select, Button, Typography, Row, Col, Space, Modal } from 'antd';
import {
  DollarOutlined,
  CalendarOutlined,
  RiseOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  InfoCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import rafLogo from '../../assets/images/RAF_logo.svg';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(31, 31, 43, 0.7) !important;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled(Text)`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  
  .anticon {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
  }
`;

const StyledInput = styled(Input)`
  height: 48px;
  font-size: 16px;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;

  &:hover, &:focus {
    border-color: ${({ theme }) => theme.colors.primary} !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }

  .ant-input {
    background: transparent !important;
    color: white !important;
  }

  .ant-input-prefix,
  .ant-input-suffix {
    color: rgba(255, 255, 255, 0.5) !important;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 48px !important;
    padding: 8px 16px !important;
    border-radius: 8px !important;
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    
    .ant-select-selection-item {
      line-height: 32px !important;
      font-size: 16px;
      color: white !important;
    }
  }

  &:hover .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.primary} !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }
`;

const CalculateButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.primary} !important;
  border: none !important;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}40`};
    opacity: 0.9;
  }
  
  .anticon {
    font-size: 20px;
  }
`;

const ResultsCard = styled(Card)`
  margin-top: 24px;
  border-radius: 8px;
  background: rgba(0, 242, 254, 0.1) !important;
  border: 1px solid rgba(0, 242, 254, 0.2) !important;
  
  .ant-card-body {
    padding: 24px;
  }
`;

const ResultValue = styled(Text)`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary} !important;
  display: block;
  margin-top: 8px;
  font-family: var(--font-primary);
`;

interface CalculatorResult {
  totalReturn: number;
  monthlyReturn: number;
  apr: number;
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(17, 17, 23, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 242, 254, 0.2);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    width: 90%;
    max-width: 700px;
    margin: 0 auto;
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: none;
  }

  .ant-modal-body {
    padding: 24px;
    color: white;
    font-size: 16px;
    line-height: 1.6;
  }

  .ant-modal-title {
    color: #00F2FE !important;
    font-size: 20px;
    font-weight: 600;
    font-family: var(--font-primary);
  }

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      color: white;
    }
  }
`;

const RISK_PROFILES = {
  conservative: {
    minAmount: 1000,
    description: 'Консервативная стратегия подходит для долгосрочных инвестиций с минимальным риском. Рекомендуемый срок от 12 месяцев.'
  },
  moderate: {
    minAmount: 5000,
    description: 'Умеренная стратегия предполагает средний уровень риска с потенциально высокой доходностью. Рекомендуемый срок от 12 месяцев.'
  },
  aggressive: {
    minAmount: 10000,
    description: 'Агрессивная стратегия связана с высоким риском и подходит для опытных инвесторов. Рекомендуемый срок от 12 месяцев.'
  }
};

const CalcLogoImage = styled.img`
  height: 160px;
  width: auto;
  filter: invert(1);
  margin-bottom: 24px;
`;

export const InvestmentCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [period, setPeriod] = useState<number>(12);
  const [riskProfile, setRiskProfile] = useState<string>('moderate');
  const [marketCondition, setMarketCondition] = useState<string>('normal');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const showModal = (content: string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const updateInfo = (newAmount: number, newPeriod: number, newProfile: string) => {
    const profile = RISK_PROFILES[newProfile as keyof typeof RISK_PROFILES];
    let content = '';

    // Показываем базовое описание только если период < 12 или сумма меньше минимальной
    if (newPeriod < 12 || newAmount < profile.minAmount || (marketCondition === 'bear' && newProfile !== 'conservative')) {
      content = profile.description;
    }

    if (newPeriod < 12) {
      content += '\n\nОбратите внимание: на коротком периоде (менее 12 месяцев) расчет может быть неточным из-за рыночной волатильности. Рекомендуем рассмотреть более длительный период инвестирования для достижения оптимальных результатов.';
    }

    if (newAmount < profile.minAmount) {
      content += `\n\nРекомендуемая минимальная сумма для данной стратегии: $${profile.minAmount}. Вы можете инвестировать меньшую сумму, но это может повлиять на эффективность стратегии.`;
    }

    if (marketCondition === 'bear' && newProfile !== 'conservative') {
      content += '\n\nВ текущих рыночных условиях (медвежий рынок) рекомендуется рассмотреть более консервативную стратегию для минимизации рисков.';
    }

    // Показываем модальное окно только если есть контент
    if (content) {
      showModal(content);
    }
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
    updateInfo(value, period, riskProfile);
  };

  const handlePeriodChange = (value: number) => {
    setPeriod(value);
    updateInfo(amount, value, riskProfile);
  };

  const handleProfileChange = (value: string) => {
    setRiskProfile(value);
    updateInfo(amount, period, value);
  };

  const handleMarketConditionChange = (value: string) => {
    setMarketCondition(value);
    updateInfo(amount, period, riskProfile);
  };

  const calculateReturns = () => {
    // Базовые годовые ставки для разных профилей риска
    const baseAnnualRates = {
      conservative: {
        bear: 0.04,    // 4% в медвежий рынок
        normal: 0.06,   // 6% в нормальный рынок
        bull: 0.08     // 8% в бычий рынок
      },
      moderate: {
        bear: 0.06,    // 6% в медвежий рынок
        normal: 0.10,   // 10% в нормальный рынок
        bull: 0.15     // 15% в бычий рынок
      },
      aggressive: {
        bear: 0.08,    // 8% в медвежий рынок
        normal: 0.15,   // 15% в нормальный рынок
        bull: 0.25     // 25% в бычий рынок
      }
    };

    // Получаем годовую ставку на основе профиля риска и состояния рынка
    const annualRate = baseAnnualRates[riskProfile as keyof typeof baseAnnualRates][marketCondition as keyof typeof baseAnnualRates.conservative];

    // Расчет месячной ставки
    const monthlyRate = annualRate / 12;

    // Расчет общего возврата с учетом сложного процента
    const totalReturn = amount * Math.pow(1 + monthlyRate, period) - amount;
    
    // Расчет среднемесячного возврата
    const monthlyReturn = totalReturn / period;

    // Расчет годовой процентной ставки (APR)
    const apr = annualRate * 100;

    setResult({
      totalReturn,
      monthlyReturn,
      apr
    });
  };

  return (
    <StyledCard>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <CalcLogoImage src={rafLogo} alt="RAF Logo" />
            Инвестиционный калькулятор
          </div>
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <InputGroup>
              <InputLabel>
                <DollarOutlined /> Сумма инвестиций ($)
              </InputLabel>
              <StyledInput
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                min={0}
                prefix={<DollarOutlined />}
              />
            </InputGroup>
          </Col>

          <Col xs={24} md={12}>
            <InputGroup>
              <InputLabel>
                <CalendarOutlined /> Период инвестирования (месяцев)
              </InputLabel>
              <StyledInput
                type="number"
                value={period}
                onChange={(e) => handlePeriodChange(Number(e.target.value))}
                min={1}
                suffix="мес."
              />
            </InputGroup>
          </Col>

          <Col xs={24} md={12}>
            <InputGroup>
              <InputLabel>
                <RiseOutlined /> Профиль риска
              </InputLabel>
              <StyledSelect
                value={riskProfile}
                onChange={handleProfileChange}
                options={[
                  { value: 'conservative', label: 'Консервативный (4-8% годовых)' },
                  { value: 'moderate', label: 'Умеренный (6-15% годовых)' },
                  { value: 'aggressive', label: 'Агрессивный (8-25% годовых)' }
                ]}
              />
            </InputGroup>
          </Col>

          <Col xs={24} md={12}>
            <InputGroup>
              <InputLabel>
                <BarChartOutlined /> Состояние рынка
              </InputLabel>
              <StyledSelect
                value={marketCondition}
                onChange={handleMarketConditionChange}
                options={[
                  { value: 'bear', label: 'Медвежий рынок (Низкая доходность)' },
                  { value: 'normal', label: 'Нормальный рынок (Средняя доходность)' },
                  { value: 'bull', label: 'Бычий рынок (Высокая доходность)' }
                ]}
              />
            </InputGroup>
          </Col>
        </Row>

        <CalculateButton 
          type="primary" 
          onClick={calculateReturns}
          icon={<CalculatorOutlined />}
        >
          Рассчитать доходность
        </CalculateButton>

        {result && (
          <ResultsCard bordered={false}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Text style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>Общий доход</Text>
                <ResultValue>${result.totalReturn.toFixed(2)}</ResultValue>
              </Col>
              <Col xs={24} md={8}>
                <Text style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>Ежемесячный доход</Text>
                <ResultValue>${result.monthlyReturn.toFixed(2)}</ResultValue>
              </Col>
              <Col xs={24} md={8}>
                <Text style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>Годовая ставка (APR)</Text>
                <ResultValue>{result.apr.toFixed(1)}%</ResultValue>
              </Col>
            </Row>
          </ResultsCard>
        )}

        <StyledModal
          title="Информация для инвестора"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          centered
          width={700}
          closeIcon={<CloseOutlined style={{ fontSize: '18px' }} />}
        >
          {modalContent.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
          ))}
        </StyledModal>
      </Space>
    </StyledCard>
  );
}; 