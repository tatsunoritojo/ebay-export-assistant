import React from 'react';
import { Truck, Clock, DollarSign, AlertTriangle, Package } from 'lucide-react';
import { shippingGuides } from '../../data/mockData';

const ShippingGuide: React.FC = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'hard': return 'text-red-400 bg-red-900/20';
      default: return 'text-slate-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '簡単';
      case 'medium': return '普通';
      case 'hard': return '困難';
      default: return '不明';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Truck className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">国際発送ガイド</h3>
      </div>

      <div className="space-y-4">
        {shippingGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-white mb-1">{guide.title}</h4>
                <p className="text-slate-300 text-sm">{guide.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(guide.difficulty)}`}>
                {getDifficultyText(guide.difficulty)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <div>
                  <span className="text-slate-400 text-xs">配送期間</span>
                  <p className="text-white text-sm">{guide.estimatedTime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <div>
                  <span className="text-slate-400 text-xs">料金目安</span>
                  <p className="text-white text-sm">{guide.cost}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-yellow-400" />
                <div>
                  <span className="text-slate-400 text-xs">制限事項</span>
                  <p className="text-white text-sm">{guide.restrictions.length}項目</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-600/50 pt-3">
              <h5 className="text-slate-300 text-sm font-medium mb-2">制限事項</h5>
              <div className="flex flex-wrap gap-2">
                {guide.restrictions.map((restriction, index) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-600/30 text-slate-300 px-2 py-1 rounded"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-300 font-medium mb-1">発送時の注意点</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• 商品価値を正確に申告してください</li>
              <li>• 禁止品目の確認を必ず行ってください</li>
              <li>• 追跡番号を必ずバイヤーに連絡してください</li>
              <li>• 保険加入を検討してください（高額商品の場合）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingGuide;