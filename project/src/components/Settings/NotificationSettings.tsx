import React, { useState } from 'react';
import { Bell, Save, AlertCircle } from 'lucide-react';
import { UserSettings } from '../../types';

interface NotificationSettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onUpdate }) => {
  const [formData, setFormData] = useState(settings.notifications);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = {
        ...settings,
        notifications: formData
      };
      
      onUpdate(updatedSettings);
      setMessage({ type: 'success', text: '通知設定が正常に更新されました' });
    } catch (_error) {
      setMessage({ type: 'error', text: '更新に失敗しました。もう一度お試しください。' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (field: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const notificationOptions = [
    {
      key: 'email' as keyof typeof formData,
      title: 'メール通知',
      description: '重要な更新をメールで受信'
    },
    {
      key: 'push' as keyof typeof formData,
      title: 'プッシュ通知',
      description: 'ブラウザ通知を受信'
    },
    {
      key: 'exchangeRateAlerts' as keyof typeof formData,
      title: '為替レートアラート',
      description: '設定した閾値を超えた場合に通知'
    },
    {
      key: 'productAlerts' as keyof typeof formData,
      title: '商品アラート',
      description: '注目商品や価格変動の通知'
    },
    {
      key: 'trendAlerts' as keyof typeof formData,
      title: 'トレンドアラート',
      description: '市場トレンドの変化を通知'
    },
    {
      key: 'weeklyReport' as keyof typeof formData,
      title: '週次レポート',
      description: '週間の市場分析レポートを配信'
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">通知設定</h3>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {notificationOptions.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
          >
            <div className="flex-1">
              <h4 className="text-white font-medium">{option.title}</h4>
              <p className="text-slate-400 text-sm mt-1">{option.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData[option.key]}
                onChange={() => handleToggle(option.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}

        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mt-6">
          <h4 className="text-blue-300 font-medium mb-2">通知のタイミング</h4>
          <div className="space-y-2 text-blue-200 text-sm">
            <p>• 為替レートアラート: リアルタイム</p>
            <p>• 商品・トレンドアラート: 1日1回まで</p>
            <p>• 週次レポート: 毎週月曜日 9:00</p>
            <p>• 重要な通知: 即座に配信</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
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

export default NotificationSettings;