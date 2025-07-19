import React from 'react';
import { BarChart3, Target, Calendar, TrendingUp } from 'lucide-react';

const IntermediateFeatures: React.FC = () => {
  const features = [
    {
      id: 'competitor-analysis',
      title: '詳細競合分析',
      description: '同一商品の競合出品者分析、価格推移、売上予測',
      icon: <BarChart3 className="h-5 w-5" />,
      status: 'available',
      benefits: ['競合価格の自動追跡', '市場シェア分析', '最適価格提案']
    },
    {
      id: 'pricing-strategy',
      title: '価格戦略プランナー',
      description: '動的価格設定、利益最大化アルゴリズム',
      icon: <Target className="h-5 w-5" />,
      status: 'available',
      benefits: ['自動価格調整', '利益率最適化', 'A/Bテスト機能']
    },
    {
      id: 'seasonal-analysis',
      title: '季節トレンド分析',
      description: '季節要因を考慮した需要予測、仕入れタイミング提案',
      icon: <Calendar className="h-5 w-5" />,
      status: 'available',
      benefits: ['季節需要予測', '仕入れ最適化', 'イベント連動分析']
    },
    {
      id: 'advanced-analytics',
      title: '高度な売上分析',
      description: 'ROI分析、顧客セグメント分析、LTV計算',
      icon: <TrendingUp className="h-5 w-5" />,
      status: 'coming-soon',
      benefits: ['ROI詳細分析', '顧客行動分析', 'LTV最適化']
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">中級者向け機能</h3>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 transition-all duration-300 ${
              feature.status === 'available' 
                ? 'hover:border-yellow-500/50 cursor-pointer' 
                : 'opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-yellow-400">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-white">{feature.title}</h4>
                  <p className="text-slate-300 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                feature.status === 'available' 
                  ? 'bg-green-900/30 text-green-300' 
                  : 'bg-yellow-900/30 text-yellow-300'
              }`}>
                {feature.status === 'available' ? '利用可能' : '近日公開'}
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">主な機能</h5>
              <div className="grid grid-cols-1 gap-1">
                {feature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <span className="text-slate-400 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {feature.status === 'available' && (
              <button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                機能を使用する
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">中級者向けアドバイス</h4>
        <p className="text-yellow-200 text-sm mb-3">
          基本的な出品に慣れてきたら、競合分析と価格戦略に注力しましょう。
          データドリブンなアプローチで売上を最大化できます。
        </p>
        <ul className="text-yellow-200 text-sm space-y-1">
          <li>• 週1回の競合価格チェックを習慣化</li>
          <li>• 季節トレンドを活用した仕入れ計画</li>
          <li>• A/Bテストによる商品説明の最適化</li>
        </ul>
      </div>
    </div>
  );
};

export default IntermediateFeatures;