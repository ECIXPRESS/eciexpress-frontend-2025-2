import type {
  DailySalesReport,
  WeeklySalesReport,
  MonthlySalesReport,
  SummaryReport,
  ProductSalesReport,
  StoreStats,
  ChartDataPoint
} from '../types/statistics.types';

// Mock data para reportes diarios
export const mockDailySalesReport: DailySalesReport = {
  storeId: 'STORE-01',
  date: '2025-01-10',
  totalOrders: 32,
  totalProductsSold: 84,
  totalRevenue: 250000.50
};

// Mock data para reportes semanales
export const mockWeeklySalesReport: WeeklySalesReport = {
  storeId: 'STORE-01',
  weekStart: '2025-01-06',
  weekEnd: '2025-01-12',
  totalOrders: 240,
  totalProductsSold: 650,
  totalRevenue: 1900000.75
};

// Mock data para reportes mensuales
export const mockMonthlySalesReport: MonthlySalesReport = {
  storeId: 'STORE-01',
  year: 2025,
  month: 1,
  totalOrders: 1120,
  totalProductsSold: 3100,
  totalRevenue: 8400000.00
};

// Mock data para resumen general
export const mockSummaryReport: SummaryReport = {
  storeId: 'STORE-01',
  totalOrders: 8231,
  totalProductsSold: 21432,
  totalRevenue: 59000000.00
};

// Mock data para top productos
export const mockTopProducts: ProductSalesReport[] = [
  {
    productId: 'EXAM-001',
    productName: 'Hojas examen',
    quantitySold: 342,
    totalRevenue: 856450
  },
  {
    productId: 'PRINT-001',
    productName: 'Impresiones',
    quantitySold: 298,
    totalRevenue: 723890
  },
  {
    productId: 'NOTE-001',
    productName: 'Cuadernos',
    quantitySold: 256,
    totalRevenue: 640000
  },
  {
    productId: 'PEN-001',
    productName: 'Bolígrafos',
    quantitySold: 198,
    totalRevenue: 495000
  },
  {
    productId: 'MAT-001',
    productName: 'Materiales',
    quantitySold: 167,
    totalRevenue: 417500
  },
  {
    productId: 'BLOC-001',
    productName: 'Bloc',
    quantitySold: 145,
    totalRevenue: 362500
  },
  {
    productId: 'MARK-001',
    productName: 'Marcadores',
    quantitySold: 123,
    totalRevenue: 307500
  },
  {
    productId: 'FOLD-001',
    productName: 'Carpetas',
    quantitySold: 98,
    totalRevenue: 245000
  },
  {
    productId: 'CALC-001',
    productName: 'Calculadoras',
    quantitySold: 76,
    totalRevenue: 190000
  },
  {
    productId: 'RULE-001',
    productName: 'Reglas',
    quantitySold: 54,
    totalRevenue: 135000
  }
];

// Mock data para ventas semanales (gráfico)
export const mockWeeklySalesData: ChartDataPoint[] = [
  { label: 'Lun', value: 48 },
  { label: 'Mar', value: 54 },
  { label: 'Mié', value: 50 },
  { label: 'Jue', value: 62 },
  { label: 'Vie', value: 72 },
  { label: 'Sáb', value: 91 },
  { label: 'Dom', value: 95 }
];

// Mock data para stock por categoría
export const mockStockByCategory: ChartDataPoint[] = [
  { label: 'Cuadernos', value: 45 },
  { label: 'Materiales', value: 32 },
  { label: 'Bloc', value: 28 },
  { label: 'Hojas examen', value: 64 },
  { label: 'Impresiones', value: 18 }
];

// Mock data para ventas diarias
export const mockDailySalesData: ChartDataPoint[] = [
  { label: '130', value: 145 },
  { label: '195', value: 165 },
  { label: '', value: 155 },
  { label: '', value: 175 },
  { label: '', value: 190 },
  { label: '', value: 210 },
  { label: '260', value: 260 },
  { label: '', value: 245 },
  { label: '', value: 130 }
];

// Mock data para pedidos totales vs completados (Admin)
export const mockOrdersData: ChartDataPoint[] = [
  { label: 'Ene', value: 50, secondary: 48 },
  { label: 'Feb', value: 52, secondary: 50 },
  { label: 'Mar', value: 48, secondary: 46 },
  { label: 'Abr', value: 55, secondary: 53 },
  { label: 'May', value: 58, secondary: 56 },
  { label: 'Jun', value: 65, secondary: 62 },
  { label: 'Jul', value: 70, secondary: 68 },
  { label: 'Ago', value: 72, secondary: 70 },
  { label: 'Sep', value: 75, secondary: 73 },
  { label: 'Oct', value: 78, secondary: 76 },
  { label: 'Nov', value: 82, secondary: 80 },
  { label: 'Dic', value: 88, secondary: 86 }
];

// Mock data para usuarios nuevos vs activos (Admin)
export const mockUsersData: ChartDataPoint[] = [
  { label: 'Ene', value: 150, secondary: 820 },
  { label: 'Feb', value: 180, secondary: 850 },
  { label: 'Mar', value: 200, secondary: 880 },
  { label: 'Abr', value: 220, secondary: 920 },
  { label: 'May', value: 250, secondary: 950 },
  { label: 'Jun', value: 280, secondary: 980 },
  { label: 'Jul', value: 310, secondary: 1020 },
  { label: 'Ago', value: 340, secondary: 1050 },
  { label: 'Sep', value: 370, secondary: 1080 },
  { label: 'Oct', value: 400, secondary: 1120 },
  { label: 'Nov', value: 430, secondary: 1150 },
  { label: 'Dic', value: 460, secondary: 1200 }
];

// Mock data para estadísticas por tienda (Admin)
export const mockStoreStats: StoreStats[] = [
  {
    storeName: 'Cafetería',
    sales: 12500000,
    orders: 5421,
    rating: 4.8,
    growth: 15,
    status: 'active'
  },
  {
    storeName: 'Café Leyenda',
    sales: 8900000,
    orders: 3876,
    rating: 4.6,
    growth: 12,
    status: 'active'
  },
  {
    storeName: 'Harvies',
    sales: 7200000,
    orders: 2987,
    rating: 4.5,
    growth: 8,
    status: 'active'
  },
  {
    storeName: 'Cafetería I-H',
    sales: 6800000,
    orders: 2765,
    rating: 4.7,
    growth: 10,
    status: 'active'
  },
  {
    storeName: 'Papelería C',
    sales: 5600000,
    orders: 2134,
    rating: 4.4,
    growth: 6,
    status: 'active'
  },
  {
    storeName: 'Papelería A',
    sales: 4200000,
    orders: 1543,
    rating: 4.3,
    growth: 4,
    status: 'active'
  }
];