import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value?: string; // ISO yyyy-mm-dd
  onChange: (iso: string) => void;
}

const pad = (n: number) => n.toString().padStart(2, '0');
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const today = new Date();
  const initial = value ? new Date(value) : today;
  const [displayMonth, setDisplayMonth] = useState(initial.getMonth());
  const [displayYear, setDisplayYear] = useState(initial.getFullYear());

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setDisplayMonth(d.getMonth());
      setDisplayYear(d.getFullYear());
    }
  }, [value]);

  const startDay = new Date(displayYear, displayMonth, 1).getDay(); // 0 Sun - 6 Sat
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else setDisplayMonth(displayMonth - 1);
  };
  const nextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else setDisplayMonth(displayMonth + 1);
  };

  const weeks: Array<Array<number | null>> = [];
  let day = 1 - startDay; // start from first visible cell
  while (day <= daysInMonth) {
    const week: Array<number | null> = [];
    for (let i = 0; i < 7; i++) {
      if (day > 0 && day <= daysInMonth) week.push(day);
      else week.push(null);
      day++;
    }
    weeks.push(week);
  }

  const selectedIso = value || '';

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 rounded-md hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="text-sm font-semibold text-gray-800">{new Date(displayYear, displayMonth).toLocaleString('es-CO', { month: 'long', year: 'numeric' })}</div>
        <button onClick={nextMonth} className="p-1 rounded-md hover:bg-gray-100">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map((d, di) => {
              const iso = d ? `${displayYear}-${pad(displayMonth + 1)}-${pad(d)}` : '';
              const isSelected = iso === selectedIso;
              const isToday = d && (toISO(today) === `${displayYear}-${pad(displayMonth + 1)}-${pad(d)}`);

              return (
                <button
                  key={di}
                  onClick={() => d && onChange(`${displayYear}-${pad(displayMonth + 1)}-${pad(d)}`)}
                  disabled={!d}
                  className={`h-9 flex items-center justify-center rounded-md text-sm transition-colors ${
                    isSelected ? 'bg-yellow-400 text-white' : isToday ? 'bg-yellow-50 text-yellow-500' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {d || ''}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <button onClick={() => onChange('')} className="text-sm text-gray-500 hover:underline">Limpiar</button>
      </div>
    </div>
  );
}
