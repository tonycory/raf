import React, { useState } from 'react';
import { Typography, Avatar, Space, Switch, Select, Row, Col, Statistic, Progress, Card, Badge, Alert } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  SafetyOutlined,
  RiseOutlined,
  ExpandAltOutlined,
  ShrinkOutlined,
  DollarOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  PercentageOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text } = Typography;

// Анимации
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 242, 254, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(0, 242, 254, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 242, 254, 0);
  }
`;

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const ProfileCard = styled.div<{ $delay?: string; $expanded?: boolean; $minimized?: boolean }>`
  background: rgba(31, 31, 43, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
  min-height: 200px;
  
  ${props => props.$expanded && css`
    grid-column: 1 / -1;
    grid-row: span 2;
    transform: scale(1.02);
    z-index: 2;
  `}
  
  ${props => props.$minimized && css`
    transform: scale(0.95);
    opacity: 0.7;
  `}

  &:hover {
    transform: ${props => props.$expanded ? 'scale(1.02)' : 'scale(0.98)'};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 242, 254, 0.2);
  }
`;

const ExpandButton = styled.div<{ $expanded?: boolean }>`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  .anticon {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 96px;
  height: 96px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.cardBg};
  animation: ${pulse} 2s infinite;
  
  .anticon {
    font-size: 48px;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    .anticon {
      transform: scale(1.1);
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SettingRow = styled.div<{ $delay?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  animation: ${slideInLeft} 0.5s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(8px);
  }
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .anticon {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.3s ease;
  }

  &:hover .anticon {
    transform: scale(1.2) rotate(5deg);
  }
`;

const StyledSelect = styled(Select)`
  width: 200px;
  
  .ant-select-selector {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    transition: all 0.3s ease;
  }

  &:hover .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.primary} !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background: ${({ theme }) => theme.colors.primary} !important;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ChartWrapper = styled.div`
  margin: 24px 0;
  min-height: 400px;
`;

const performanceData = [
  { date: '2023-10-01', value: 4000 },
  { date: '2023-11-01', value: 4500 },
  { date: '2023-12-01', value: 5000 },
  { date: '2024-01-01', value: 5500 },
  { date: '2024-02-01', value: 6000 },
  { date: '2024-03-01', value: 6500 }
];

const StatisticValue = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary} !important;
  display: block;
  margin-top: 4px;
`;

const StatisticLabel = styled(Text)`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const StatisticCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  margin-top: 16px;
`;

const StyledCard = styled(Card)`
  height: 100%;
  position: relative;
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 8px;
  transition: all 0.2s ease;

  .ant-card-head {
    border-bottom: 1px solid #000000;
    
    .ant-card-head-title {
      font-family: var(--font-primary);
      font-size: ${({ theme }) => theme.typography.h3.fontSize};
      font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
      color: #000000;
    }
  }

  &:hover {
    border-color: #000000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MetricValue = styled.div`
  font-family: var(--font-primary);
  font-size: 32px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
`;

const MetricChange = styled.div<{ $isPositive?: boolean }>`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  color: ${({ $isPositive }) => $isPositive ? '#00A878' : '#FF4B55'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NotificationItem = styled.div`
  padding: 16px;
  border: 1px solid #000000;
  border-radius: 8px;
  background: #FFFFFF;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  color: #000000;

  &:hover {
    border-color: #000000;
    background: #F8F9FA;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border: 1px solid #000000;
  margin-bottom: 16px;
  
  .anticon {
    font-size: 20px;
    color: #000000;
  }

  &:hover {
    border-color: #000000;
    background: #F8F9FA;
  }
`;

const StyledProgress = styled(Progress)`
  .ant-progress-inner {
    background-color: #F8F9FA;
  }

  .ant-progress-bg {
    background: #000000;
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

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const isExpanded = (cardId: string) => expandedCard === cardId;
  const isMinimized = (cardId: string) => expandedCard !== null && expandedCard !== cardId;

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Current Balance */}
        <Col xs={24} lg={8}>
          <StyledCard>
            <Space direction="vertical" size="large">
              <IconWrapper>
                <DollarOutlined />
              </IconWrapper>
              <div>
                <Text style={{ color: '#000000', fontSize: '16px' }}>
                  Current Balance
                </Text>
                <MetricValue>$16,000.00</MetricValue>
                <MetricChange $isPositive={true}>+$1,200 (7.5%)</MetricChange>
                <StyledProgress 
                  percent={75} 
                  status="active"
                  strokeWidth={8}
                  style={{ marginTop: 24 }}
                />
              </div>
            </Space>
          </StyledCard>
        </Col>

        {/* Portfolio Performance */}
        <Col xs={24} lg={8}>
          <StyledCard>
            <Space direction="vertical" size="large">
              <IconWrapper>
                <TrophyOutlined />
              </IconWrapper>
              <div>
                <Text style={{ color: '#000000', fontSize: '16px', fontWeight: 500 }}>
                  Monthly Return
                </Text>
                <MetricValue>4.2%</MetricValue>
                <Text style={{ color: '#000000', fontSize: '16px', fontWeight: 500, marginTop: 24 }}>
                  Total Return
                </Text>
                <MetricValue>60%</MetricValue>
              </div>
            </Space>
          </StyledCard>
        </Col>

        {/* Trading Status */}
        <Col xs={24} lg={8}>
          <StyledCard>
            <Space direction="vertical" size="large">
              <IconWrapper>
                <SafetyOutlined />
              </IconWrapper>
              <div>
                <Text style={{ color: '#000000', fontSize: '16px', fontWeight: 500, marginBottom: 16 }}>
                  Status Updates
                </Text>
                {notifications.map((notification, index) => (
                  <NotificationItem key={index}>
                    {notification}
                  </NotificationItem>
                ))}
              </div>
            </Space>
          </StyledCard>
        </Col>

        {/* Portfolio Growth Chart */}
        <Col xs={24}>
          <StyledCard>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <IconWrapper>
                <RiseOutlined />
              </IconWrapper>
              <Title level={4} style={{ color: '#000000', marginBottom: 24 }}>Portfolio Growth</Title>
              <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockPortfolioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </Space>
          </StyledCard>
        </Col>
      </Row>
    </Space>
  );
};

export default Profile; 