import React, { useState } from 'react';
import { ArrowLeft, PenTool, Users, FileText, Sparkles, Copy, Save, ChevronRight } from 'lucide-react';

interface OutlineGeneratorProps {
  onNavigate: (page: string) => void;
}

const OutlineGenerator: React.FC<OutlineGeneratorProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    topic: '',
    audience: '',
    wordCount: '',
    requirements: ''
  });
  const [outline, setOutline] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const audiences = [
    { value: 'primary', label: '小学生', description: '6-12岁，语言简单易懂' },
    { value: 'middle', label: '初中生', description: '13-15岁，逻辑清晰' },
    { value: 'high', label: '高中生', description: '16-18岁，思辨深度' },
    { value: 'university', label: '大学生', description: '18+岁，学术规范' }
  ];

  const wordCounts = ['600字', '800字', '1000字', '1200字', '1500字', '自定义'];

  const handleGenerate = async () => {
    if (!formData.topic || !formData.audience || !formData.wordCount) {
      alert('请填写完整信息');
      return;
    }

    setIsGenerating(true);
    
    // 模拟AI生成过程
    setTimeout(() => {
      const mockOutline = {
        title: formData.topic,
        structure: [
          {
            section: '开头段',
            description: '引入话题，阐述主题重要性',
            keyPoints: ['背景介绍', '问题提出', '观点表明'],
            suggestedLength: '150-200字'
          },
          {
            section: '主体段落一',
            description: '从理论角度论证观点',
            keyPoints: ['理论依据', '权威观点', '逻辑推理'],
            suggestedLength: '200-250字'
          },
          {
            section: '主体段落二', 
            description: '结合实际案例说明',
            keyPoints: ['典型案例', '现实意义', '对比分析'],
            suggestedLength: '200-250字'
          },
          {
            section: '主体段落三',
            description: '个人思考与建议',
            keyPoints: ['个人观点', '解决方案', '未来展望'],
            suggestedLength: '150-200字'
          },
          {
            section: '结尾段',
            description: '总结全文，升华主题',
            keyPoints: ['观点总结', '意义升华', '呼吁行动'],
            suggestedLength: '100-150字'
          }
        ],
        writingTips: [
          '注意段落间的逻辑衔接',
          '使用丰富的论证方法',
          '语言表达要符合受众特点',
          '适当使用修辞手法增强表达效果'
        ]
      };
      setOutline(mockOutline);
      setIsGenerating(false);
    }, 2000);
  };

  const copyOutline = () => {
    if (!outline) return;
    
    let text = `作文大纲：${outline.title}\n\n`;
    outline.structure.forEach((section: any, index: number) => {
      text += `${index + 1}. ${section.section} (${section.suggestedLength})\n`;
      text += `   ${section.description}\n`;
      text += `   要点：${section.keyPoints.join('、')}\n\n`;
    });
    text += '写作建议：\n';
    outline.writingTips.forEach((tip: string, index: number) => {
      text += `${index + 1}. ${tip}\n`;
    });
    
    navigator.clipboard.writeText(text);
    alert('大纲已复制到剪贴板');
  };

  const saveOutline = () => {
    if (!outline) return;
    
    const saved = JSON.parse(localStorage.getItem('savedOutlines') || '[]');
    const newOutline = {
      id: Date.now(),
      topic: formData.topic,
      audience: formData.audience,
      wordCount: formData.wordCount,
      outline,
      createdAt: new Date().toISOString()
    };
    saved.push(newOutline);
    localStorage.setItem('savedOutlines', JSON.stringify(saved));
    alert('大纲已保存');
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
            <PenTool className="w-8 h-8 text-orange-600 mr-3" />
            作文大纲生成
          </h1>
          <p className="text-gray-600 mt-1">根据主题和要求，智能生成结构清晰的作文大纲</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">填写作文要求</h2>
          
          <div className="space-y-6">
            {/* 作文主题 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                作文主题 *
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="如：环保的重要性、科技对生活的改变"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* 目标受众 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                目标受众 *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {audiences.map((audience) => (
                  <div
                    key={audience.value}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.audience === audience.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setFormData({ ...formData, audience: audience.value })}
                  >
                    <div className="font-medium text-gray-900">{audience.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{audience.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 字数要求 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                字数要求 *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {wordCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setFormData({ ...formData, wordCount: count })}
                    className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                      formData.wordCount === count
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              {formData.wordCount === '自定义' && (
                <input
                  type="text"
                  placeholder="请输入具体字数"
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              )}
            </div>

            {/* 额外要求 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                额外要求
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="如：需要包含具体案例、要求使用修辞手法等"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  正在生成大纲...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  生成作文大纲
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Outline Result */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">生成结果</h2>
            {outline && (
              <div className="flex space-x-2">
                <button
                  onClick={copyOutline}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="复制大纲"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={saveOutline}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="保存大纲"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {!outline ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">请填写左侧信息并点击生成按钮</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  《{outline.title}》作文大纲
                </h3>
                
                <div className="space-y-4">
                  {outline.structure.map((section: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{section.section}</h4>
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          {section.suggestedLength}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{section.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {section.keyPoints.map((point: string, pointIndex: number) => (
                          <span
                            key={pointIndex}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">写作建议</h4>
                <ul className="space-y-2">
                  {outline.writingTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 mr-2" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => onNavigate('paragraph')}
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  下一步：段落生成
                </button>
                <button
                  onClick={() => setOutline(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  重新生成
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutlineGenerator;