import React from 'react';
import { Card, Typography, Row, Col, Space, Tag, Button, List, Statistic, Progress } from 'antd';
import { 
  RiseOutlined, 
  FallOutlined, 
  RobotOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;

const MarketCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(31, 31, 43, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
`;

const TrendTag = styled(Tag)<{ $trend: 'up' | 'down' }>`
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
  border: none;
  background: ${({ $trend }) => 
    $trend === 'up' ? 'rgba(82, 196, 26, 0.1)' : 'rgba(255, 77, 79, 0.1)'};
  color: ${({ $trend }) => 
    $trend === 'up' ? '#52c41a' : '#ff4d4f'};
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary}20 !important;
  border: 1px solid ${({ theme }) => theme.colors.primary} !important;
  color: ${({ theme }) => theme.colors.primary} !important;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}40 !important;
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
`;

const StyledStatistic = styled(Statistic)`
  .ant-statistic-title {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 14px;
  }
  .ant-statistic-content {
    color: white !important;
    font-size: 24px !important;
  }
`;

const ProgressCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const AssetCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
`;

const NewsItem = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Market: React.FC = () => {
  const marketMetrics = [
    { title: 'Объем торгов', value: '24.5B', prefix: '$', change: 12.3 },
    { title: 'Активные сделки', value: '1,234', change: 5.8 },
    { title: 'Успешность сделок', value: '94.5%', change: 2.1 },
  ];

  const topAssets = [
    { name: 'BTC', change: '+3%', price: '$46,800', progress: 85, description: 'Bitcoin' },
    { name: 'ETH', change: '+2%', price: '$2,950', progress: 75, description: 'Ethereum' },
    { name: 'SOL', change: '+5%', price: '$128', progress: 90, description: 'Solana' },
    { name: 'BNB', change: '+1.5%', price: '$320', progress: 65, description: 'Binance Coin' },
    { name: 'ADA', change: '+2.8%', price: '$1.20', progress: 70, description: 'Cardano' },
  ];

  const marketNews = [
    'SEC одобрил новый ETF для Bitcoin',
    'Binance запускает стейкинг для новых токенов',
    'Ethereum планирует обновление сети в следующем месяце',
    'Крупный институциональный инвестор входит в криптовалюты',
    'Новый проект DeFi привлек $100M инвестиций',
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Market Metrics */}
        <Col xs={24}>
          <MarketCard>
            <Row gutter={[24, 24]}>
              {marketMetrics.map((metric, index) => (
                <Col xs={24} md={8} key={index}>
                  <StyledStatistic
                    title={metric.title}
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={
                      <Space>
                        {metric.change > 0 ? <ArrowUpOutlined style={{ color: '#52c41a' }} /> : <ArrowDownOutlined style={{ color: '#ff4d4f' }} />}
                        <span style={{ color: metric.change > 0 ? '#52c41a' : '#ff4d4f' }}>
                          {Math.abs(metric.change)}%
                        </span>
                      </Space>
                    }
                  />
                </Col>
              ))}
            </Row>
          </MarketCard>
        </Col>

        {/* AI Analytics */}
        <Col xs={24}>
          <MarketCard>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
                  <RobotOutlined /> Отчет ИИ
                </Title>
                <Paragraph style={{ color: 'white', fontSize: '16px' }}>
                  Рынок демонстрирует устойчивый рост. Алгоритмы увеличили активность на 20% за последние 24 часа.
                </Paragraph>
                <Progress 
                  percent={75} 
                  status="active" 
                  strokeColor="#00F2FE"
                  trailColor="rgba(255, 255, 255, 0.1)"
                />
                <TrendTag $trend="up">Позитивный тренд</TrendTag>
              </Col>
              <Col xs={24} md={8}>
                <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
                  <BulbOutlined /> Рекомендации
                </Title>
                <Paragraph style={{ color: 'white', fontSize: '16px', marginBottom: 24 }}>
                  Увеличьте стейкинг на 15% для максимизации дохода в текущих рыночных условиях.
                </Paragraph>
                <Progress 
                  percent={85} 
                  status="active" 
                  strokeColor="#52c41a"
                  trailColor="rgba(255, 255, 255, 0.1)"
                />
                <ActionButton icon={<CheckCircleOutlined />}>
                  Применить рекомендацию
                </ActionButton>
              </Col>
              <Col xs={24} md={8}>
                <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
                  <ThunderboltOutlined /> Прогноз
                </Title>
                <List
                  dataSource={[
                    'Ожидается рост BTC на 5% в ближайшие дни',
                    'Высокая вероятность коррекции на альткоинах',
                    'Благоприятные условия для стейкинга'
                  ]}
                  renderItem={(item) => (
                    <List.Item style={{ border: 'none', padding: '4px 0' }}>
                      <Text style={{ color: 'white' }}>• {item}</Text>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </MarketCard>
        </Col>

        {/* Top Assets and News */}
        <Col xs={24}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <MarketCard>
                <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
                  <RiseOutlined /> Топ-5 активов
                </Title>
                {topAssets.map((asset, index) => (
                  <AssetCard key={index}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Space>
                          <div style={{ width: 40, height: 40, background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {asset.name}
                          </div>
                          <div>
                            <Text strong style={{ color: 'white', display: 'block' }}>{asset.description}</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{asset.price}</Text>
                          </div>
                        </Space>
                        <TrendTag $trend="up">{asset.change}</TrendTag>
                      </Space>
                      <Progress 
                        percent={asset.progress} 
                        size="small" 
                        strokeColor="#00F2FE"
                        trailColor="rgba(255, 255, 255, 0.1)"
                        showInfo={false}
                      />
                    </Space>
                  </AssetCard>
                ))}
              </MarketCard>
            </Col>

            <Col xs={24} lg={12}>
              <MarketCard>
                <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
                  <GlobalOutlined /> Новости рынка
                </Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {marketNews.map((news, index) => (
                    <NewsItem key={index}>
                      <Text style={{ color: 'white' }}>{news}</Text>
                    </NewsItem>
                  ))}
                </Space>
              </MarketCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </Space>
  );
};

export default Market; 