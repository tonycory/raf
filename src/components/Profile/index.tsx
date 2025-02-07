import React, { useState } from 'react';
import { Typography, Avatar, Space, Switch, Select, Row, Col, Statistic, Progress } from 'antd';
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
  ClockCircleOutlined
} from '@ant-design/icons';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import PerformanceChart from '../Charts/PerformanceChart';

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
    <ProfileContainer>
      <ProfileCard 
        $expanded={isExpanded('profile')}
        $minimized={isMinimized('profile')}
        onClick={() => handleCardExpand('profile')}
      >
        <ExpandButton $expanded={isExpanded('profile')}>
          {isExpanded('profile') ? <ShrinkOutlined /> : <ExpandAltOutlined />}
        </ExpandButton>
        <Row gutter={[24, 24]} align="middle">
          <Col>
            <StyledAvatar icon={<UserOutlined />} />
          </Col>
          <Col flex="1">
            <Title level={3} style={{ margin: 0, color: 'white' }}>John Doe</Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Premium Member</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={8}>
            <StatisticCard>
              <DollarOutlined style={{ fontSize: 24, color: '#00F2FE' }} />
              <StatisticValue>$16,420</StatisticValue>
              <StatisticLabel>Total Balance</StatisticLabel>
            </StatisticCard>
          </Col>
          <Col span={8}>
            <StatisticCard>
              <TrophyOutlined style={{ fontSize: 24, color: '#00F2FE' }} />
              <StatisticValue>15</StatisticValue>
              <StatisticLabel>Active Investments</StatisticLabel>
            </StatisticCard>
          </Col>
          <Col span={8}>
            <StatisticCard>
              <ClockCircleOutlined style={{ fontSize: 24, color: '#00F2FE' }} />
              <StatisticValue>186</StatisticValue>
              <StatisticLabel>Days Active</StatisticLabel>
            </StatisticCard>
          </Col>
        </Row>
        <Progress 
          percent={75} 
          status="active" 
          strokeColor="#00F2FE"
          trailColor="rgba(255, 255, 255, 0.1)"
          style={{ marginTop: 24 }}
        />
      </ProfileCard>

      <ProfileCard 
        $delay="0.2s"
        $expanded={isExpanded('performance')}
        $minimized={isMinimized('performance')}
        onClick={() => handleCardExpand('performance')}
      >
        <ExpandButton $expanded={isExpanded('performance')}>
          {isExpanded('performance') ? <ShrinkOutlined /> : <ExpandAltOutlined />}
        </ExpandButton>
        <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
          <RiseOutlined /> {t('profile.performance')}
        </Title>
        <ChartWrapper>
          <PerformanceChart data={performanceData} title="Доходность портфеля" />
        </ChartWrapper>
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={8}>
            <Statistic 
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Monthly Return</Text>}
              value={4.2}
              suffix="%"
              valueStyle={{ color: '#00F2FE' }}
            />
          </Col>
          <Col span={8}>
            <Statistic 
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Return</Text>}
              value={64.2}
              suffix="%"
              valueStyle={{ color: '#00F2FE' }}
            />
          </Col>
          <Col span={8}>
            <Statistic 
              title={<Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Success Rate</Text>}
              value={98.5}
              suffix="%"
              valueStyle={{ color: '#00F2FE' }}
            />
          </Col>
        </Row>
      </ProfileCard>

      <ProfileCard 
        $delay="0.4s"
        $expanded={isExpanded('settings')}
        $minimized={isMinimized('settings')}
        onClick={() => handleCardExpand('settings')}
      >
        <ExpandButton $expanded={isExpanded('settings')}>
          {isExpanded('settings') ? <ShrinkOutlined /> : <ExpandAltOutlined />}
        </ExpandButton>
        <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
          <SettingOutlined /> {t('profile.settings')}
        </Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <SettingRow $delay="0.5s" onClick={e => e.stopPropagation()}>
            <SettingLabel>
              <BgColorsOutlined />
              <Text style={{ color: 'white' }}>{t('profile.darkTheme')}</Text>
            </SettingLabel>
            <StyledSwitch 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
            />
          </SettingRow>

          <SettingRow $delay="0.6s" onClick={e => e.stopPropagation()}>
            <SettingLabel>
              <GlobalOutlined />
              <Text style={{ color: 'white' }}>{t('profile.language')}</Text>
            </SettingLabel>
            <StyledSelect
              defaultValue={i18n.language}
              onChange={handleLanguageChange}
              options={[
                { value: 'ru', label: 'Русский' },
                { value: 'en', label: 'English' }
              ]}
            />
          </SettingRow>

          <SettingRow $delay="0.7s" onClick={e => e.stopPropagation()}>
            <SettingLabel>
              <BellOutlined />
              <Text style={{ color: 'white' }}>{t('profile.notifications')}</Text>
            </SettingLabel>
            <StyledSwitch defaultChecked />
          </SettingRow>
        </Space>
      </ProfileCard>

      <ProfileCard 
        $delay="0.6s"
        $expanded={isExpanded('preferences')}
        $minimized={isMinimized('preferences')}
        onClick={() => handleCardExpand('preferences')}
      >
        <ExpandButton $expanded={isExpanded('preferences')}>
          {isExpanded('preferences') ? <ShrinkOutlined /> : <ExpandAltOutlined />}
        </ExpandButton>
        <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
          <SafetyOutlined /> {t('profile.investmentPreferences')}
        </Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <SettingRow $delay="0.8s" onClick={e => e.stopPropagation()}>
            <SettingLabel>
              <RiseOutlined />
              <Text style={{ color: 'white' }}>{t('profile.riskProfile')}</Text>
            </SettingLabel>
            <StyledSelect
              defaultValue="moderate"
              style={{ width: 200 }}
              options={[
                { value: 'conservative', label: t('calculator.riskProfiles.conservative') },
                { value: 'moderate', label: t('calculator.riskProfiles.moderate') },
                { value: 'aggressive', label: t('calculator.riskProfiles.aggressive') }
              ]}
            />
          </SettingRow>

          <SettingRow $delay="0.9s" onClick={e => e.stopPropagation()}>
            <SettingLabel>
              <SafetyOutlined />
              <Text style={{ color: 'white' }}>{t('profile.preferredStrategy')}</Text>
            </SettingLabel>
            <StyledSelect
              defaultValue="algorithmic"
              style={{ width: 200 }}
              options={[
                { value: 'arbitrage', label: t('strategies.arbitrage.title') },
                { value: 'algorithmic', label: t('strategies.algorithmic.title') },
                { value: 'staking', label: t('strategies.staking.title') }
              ]}
            />
          </SettingRow>
        </Space>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile; 