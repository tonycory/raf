import React, { useState } from 'react';
import { Card, Input, Select, Button, Typography } from 'antd';

const { Title } = Typography;

interface CalculatorResult {
  totalReturn: number;
  monthlyReturn: number;
}

export const InvestmentCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [period, setPeriod] = useState<number>(12);
  const [riskProfile, setRiskProfile] = useState<string>('moderate');
  const [marketCondition, setMarketCondition] = useState<string>('normal');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateReturns = () => {
    const riskMultiplier = {
      conservative: 0.05,
      moderate: 0.08,
      aggressive: 0.12
    }[riskProfile] || 0.08;

    const marketMultiplier = {
      bear: 0.7,
      normal: 1,
      bull: 1.3
    }[marketCondition] || 1;

    const annualReturn = amount * riskMultiplier * marketMultiplier;
    const totalReturn = (annualReturn * period) / 12;
    const monthlyReturn = totalReturn / period;

    setResult({ totalReturn, monthlyReturn });
  };

  return (
    <Card title={<Title level={3}>Investment Calculator</Title>} style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Typography.Text>Investment Amount ($)</Typography.Text>
          <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={0} />
        </div>

        <div>
          <Typography.Text>Investment Period (months)</Typography.Text>
          <Input type="number" value={period} onChange={(e) => setPeriod(Number(e.target.value))} min={1} />
        </div>

        <div>
          <Typography.Text>Risk Profile</Typography.Text>
          <Select
            value={riskProfile}
            onChange={setRiskProfile}
            style={{ width: '100%' }}
            options={[
              { value: 'conservative', label: 'Conservative' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'aggressive', label: 'Aggressive' }
            ]}
          />
        </div>

        <div>
          <Typography.Text>Market Condition</Typography.Text>
          <Select
            value={marketCondition}
            onChange={setMarketCondition}
            style={{ width: '100%' }}
            options={[
              { value: 'bear', label: 'Bear Market' },
              { value: 'normal', label: 'Normal Market' },
              { value: 'bull', label: 'Bull Market' }
            ]}
          />
        </div>

        <Button type="primary" onClick={calculateReturns}>Calculate Returns</Button>

        {result && (
          <div style={{ marginTop: '16px' }}>
            <Typography.Title level={4}>Results</Typography.Title>
            <Typography.Text>Total Return: ${result.totalReturn.toFixed(2)}</Typography.Text>
            <br />
            <Typography.Text>Monthly Return: ${result.monthlyReturn.toFixed(2)}</Typography.Text>
          </div>
        )}
      </div>
    </Card>
  );
}; 