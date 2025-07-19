import React from 'react';
import { Bell, AlertTriangle, TrendingUp, DollarSign, Clock, X } from 'lucide-react';
import { Alert } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface AlertCenterProps {
  alerts: Alert[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const AlertCenter: React.FC<AlertCenterProps> = ({ alerts, onMarkAsRead, onDismiss }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'rate': return <DollarSign className="h-4 w-4" />;
      case 'product': return <TrendingUp className="h-4 w-4" />;
      case 'trend': return <Bell className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-900/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-900/10';
      case 'low': return 'border-blue-500/50 bg-blue-900/10';
      default: return 'border-slate-500/50 bg-slate-900/10';
    }
  };

  const getIconColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-white">アラートセンター</h3>
          {unreadAlerts.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadAlerts.length}
            </span>
          )}
        </div>
        <Bell className="h-5 w-5 text-blue-400" />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">現在アラートはありません</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${getAlertColor(alert.priority)} ${
                !alert.isRead ? 'shadow-lg' : 'opacity-75'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`${getIconColor(alert.priority)} mt-0.5`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white text-sm">{alert.title}</h4>
                      {!alert.isRead && (
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(alert.timestamp, { 
                          addSuffix: true, 
                          locale: ja 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {!alert.isRead && (
                    <button
                      onClick={() => onMarkAsRead(alert.id)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="既読にする"
                    >
                      <Bell className="h-3 w-3" />
                    </button>
                  )}
                  <button
                    onClick={() => onDismiss(alert.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="削除"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {alerts.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            すべてのアラートを表示
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertCenter;