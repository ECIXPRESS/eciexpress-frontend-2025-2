import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types/statistics.types';

interface StockChartProps {
  data: ChartDataPoint[];
}

export default function StockChart({ data }: StockChartProps) {
  const chartData = data.map(item => ({
    name: item.label,
    value: item.value
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#262626] mb-6">Stock Por Categoría</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#999"
            style={{ fontSize: '11px' }}
            angle={-15}
            textAnchor="end"
            height={80}
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
          <Bar dataKey="value" fill="#FBBF24" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}