import React from 'react';
import { Star, TrendingUp, TrendingDown, Minus, Eye, ShoppingCart, AlertTriangle } from 'lucide-react';
import { Product } from '../../types';

interface ProductRecommendationsProps {
  products: Product[];
  userLevel: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ products, userLevel }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'high': return 'text-red-400 bg-red-900/20';
      default: return 'text-slate-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-slate-400" />;
      default: return null;
    }
  };

  const getShippingDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const filteredProducts = products.filter(product => {
    if (userLevel === 'beginner') {
      return product.riskLevel === 'low' && product.shippingDifficulty === 'easy';
    } else if (userLevel === 'intermediate') {
      return product.riskLevel !== 'high';
    }
    return true;
  });

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">おすすめ商品</h3>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-slate-300">{userLevel === 'beginner' ? '初心者向け' : userLevel === 'intermediate' ? '中級者向け' : '上級者向け'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="flex items-start space-x-3 mb-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm truncate">{product.title}</h4>
                <p className="text-slate-400 text-xs">{product.category}</p>
              </div>
              {getTrendIcon(product.trend)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">利益率</span>
                <span className="text-green-400 font-medium">{product.profitMargin}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">予想利益</span>
                <span className="text-white font-medium">¥{product.profit.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">リスク</span>
                <span className={`text-xs px-2 py-1 rounded ${getRiskColor(product.riskLevel)}`}>
                  {product.riskLevel === 'low' ? '低' : product.riskLevel === 'medium' ? '中' : '高'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">ウォッチ数</span>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-blue-400" />
                  <span className="text-blue-400 text-sm">{product.watchCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">発送難易度</span>
                <span className={`text-sm ${getShippingDifficultyColor(product.shippingDifficulty)}`}>
                  {product.shippingDifficulty === 'easy' ? '簡単' : product.shippingDifficulty === 'medium' ? '普通' : '困難'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">需要スコア</span>
                <div className="flex items-center space-x-1">
                  <div className="w-16 bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full"
                      style={{ width: `${product.demandScore}%` }}
                    />
                  </div>
                  <span className="text-blue-400 text-sm">{product.demandScore}</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">詳細を見る</span>
            </button>
          </div>
        ))}
      </div>

      {userLevel === 'beginner' && (
        <div className="mt-6 bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-300 font-medium mb-1">初心者向けアドバイス</h4>
              <p className="text-blue-200 text-sm">
                低リスク・発送簡単な商品から始めることをお勧めします。慣れてきたら徐々に高利益商品にチャレンジしてみましょう。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;