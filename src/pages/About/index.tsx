import React from 'react';
import { Typography, Card, Space } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title level={1}>About RAF Investment Platform</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Title level={3}>Our Mission</Title>
          <Paragraph>
            RAF Investment Platform aims to provide accessible and user-friendly investment tools
            for both novice and experienced investors. We believe in making investment decisions
            data-driven and transparent.
          </Paragraph>
        </Card>

        <Card>
          <Title level={3}>Features</Title>
          <Paragraph>
            Our platform offers:
          </Paragraph>
          <ul>
            <li>Investment calculator with risk profile analysis</li>
            <li>Market analysis tools</li>
            <li>User profile management</li>
            <li>Educational resources about investment strategies</li>
          </ul>
        </Card>

        <Card>
          <Title level={3}>Technology Stack</Title>
          <Paragraph>
            Built with modern technologies:
          </Paragraph>
          <ul>
            <li>React with TypeScript for robust frontend development</li>
            <li>Ant Design for beautiful and responsive UI components</li>
            <li>React Router for seamless navigation</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};

export default About; 