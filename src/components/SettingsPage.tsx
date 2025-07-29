import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Key, Save, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 从localStorage加载API Key
    const savedApiKey = localStorage.getItem('openrouter_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('请输入有效的API Key');
      return;
    }

    if (!apiKey.startsWith('sk-or-')) {
      setError('OpenRouter API Key应该以"sk-or-"开头');
      return;
    }

    try {
      localStorage.setItem('openrouter_api_key', apiKey.trim());
      setIsSaved(true);
      setError('');
      
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (err) {
      setError('保存失败，请重试');
    }
  };

  const handleClear = () => {
    if (confirm('确定要清除API Key吗？')) {
      setApiKey('');
      localStorage.removeItem('openrouter_api_key');
      setIsSaved(false);
      setError('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <Settings className="w-8 h-8 text-orange-600 mr-3" />
            系统设置
          </h1>
          <p className="text-gray-600 mt-1">配置API密钥和系统参数</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* API Configuration */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Key className="w-6 h-6 text-orange-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">API配置</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenRouter API Key *
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                用于调用DeepSeek AI模型的API密钥
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {isSaved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 text-sm">API Key已保存成功</span>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                清除
              </button>
            </div>
          </div>
        </div>

        {/* API Instructions */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">如何获取OpenRouter API Key</h3>
          
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-orange-600 font-semibold text-xs">1</span>
              </div>
              <div>
                <p className="font-medium">访问OpenRouter官网</p>
                <p className="text-gray-600">前往 <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">https://openrouter.ai</a> 注册账户</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-orange-600 font-semibold text-xs">2</span>
              </div>
              <div>
                <p className="font-medium">创建API Key</p>
                <p className="text-gray-600">在控制台中创建新的API Key，选择适当的使用限制</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-orange-600 font-semibold text-xs">3</span>
              </div>
              <div>
                <p className="font-medium">充值余额</p>
                <p className="text-gray-600">为账户充值以使用DeepSeek模型（推荐使用免费版本：deepseek-r1-0528:free）</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-orange-600 font-semibold text-xs">4</span>
              </div>
              <div>
                <p className="font-medium">配置API Key</p>
                <p className="text-gray-600">将获取的API Key粘贴到上方输入框中并保存</p>
              </div>
            </div>
          </div>
        </div>

        {/* Model Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">模型信息</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">使用的AI模型</h4>
              <p className="text-sm text-gray-600 mb-1">deepseek/deepseek-r1-0528:free</p>
              <p className="text-xs text-gray-500">DeepSeek R1推理模型，专为复杂推理任务优化</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">模型特点</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 强大的中文理解和生成能力</li>
                <li>• 优秀的逻辑推理和分析能力</li>
                <li>• 适合教育内容创作</li>
                <li>• 免费版本，成本低廉</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">隐私说明</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• API Key仅存储在您的浏览器本地，不会上传到任何服务器</p>
            <p>• 您的作文内容仅用于AI生成，不会被保存或分享</p>
            <p>• 所有数据处理都在您的设备上进行，确保隐私安全</p>
            <p>• 您可以随时清除存储的API Key和历史记录</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;