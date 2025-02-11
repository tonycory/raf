import React from 'react';
import { Typography, Card, Row, Col, Statistic, Space, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  LineChartOutlined,
  RobotOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Strategies: React.FC = () => {
  const { t } = useTranslation();

  const renderAdvantageCard = (title: string, value: string, icon: React.ReactNode) => (
    <Card style={{ height: '100%' }}>
      <Space direction="vertical" size="small">
        {icon}
        <Title level={5}>{title}</Title>
        <Paragraph>{value}</Paragraph>
      </Space>
    </Card>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      {/* Арбитражная стратегия */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={2}>{t('strategies.arbitrage.title')}</Title>
        <Paragraph>{t('strategies.arbitrage.description')}</Paragraph>
        
        <Title level={3}>{t('strategies.arbitrage.advantages.title')}</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            {renderAdvantageCard(
              t('strategies.arbitrage.advantages.profitability.title'),
              t('strategies.arbitrage.advantages.profitability.value'),
              <LineChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={8}>
            {renderAdvantageCard(
              t('strategies.arbitrage.advantages.trading.title'),
              t('strategies.arbitrage.advantages.trading.value'),
              <RobotOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={8}>
            {renderAdvantageCard(
              t('strategies.arbitrage.advantages.transparency.title'),
              t('strategies.arbitrage.advantages.transparency.value'),
              <SafetyOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
        </Row>
      </Card>

      {/* Алгоритмическая торговля */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={2}>{t('strategies.algorithmic.title')}</Title>
        <Paragraph>{t('strategies.algorithmic.description')}</Paragraph>
        
        <Title level={3}>{t('strategies.algorithmic.advantages.title')}</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            {renderAdvantageCard(
              t('strategies.algorithmic.advantages.profitability.title'),
              t('strategies.algorithmic.advantages.profitability.value'),
              <LineChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={12} lg={6}>
            {renderAdvantageCard(
              t('strategies.algorithmic.advantages.reliability.title'),
              t('strategies.algorithmic.advantages.reliability.value'),
              <SafetyOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={12} lg={6}>
            {renderAdvantageCard(
              t('strategies.algorithmic.advantages.riskManagement.title'),
              t('strategies.algorithmic.advantages.riskManagement.value'),
              <CheckCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={12} lg={6}>
            {renderAdvantageCard(
              t('strategies.algorithmic.advantages.automation.title'),
              t('strategies.algorithmic.advantages.automation.value'),
              <RobotOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
        </Row>
      </Card>

      {/* Стейкинг */}
      <Card>
        <Title level={2}>{t('strategies.staking.title')}</Title>
        <Paragraph>{t('strategies.staking.description')}</Paragraph>
        
        <Title level={4}>{t('strategies.staking.profitability.title')}</Title>
        <Paragraph type="secondary">{t('strategies.staking.profitability.date')}</Paragraph>
        
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="PION"
                value={t('strategies.staking.profitability.projects.pion.apr')}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="GRAV"
                value={t('strategies.staking.profitability.projects.grav.apr')}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="CARV"
                value={t('strategies.staking.profitability.projects.carv.apr')}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="ZETACHAIN"
                value={t('strategies.staking.profitability.projects.zetachain.apr')}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>

        <Title level={3}>{t('strategies.staking.advantages.title')}</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            {renderAdvantageCard(
              t('strategies.staking.advantages.passive.title'),
              t('strategies.staking.advantages.passive.value'),
              <LineChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={8}>
            {renderAdvantageCard(
              t('strategies.staking.advantages.storage.title'),
              t('strategies.staking.advantages.storage.value'),
              <SafetyOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
          <Col xs={24} sm={8}>
            {renderAdvantageCard(
              t('strategies.staking.advantages.automation.title'),
              t('strategies.staking.advantages.automation.value'),
              <RobotOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Strategies; 