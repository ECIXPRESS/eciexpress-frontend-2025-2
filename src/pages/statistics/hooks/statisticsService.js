import { mockDailySalesReport, mockWeeklySalesReport, mockMonthlySalesReport, mockSummaryReport, mockTopProducts } from '../mock/statisticsMock';
/**
 * Servicio mockeado que imita las funciones del StatisticsController.java
 * NO hace llamadas reales al backend, solo retorna mock data
 */
class StatisticsService {
    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    /**
     * Simula: GET /api/statistics/daily
     * Genera un reporte de ventas para una fecha específica y una tienda dada
     */
    async getDaily(date, store) {
        await this.delay(300);
        console.log(`[MOCK] getDaily called with date=${date}, store=${store}`);
        return { ...mockDailySalesReport, storeId: store, date };
    }
    /**
     * Simula: GET /api/statistics/weekly
     * Genera un reporte semanal basado en cualquier fecha dentro de la semana
     */
    async getWeekly(date, store) {
        await this.delay(300);
        console.log(`[MOCK] getWeekly called with date=${date}, store=${store}`);
        return { ...mockWeeklySalesReport, storeId: store };
    }
    /**
     * Simula: GET /api/statistics/monthly
     * Genera un reporte mensual para un año y mes específicos
     */
    async getMonthly(year, month, store) {
        await this.delay(300);
        console.log(`[MOCK] getMonthly called with year=${year}, month=${month}, store=${store}`);
        return { ...mockMonthlySalesReport, storeId: store, year, month };
    }
    /**
     * Simula: GET /api/statistics/summary
     * Genera un resumen estadístico general de una tienda
     */
    async getSummary(store) {
        await this.delay(300);
        console.log(`[MOCK] getSummary called with store=${store}`);
        return { ...mockSummaryReport, storeId: store };
    }
    /**
     * Simula: GET /api/statistics/top-products
     * Devuelve una lista de productos con mayor cantidad de ventas
     */
    async getTopProducts(store) {
        await this.delay(300);
        console.log(`[MOCK] getTopProducts called with store=${store}`);
        return mockTopProducts;
    }
    /**
     * Simula: GET /api/statistics/export
     * Genera y descarga un archivo Excel con todas las estadísticas
     * En este caso, simula la descarga con un console.log
     */
    async exportAllStatistics(store, format) {
        await this.delay(800);
        console.log(`[MOCK] exportAllStatistics called with store=${store}, format=${format}`);
        console.log(`[MOCK] Simulando descarga de archivo all-statistics.${format === 'excel' ? 'xlsx' : 'pdf'}`);
        // En una implementación real, aquí se descargaría el archivo
        // Por ahora solo simulamos el comportamiento
        if (typeof window !== 'undefined') {
            const message = `Descarga simulada: all-statistics.${format === 'excel' ? 'xlsx' : 'pdf'}`;
            alert(message);
        }
    }
}
// Exportar una instancia única del servicio (singleton)
export const statisticsService = new StatisticsService();
