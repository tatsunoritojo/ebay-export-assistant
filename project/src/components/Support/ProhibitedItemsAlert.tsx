import React, { useState } from 'react';
import { AlertTriangle, Search, Shield, X } from 'lucide-react';
import { prohibitedItems } from '../../data/mockData';

const ProhibitedItemsAlert: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'warning' | 'prohibited'>('all');

  const filteredItems = prohibitedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'prohibited': return 'text-red-400 bg-red-900/20 border-red-500/50';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
      default: return 'text-slate-400 bg-slate-900/20 border-slate-500/50';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'prohibited': return '出品禁止';
      case 'warning': return '要注意';
      default: return '不明';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'prohibited': return <X className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-red-400" />
        <h3 className="text-lg font-semibold text-white">出品禁止・要注意商品</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="商品名・カテゴリを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSeverity('all')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              selectedSeverity === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setSelectedSeverity('prohibited')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              selectedSeverity === 'prohibited'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            出品禁止
          </button>
          <button
            onClick={() => setSelectedSeverity('warning')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              selectedSeverity === 'warning'
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            要注意
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">該当する商品が見つかりませんでした</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg p-4 ${getSeverityColor(item.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getSeverityIcon(item.severity)}
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <span className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">{item.reason}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(item.severity)}`}>
                  {getSeverityText(item.severity)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 bg-red-900/20 border border-red-700/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
          <div>
            <h4 className="text-red-300 font-medium mb-1">重要な注意事項</h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• 出品前に必ず最新の規制情報を確認してください</li>
              <li>• 違反した場合、アカウント停止のリスクがあります</li>
              <li>• 不明な点は事前にeBayサポートに確認してください</li>
              <li>• 国際配送の制限も併せて確認してください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProhibitedItemsAlert;