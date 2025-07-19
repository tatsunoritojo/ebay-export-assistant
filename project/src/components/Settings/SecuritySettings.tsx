import React, { useState } from 'react';
import { Shield, Key, Eye, EyeOff, Save, AlertCircle, Clock, MapPin, Monitor } from 'lucide-react';
import { UserSettings } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface SecuritySettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ settings, onUpdate }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: '新しいパスワードが一致しません' });
      setIsLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'パスワードは8文字以上で入力してください' });
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedSettings = {
        ...settings,
        security: {
          ...settings.security,
          lastPasswordChange: new Date()
        }
      };
      
      onUpdate(updatedSettings);
      setMessage({ type: 'success', text: 'パスワードが正常に変更されました' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (_error) {
      setMessage({ type: 'error', text: 'パスワード変更に失敗しました' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = {
        ...settings,
        security: {
          ...settings.security,
          twoFactorEnabled: !settings.security.twoFactorEnabled
        }
      };
      
      onUpdate(updatedSettings);
      setMessage({ 
        type: 'success', 
        text: `二段階認証を${!settings.security.twoFactorEnabled ? '有効' : '無効'}にしました` 
      });
    } catch (_error) {
      setMessage({ type: 'error', text: '設定の変更に失敗しました' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (success: boolean) => {
    return success ? 'text-green-400' : 'text-red-400';
  };

  const getStatusText = (success: boolean) => {
    return success ? '成功' : '失敗';
  };

  return (
    <div className="space-y-6">
      {/* パスワード変更 */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <Key className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">パスワード変更</h3>
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

        <div className="mb-4 text-sm text-slate-400">
          最終変更: {formatDistanceToNow(settings.security.lastPasswordChange, { 
            addSuffix: true, 
            locale: ja 
          })}
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              現在のパスワード
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 pr-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              新しいパスワード
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 pr-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              新しいパスワード（確認）
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 pr-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? '変更中...' : 'パスワードを変更'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 二段階認証 */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">二段階認証</h3>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
          <div>
            <h4 className="text-white font-medium">二段階認証</h4>
            <p className="text-slate-400 text-sm mt-1">
              {settings.security.twoFactorEnabled 
                ? 'アカウントは二段階認証で保護されています' 
                : 'セキュリティを強化するために二段階認証を有効にしてください'
              }
            </p>
          </div>
          <button
            onClick={handleTwoFactorToggle}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg transition-colors ${
              settings.security.twoFactorEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } disabled:bg-slate-600 disabled:cursor-not-allowed`}
          >
            {settings.security.twoFactorEnabled ? '無効にする' : '有効にする'}
          </button>
        </div>
      </div>

      {/* ログイン履歴 */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">ログイン履歴</h3>
        </div>

        <div className="space-y-3">
          {settings.security.loginHistory.map((login) => (
            <div
              key={login.id}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
            >
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{login.device}</span>
                    <span className={`text-sm ${getStatusColor(login.success)}`}>
                      {getStatusText(login.success)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-400 text-sm mt-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{login.location}</span>
                    </div>
                    <span>{login.ipAddress}</span>
                  </div>
                </div>
              </div>
              <div className="text-slate-400 text-sm">
                {formatDistanceToNow(login.timestamp, { 
                  addSuffix: true, 
                  locale: ja 
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;