import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Space, Tag, Button, List, Statistic, Progress, Spin } from 'antd';
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
import { coinGecko } from '../../services/coinGecko';
import { newsService } from '../../services/newsService';
import { aiAssistant } from '../../services/aiAssistant';

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

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  progress: number;
}

interface NewsItem {
  id: string;
  title: string;
  url: string;
}

const Market: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем список топ-5 криптовалют
        const coins = await coinGecko.getCoinsList();
        const topCoins = ['bitcoin', 'ethereum', 'solana', 'binancecoin', 'cardano'];
        
        // Получаем цены для каждой криптовалюты
        const pricesData = await Promise.all(
          topCoins.map(async (coinId) => {
            const priceData = await coinGecko.getPrice(coinId);
            return {
              id: coinId,
              price: priceData[coinId].usd,
              change: priceData[coinId].usd_24h_change || 0
            };
          })
        );

        // Форматируем данные
        const formattedAssets = pricesData.map((data, index) => ({
          id: data.id,
          name: coins.find(coin => coin.id === data.id)?.symbol.toUpperCase() || '',
          symbol: coins.find(coin => coin.id === data.id)?.symbol.toUpperCase() || '',
          price: data.price,
          change: data.change,
          progress: 85 - (index * 5) // Просто для визуализации
        }));

        setAssets(formattedAssets);

        // Получаем последние новости
        const newsData = await newsService.getLatestNews(undefined, 5);
        setNews(newsData);

        // Получаем AI анализ
        const analysis = await aiAssistant.analyzeMarketNews(
          newsData.map(item => item.title)
        );
        setAiAnalysis(analysis);

      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Обновляем данные каждые 5 минут
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Market Metrics */}
        <Col xs={24}>
          <MarketCard>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <StyledStatistic
                  title="Общая капитализация"
                  value={assets.reduce((acc, asset) => acc + asset.price, 0).toFixed(2)}
                  prefix="$"
                  suffix={
                    <Space>
                      <ArrowUpOutlined style={{ color: '#52c41a' }} />
                      <span style={{ color: '#52c41a' }}>
                        {(assets.reduce((acc, asset) => acc + asset.change, 0) / assets.length).toFixed(2)}%
                      </span>
                    </Space>
                  }
                />
              </Col>
            </Row>
          </MarketCard>
        </Col>

        {/* AI Analytics */}
        <Col xs={24}>
          <MarketCard>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Title level={4} style={{ color: 'white', marginBottom: 24 }}>
                  <RobotOutlined /> AI Анализ
                </Title>
                <Paragraph style={{ color: 'white', fontSize: '16px' }}>
                  {aiAnalysis}
                </Paragraph>
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
                {assets.map((asset) => (
                  <AssetCard key={asset.id}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Space>
                          <div style={{ width: 40, height: 40, background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {asset.symbol}
                          </div>
                          <div>
                            <Text strong style={{ color: 'white', display: 'block' }}>{asset.name}</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.5)' }}>${asset.price.toFixed(2)}</Text>
                          </div>
                        </Space>
                        <TrendTag $trend={asset.change >= 0 ? 'up' : 'down'}>
                          {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </TrendTag>
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
                  {news.map((item) => (
                    <NewsItem key={item.id}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <Text style={{ color: 'white' }}>{item.title}</Text>
                      </a>
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