import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, Sliders } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import PreferencesSettings from './PreferencesSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import SubscriptionSettings from './SubscriptionSettings';
import { UserSettings } from '../../types';
import { userSettings as initialSettings } from '../../data/mockData';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<UserSettings>(initialSettings);

  const tabs = [
    { id: 'profile', label: 'プロフィール', icon: User },
    { id: 'preferences', label: '取引設定', icon: Sliders },
    { id: 'notifications', label: '通知', icon: Bell },
    { id: 'security', label: 'セキュリティ', icon: Shield },
    { id: 'subscription', label: 'サブスクリプション', icon: CreditCard }
  ];

  const handleSettingsUpdate = (updatedSettings: UserSettings) => {
    setSettings(updatedSettings);
    // ここで実際のAPIコールを行う
    console.log('Settings updated:', updatedSettings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings settings={settings} onUpdate={handleSettingsUpdate} />;
      case 'preferences':
        return <PreferencesSettings settings={settings} onUpdate={handleSettingsUpdate} />;
      case 'notifications':
        return <NotificationSettings settings={settings} onUpdate={handleSettingsUpdate} />;
      case 'security':
        return <SecuritySettings settings={settings} onUpdate={handleSettingsUpdate} />;
      case 'subscription':
        return <SubscriptionSettings settings={settings} onUpdate={handleSettingsUpdate} />;
      default:
        return <ProfileSettings settings={settings} onUpdate={handleSettingsUpdate} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">アカウント設定</h2>
        <p className="text-slate-300">
          プロフィール、セキュリティ、通知設定を管理
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* サイドバー */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">設定メニュー</h3>
              </div>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ユーザー情報カード */}
          <div className="mt-6 bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center space-x-3">
              <img
                src={settings.profile.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt="プロフィール"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-white font-medium">{settings.profile.name}</h4>
                <p className="text-slate-400 text-sm">{settings.profile.email}</p>
                <div className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                  settings.subscription.plan === 'premium' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : settings.subscription.plan === 'standard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-600 text-slate-300'
                }`}>
                  {settings.subscription.plan === 'premium' ? 'プレミアム' :
                   settings.subscription.plan === 'standard' ? 'スタンダード' : '無料'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;