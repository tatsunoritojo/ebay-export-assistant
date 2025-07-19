import React, { useState } from 'react';
import { HelpCircle, Search, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from '../../data/mockData';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories = ['all', ...Array.from(new Set(faqData.map(faq => faq.category)))];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'all': return 'すべて';
      case '基本操作': return '基本操作';
      case '出品': return '出品';
      case 'リスク管理': return 'リスク管理';
      case '顧客対応': return '顧客対応';
      default: return category;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">よくある質問</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="質問を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
              }`}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">該当する質問が見つかりませんでした</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-slate-700/30 rounded-lg border border-slate-600/50 overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full p-4 text-left hover:bg-slate-600/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{faq.question}</h4>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-slate-400">{faq.helpful}</span>
                      </div>
                    </div>
                  </div>
                  {expandedItems.has(faq.id) ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>
              
              {expandedItems.has(faq.id) && (
                <div className="px-4 pb-4 border-t border-slate-600/50">
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600/30">
                    <span className="text-xs text-slate-400">この回答は役に立ちましたか？</span>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-xs text-green-400 hover:text-green-300 transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                        <span>はい</span>
                      </button>
                      <button className="text-xs text-slate-400 hover:text-slate-300 transition-colors">
                        いいえ
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm mb-3">
          お探しの情報が見つからない場合は、お気軽にお問い合わせください。
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          サポートに問い合わせ
        </button>
      </div>
    </div>
  );
};

export default FAQ;