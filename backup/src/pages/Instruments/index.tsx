import React from 'react';
import { Typography, Card, Row, Col, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  SwapOutlined,
  RobotOutlined,
  SafetyOutlined,
  DollarOutlined,
  LineChartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Instruments: React.FC = () => {
  const { t } = useTranslation();

  const renderAdvantageCard = (icon: React.ReactNode, title: string, value: string) => (
    <Card style={{ height: '100%', textAlign: 'center' }}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {icon}
        <Title level={5}>{title}</Title>
        <Text type="secondary">{value}</Text>
      </Space>
    </Card>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Arbitrage Strategy Section */}
        <Card>
          <Title level={2}>{t('strategies.arbitrage.title')}</Title>
          <Text>{t('strategies.arbitrage.description')}</Text>
          <Title level={4} style={{ marginTop: 24 }}>{t('strategies.arbitrage.advantages.title')}</Title>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={8}>
              {renderAdvantageCard(
                <DollarOutlined style={{ fontSize: 24 }} />,
                t('strategies.arbitrage.advantages.profitability.title'),
                t('strategies.arbitrage.advantages.profitability.value')
              )}
            </Col>
            <Col xs={24} sm={8}>
              {renderAdvantageCard(
                <SwapOutlined style={{ fontSize: 24 }} />,
                t('strategies.arbitrage.advantages.trading.title'),
                t('strategies.arbitrage.advantages.trading.value')
              )}
            </Col>
            <Col xs={24} sm={8}>
              {renderAdvantageCard(
                <CheckCircleOutlined style={{ fontSize: 24 }} />,
                t('strategies.arbitrage.advantages.transparency.title'),
                t('strategies.arbitrage.advantages.transparency.value')
              )}
            </Col>
          </Row>
        </Card>

        {/* Algorithmic Trading Section */}
        <Card>
          <Title level={2}>{t('strategies.algorithmic.title')}</Title>
          <Text>{t('strategies.algorithmic.description')}</Text>
          <Title level={4} style={{ marginTop: 24 }}>{t('strategies.algorithmic.advantages.title')}</Title>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} md={6}>
              {renderAdvantageCard(
                <DollarOutlined style={{ fontSize: 24 }} />,
                t('strategies.algorithmic.advantages.profitability.title'),
                t('strategies.algorithmic.advantages.profitability.value')
              )}
            </Col>
            <Col xs={24} sm={12} md={6}>
              {renderAdvantageCard(
                <SafetyOutlined style={{ fontSize: 24 }} />,
                t('strategies.algorithmic.advantages.reliability.title'),
                t('strategies.algorithmic.advantages.reliability.value')
              )}
            </Col>
            <Col xs={24} sm={12} md={6}>
              {renderAdvantageCard(
                <LineChartOutlined style={{ fontSize: 24 }} />,
                t('strategies.algorithmic.advantages.riskManagement.title'),
                t('strategies.algorithmic.advantages.riskManagement.value')
              )}
            </Col>
            <Col xs={24} sm={12} md={6}>
              {renderAdvantageCard(
                <RobotOutlined style={{ fontSize: 24 }} />,
                t('strategies.algorithmic.advantages.automation.title'),
                t('strategies.algorithmic.advantages.automation.value')
              )}
            </Col>
          </Row>
        </Card>

        {/* Staking Section */}
        <Card>
          <Title level={2}>{t('strategies.staking.title')}</Title>
          <Text>{t('strategies.staking.description')}</Text>
          
          <Title level={4} style={{ marginTop: 24 }}>{t('strategies.staking.profitability.title')}</Title>
          <Text type="secondary">{t('strategies.staking.profitability.date')}</Text>
          
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Title level={5}>{t('strategies.staking.profitability.projects.pion.name')}</Title>
                <Text>{t('strategies.staking.profitability.projects.pion.apr')}</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Title level={5}>{t('strategies.staking.profitability.projects.grav.name')}</Title>
                <Text>{t('strategies.staking.profitability.projects.grav.apr')}</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Title level={5}>{t('strategies.staking.profitability.projects.carv.name')}</Title>
                <Text>{t('strategies.staking.profitability.projects.carv.apr')}</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Title level={5}>{t('strategies.staking.profitability.projects.zetachain.name')}</Title>
                <Text>{t('strategies.staking.profitability.projects.zetachain.apr')}</Text>
              </Card>
            </Col>
          </Row>

          <Title level={4} style={{ marginTop: 24 }}>{t('strategies.staking.advantages.title')}</Title>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} sm={8}>
              {renderAdvantageCard(
                <DollarOutlined style={{ fontSize: 24 }} />,
                t('strategies.staking.advantages.passive.title'),
                t('strategies.staking.advantages.passive.value')
              )}
            </Col>
            <Col xs={24} sm={8}>
              {renderAdvantageCard(
                <SafetyOutlined style={{ fontSize: 24 }} />,
                t('strategies.staking.advantages.storage.title'),
                t('strategies.staking.advantages.storage.value')
              )}
            </Col>
            <Col xs={24} sm={8}>
              {renderAdvantageCard(
                <RobotOutlined style={{ fontSize: 24 }} />,
                t('strategies.staking.advantages.automation.title'),
                t('strategies.staking.advantages.automation.value')
              )}
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  );
};

export default Instruments; 