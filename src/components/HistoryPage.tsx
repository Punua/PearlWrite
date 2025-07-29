import React, { useState, useEffect } from 'react';
import { ArrowLeft, History, FileText, Eye, Trash2, Calendar, User, BookOpen, Download, Copy } from 'lucide-react';

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

interface HistoryItem {
  id: number;
  topic: string;
  audience: string;
  wordCount: string;
  outline: any[];
  paragraphs: any[];
  originalText: string;
  polishedText: string;
  createdAt: string;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 从localStorage加载历史记录
    const saved = localStorage.getItem('writingHistory');
    if (saved) {
      setHistoryItems(JSON.parse(saved));
    }
  }, []);

  const getAudienceLabel = (audience: string) => {
    const labels = {
      'primary': '小学生',
      'middle': '初中生', 
      'high': '高中生',
      'university': '大学生'
    };
    return labels[audience as keyof typeof labels] || audience;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleView = (item: HistoryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个作文记录吗？')) {
      const newItems = historyItems.filter(item => item.id !== id);
      setHistoryItems(newItems);
      localStorage.setItem('writingHistory', JSON.stringify(newItems));
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('文本已复制到剪贴板');
  };

  const downloadText = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="mr-4 p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <History className="w-8 h-8 text-orange-600 mr-3" />
            历史记录
          </h1>
          <p className="text-gray-600 mt-1">查看和管理您的作文创作历史</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{historyItems.length}</div>
              <div className="text-sm text-gray-600">总作文数</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {new Set(historyItems.map(item => item.audience)).size}
              </div>
              <div className="text-sm text-gray-600">受众类型</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {historyItems.reduce((sum, item) => sum + (item.outline?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">总段落数</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {historyItems.length > 0 ? 
                  Math.ceil((Date.now() - new Date(historyItems[historyItems.length - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24))
                  : 0
                }
              </div>
              <div className="text-sm text-gray-600">活跃天数</div>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">作文创作记录</h2>
        </div>
        
        {historyItems.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无历史记录</h3>
            <p className="text-gray-600 mb-6">开始创作您的第一篇作文吧</p>
            <button
              onClick={() => onNavigate('writing')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              开始创作
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {historyItems.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{item.topic}</h3>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {getAudienceLabel(item.audience)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {item.wordCount}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {item.outline?.length || 0} 个段落
                      </div>
                      {item.polishedText && (
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          已润色
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleView(item)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="查看详情"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除记录"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedItem.topic}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                  {getAudienceLabel(selectedItem.audience)}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {selectedItem.wordCount}
                </span>
                <span>{formatDate(selectedItem.createdAt)}</span>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* 大纲 */}
              {selectedItem.outline && selectedItem.outline.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">作文大纲</h3>
                  <div className="space-y-3">
                    {selectedItem.outline.map((section: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900">{section.title}</h4>
                        <p className="text-gray-700 text-sm mt-1">{section.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 润色后文本 */}
              {selectedItem.polishedText && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">润色后作文</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyText(selectedItem.polishedText)}
                        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="复制文本"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadText(selectedItem.polishedText, `${selectedItem.topic}-润色版.txt`)}
                        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="下载文本"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="prose max-w-none text-sm leading-relaxed text-justify">
                      {selectedItem.polishedText.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 原始文本 */}
              {selectedItem.originalText && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">原始作文</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyText(selectedItem.originalText)}
                        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="复制文本"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadText(selectedItem.originalText, `${selectedItem.topic}-原版.txt`)}
                        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="下载文本"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="prose max-w-none text-sm leading-relaxed text-justify">
                      {selectedItem.originalText.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;