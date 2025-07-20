import React, { useState, useEffect } from 'react';
import { Bot, Brain, Target, TrendingUp, Zap, DollarSign, Sparkles, BarChart3, Cpu, CheckCircle, Clock, AlertCircle, X, FileText, Users, Shield } from 'lucide-react';

function App() {
  const [activeDemo, setActiveDemo] = useState('prompt');
  const [aiTyping, setAiTyping] = useState(false);
  const [currentExample, setCurrentExample] = useState('');
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const demoFeatures = {
    prompt: {
      title: '商品価値の訴求力最適化',
      description: '市場動向と消費者心理を反映した商品説明の構築',
      icon: <Brain className="h-5 w-5" />,
      example: `商品: Vintage Japanese Ceramic Vase

🎯 最適化された商品訴求:
"Exceptional vintage Japanese ceramic featuring traditional sometsuke (blue and white) design methodology. This piece exemplifies Edo period craftsmanship with meticulous hand-painted botanical motifs. Collectors will appreciate the authentic aging patina that validates historical provenance. Dimensions: 8" height. Museum-quality condition."

📊 市場適応性分析:
✓ 価格帯適正性: 競合比較で8%優位*
✓ 検索最適化: 主要キーワード75%網羅*
✓ 訴求力指数: 購買決定要因89%包含*
✓ 文化的配慮: 現地市場への適応度95%*

* シミュレーション結果（実際の値は市場状況により変動）`
    },
    automation: {
      title: '動的価格戦略の実装',
      description: '市場状況に応じた収益最適化の自動執行',
      icon: <Target className="h-5 w-5" />,
      example: `対象商品: Nintendo Switch OLED Console

💼 戦略的価格分析:
設定価格: $350*
市場均衡点: $340 (変動係数: 0.85)*
最適価格帯: $345 (期待収益率: +12.3%)*

⚡ 自動化プロセス実行済み:
✓ 価格調整完了 ($345設定)*
✓ 配送オプション最適化実装
✓ 次回再評価スケジュール: 24時間後

📈 予測収益影響:
・売上高増加予測: 15.2%*
・競争優位性維持期間: 72時間*
・利幅最適化効果: +8.7%*

* デモンストレーション用の仮想数値です`
    },
    analysis: {
      title: '市場インテリジェンス統合',
      description: '包括的データ解析による戦略的洞察の生成',
      icon: <BarChart3 className="h-5 w-5" />,
      example: `📊 多次元市場分析レポート

🔍 新興需要セグメント特定:
・"vintage gaming collectibles" 需要急伸: +340%*
・"japanese artisan ceramics" 市場拡張: +180%*  
・"retro electronics restoration" カテゴリ成長: +125%*

💎 収益機会評価 (7日間予測):
・ゲーミング関連: 利益率32% (リスク調整後)*
・工芸品カテゴリ: 利益率45% (季節調整済み)*
・復刻電子機器: 利益率28% (流動性考慮)*

🎯 戦略的推奨事項:
1. 工芸品在庫ポートフォリオの戦略的拡充
2. ゲーミング製品価格政策の再構築
3. 電子機器カテゴリでの差別化戦略実装

* 分析結果は仮想データに基づく予測値です`
    }
  };

  // AIタイピング効果
  useEffect(() => {
    if (demoFeatures[activeDemo]) {
      setAiTyping(true);
      setCurrentExample('');
      const text = demoFeatures[activeDemo].example;
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < text.length) {
          setCurrentExample(text.slice(0, index + 1));
          index++;
        } else {
          setAiTyping(false);
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [activeDemo, demoFeatures]);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowSolutionModal(false);
      }
    };

    if (showSolutionModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showSolutionModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-2xl">
              <Bot className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            eBay Cross-Border Analytics
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 block">
              国際商取引の最適化プラットフォーム
            </span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 shadow-xl border border-white/20">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-semibold">作業効率 93% 改善*</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 shadow-xl border border-white/20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <span className="text-white font-semibold">収益性 41% 向上*</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 shadow-xl border border-white/20">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="text-white font-semibold">意思決定の最適化</span>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm text-center mt-4">
            * 表示数値は仮想データに基づくシミュレーション結果です
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700/50">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
            越境EC事業における戦略的優位性の確立
          </h2>
          <p className="text-slate-300 text-xl text-center max-w-4xl mx-auto leading-relaxed">
            包括的な市場分析と高度な自動化により、国際商取引の複雑性を簡素化し、
            持続可能な競争優位性を構築します。データ主導の意思決定プロセスで、
            収益最大化と運営効率の両立を実現しています。
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            統合プラットフォーム機能の実装例
          </h3>
          
          {/* Demo Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(demoFeatures).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeDemo === key
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl transform scale-105 border border-indigo-500'
                    : 'bg-slate-700/70 text-slate-300 hover:bg-slate-600/70 border border-slate-600'
                }`}
              >
                {feature.icon}
                <span>{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Demo Display */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                {demoFeatures[activeDemo].icon}
              </div>
              <h4 className="text-lg font-semibold text-white">
                {demoFeatures[activeDemo].title}
              </h4>
              {aiTyping && (
                <div className="flex items-center space-x-2 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700">
                  <Cpu className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-300">データ解析実行中</span>
                </div>
              )}
            </div>
            <p className="text-slate-300 mb-4">{demoFeatures[activeDemo].description}</p>
            <div className="bg-slate-800/70 rounded-lg p-4 border-l-4 border-indigo-500 relative">
              <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
                {currentExample || demoFeatures[activeDemo].example}
              </pre>
              {aiTyping && (
                <div className="absolute bottom-4 right-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2 py-1 rounded text-xs animate-pulse">
                    解析中...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Dashboard Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            統合監視システムの実装
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Exchange Rate Widget */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <span>通貨変動リスク管理</span>
              </h4>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">為替レート</h3>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-white">¥149.85*</span>
                      <span className="text-sm text-slate-300">USD/JPY</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-emerald-400">+0.75 (+0.50%)*</span>
                      <span className="text-xs text-slate-400">24時間</span>
                    </div>
                  </div>
                  <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-3">
                    <p className="text-emerald-200 text-sm">
                      💡 通貨価値の逆相関により、輸出収益性が向上している市場環境です
                    </p>
                  </div>
                  <p className="text-slate-400 text-xs">
                    * 表示レートは仮想データです
                  </p>
                </div>
              </div>
            </div>

            {/* Profit Calculator Demo */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Target className="h-5 w-5 text-indigo-400" />
                <span>収益性評価モデル</span>
              </h4>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-300">仕入価格</span>
                      <div className="text-xl font-bold text-white">¥3,500*</div>
                    </div>
                    <div>
                      <span className="text-slate-300">販売価格</span>
                      <div className="text-xl font-bold text-emerald-400">$45*</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-600 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-300">手数料・送料</span>
                        <div className="text-white">$8.50*</div>
                      </div>
                      <div>
                        <span className="text-slate-300">為替影響</span>
                        <div className="text-emerald-400">+$2.30*</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-600/30">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-200">最適化後収益予測</span>
                      <div className="text-xl font-bold text-emerald-400">¥1,890*</div>
                    </div>
                    <div className="text-sm text-emerald-300 mt-1">ROI: 54% (リスク調整済み)*</div>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">
                    * 計算例は仮想的なシナリオに基づいています
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-slate-700/50 hover:shadow-2xl hover:border-indigo-600/50 transition-all duration-300">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-3 rounded-lg w-fit mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              認知科学的訴求最適化
            </h3>
            <p className="text-slate-300">
              消費者心理学と言語学的アプローチを統合し、文化的背景を考慮した
              高度な商品価値訴求コンテンツを構築します
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-slate-700/50 hover:shadow-2xl hover:border-emerald-600/50 transition-all duration-300">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-lg w-fit mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              適応的市場戦略立案
            </h3>
            <p className="text-slate-300">
              多変量解析による市場動向の予測と、動的価格設定による
              競争優位性の持続的確保を実現します
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-slate-700/50 hover:shadow-2xl hover:border-purple-600/50 transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-lg w-fit mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              統合リスク管理体系
            </h3>
            <p className="text-slate-300">
              為替変動、市場流動性、競合動向を包括的に評価し、
              リスク調整後収益率の最大化を図る戦略的意思決定を支援します
            </p>
          </div>
        </div>

        {/* Implementation Roadmap Section */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            実装可能機能の戦略的ロードマップ
          </h3>
          <p className="text-slate-300 text-center mb-12 max-w-4xl mx-auto">
            実現可能性と収益改善効果のバランスを考慮した、段階的実装計画をご提案いたします。
            各機能のROI予測と技術的実装難易度を総合的に評価し、最適な導入順序を策定しています。
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Phase 1: High Feasibility, High ROI */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-600/50">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <h4 className="text-xl font-semibold text-white">Phase 1: 基盤構築</h4>
                <span className="bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded text-xs">高実現性・高収益</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-emerald-300 mb-2">自動価格監視システム</h5>
                  <p className="text-slate-300 text-sm mb-3">競合価格の24時間監視と自動調整アラート</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-400">ROI予測: 180%*</span>
                    <span className="text-slate-400">実装期間: 2-3週間</span>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-emerald-300 mb-2">為替リスク管理</h5>
                  <p className="text-slate-300 text-sm mb-3">通貨変動による利益影響の自動計算</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-400">ROI予測: 145%*</span>
                    <span className="text-slate-400">実装期間: 1-2週間</span>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-emerald-300 mb-2">商品説明最適化</h5>
                  <p className="text-slate-300 text-sm mb-3">SEO要因を考慮した商品説明の自動生成</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-400">ROI予測: 220%*</span>
                    <span className="text-slate-400">実装期間: 3-4週間</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Medium Feasibility, High ROI */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-600/50">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-6 w-6 text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Phase 2: 高度化</h4>
                <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-xs">中実現性・高収益</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2">予測的在庫管理</h5>
                  <p className="text-slate-300 text-sm mb-3">需要予測に基づく最適在庫レベルの提案</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">ROI予測: 280%*</span>
                    <span className="text-slate-400">実装期間: 6-8週間</span>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2">顧客行動分析</h5>
                  <p className="text-slate-300 text-sm mb-3">購買パターンに基づく商品推奨システム</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">ROI予測: 195%*</span>
                    <span className="text-slate-400">実装期間: 4-6週間</span>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2">多変量分析エンジン</h5>
                  <p className="text-slate-300 text-sm mb-3">複数要因を統合した価格最適化モデル</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-400">ROI予測: 320%*</span>
                    <span className="text-slate-400">実装期間: 8-10週間</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3: High Complexity, Very High ROI */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-indigo-600/50">
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="h-6 w-6 text-indigo-400" />
                <h4 className="text-xl font-semibold text-white">Phase 3: 統合最適化</h4>
                <span className="bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded text-xs">高複雑性・最高収益</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-indigo-300 mb-2">AIディープラーニング統合</h5>
                  <p className="text-slate-300 text-sm mb-3">画像認識による商品分類と価値評価</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-indigo-400">ROI予測: 450%*</span>
                    <span className="text-slate-400">実装期間: 12-16週間</span>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-indigo-300 mb-2">リアルタイム市場予測</h5>
                  <p className="text-slate-300 text-sm mb-3">機械学習による需要・価格変動の予測</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-indigo-400">ROI予測: 380%*</span>
                    <span className="text-slate-400">実装期間: 10-14週間</span>
                  </div>
                </div>

                <div className="bg-slate-800/70 rounded-lg p-4">
                  <h5 className="font-semibold text-indigo-300 mb-2">自律的業務執行</h5>
                  <p className="text-slate-300 text-sm mb-3">完全自動化された出品・価格調整システム</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-indigo-400">ROI予測: 520%*</span>
                    <span className="text-slate-400">実装期間: 16-20週間</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-900/50 rounded-xl p-6 border border-slate-600/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">実装戦略の考慮要因</h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="bg-emerald-900/30 p-3 rounded-lg mb-3">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                </div>
                <h5 className="font-semibold text-emerald-300 mb-2">技術的実現可能性</h5>
                <p className="text-slate-300">既存技術スタックとの適合性、開発リソースの可用性、外部API依存度を総合評価</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-900/30 p-3 rounded-lg mb-3">
                  <DollarSign className="h-6 w-6 text-purple-400 mx-auto" />
                </div>
                <h5 className="font-semibold text-purple-300 mb-2">収益改善インパクト</h5>
                <p className="text-slate-300">直接的収益増加、コスト削減効果、競争優位性の持続期間を定量的に分析</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-900/30 p-3 rounded-lg mb-3">
                  <Target className="h-6 w-6 text-indigo-400 mx-auto" />
                </div>
                <h5 className="font-semibold text-indigo-300 mb-2">戦略的重要度</h5>
                <p className="text-slate-300">事業成長への寄与度、スケーラビリティ、将来的な拡張性を包括的に検討</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs text-center mt-6">
              * ROI予測値は過去の類似プロジェクト実績と市場分析に基づく推定値です。実際の効果は市場環境や実装品質により変動する可能性があります。
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 rounded-2xl shadow-2xl text-white p-8 mt-8 text-center border border-indigo-500/50">
          <h3 className="text-3xl font-bold mb-6">
            戦略的パートナーシップによる事業成長の実現
          </h3>
          <p className="text-indigo-100 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            国際商取引における複合的な課題を体系的に解決し、持続可能な競争優位性を構築します。
            データサイエンスと行動経済学の知見を統合したアプローチにより、
            測定可能な事業成果の創出をお約束いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              戦略コンサルテーション
            </button>
            <button 
              onClick={() => setShowSolutionModal(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-200"
            >
              ソリューション詳細
            </button>
          </div>
        </div>
      </div>

      {/* Solution Details Modal */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">ソリューション詳細</h2>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* 技術仕様 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">技術仕様・アーキテクチャ</h3>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-300 mb-3">フロントエンド技術</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        <li>• React 18 + TypeScript</li>
                        <li>• Tailwind CSS + 高度なアニメーション</li>
                        <li>• レスポンシブデザイン</li>
                        <li>• PWA対応（オフライン機能）</li>
                        <li>• リアルタイムデータ同期</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-3">バックエンド・API</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        <li>• Node.js + Express/FastAPI</li>
                        <li>• PostgreSQL + Redis</li>
                        <li>• eBay API完全統合</li>
                        <li>• 為替データAPI（リアルタイム）</li>
                        <li>• 機械学習モデル統合</li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <h4 className="font-semibold text-emerald-300 mb-3">セキュリティ・インフラ</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-slate-800/70 rounded-lg p-3">
                        <div className="font-medium text-white mb-1">データ保護</div>
                        <div className="text-slate-300">TLS 1.3暗号化、GDPR準拠</div>
                      </div>
                      <div className="bg-slate-800/70 rounded-lg p-3">
                        <div className="font-medium text-white mb-1">認証・認可</div>
                        <div className="text-slate-300">OAuth 2.0、多要素認証</div>
                      </div>
                      <div className="bg-slate-800/70 rounded-lg p-3">
                        <div className="font-medium text-white mb-1">インフラ</div>
                        <div className="text-slate-300">AWS/GCP、CDN、自動スケーリング</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 導入プロセス */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">導入プロセス・サポート体制</h3>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-emerald-900/30 p-4 rounded-lg mb-3">
                        <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto" />
                      </div>
                      <h4 className="font-semibold text-emerald-300 mb-2">Phase 1: 分析・設計</h4>
                      <p className="text-slate-300 text-sm">現状分析、要件定義、システム設計、プロトタイプ作成</p>
                      <div className="text-emerald-400 text-xs mt-2">期間: 2-3週間</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-900/30 p-4 rounded-lg mb-3">
                        <Clock className="h-8 w-8 text-purple-400 mx-auto" />
                      </div>
                      <h4 className="font-semibold text-purple-300 mb-2">Phase 2: 開発・実装</h4>
                      <p className="text-slate-300 text-sm">段階的開発、並行テスト、ユーザーフィードバック統合</p>
                      <div className="text-purple-400 text-xs mt-2">期間: 8-12週間</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-900/30 p-4 rounded-lg mb-3">
                        <Shield className="h-8 w-8 text-indigo-400 mx-auto" />
                      </div>
                      <h4 className="font-semibold text-indigo-300 mb-2">Phase 3: 運用・最適化</h4>
                      <p className="text-slate-300 text-sm">本格稼働、パフォーマンス監視、継続的改善</p>
                      <div className="text-indigo-400 text-xs mt-2">期間: 継続的</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 料金体系 */}
              <section>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">投資対効果・料金体系</h3>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/70 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-emerald-300 mb-2">基盤パッケージ</h4>
                      <div className="text-2xl font-bold text-white mb-1">¥350,000*</div>
                      <div className="text-slate-400 text-sm mb-3">Phase 1機能（簡易版）</div>
                      <ul className="text-slate-300 text-xs space-y-1">
                        <li>• 価格監視システム（基本版）</li>
                        <li>• 為替アラート機能</li>
                        <li>• 商品説明テンプレート</li>
                        <li>• メールサポート(3ヶ月)</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/70 rounded-lg p-4 text-center border border-purple-600/50">
                      <h4 className="font-semibold text-purple-300 mb-2">プロフェッショナル</h4>
                      <div className="text-2xl font-bold text-white mb-1">¥980,000*</div>
                      <div className="text-slate-400 text-sm mb-3">Phase 1-2機能（標準版）</div>
                      <ul className="text-slate-300 text-xs space-y-1">
                        <li>• 基盤パッケージ全機能</li>
                        <li>• 高度な分析機能</li>
                        <li>• API統合サポート</li>
                        <li>• 電話・チャットサポート(6ヶ月)</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/70 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-indigo-300 mb-2">カスタムソリューション</h4>
                      <div className="text-xl font-bold text-white mb-1">要相談*</div>
                      <div className="text-slate-400 text-sm mb-3">個別要件に応じた設計</div>
                      <ul className="text-slate-300 text-xs space-y-1">
                        <li>• 事業規模に応じたカスタマイズ</li>
                        <li>• 段階的機能拡張</li>
                        <li>• 柔軟な支払いプラン</li>
                        <li>• 専任担当者による継続サポート</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-indigo-900/20 border border-indigo-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-300 mb-2">投資回収期間の目安</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-emerald-400 font-bold">3-6ヶ月</div>
                        <div className="text-slate-300">基盤パッケージ</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-400 font-bold">4-8ヶ月</div>
                        <div className="text-slate-300">プロフェッショナル</div>
                      </div>
                      <div className="text-center">
                        <div className="text-indigo-400 font-bold">個別算定</div>
                        <div className="text-slate-300">カスタムソリューション</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  * 料金は見積もり例です。実際の費用は要件により変動いたします。
                  詳細なお見積もりは個別にご相談ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;