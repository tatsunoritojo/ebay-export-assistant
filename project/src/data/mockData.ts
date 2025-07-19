import { ExchangeRate, Product, MarketTrend, Alert, UserSettings } from '../types';
import { subDays, subHours } from 'date-fns';

export const exchangeRateData: ExchangeRate = {
  currency: 'USD/JPY',
  rate: 149.85,
  change: 0.75,
  changePercent: 0.5,
  timestamp: new Date(),
  history: Array.from({ length: 30 }, (_, i) => ({
    date: subDays(new Date(), 29 - i),
    rate: 145 + Math.random() * 10 + Math.sin(i * 0.3) * 3
  }))
};

export const trendingProducts: Product[] = [
  {
    id: '1',
    title: 'Nintendo Switch OLED Model',
    category: 'Gaming',
    averagePrice: 45000,
    profit: 12000,
    profitMargin: 26.7,
    riskLevel: 'low',
    watchCount: 1250,
    trend: 'up',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    competitorCount: 45,
    shippingDifficulty: 'easy',
    demandScore: 95
  },
  // ... (他の商品データは省略) ...
];

export const marketTrends: MarketTrend[] = [
  // ... (市場トレンドデータは省略) ...
];

export const alerts: Alert[] = [
  // ... (アラートデータは省略) ...
];

export const categoryTrendData = [
  // ... (カテゴリトレンドデータは省略) ...
];

export const profitAnalysisData = [
  // ... (利益分析データは省略) ...
];

export const shippingGuides = [
  // ... (発送ガイドデータは省略) ...
];

export const faqData = [
  // ... (FAQデータは省略) ...
];

export const prohibitedItems = [
  // ... (禁止商品データは省略) ...
];

export const userSettings: UserSettings = {
  id: 'user-123',
  userId: 'U-ABCDE12345',
  profile: {
    name: '田中 太郎',
    email: 'taro.tanaka@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    businessName: 'Tanaka Exports',
    phone: '090-1234-5678',
    timezone: 'Asia/Tokyo',
    language: 'ja',
  },
  preferences: {
    categories: ['Gaming', 'Collectibles', 'Fashion'],
    riskTolerance: 'medium',
    targetProfit: 20000,
    currency: 'JPY',
    autoCalculation: true,
  },
  notifications: {
    email: true,
    push: false,
    exchangeRateAlerts: true,
    productAlerts: true,
    trendAlerts: false,
    weeklyReport: true,
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: subDays(new Date(), 90),
    loginHistory: [
      { id: 'lh-1', timestamp: subHours(new Date(), 1), ipAddress: '203.0.113.25', location: 'Tokyo, JP', device: 'Desktop Chrome', success: true },
      { id: 'lh-2', timestamp: subDays(new Date(), 1), ipAddress: '198.51.100.12', location: 'Osaka, JP', device: 'iPhone Safari', success: true },
      { id: 'lh-3', timestamp: subDays(new Date(), 3), ipAddress: '203.0.113.25', location: 'Tokyo, JP', device: 'Desktop Chrome', success: false },
    ],
  },
  subscription: {
    plan: 'premium',
    status: 'active',
    nextBillingDate: new Date('2025-08-18'),
    cancelAtPeriodEnd: false,
  },
};