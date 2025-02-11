import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Text } from '@/components/ui';
import { Input, Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CalculatorContainer = styled.div`
  padding: 32px;
  position: relative;
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 24px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 32px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const StyledLineChart = styled(ResponsiveContainer)`
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: rgba(0, 0, 0, 0.1);
  }

  .recharts-cartesian-axis-line {
    stroke: rgba(0, 0, 0, 0.1);
  }

  .recharts-cartesian-axis-tick-value {
    fill: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }

  .recharts-tooltip-wrapper {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
`;

const InputWrapper = styled.div`
  .ant-typography {
    color: #000000;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .ant-input, .ant-select {
    height: 48px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    color: #000000;

    &:hover, &:focus {
      border-color: #000000;
      box-shadow: none;
    }
  }

  .ant-select-selector {
    height: 48px !important;
    padding: 8px 16px !important;
    background: #FFFFFF !important;

    .ant-select-selection-item {
      line-height: 32px !important;
      color: #000000;
    }
  }
`;

const CalculateButton = styled(Button)`
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  background: #000000;
  border: none;
  color: #FFFFFF;
  border-radius: 8px;
  
  &:hover {
    opacity: 0.9;
    color: #FFFFFF;
  }
`;

const ResultCard = styled(Card)`
  margin-top: 32px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  .ant-card-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .ant-card-head-title {
    color: #000000;
    font-weight: 500;
  }
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultLabel = styled(Text)`
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
`;

const ResultValue = styled(Text)`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
`;

const Calculator: React.FC = () => {
  const [chartData] = useState(() => {
    const baseAmount = 10000;
    const monthlyReturn = 0.05; // 5% monthly return
    return Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      value: Math.round(baseAmount * Math.pow(1 + monthlyReturn, i))
    }));
  });

  return (
    <CalculatorContainer>
      <Title>Investment Calculator</Title>
      
      <ChartContainer>
        <StyledLineChart width="100%" height={400}>
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
        </StyledLineChart>
      </ChartContainer>

      <InputGroup>
        <InputWrapper>
          <Text>Investment Amount ($)</Text>
          <Input placeholder="Enter amount" defaultValue="10000" />
        </InputWrapper>
        <InputWrapper>
          <Text>Investment Period (months)</Text>
          <Input placeholder="Enter period" defaultValue="12" />
        </InputWrapper>
        <InputWrapper>
          <Text>Risk Profile</Text>
          <Select
            defaultValue="moderate"
            style={{ width: '100%' }}
            options={[
              { value: 'conservative', label: 'Conservative' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'aggressive', label: 'Aggressive' },
            ]}
          />
        </InputWrapper>
        <InputWrapper>
          <Text>Market Condition</Text>
          <Select
            defaultValue="normal"
            style={{ width: '100%' }}
            options={[
              { value: 'bear', label: 'Bear Market' },
              { value: 'normal', label: 'Normal Market' },
              { value: 'bull', label: 'Bull Market' },
            ]}
          />
        </InputWrapper>
      </InputGroup>

      <CalculateButton>Calculate Returns</CalculateButton>

      <ResultCard title="Results">
        <ResultRow>
          <ResultLabel>Total Return</ResultLabel>
          <ResultValue>$0.00</ResultValue>
        </ResultRow>
        <ResultRow>
          <ResultLabel>Monthly Return</ResultLabel>
          <ResultValue>$0.00</ResultValue>
        </ResultRow>
      </ResultCard>
    </CalculatorContainer>
  );
};

export default Calculator; 