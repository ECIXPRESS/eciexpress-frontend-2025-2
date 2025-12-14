import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '../types/statistics.types';

interface OrdersChartProps {
  data: ChartDataPoint[];
}

export default function OrdersChart({ data }: OrdersChartProps) {
  const chartData = data.map(item => ({
    name: item.label,
    'Total pedidos': item.value,
    'Completados': item.secondary
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#262626]">Pedidos</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#5AC7E1]"></div>
            <span className="text-gray-600">Total pedidos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FDDF65]"></div>
            <span className="text-gray-600">Completados</span>
          </div>
        </div>
      </div>
      
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
            dataKey="Total pedidos" 
            stroke="#5AC7E1" 
            strokeWidth={2}
            dot={{ fill: '#5AC7E1', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="Completados" 
            stroke="#FDDF65" 
            strokeWidth={2}
            dot={{ fill: '#FDDF65', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}