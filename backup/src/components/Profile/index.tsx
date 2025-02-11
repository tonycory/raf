import React from 'react';
import { Typography, Card, Avatar, Descriptions, Button, Space } from 'antd';
import { UserOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Profile: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title level={1}>User Profile</Title>
      
      <Card style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginLeft: 24 }}>
            <Title level={3} style={{ margin: 0 }}>John Doe</Title>
            <Typography.Text type="secondary">Premium Member</Typography.Text>
          </div>
        </div>

        <Descriptions title="User Information" bordered>
          <Descriptions.Item label="Email">john.doe@example.com</Descriptions.Item>
          <Descriptions.Item label="Phone">+1 234 567 8900</Descriptions.Item>
          <Descriptions.Item label="Location">New York, USA</Descriptions.Item>
          <Descriptions.Item label="Preferred Market">Stock Market</Descriptions.Item>
          <Descriptions.Item label="Risk Profile">Moderate</Descriptions.Item>
          <Descriptions.Item label="Member Since">January 2024</Descriptions.Item>
        </Descriptions>

        <Space style={{ marginTop: 24 }}>
          <Button type="primary" icon={<SettingOutlined />}>
            Account Settings
          </Button>
          <Button icon={<BellOutlined />}>
            Notification Settings
          </Button>
        </Space>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Investment Preferences</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Investment Strategy">Long-term Growth</Descriptions.Item>
          <Descriptions.Item label="Preferred Investment Type">Stocks & ETFs</Descriptions.Item>
          <Descriptions.Item label="Monthly Investment Goal">$1,000</Descriptions.Item>
          <Descriptions.Item label="Risk Tolerance">Moderate</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile; 