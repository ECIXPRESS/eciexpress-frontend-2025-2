import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types/statistics.types';

interface WeeklySalesChartProps {
  data: ChartDataPoint[];
}

export default function WeeklySalesChart({ data }: WeeklySalesChartProps) {
  const chartData = data.map(item => ({
    name: item.label,
    value: item.value
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#262626] mb-6">Ventas Semanales</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#999"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#999"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#5AC7E1" 
            strokeWidth={3}
            dot={{ fill: '#5AC7E1', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}