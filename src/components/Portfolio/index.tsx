import React from 'react';
import { Card, Typography, Row, Col, Space, Progress, Badge, Alert } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarOutlined, PercentageOutlined, BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
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
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary} !important;
  display: block;
  margin-top: 8px;
  font-family: var(--font-primary);
`;

const MetricChange = styled(Text)<{ $isPositive: boolean }>`
  font-size: 16px;
  color: ${({ $isPositive }) => ($isPositive ? '#52c41a' : '#ff4d4f')} !important;
  display: block;
  margin-top: 4px;
`;

const NotificationItem = styled(Alert)`
  margin-bottom: 12px;
  border-radius: 8px;
  background: rgba(82, 196, 26, 0.1) !important;
  border: 1px solid rgba(82, 196, 26, 0.2) !important;
  
  .ant-alert-message {
    color: white !important;
  }
  
  .ant-alert-icon {
    color: #52c41a !important;
  }
`;

const mockPortfolioData = [
  { date: '2024-01', value: 10000 },
  { date: '2024-02', value: 11200 },
  { date: '2024-03', value: 12500 },
  { date: '2024-04', value: 13100 },
  { date: '2024-05', value: 14800 },
  { date: '2024-06', value: 16000 },
];

const notifications = [
  'Monthly return target of 4% achieved',
  'Portfolio diversification optimized',
  'New investment opportunity detected',
];

export const Portfolio: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Current Balance */}
        <Col xs={24} lg={8}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              <DollarOutlined /> Current Balance
            </Title>
            <MetricValue>$16,000.00</MetricValue>
            <MetricChange $isPositive={true}>+$1,200 (7.5%)</MetricChange>
            <Progress 
              percent={75} 
              status="active"
              strokeColor="#00F2FE"
              trailColor="rgba(255, 255, 255, 0.1)"
              style={{ marginTop: 16 }}
            />
          </DashboardCard>
        </Col>

        {/* Portfolio Performance */}
        <Col xs={24} lg={8}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              <PercentageOutlined /> Performance
            </Title>
            <div>
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Monthly Return</Text>
              <MetricValue>4.2%</MetricValue>
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Return</Text>
              <MetricValue>60%</MetricValue>
            </div>
          </DashboardCard>
        </Col>

        {/* Trading Status */}
        <Col xs={24} lg={8}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              <BellOutlined /> Notifications
            </Title>
            {notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                message={notification}
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
              />
            ))}
          </DashboardCard>
        </Col>

        {/* Portfolio Growth Chart */}
        <Col xs={24}>
          <DashboardCard>
            <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
              Portfolio Growth
            </Title>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPortfolioData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255, 255, 255, 0.5)"
                  />
                  <YAxis 
                    stroke="rgba(255, 255, 255, 0.5)"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Portfolio Value']}
                  />
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
      </Row>
    </Space>
  );
}; 