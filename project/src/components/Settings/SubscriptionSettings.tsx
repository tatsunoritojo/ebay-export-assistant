import React, { useState } from 'react';
import { CreditCard, Crown, Check, X, AlertCircle } from 'lucide-react';
import { UserSettings } from '../../types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface SubscriptionSettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({ settings, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const plans = [
    {
      id: 'free',
      name: '無料プラン',
      price: 0,
      features: [
        '基本的な市場概要',
        '為替アラート',
        '注目商品ランキング',
        '基本サポート'
      ],
      limitations: [
        '詳細分析機能なし',
        '商品推奨数制限',
        'API連携なし'
      ]
    },
    {
      id: 'standard',
      name: 'スタンダードプラン',
      price: 2980,
      features: [
        '売上予測機能',
        '競合分析',
        'カテゴリ別レコメンド',
        '詳細トレンド分析',
        'メールサポート'
      ],
      limitations: [
        'API連携制限',
        '高度分析機能なし'
      ]
    },
    {
      id: 'premium',
      name: 'プレミアムプラン',
      price: 4980,
      features: [
        'リアルタイム市場分析',
        'eBay API連携',
        '高度な商品プランニング',
        '価格改定支援',
        '優先サポート',
        'カスタムレポート'
      ],
      limitations: []
    }
  ];

  const handlePlanChange = async (newPlan: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedSettings = {
        ...settings,
        subscription: {
          ...settings.subscription,
          plan: newPlan as 'free' | 'standard' | 'premium',
          nextBillingDate: newPlan !== 'free' ? new Date(2024, 11, 15) : undefined
        }
      };
      
      onUpdate(updatedSettings);
      setMessage({ 
        type: 'success', 
        text: `${plans.find(p => p.id === newPlan)?.name}に変更しました` 
      });
    } catch (_error) {
      setMessage({ type: 'error', text: 'プラン変更に失敗しました' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('サブスクリプションをキャンセルしますか？期間終了時に無料プランに変更されます。')) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedSettings = {
        ...settings,
        subscription: {
          ...settings.subscription,
          cancelAtPeriodEnd: true
        }
      };
      
      onUpdate(updatedSettings);
      setMessage({ 
        type: 'success', 
        text: 'サブスクリプションのキャンセルを受け付けました' 
      });
    } catch (_error) {
      setMessage({ type: 'error', text: 'キャンセル処理に失敗しました' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlan = plans.find(p => p.id === settings.subscription.plan);

  return (
    <div className="space-y-6">
      {/* 現在のプラン */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <Crown className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">現在のプラン</h3>
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

        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-medium text-lg">{currentPlan?.name}</h4>
              <p className="text-slate-400">
                {currentPlan?.price === 0 ? '無料' : `¥${currentPlan?.price.toLocaleString()}/月`}
              </p>
            </div>
            <div className={`px-3 py-1 rounded text-sm ${
              settings.subscription.status === 'active' 
                ? 'bg-green-900/30 text-green-300'
                : 'bg-red-900/30 text-red-300'
            }`}>
              {settings.subscription.status === 'active' ? 'アクティブ' : 'キャンセル済み'}
            </div>
          </div>

          {settings.subscription.nextBillingDate && (
            <div className="text-slate-400 text-sm mb-4">
              次回請求日: {format(settings.subscription.nextBillingDate, 'yyyy年MM月dd日', { locale: ja })}
            </div>
          )}

          {settings.subscription.cancelAtPeriodEnd && (
            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-4">
              <p className="text-yellow-200 text-sm">
                サブスクリプションは期間終了時にキャンセルされます。
              </p>
            </div>
          )}

          {settings.subscription.plan !== 'free' && !settings.subscription.cancelAtPeriodEnd && (
            <button
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="text-red-400 hover:text-red-300 text-sm transition-colors disabled:opacity-50"
            >
              サブスクリプションをキャンセル
            </button>
          )}
        </div>
      </div>

      {/* プラン比較 */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center space-x-2 mb-6">
          <CreditCard className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">プラン変更</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 transition-all ${
                settings.subscription.plan === plan.id
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500'
              }`}
            >
              <div className="text-center mb-4">
                <h4 className="text-white font-medium text-lg">{plan.name}</h4>
                <div className="text-2xl font-bold text-white mt-2">
                  {plan.price === 0 ? '無料' : `¥${plan.price.toLocaleString()}`}
                  {plan.price > 0 && <span className="text-sm text-slate-400">/月</span>}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h5 className="text-slate-300 font-medium text-sm">機能</h5>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-3 w-3 text-green-400" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h5 className="text-slate-400 font-medium text-sm">制限</h5>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <X className="h-3 w-3 text-red-400" />
                      <span className="text-slate-400 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => handlePlanChange(plan.id)}
                disabled={isLoading || settings.subscription.plan === plan.id}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  settings.subscription.plan === plan.id
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : plan.id === 'premium'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50`}
              >
                {settings.subscription.plan === plan.id 
                  ? '現在のプラン' 
                  : isLoading 
                  ? '変更中...' 
                  : plan.id === 'free' 
                  ? 'ダウングレード' 
                  : 'アップグレード'
                }
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;