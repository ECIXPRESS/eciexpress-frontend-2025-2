import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function StatsCard({ icon: Icon, iconColor, title, value, subtitle }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl ${iconColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-[#262626]">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}