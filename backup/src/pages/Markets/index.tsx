import React from 'react';
import { Typography, Card, Table, Tag } from 'antd';

const { Title, Paragraph } = Typography;

interface MarketData {
  key: string;
  market: string;
  condition: string;
  volatility: string;
  recommendation: string;
}

const marketData: MarketData[] = [
  {
    key: '1',
    market: 'Stock Market',
    condition: 'Bull',
    volatility: 'Medium',
    recommendation: 'Buy',
  },
  {
    key: '2',
    market: 'Crypto Market',
    condition: 'Bear',
    volatility: 'High',
    recommendation: 'Hold',
  },
  {
    key: '3',
    market: 'Bond Market',
    condition: 'Normal',
    volatility: 'Low',
    recommendation: 'Buy',
  },
  {
    key: '4',
    market: 'Commodity Market',
    condition: 'Bull',
    volatility: 'Medium',
    recommendation: 'Buy',
  },
];

const Markets: React.FC = () => {
  const columns = [
    {
      title: 'Market',
      dataIndex: 'market',
      key: 'market',
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
      render: (condition: string) => {
        const color = condition === 'Bull' ? 'green' : condition === 'Bear' ? 'red' : 'blue';
        return <Tag color={color}>{condition}</Tag>;
      },
    },
    {
      title: 'Volatility',
      dataIndex: 'volatility',
      key: 'volatility',
      render: (volatility: string) => {
        const color = 
          volatility === 'High' ? 'red' : 
          volatility === 'Medium' ? 'orange' : 
          'green';
        return <Tag color={color}>{volatility}</Tag>;
      },
    },
    {
      title: 'Recommendation',
      dataIndex: 'recommendation',
      key: 'recommendation',
      render: (recommendation: string) => {
        const color = 
          recommendation === 'Buy' ? 'green' : 
          recommendation === 'Sell' ? 'red' : 
          'orange';
        return <Tag color={color}>{recommendation}</Tag>;
      },
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Title level={1}>Market Analysis</Title>
      <Card style={{ marginTop: 24 }}>
        <Paragraph>
          Current market conditions and recommendations based on our analysis.
          Please note that this information is for reference only and should not be
          considered as financial advice.
        </Paragraph>
        <Table 
          dataSource={marketData} 
          columns={columns} 
          pagination={false}
          style={{ marginTop: 24 }}
        />
      </Card>
    </div>
  );
};

export default Markets; 