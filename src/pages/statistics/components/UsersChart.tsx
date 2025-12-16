import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types/statistics.types';

interface UsersChartProps {
  data: ChartDataPoint[];
}

export default function UsersChart({ data }: UsersChartProps) {
  const chartData = data.map(item => ({
    name: item.label,
    'Nuevos': item.value,
    'Activos': item.secondary
  }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#262626]">Usuarios</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#5AC7E1]"></div>
            <span className="text-gray-600">Nuevos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-gray-600">Activos</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
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
          <Bar dataKey="Nuevos" fill="#5AC7E1" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Activos" fill="#FBBF24" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}