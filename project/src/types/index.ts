export interface ExchangeRate {
  currency: string;
  rate: number;
  change: number;
  changePercent: number;
  timestamp: Date;
  history: { date: Date; rate: number }[];
}

export interface Product {
  id: string;
  title: string;
  category: string;
  averagePrice: number;
  profit: number;
  profitMargin: number;
  riskLevel: 'low' | 'medium' | 'high';
  watchCount: number;
  trend: 'up' | 'down' | 'stable';
  image: string;
  competitorCount: number;
  shippingDifficulty: 'easy' | 'medium' | 'hard';
  demandScore: number;
}

export interface UserProfile {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  preferences: {
    categories: string[];
    riskTolerance: 'low' | 'medium' | 'high';
    targetProfit: number;
  };
}

export interface MarketTrend {
  category: string;
  growth: number;
  volume: number;
  trend: 'rising' | 'falling' | 'stable';
  seasonality: number;
}

export interface Alert {
  id: string;
  type: 'rate' | 'product' | 'trend';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface ShippingGuide {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  cost: string;
  restrictions: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

export interface ProhibitedItem {
  id: string;
  name: string;
  category: string;
  reason: string;
  severity: 'warning' | 'prohibited';
}

export interface UserSettings {
  id: string;
  userId: string;
  profile: {
    name: string;
    email: string;
    avatar?: string;
    businessName?: string;
    phone?: string;
    timezone: string;
    language: string;
  };
  preferences: {
    categories: string[];
    riskTolerance: 'low' | 'medium' | 'high';
    targetProfit: number;
    currency: 'JPY' | 'USD';
    autoCalculation: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    exchangeRateAlerts: boolean;
    productAlerts: boolean;
    trendAlerts: boolean;
    weeklyReport: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: Date;
    loginHistory: LoginHistory[];
  };
  subscription: {
    plan: 'free' | 'standard' | 'premium';
    status: 'active' | 'cancelled' | 'expired';
    nextBillingDate?: Date;
    cancelAtPeriodEnd: boolean;
  };
}

export interface LoginHistory {
  id: string;
  timestamp: Date;
  ipAddress: string;
  location: string;
  device: string;
  success: boolean;
}