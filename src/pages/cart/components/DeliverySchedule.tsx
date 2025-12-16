/**
 * DeliverySchedule - Sección de programación de entrega
 */
import { Calendar, Clock } from 'lucide-react';

export default function DeliverySchedule() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-CO', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#262626] mb-4">Programar entrega</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha */}
        <div>
          <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha
          </label>
          <div className="relative">
            <input
              type="text"
              defaultValue={`${today.getDate()} nov, ${today.getFullYear()} (hoy)`}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl font-medium text-[#262626] cursor-not-allowed"
            />
          </div>
        </div>

        {/* Hora */}
        <div>
          <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hora
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="12"
              defaultValue="12"
              className="w-20 px-3 py-3 bg-gray-100 border border-gray-300 rounded-xl text-center font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
            />
            <span className="flex items-center justify-center text-gray-400">:</span>
            <input
              type="number"
              min="0"
              max="59"
              defaultValue="50"
              className="w-20 px-3 py-3 bg-gray-100 border border-gray-300 rounded-xl text-center font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
            />
            <select
              defaultValue="pm"
              className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl font-medium text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FDDF65] focus:border-transparent"
            >
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
