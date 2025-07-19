import React from 'react';
import { BookOpen, CheckCircle, Play, ArrowRight } from 'lucide-react';

const BeginnerGuide: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'eBayアカウント作成',
      description: 'eBayセラーアカウントを作成し、基本情報を入力します',
      completed: true
    },
    {
      id: 2,
      title: '商品リサーチ',
      description: '推奨商品から低リスクで高利益の商品を選びます',
      completed: true
    },
    {
      id: 3,
      title: '仕入れ・出品',
      description: '商品を仕入れてeBayに出品します',
      completed: false
    },
    {
      id: 4,
      title: '発送・顧客対応',
      description: '注文が入ったら商品を発送し、顧客対応を行います',
      completed: false
    },
    {
      id: 5,
      title: '売上分析・改善',
      description: '売上データを分析し、次の商品選定に活かします',
      completed: false
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">初心者ガイド</h3>
      </div>

      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-slate-500 flex items-center justify-center">
                  <span className="text-slate-400 text-xs">{step.id}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${step.completed ? 'text-green-400' : 'text-white'}`}>
                {step.title}
              </h4>
              <p className="text-slate-300 text-sm mt-1">{step.description}</p>
            </div>
            {!step.completed && index === steps.findIndex(s => !s.completed) && (
              <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                <Play className="h-3 w-3" />
                <span>開始</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium mb-2">次のステップ</h4>
        <p className="text-blue-200 text-sm mb-3">
          商品リサーチが完了しました。次は実際に商品を仕入れて出品してみましょう。
        </p>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <span>仕入れ・出品ガイドを見る</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BeginnerGuide;