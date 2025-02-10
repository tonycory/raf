import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
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
  font-size: 20px;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface ChartDataPoint {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data?: ChartDataPoint[];
  title?: string;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data = [],
  title = 'Историческая доходность'
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Находим минимальное значение для корректного отображения оси Y
  const minValue = Math.min(...data.map(d => d.value));
  const yAxisMin = Math.floor(minValue * 0.95); // Немного отступа снизу

  return (
    <ChartContainer>
      <Title>{title}</Title>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 14 }}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.5)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 14 }}
              tickFormatter={formatCurrency}
              domain={[yAxisMin, 'auto']}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(31, 31, 43, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: 14,
                padding: '8px 12px'
              }}
              formatter={(value: number) => [formatCurrency(value), 'Значение']}
            />
            <ReferenceLine y={data[0].value} stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00F2FE"
              strokeWidth={2.5}
              dot={{ fill: '#00F2FE', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, stroke: '#00F2FE', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default PerformanceChart; 