// Types basados en los DTOs del backend StatisticsController.java

export interface DailySalesReport {
  storeId: string;
  date: string;
  totalOrders: number;
  totalProductsSold: number;
  totalRevenue: number;
}

export interface WeeklySalesReport {
  storeId: string;
  weekStart: string;
  weekEnd: string;
  totalOrders: number;
  totalProductsSold: number;
  totalRevenue: number;
}

export interface MonthlySalesReport {
  storeId: string;
  year: number;
  month: number;
  totalOrders: number;
  totalProductsSold: number;
  totalRevenue: number;
}

export interface SummaryReport {
  storeId: string;
  totalOrders: number;
  totalProductsSold: number;
  totalRevenue: number;
}

export interface ProductSalesReport {
  productId: string;
  productName: string;
  quantitySold: number;
  totalRevenue: number;
}

export interface StoreStats {
  storeName: string;
  sales: number;
  orders: number;
  rating: number;
  growth: number;
  status: 'active' | 'inactive';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface ExportFormat {
  type: 'pdf' | 'excel';
  label: string;
  description: string;
}