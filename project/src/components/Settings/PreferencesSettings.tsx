import React, { useState } from 'react';
import { Settings, Save, AlertCircle } from 'lucide-react';
import { UserSettings } from '../../types';

interface PreferencesSettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({ settings, onUpdate }) => {
  const [formData, setFormData] = useState(settings.preferences);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    'Gaming', 'Audio', 'Fashion', 'Kitchen', 'Collectibles', 
    'Home & Garden', 'Electronics', 'Sports', 'Books', 'Toys'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = {
        ...settings,
        preferences: formData
      };
      
      onUpdate(updatedSettings);
      setMessage({ type: 'success', text: '設定が正常に更新されました' });
    } catch (_error) {
      setMessage({ type: 'error', text: '更新に失敗しました。もう一度お試しください。' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">取引設定</h3>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-900/20 border-green-700/50 text-green-300'
            : 'bg-red-900/20 border-red-700/50 text-red-300'
        }`}>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{message.text}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-3">
            興味のあるカテゴリ
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-slate-300 text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              リスク許容度
            </label>
            <select
              value={formData.riskTolerance}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                riskTolerance: e.target.value as 'low' | 'medium' | 'high' 
              }))}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">低リスク</option>
              <option value="medium">中リスク</option>
              <option value="high">高リスク</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              目標月間利益（円）
            </label>
            <input
              type="number"
              value={formData.targetProfit}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                targetProfit: parseInt(e.target.value) || 0 
              }))}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              表示通貨
            </label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                currency: e.target.value as 'JPY' | 'USD' 
              }))}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="JPY">日本円 (JPY)</option>
              <option value="USD">米ドル (USD)</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="autoCalculation"
              checked={formData.autoCalculation}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                autoCalculation: e.target.checked 
              }))}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="autoCalculation" className="text-slate-300 text-sm">
              利益計算の自動更新
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? '保存中...' : '変更を保存'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesSettings;