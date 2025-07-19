import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { MarketTrend } from '../../types';

interface CategoryData {
  name: string;
  成長率: number;
}

interface TrendAnalysisProps {
  trends: MarketTrend[];
  categoryData: CategoryData[];
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ trends, categoryData }) => {
  const topTrends = trends
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 3);

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">市場トレンド分析</h3>
        <TrendingUp className="h-5 w-5 text-blue-400" />
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topTrends.map((trend, index) => (
            <div
              key={trend.category}
              className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{trend.category}</h4>
                <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">
                  #{index + 1}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">+{trend.growth}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">{(trend.volume / 1000).toFixed(0)}K取引</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">需要スコア: {trend.seasonality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-64">
          <h4 className="text-sm font-medium text-slate-300 mb-3">カテゴリ別成長率</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#374151' }}
              />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#374151' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="成長率" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;