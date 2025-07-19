import React from 'react';
import { Settings, Zap, FileText, Database } from 'lucide-react';

const AdvancedFeatures: React.FC = () => {
  const features = [
    {
      id: 'api-integration',
      title: 'API連携管理',
      description: 'eBay API、在庫管理システム、会計ソフトとの連携',
      icon: <Settings className="h-5 w-5" />,
      status: 'available',
      complexity: 'high',
      benefits: ['自動出品・更新', '在庫同期', '売上データ連携']
    },
    {
      id: 'bulk-listing',
      title: '大量出品ツール',
      description: 'CSV一括出品、テンプレート管理、自動価格更新',
      icon: <Zap className="h-5 w-5" />,
      status: 'available',
      complexity: 'high',
      benefits: ['一括出品機能', 'テンプレート管理', '自動価格調整']
    },
    {
      id: 'advanced-reports',
      title: '高度な分析レポート',
      description: 'カスタムレポート作成、予測分析、BI連携',
      icon: <FileText className="h-5 w-5" />,
      status: 'available',
      complexity: 'medium',
      benefits: ['カスタムレポート', '予測分析', 'データエクスポート']
    },
    {
      id: 'data-warehouse',
      title: 'データウェアハウス',
      description: '大量データ分析、機械学習による需要予測',
      icon: <Database className="h-5 w-5" />,
      status: 'beta',
      complexity: 'high',
      benefits: ['ビッグデータ分析', 'ML需要予測', 'リアルタイム分析']
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-slate-400 bg-slate-900/20';
    }
  };

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
      case 'high': return '高度';
      case 'medium': return '中級';
      case 'low': return '基本';
      default: return '不明';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">上級者向け機能</h3>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-purple-400">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-white">{feature.title}</h4>
                  <p className="text-slate-300 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className={`text-xs px-2 py-1 rounded ${
                  feature.status === 'available' 
                    ? 'bg-green-900/30 text-green-300' 
                    : feature.status === 'beta'
                    ? 'bg-blue-900/30 text-blue-300'
                    : 'bg-yellow-900/30 text-yellow-300'
                }`}>
                  {feature.status === 'available' ? '利用可能' : 
                   feature.status === 'beta' ? 'ベータ版' : '近日公開'}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getComplexityColor(feature.complexity)}`}>
                  {getComplexityText(feature.complexity)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">主な機能</h5>
              <div className="grid grid-cols-1 gap-1">
                {feature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-400 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className={`w-full mt-4 py-2 px-4 rounded-lg transition-colors duration-200 ${
              feature.status === 'available' 
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : feature.status === 'beta'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}>
              {feature.status === 'available' ? '機能を使用する' :
               feature.status === 'beta' ? 'ベータ版を試す' : '近日公開'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
        <h4 className="text-purple-300 font-medium mb-2">上級者向けアドバイス</h4>
        <p className="text-purple-200 text-sm mb-3">
          大規模運営には自動化とデータ分析が不可欠です。
          API連携により効率的なビジネス運営を実現しましょう。
        </p>
        <ul className="text-purple-200 text-sm space-y-1">
          <li>• API連携による業務自動化の推進</li>
          <li>• データ分析に基づく戦略的意思決定</li>
          <li>• スケーラブルなシステム構築</li>
          <li>• 継続的な改善とイノベーション</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedFeatures;