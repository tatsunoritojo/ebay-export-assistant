import React from 'react';
import { Bell, User, Settings, TrendingUp } from 'lucide-react';

interface HeaderProps {
  userLevel: string;
  onUserLevelChange: (level: string) => void;
  alertCount: number;
}

const Header: React.FC<HeaderProps> = ({ userLevel, onUserLevelChange, alertCount }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">eBay Export Assistant</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={userLevel}
              onChange={(e) => onUserLevelChange(e.target.value)}
              className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">初心者</option>
              <option value="intermediate">中級者</option>
              <option value="advanced">上級者</option>
            </select>
            
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {alertCount}
                </span>
              )}
            </button>
            
            <button className="p-2 text-slate-300 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button className="p-2 text-slate-300 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;