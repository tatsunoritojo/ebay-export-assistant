import React, { useState } from 'react';
import { User, Camera, Save, AlertCircle } from 'lucide-react';
import { UserSettings } from '../../types';

interface ProfileSettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ settings, onUpdate }) => {
  const [formData, setFormData] = useState(settings.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // シミュレートされた保存処理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = {
        ...settings,
        profile: formData
      };
      
      onUpdate(updatedSettings);
      setMessage({ type: 'success', text: 'プロフィールが正常に更新されました' });
    } catch (_error) {
      setMessage({ type: 'error', text: '更新に失敗しました。もう一度お試しください。' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">プロフィール設定</h3>
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
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={formData.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt="プロフィール画像"
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-600"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full transition-colors"
            >
              <Camera className="h-3 w-3" />
            </button>
          </div>
          <div>
            <h4 className="text-white font-medium">プロフィール画像</h4>
            <p className="text-slate-400 text-sm">JPG、PNG形式（最大2MB）</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              名前 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              メールアドレス <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              事業者名
            </label>
            <input
              type="text"
              value={formData.businessName || ''}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任意"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              電話番号
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+81-90-1234-5678"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              タイムゾーン
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              言語
            </label>
            <select
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
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

export default ProfileSettings;