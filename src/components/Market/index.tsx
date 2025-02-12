import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Space, Tag, Button, List, Statistic } from 'antd';
import { 
  RiseOutlined, 
  FallOutlined, 
  RobotOutlined,
  DollarOutlined,
  GlobalOutlined,
  BulbOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { coinGecko } from '../../services/coinGecko';
import { newsService } from '../../services/newsService';
import { aiAssistant } from '../../services/aiAssistant';

const { Title, Text } = Typography;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  height: 100%;
  
  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.2}s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }
`;

const AssetItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  opacity: 0;
  animation: slideIn 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;
`;

const TrendTag = styled(Tag)<{ $trend: 'up' | 'down' }>`
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: ${({ $trend, theme }) => 
    $trend === 'up' ? `${theme.colors.success}20` : `${theme.colors.error}20`};
  color: ${({ $trend, theme }) => 
    $trend === 'up' ? theme.colors.success : theme.colors.error};
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  margin-right: 16px;
  
  .anticon {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface NewsItem {
  id: string;
  title: string;
  url: string;
}

const cryptoConfig = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' }
];

const Market: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiRecommendation, setAiRecommendation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const pricesData = await Promise.all(
          cryptoConfig.map(async (coin) => {
            const priceData = await coinGecko.getPrice(coin.id);
            return {
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              price: priceData[coin.id].usd,
              change: priceData[coin.id].usd_24h_change || 0
            };
          })
        );
        
        setAssets(pricesData);
        
        // Get latest news
        const newsData = await newsService.getLatestNews();
        setNews(newsData);
        
        // Get AI recommendations
        const analysis = await aiAssistant.getMarketStrategy(pricesData);
        setAiRecommendation(analysis);
        
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Row gutter={[24, 24]}>
        {/* Market Overview */}
        <Col xs={24} lg={16}>
          <StyledCard 
            title={
              <Space>
                <GlobalOutlined />
                Market Overview
              </Space>
            }
            loading={loading}
            index={0}
            className="scale-in"
          >
            <List
              dataSource={assets}
              renderItem={(asset, index) => (
                <AssetItem index={index}>
                  <Space>
                    <IconWrapper>
                      <DollarOutlined />
                    </IconWrapper>
                    <div>
                      <Text strong>{asset.name}</Text>
                      <div>
                        <Text type="secondary">{asset.symbol}</Text>
                      </div>
                    </div>
                  </Space>
                  <Space>
                    <Statistic 
                      value={asset.price} 
                      precision={2} 
                      prefix="$"
                      valueStyle={{ fontSize: '16px' }}
                    />
                    <TrendTag $trend={asset.change >= 0 ? 'up' : 'down'}>
                      {asset.change >= 0 ? <RiseOutlined /> : <FallOutlined />}
                      {Math.abs(asset.change).toFixed(2)}%
                    </TrendTag>
                  </Space>
                </AssetItem>
              )}
            />
          </StyledCard>
        </Col>

        {/* AI Recommendations */}
        <Col xs={24} lg={8}>
          <StyledCard
            title={
              <Space>
                <RobotOutlined />
                AI Analysis
              </Space>
            }
            loading={loading}
            index={1}
            className="scale-in"
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Text>{aiRecommendation}</Text>
              <Button 
                type="primary" 
                icon={<BulbOutlined />}
                block
              >
                Get Detailed Analysis
              </Button>
            </Space>
          </StyledCard>
        </Col>

        {/* Market News */}
        <Col xs={24}>
          <StyledCard
            title={
              <Space>
                <GlobalOutlined />
                Latest News
              </Space>
            }
            loading={loading}
          >
            <List
              dataSource={news}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                  />
                </List.Item>
              )}
            />
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Market; 