import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 20px;
  background: rgba(31, 31, 43, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h3`
  color: white;
  font-size: 18px;
  margin: 0 0 20px 0;
`;

interface PerformanceChartProps {
  data?: Array<{ date: string; value: number }>;
  title?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data = [],
  title = 'Историческая доходность'
}) => {
  return (
    <ChartContainer>
      <Title>{title}</Title>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)' }}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(31, 31, 43, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: any) => [`$${value}`, 'Значение']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00F2FE"
              strokeWidth={2}
              dot={{ fill: '#00F2FE', strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#00F2FE', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default PerformanceChart; 