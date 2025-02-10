import React, { useState } from 'react';
import { Input, Select, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const { Title, Text } = Typography;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 24px 0 32px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  .ant-typography {
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  
  .ant-input, .ant-select {
    width: 100%;
    height: 48px;
    font-size: 16px;
  }
  
  .ant-input {
    padding: 8px 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    
    &:hover, &:focus {
      border-color: #000000;
      box-shadow: none;
    }
  }
  
  .ant-select-selector {
    height: 48px !important;
    padding: 8px 16px !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 8px !important;
    
    .ant-select-selection-item {
      line-height: 32px !important;
    }
    
    &:hover {
      border-color: #000000 !important;
    }
  }
`;

const CalculateButton = styled(Button)`
  width: 100%;
  height: 48px;
  background: #000000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background: #000000;
    opacity: 0.9;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 24px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
  }
`;

const RiskButton = styled(Button)`
  display: block;
  margin: 24px auto 0;
  color: rgba(0, 0, 0, 0.65);
  padding: 4px 12px;
  height: auto;
  
  &:hover {
    color: #000000;
  }
`;

export const InvestmentCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>('10000');
  const [period, setPeriod] = useState<string>('12');
  const [riskProfile, setRiskProfile] = useState<string>('moderate');
  const [marketCondition, setMarketCondition] = useState<string>('normal');
  const [results, setResults] = useState<{ totalReturn: number; monthlyReturn: number } | null>(null);
  const [chartData, setChartData] = useState(() => {
    const baseAmount = 10000;
    const monthlyReturn = 0.05;
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      value: Math.round(baseAmount * Math.pow(1 + monthlyReturn, i))
    }));
  });

  const updateChartData = (currentAmount: number, currentPeriod: number) => {
    if (isNaN(currentAmount) || isNaN(currentPeriod) || currentAmount <= 0 || currentPeriod <= 0) {
      return;
    }

    const monthlyReturn = 0.05;
    const newData = Array.from({ length: currentPeriod + 1 }, (_, i) => ({
      month: i,
      value: Math.round(currentAmount * Math.pow(1 + monthlyReturn, i))
    }));
    setChartData(newData);
  };

  const handleAmountChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setAmount(numValue);
    updateChartData(parseFloat(numValue), parseInt(period));
  };

  const handlePeriodChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setPeriod(numValue);
    updateChartData(parseFloat(amount), parseInt(numValue));
  };

  const handleCalculate = () => {
    const amountNum = parseFloat(amount) || 0;
    const periodNum = parseInt(period) || 0;
    
    if (amountNum <= 0 || periodNum <= 0) return;

    let monthlyRate = 0.05; // Base rate 5%
    
    // Adjust rate based on risk profile
    switch (riskProfile) {
      case 'conservative':
        monthlyRate *= 0.6;
        break;
      case 'aggressive':
        monthlyRate *= 1.4;
        break;
    }
    
    // Adjust rate based on market condition
    switch (marketCondition) {
      case 'bear':
        monthlyRate *= 0.7;
        break;
      case 'bull':
        monthlyRate *= 1.3;
        break;
    }

    const totalReturn = amountNum * Math.pow(1 + monthlyRate, periodNum);
    const monthlyReturn = (totalReturn - amountNum) / periodNum;
    
    setResults({
      totalReturn,
      monthlyReturn
    });
    
    updateChartData(amountNum, periodNum);
  };

  return (
    <Container>
      <Title level={2}>{t('calculator.title')}</Title>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => `${value}m`}
              stroke="rgba(0, 0, 0, 0.3)"
            />
            <YAxis
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              stroke="rgba(0, 0, 0, 0.3)"
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              labelFormatter={(label) => `Month ${label}`}
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
      
      <InputGroup>
        <InputWrapper>
          <Text>{t('calculator.amount')}</Text>
          <Input
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            prefix="$"
            placeholder="Enter amount"
          />
        </InputWrapper>
        
        <InputWrapper>
          <Text>{t('calculator.period')}</Text>
          <Input
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
            suffix="months"
            placeholder="Enter period"
          />
        </InputWrapper>
        
        <InputWrapper>
          <Text>{t('calculator.riskProfile')}</Text>
          <Select
            value={riskProfile}
            onChange={setRiskProfile}
            options={[
              { value: 'conservative', label: t('calculator.riskProfiles.conservative') },
              { value: 'moderate', label: t('calculator.riskProfiles.moderate') },
              { value: 'aggressive', label: t('calculator.riskProfiles.aggressive') }
            ]}
          />
        </InputWrapper>
        
        <InputWrapper>
          <Text>{t('calculator.marketCondition')}</Text>
          <Select
            value={marketCondition}
            onChange={setMarketCondition}
            options={[
              { value: 'bear', label: t('calculator.marketConditions.bear') },
              { value: 'normal', label: t('calculator.marketConditions.normal') },
              { value: 'bull', label: t('calculator.marketConditions.bull') }
            ]}
          />
        </InputWrapper>
      </InputGroup>

      <CalculateButton type="primary" onClick={handleCalculate}>
        {t('calculator.calculate')}
      </CalculateButton>

      {results && (
        <ResultsContainer>
          <Title level={4} style={{ margin: '0 0 16px 0' }}>{t('calculator.results')}</Title>
          <ResultRow>
            <Text>{t('calculator.totalReturn')}</Text>
            <Text strong>${results.totalReturn.toFixed(2)}</Text>
          </ResultRow>
          <ResultRow>
            <Text>{t('calculator.monthlyReturn')}</Text>
            <Text strong>${results.monthlyReturn.toFixed(2)}</Text>
          </ResultRow>
        </ResultsContainer>
      )}

      <RiskButton type="link" icon={<InfoCircleOutlined />}>
        Important Risk Information
      </RiskButton>
    </Container>
  );
}; 