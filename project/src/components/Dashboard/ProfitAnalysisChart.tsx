import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, Calculator } from 'lucide-react';

interface ProfitData {
  月: string;
  売上: number;
  利益: number;
  利益率?: number;
}

interface ProfitAnalysisChartProps {
  data: ProfitData[];
}

const ProfitAnalysisChart: React.FC<ProfitAnalysisChartProps> = ({ data }) => {
  const totalProfit = data.reduce((sum, item) => sum + item.利益, 0);
  const totalSales = data.reduce((sum, item) => sum + item.売上, 0);
  const avgProfitMargin = ((totalProfit / totalSales) * 100).toFixed(1);

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">収益分析</h3>
        <Calculator className="h-5 w-5 text-green-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-slate-300 text-sm">総利益</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ¥{totalProfit.toLocaleString()}
          </div>
          <div className="text-green-400 text-sm mt-1">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            +18.5% vs 前期
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-slate-300 text-sm">平均利益率</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {avgProfitMargin}%
          </div>
          <div className="text-blue-400 text-sm mt-1">
            目標: 35%
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-yellow-400" />
            <span className="text-slate-300 text-sm">総売上</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ¥{totalSales.toLocaleString()}
          </div>
          <div className="text-yellow-400 text-sm mt-1">
            月平均: ¥{Math.round(totalSales / data.length).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">月別売上・利益推移</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="月" 
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
                <Line 
                  type="monotone" 
                  dataKey="売上" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="利益" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3">月別利益率</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="月" 
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
                <Bar dataKey="利益率" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitAnalysisChart;