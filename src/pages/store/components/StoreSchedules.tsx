import { StoreSchedule } from '../types/store.types';

interface StoreSchedulesProps {
  schedules: StoreSchedule[];
}

export default function StoreSchedules({ schedules }: StoreSchedulesProps) {
  return (
    <div className="mb-4">
      <h3 className="text-base sm:text-lg font-semibold text-[#262626] mb-3">Horarios:</h3>
      <div className="space-y-2">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600 text-sm sm:text-base">{schedule.weekday}</span>
            <span className="text-[#262626] font-semibold text-sm sm:text-base">
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
