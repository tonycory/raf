import React from 'react';
import { Card, Typography, Row, Col, Space, Tag, Button, List } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RiseOutlined, FallOutlined, RobotOutlined, BulbOutlined, BarChartOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const DashboardCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(31, 31, 43, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  height: 100%;
`;

const MetricValue = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary} !important;
  display: block;
  margin-top: 8px;
`;

const StatusTag = styled(Tag)<{ $status: 'active' | 'paused' | 'completed' }>`
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
  border: none;
  background: ${({ $status, theme }) => 
    $status === 'active' ? `${theme.colors.success}20` :
    $status === 'paused' ? `${theme.colors.warning}20` :
    `${theme.colors.error}20`};
  color: ${({ $status, theme }) => 
    $status === 'active' ? theme.colors.success :
    $status === 'paused' ? theme.colors.warning :
    theme.colors.error};
`;

const RecommendationButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary}20 !important;
  border: 1px solid ${({ theme }) => theme.colors.primary} !important;
  color: ${({ theme }) => theme.colors.primary} !important;
  border-radius: 8px;
  height: 40px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}40 !important;
    transform: translateY(-2px);
  }
`;

const AssetItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 7000 },
];

const topAssets = [
  { name: 'BTC', change: '+3%', status: 'rise' },
  { name: 'ETH', change: '+2%', status: 'rise' },
  { name: 'SOL', change: '+5%', status: 'rise' },
  { name: 'BNB', change: '-1%', status: 'fall' },
  { name: 'ADA', change: '+1%', status: 'rise' },
];

const marketNews = [
  'SEC approved new ETF for Bitcoin',
  'Binance launches staking for new tokens',
  'Ethereum network upgrade scheduled next month',
];

export const MarketAnalytics: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Market Overview */}
        <Col xs={24} lg={16}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              <BarChartOutlined /> Market Overview
            </Title>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00F2FE" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </Col>

        {/* AI Analytics */}
        <Col xs={24} lg={8}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              <RobotOutlined /> AI Analytics
            </Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Market Status</Text>
                <StatusTag $status="active">Active Trading</StatusTag>
              </div>
              <div>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>AI Recommendation</Text>
                <Text style={{ color: 'white', display: 'block', margin: '8px 0' }}>
                  Increase staking by 15% to maximize returns
                </Text>
                <RecommendationButton icon={<BulbOutlined />}>
                  Apply Recommendation
                </RecommendationButton>
              </div>
            </Space>
          </DashboardCard>
        </Col>

        {/* Top Assets */}
        <Col xs={24} lg={12}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              Top Performing Assets
            </Title>
            {topAssets.map((asset, index) => (
              <AssetItem key={index}>
                <Text style={{ color: 'white' }}>{asset.name}</Text>
                <Space>
                  {asset.status === 'rise' ? (
                    <RiseOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <FallOutlined style={{ color: '#ff4d4f' }} />
                  )}
                  <Text style={{ color: asset.status === 'rise' ? '#52c41a' : '#ff4d4f' }}>
                    {asset.change}
                  </Text>
                </Space>
              </AssetItem>
            ))}
          </DashboardCard>
        </Col>

        {/* Market News */}
        <Col xs={24} lg={12}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              Market News
            </Title>
            <List
              dataSource={marketNews}
              renderItem={(item) => (
                <List.Item style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Text style={{ color: 'white' }}>{item}</Text>
                </List.Item>
              )}
            />
          </DashboardCard>
        </Col>
      </Row>
    </Space>
  );
}; 