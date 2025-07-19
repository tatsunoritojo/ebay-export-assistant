import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ExchangeRate } from '../../types';
import { format } from 'date-fns';

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/JPY`;

const ExchangeRateWidget: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('為替レートの取得に失敗しました。');
      }
      const data = await response.json();

      if (data.result === 'error' || !data.conversion_rate) {
        throw new Error(data['error-type'] || '為替レートのデータ形式が正しくありません。');
      }
      
      // 仮の履歴データと変化量を作成
      const history = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        rate: data.conversion_rate + (Math.random() - 0.5) * 2,
      }));
      
      const yesterdayRate = history[history.length - 2]?.rate || data.conversion_rate;
      const change = data.conversion_rate - yesterdayRate;
      const changePercent = (change / yesterdayRate) * 100;

      setExchangeRate({
        currency: 'USD/JPY',
        rate: data.conversion_rate,
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        history: history,
        timestamp: new Date(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 60 * 60 * 1000); // 1時間ごとに更新
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 flex items-center justify-center h-full">
        <RefreshCw className="h-6 w-6 text-slate-400 animate-spin" />
        <span className="ml-2 text-slate-400">レートを読み込み中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center h-full">
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <span className="mt-2 text-red-500">{error}</span>
        <button onClick={fetchExchangeRate} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          再試行
        </button>
      </div>
    );
  }

  if (!exchangeRate) {
    return null;
  }

  const isPositive = exchangeRate.change > 0;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">為替レート</h3>
        <div className="flex items-center space-x-2">
          {exchangeRate.rate > 150 && (
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          )}
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-400" />
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">¥{exchangeRate.rate.toFixed(2)}</span>
            <span className="text-sm text-slate-300">{exchangeRate.currency}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{exchangeRate.change} ({isPositive ? '+' : ''}{exchangeRate.changePercent.toFixed(2)}%)
            </span>
            <span className="text-xs text-slate-400">24時間</span>
          </div>
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exchangeRate.history}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`¥${value.toFixed(2)}`, '為替レート']}
                labelFormatter={(date) => format(new Date(date), 'MM/dd HH:mm')}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {exchangeRate.rate > 150 && (
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
            <p className="text-yellow-200 text-sm">
              円安が進んでいます。利益率の見直しを検討してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateWidget;