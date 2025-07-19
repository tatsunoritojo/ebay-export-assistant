import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'こんにちは！eBay輸出入サポートです。どのようなことでお困りですか？',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    '出品方法を教えて',
    '発送方法について',
    '為替リスクについて',
    '返品対応について'
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // シミュレートされたボット応答
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('出品')) {
      return '出品の基本手順をご説明します：\n1. 商品写真を複数枚撮影\n2. 商品タイトルを英語で作成\n3. 商品説明を詳細に記載\n4. 価格と発送方法を設定\n5. 出品完了\n\n詳細なガイドが必要でしたら「詳細ガイド」とお伝えください。';
    } else if (lowerText.includes('発送')) {
      return '国際発送の主な方法：\n• EMS（国際スピード郵便）- 最も一般的\n• DHL Express - 最速配送\n• FedEx - 信頼性が高い\n\n発送方法の詳細比較は「発送比較」とお伝えください。';
    } else if (lowerText.includes('為替')) {
      return '為替リスク対策：\n• 定期的な価格見直し\n• 為替アラート設定\n• 利益率に余裕を持った価格設定\n• 複数通貨での取引検討\n\n具体的な設定方法は「為替設定」とお伝えください。';
    } else if (lowerText.includes('返品')) {
      return '返品対応のポイント：\n• 迅速な対応（24時間以内）\n• 丁寧なコミュニケーション\n• 問題の原因究明\n• 適切な解決策の提示\n\n返品ポリシーの設定は「返品ポリシー」とお伝えください。';
    } else {
      return 'ご質問ありがとうございます。より具体的にお聞かせいただけますか？下記のクイック返信もご利用ください。専門スタッフへの転送も可能です。';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 flex flex-col h-96">
      <div className="flex items-center space-x-2 p-4 border-b border-slate-700/50">
        <MessageCircle className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">チャットサポート</h3>
        <div className="flex items-center space-x-1 ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs text-green-400">オンライン</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-slate-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div>
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-200'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(reply)}
              className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded hover:bg-slate-600/50 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="メッセージを入力..."
            className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;