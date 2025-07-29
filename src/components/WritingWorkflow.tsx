import React, { useState } from 'react';
import { ArrowLeft, PenTool, CheckCircle, Clock, Sparkles, Copy, Download, Eye, EyeOff, RefreshCw, AlertCircle } from 'lucide-react';
import { callAI } from '../utils/aiService';

interface WritingWorkflowProps {
  onNavigate: (page: string) => void;
}

interface FormData {
  topic: string;
  audience: string;
  wordCount: string;
  requirements: string;
}

interface OutlineSection {
  title: string;
  description: string;
  keyPoints: string[];
  suggestedLength: string;
}

interface ParagraphAnalysis {
  content: string;
  analysis: string;
  purpose: string;
  highlights: string[];
}

const WritingWorkflow: React.FC<WritingWorkflowProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    audience: '',
    wordCount: '',
    requirements: ''
  });
  const [outline, setOutline] = useState<OutlineSection[]>([]);
  const [paragraphs, setParagraphs] = useState<ParagraphAnalysis[]>([]);
  const [originalText, setOriginalText] = useState('');
  const [polishedText, setPolishedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [error, setError] = useState('');

  const audiences = [
    { value: 'primary', label: '小学生', description: '6-12岁，语言简单易懂' },
    { value: 'middle', label: '初中生', description: '13-15岁，逻辑清晰' },
    { value: 'high', label: '高中生', description: '16-18岁，思辨深度' },
    { value: 'university', label: '大学生', description: '18+岁，学术规范' }
  ];

  const wordCounts = ['600字', '800字', '1000字', '1200字', '1500字', '自定义'];

  const steps = [
    { id: 1, title: '填写要求', description: '输入作文基本信息' },
    { id: 2, title: '生成大纲', description: 'AI智能生成作文大纲' },
    { id: 3, title: '段落分析', description: '逐段生成内容和分析' },
    { id: 4, title: '全文润色', description: '优化文章质量' }
  ];

  const generateOutline = async () => {
    if (!formData.topic || !formData.audience || !formData.wordCount) {
      setError('请填写完整信息');
      return;
    }

    setIsGenerating(true);
    setError('');

    const audienceMap = {
      'primary': '小学生',
      'middle': '初中生',
      'high': '高中生',
      'university': '大学生'
    };

    const prompt = `你是一位经验丰富的语文教师，需要为学生创作一篇示范作文的大纲。

作文要求：
- 主题：${formData.topic}
- 目标受众：${audienceMap[formData.audience as keyof typeof audienceMap]}
- 字数要求：${formData.wordCount}
- 额外要求：${formData.requirements || '无'}

请生成一个结构清晰、逻辑严密的作文大纲，包含以下内容：
1. 开头段：如何引入主题，吸引读者注意
2. 主体段落（2-4个）：每个段落的核心观点、论证方法和关键要点
3. 结尾段：如何总结升华，给读者留下深刻印象

对于每个段落，请提供：
- 段落标题
- 段落描述（该段落要表达的核心内容）
- 关键要点（3-5个具体的写作要点）
- 建议字数

请以JSON格式返回，结构如下：
{
  "outline": [
    {
      "title": "段落标题",
      "description": "段落描述",
      "keyPoints": ["要点1", "要点2", "要点3"],
      "suggestedLength": "建议字数"
    }
  ]
}

注意：
- 大纲要符合目标受众的认知水平和语言特点
- 逻辑结构要清晰，层次分明
- 每个段落都要有明确的功能和作用
- 总字数要符合要求`;

    try {
      const response = await callAI(prompt);
      const result = JSON.parse(response);
      setOutline(result.outline);
      setCurrentStep(2);
    } catch (err) {
      setError('生成大纲失败，请检查API设置或重试');
      console.error('生成大纲错误:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateParagraphs = async () => {
    setIsGenerating(true);
    setError('');

    const audienceMap = {
      'primary': '小学生',
      'middle': '初中生',
      'high': '高中生',
      'university': '大学生'
    };

    const targetWordCount = parseInt(formData.wordCount.replace(/[^0-9]/g, '')) || 800;
    const minWordCount = Math.max(targetWordCount - 50, targetWordCount * 0.9);

    const prompt = `你是一位优秀的语文教师，需要根据作文大纲生成具体的段落内容，并进行深度分析。

作文信息：
- 主题：${formData.topic}
- 目标受众：${audienceMap[formData.audience as keyof typeof audienceMap]}
- 字数要求：${formData.wordCount}（正文内容必须达到${minWordCount}字以上，不包括标题）
- 必须包含标题：请为作文生成一个简洁有力的标题

作文大纲：
${outline.map((section, index) => `${index + 1}. ${section.title}: ${section.description}`).join('\n')}

请严格按照以下要求生成内容：

1. **标题要求**：
   - 必须包含一个简洁有力的作文标题
   - 标题要紧扣主题，具有吸引力
   - 标题字数控制在8-15字之间

2. **正文要求**：
   - 正文总字数必须达到${minWordCount}字以上
   - 每个段落内容要充实具体，避免空洞表述
   - 语言要符合目标受众的理解水平
   - 逻辑要连贯，论证要充分

3. **分析要求**：
   为每个段落提供四个维度的分析：

   - **内容**：段落的具体文字内容，要求语言流畅、逻辑清晰、符合目标受众特点
   - **分析**：对段落的写作技巧、语言特色、逻辑结构进行专业分析
   - **作用**：该段落在整篇文章中的功能和作用
   - **亮点**：段落中值得学习的写作技巧或表达方式

请以JSON格式返回，结构如下：
{
  "title": "作文标题",
  "paragraphs": [
    {
      "content": "段落具体内容",
      "analysis": "专业分析",
      "purpose": "段落作用",
      "highlights": ["亮点1", "亮点2", "亮点3"]
    }
  ]
}

要求：
- 内容要生动具体，有说服力，字数充足
- 语言要符合目标受众的理解水平
- 分析要专业深入，有指导价值
- 亮点要具体明确，便于学习借鉴
- 整体风格要统一，逻辑要连贯`;

    try {
      const response = await callAI(prompt);
      const result = JSON.parse(response);
      
      // 检查是否包含标题
      if (!result.title) {
        throw new Error('生成的内容缺少标题');
      }
      
      // 生成完整文章文本（包含标题）
      const fullText = result.title + '\n\n' + result.paragraphs.map((p: ParagraphAnalysis) => p.content).join('\n\n');
      
      // 检查字数（只计算中文字符，不包括标题）
      const contentWithoutTitle = result.paragraphs.map((p: ParagraphAnalysis) => p.content).join('');
      const chineseCharCount = (contentWithoutTitle.match(/[\u4e00-\u9fa5]/g) || []).length;
      
      if (chineseCharCount < minWordCount) {
        console.log(`字数不足：${chineseCharCount}字，要求${minWordCount}字以上，重新生成...`);
        // 递归调用重新生成
        await generateParagraphs();
        return;
      }
      
      // 添加标题到第一个段落的分析中
      const paragraphsWithTitle = [
        {
          content: result.title,
          analysis: '作文标题，简洁有力，紧扣主题，具有吸引力和概括性。',
          purpose: '概括全文主旨，吸引读者注意，为全文定下基调。',
          highlights: ['标题简洁', '主题鲜明', '吸引眼球']
        },
        ...result.paragraphs
      ];
      
      setParagraphs(paragraphsWithTitle);
      setOriginalText(fullText);
      
      setCurrentStep(3);
    } catch (err) {
      setError('生成段落失败，请检查API设置或重试');
      console.error('生成段落错误:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const polishText = async () => {
    setIsGenerating(true);
    setError('');

    const audienceMap = {
      'primary': '小学生',
      'middle': '初中生',
      'high': '高中生',
      'university': '大学生'
    };

    const targetWordCount = parseInt(formData.wordCount.replace(/[^0-9]/g, '')) || 800;

    const prompt = `你是一位资深的语文教师和文学编辑，需要对一篇作文进行全面润色优化。

作文信息：
- 主题：${formData.topic}
- 目标受众：${audienceMap[formData.audience as keyof typeof audienceMap]}
- 字数要求：${formData.wordCount}（润色后正文字数应保持在${targetWordCount}字以上）

原始作文：
${originalText}

**重要说明：请直接返回润色后的完整作文内容，不要添加任何解释、说明或其他无关内容。**

润色要求：

1. **词汇优化**：使用更精准、生动、富有表现力的词汇
2. **句式美化**：调整句子结构，增加变化性，避免单调
3. **修辞增强**：适当使用比喻、拟人、排比等修辞手法
4. **逻辑优化**：加强段落间的衔接，使逻辑更加清晰
5. **情感升华**：增强文章的感染力和说服力
6. **语言规范**：确保语法正确，表达地道
7. **标题优化**：如果原标题可以改进，请优化标题使其更加吸引人
8. **字数保证**：确保润色后的正文内容字数充足

**输出格式要求：**
- 第一行：优化后的标题
- 空一行
- 后续：润色后的正文内容
- 不要包含任何其他说明、解释或标记

注意：
- 保持原文的核心观点和结构不变
- 润色后的语言要符合目标受众的理解水平
- 增强文章的文学性，但不要过度华丽
- 确保逻辑清晰，表达流畅
- 只返回作文内容，不要添加任何额外说明`;

    try {
      const response = await callAI(prompt);
      let polishedContent = response.trim();
      
      // 清理可能的无关内容（如果AI添加了说明性文字）
      const lines = polishedContent.split('\n');
      const cleanedLines = lines.filter(line => {
        const trimmedLine = line.trim();
        // 过滤掉明显的说明性文字
        return !trimmedLine.includes('润色后') && 
               !trimmedLine.includes('以下是') && 
               !trimmedLine.includes('根据要求') &&
               !trimmedLine.includes('作为') &&
               !trimmedLine.includes('我已经') &&
               trimmedLine !== '';
      });
      
      polishedContent = cleanedLines.join('\n');
      
      // 检查润色后的字数
      const chineseCharCount = (polishedContent.match(/[\u4e00-\u9fa5]/g) || []).length;
      if (chineseCharCount < targetWordCount * 0.8) {
        console.log(`润色后字数不足：${chineseCharCount}字，重新润色...`);
        await polishText();
        return;
      }
      
      setPolishedText(polishedContent);
      setCurrentStep(4);
    } catch (err) {
      setError('润色失败，请检查API设置或重试');
      console.error('润色错误:', err);
    } finally {
      setIsGenerating(false);
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

  const saveToHistory = () => {
    const historyItem = {
      id: Date.now(),
      topic: formData.topic,
      audience: formData.audience,
      wordCount: formData.wordCount,
      outline,
      paragraphs,
      originalText,
      polishedText,
      createdAt: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem('writingHistory') || '[]');
    saved.unshift(historyItem);
    localStorage.setItem('writingHistory', JSON.stringify(saved));
    alert('作文已保存到历史记录');
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
            智能写作助手
          </h1>
          <p className="text-gray-600 mt-1">从大纲到润色，一站式作文创作流程</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-orange-500 border-orange-500 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <div className="ml-3">
                <div className={`font-medium ${currentStep >= step.id ? 'text-orange-600' : 'text-gray-400'}`}>
                  {step.title}
                </div>
                <div className="text-sm text-gray-500">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Step 1: Form Input */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">填写作文要求</h2>
          
          <div className="space-y-6">
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
            </div>

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

            <button
              onClick={generateOutline}
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
      )}

      {/* Step 2: Outline Display */}
      {currentStep === 2 && outline.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">作文大纲</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => copyText(outline.map((section, index) => 
                  `${index + 1}. ${section.title}\n   ${section.description}\n   要点：${section.keyPoints.join('、')}`
                ).join('\n\n'))}
                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                title="复制大纲"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {outline.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {section.suggestedLength}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{section.description}</p>
                <div className="flex flex-wrap gap-1">
                  {section.keyPoints.map((point, pointIndex) => (
                    <span key={pointIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={generateParagraphs}
              disabled={isGenerating}
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  正在生成段落...
                </div>
              ) : (
                '下一步：生成段落内容'
              )}
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              返回修改
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Paragraph Analysis */}
      {currentStep === 3 && paragraphs.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">段落内容与分析</h2>
            
            <div className="space-y-8">
              {paragraphs.map((paragraph, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {outline[index]?.title || `第${index + 1}段`}
                  </h3>
                  
                  {/* Content */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <PenTool className="w-4 h-4 text-orange-600 mr-2" />
                      内容
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800 leading-relaxed text-justify">
                        {paragraph.content}
                      </p>
                    </div>
                  </div>

                  {/* Analysis Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Eye className="w-4 h-4 text-blue-600 mr-2" />
                        分析
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {paragraph.analysis}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        作用
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {paragraph.purpose}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 text-yellow-600 mr-2" />
                      亮点
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {paragraph.highlights.map((highlight, highlightIndex) => (
                        <span
                          key={highlightIndex}
                          className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full border border-yellow-200"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 mt-8 pt-6 border-t">
              <button
                onClick={polishText}
                disabled={isGenerating}
                className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    正在润色...
                  </div>
                ) : (
                  '下一步：全文润色'
                )}
              </button>
              <button
                onClick={() => copyText(originalText)}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="复制原文"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Polished Text */}
      {currentStep === 4 && polishedText && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">润色结果</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  {showComparison ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                  {showComparison ? '隐藏对比' : '查看对比'}
                </button>
              </div>
            </div>

            {showComparison ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">润色前</h3>
                  <div className="h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border">
                    <div className="prose max-w-none text-sm leading-relaxed text-justify">
                      {originalText}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">润色后</h3>
                  <div className="h-96 overflow-y-auto p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="prose max-w-none text-sm leading-relaxed text-justify">
                      {polishedText.split('\n').map((line, index) => {
                        // 第一行作为标题特殊处理
                        if (index === 0 && line.trim()) {
                          return (
                            <h2 key={index} className="text-xl font-bold text-center text-orange-800 mb-4 border-b-2 border-orange-300 pb-2">
                              {line.trim()}
                            </h2>
                          );
                        }
                        // 其他行作为正文
                        return line.trim() ? (
                          <p key={index} className="mb-3 last:mb-0">{line}</p>
                        ) : (
                          <br key={index} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 overflow-y-auto p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="prose max-w-none text-sm leading-relaxed text-justify">
                  {polishedText.split('\n').map((line, index) => {
                    // 第一行作为标题特殊处理
                    if (index === 0 && line.trim()) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-center text-orange-800 mb-4 border-b-2 border-orange-300 pb-2">
                          {line.trim()}
                        </h2>
                      );
                    }
                    // 其他行作为正文
                    return line.trim() ? (
                      <p key={index} className="mb-3 last:mb-0">{line}</p>
                    ) : (
                      <br key={index} />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="text-sm text-gray-500">
                润色后：{polishedText.length} 字符
                {originalText && (
                  <span className="ml-2 text-green-600">
                    ({polishedText.length > originalText.length ? '+' : ''}{polishedText.length - originalText.length})
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => copyText(polishedText)}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="复制润色后文本"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => downloadText(polishedText, `${formData.topic}-润色版.txt`)}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="下载文本"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={saveToHistory}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  保存到历史
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData({ topic: '', audience: '', wordCount: '', requirements: '' });
                    setOutline([]);
                    setParagraphs([]);
                    setOriginalText('');
                    setPolishedText('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 inline-block mr-1" />
                  重新开始
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingWorkflow;