import React from 'react';
import { Typography, Avatar, Space, Switch, Select, Row, Col } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  SafetyOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text } = Typography;

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const ProfileCard = styled.div`
  background: rgba(31, 31, 43, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
`;

const StyledAvatar = styled(Avatar)`
  width: 96px;
  height: 96px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.cardBg};
  
  .anticon {
    font-size: 48px;
  }
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .anticon {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledSelect = styled(Select)`
  width: 200px;
  
  .ant-select-selector {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background: ${({ theme }) => theme.colors.primary} !important;
  }
`;

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <ProfileContainer>
      {/* Основная информация */}
      <ProfileCard>
        <Row gutter={[24, 24]} align="middle">
          <Col>
            <StyledAvatar icon={<UserOutlined />} />
          </Col>
          <Col flex="1">
            <Title level={3} style={{ margin: 0, color: 'white' }}>John Doe</Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Premium Member</Text>
          </Col>
        </Row>
      </ProfileCard>

      {/* Настройки профиля */}
      <ProfileCard>
        <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
          <SettingOutlined /> {t('profile.settings')}
        </Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <SettingRow>
            <SettingLabel>
              <BgColorsOutlined />
              <Text style={{ color: 'white' }}>{t('profile.darkTheme')}</Text>
            </SettingLabel>
            <StyledSwitch 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
            />
          </SettingRow>

          <SettingRow>
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

          <SettingRow>
            <SettingLabel>
              <BellOutlined />
              <Text style={{ color: 'white' }}>{t('profile.notifications')}</Text>
            </SettingLabel>
            <StyledSwitch defaultChecked />
          </SettingRow>
        </Space>
      </ProfileCard>

      {/* Инвестиционные предпочтения */}
      <ProfileCard>
        <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
          <SafetyOutlined /> {t('profile.investmentPreferences')}
        </Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <SettingRow>
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

          <SettingRow>
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