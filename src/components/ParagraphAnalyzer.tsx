import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Eye, Target, Star, Lightbulb, Edit3, CheckCircle } from 'lucide-react';

interface ParagraphAnalyzerProps {  
  onNavigate: (page: string) => void;
}

interface ParagraphAnalysis {
  content: string;
  analysis: string;
  purpose: string;
  highlights: string[];
}

const ParagraphAnalyzer: React.FC<ParagraphAnalyzerProps> = ({ onNavigate }) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [paragraphs, setParagraphs] = useState<ParagraphAnalysis[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const mockOutline = [
    { title: '开头段', description: '引入话题，阐述主题重要性' },
    { title: '主体段落一', description: '从理论角度论证观点' },
    { title: '主体段落二', description: '结合实际案例说明' },
    { title: '主体段落三', description: '个人思考与建议' },
    { title: '结尾段', description: '总结全文，升华主题' }
  ];

  const generateParagraph = async (index: number) => {
    setIsGenerating(true);
    
    // 模拟AI生成过程
    setTimeout(() => {
      const mockParagraphs = [
        {
          content: '在科技日新月异的今天，人工智能正以前所未有的速度改变着我们的生活方式。从智能手机到自动驾驶汽车，从语音助手到智能家居，AI技术的应用已经深入到社会的各个角落。然而，在享受科技便利的同时，我们也应该思考：人工智能究竟是人类进步的助推器，还是潜在的威胁？这个问题值得我们深入探讨。',
          analysis: '该段落采用设问式开头，通过列举具体的AI应用实例，生动地展现了人工智能在现代生活中的普及程度。语言表达流畅自然，逻辑清晰，成功引起读者对主题的思考。',
          purpose: '作为开头段，主要起到引入话题、激发读者兴趣的作用，为后续论述奠定基础。',
          highlights: ['设问式开头', '具体实例列举', '对比思考', '逻辑过渡自然']
        },
        {
          content: '从理论层面来看，人工智能作为人类智慧的延伸，具有巨大的积极意义。著名科学家霍金曾说过："人工智能可能是人类历史上最好的事情，也可能是最坏的事情。"这句话道出了AI的双面性。在积极方面，AI能够处理海量数据，进行复杂计算，解决人类难以独立完成的问题，如医学诊断、气候预测、交通优化等，极大地提升了人类认知和解决问题的能力。',
          analysis: '段落运用权威引用增强说服力，通过霍金的名言引出AI的双面性特点。然后重点阐述积极方面，列举了医学、气候、交通等具体应用领域，论证充分有力。',
          purpose: '从理论高度论证人工智能的积极作用，为整体论述提供理论支撑。',
          highlights: ['权威引用', '理论论证', '具体应用举例', '逻辑层次清晰']
        },
        {
          content: '在现实应用中，我们可以看到无数成功案例证明了AI的价值。以医疗领域为例，IBM的Watson系统能够在几秒钟内分析患者的病历、基因信息和最新医学文献，为医生提供个性化的治疗建议，准确率达到90%以上。在教育方面，自适应学习系统根据学生的学习进度和能力水平，提供个性化的学习内容，让每个学生都能获得最适合的教育资源。这些实例充分说明，合理运用AI技术能够显著提升人类生活质量。',
          analysis: '段落通过具体的成功案例来论证观点，数据详实，说服力强。医疗和教育两个案例选取恰当，贴近读者生活，增强了文章的可信度和感染力。',
          purpose: '通过具体案例验证理论观点，增强论述的说服力和可信度。',
          highlights: ['具体数据支撑', '贴近生活案例', '对比效果明显', '论证方式多样']
        },
        {
          content: '然而，我们也不能忽视AI发展可能带来的挑战。就业市场的冲击、隐私安全的担忧、技术依赖的风险等问题确实存在。但我认为，关键在于如何正确引导和规范AI的发展。政府应该制定相应的法律法规，企业需要承担社会责任，个人也要提升数字素养。只有多方协作，才能让AI真正成为造福人类的工具，而非威胁。',
          analysis: '段落体现了辩证思维，既承认了AI的潜在问题，又提出了解决方案。从政府、企业、个人三个层面提出建议，思考全面，体现了作者的理性态度。',
          purpose: '平衡论述，提出解决方案，体现作者的理性思考和建设性态度。',
          highlights: ['辩证思维', '多层面分析', '建设性建议', '理性客观']
        },
        {
          content: '总而言之，人工智能既不是万能的救世主，也不是可怕的终结者，它本质上是人类智慧的产物和延伸。面对AI时代的到来，我们既要拥抱变化，积极利用技术优势，也要保持理性，谨慎应对挑战。让我们携手共建一个人机和谐共存的美好未来，让人工智能真正成为推动人类文明进步的强大引擎。',
          analysis: '结尾段总结有力，语言富有感染力。通过对比修辞强调了AI的本质，最后以号召性语言结尾，升华了主题，给读者留下深刻印象。',
          purpose: '总结全文观点，升华主题，以号召性语言结尾，增强文章的感染力。',
          highlights: ['对比修辞', '观点总结', '主题升华', '号召性结尾']
        }
      ];
      
      const newParagraphs = [...paragraphs];
      newParagraphs[index] = mockParagraphs[index];
      setParagraphs(newParagraphs);
      setIsGenerating(false);
    }, 1500);
  };

  const handleEdit = () => {
    if (paragraphs[currentParagraph]) {
      setEditingContent(paragraphs[currentParagraph].content);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingContent.trim()) {
      // 模拟重新分析
      setIsGenerating(true);
      setTimeout(() => {
        const newParagraphs = [...paragraphs];
        newParagraphs[currentParagraph] = {
          ...newParagraphs[currentParagraph],
          content: editingContent,
          analysis: '基于修改后的内容重新生成的分析...'
        };
        setParagraphs(newParagraphs);
        setIsEditing(false);
        setIsGenerating(false);
      }, 1000);
    }
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
            <BookOpen className="w-8 h-8 text-orange-600 mr-3" />
            段落生成与分析
          </h1>
          <p className="text-gray-600 mt-1">基于大纲逐段生成内容，提供四维度深度分析</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Outline Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">作文大纲</h2>
          <div className="space-y-2">
            {mockOutline.map((section, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentParagraph === index
                    ? 'bg-orange-50 border-2 border-orange-200'
                    : 'bg-gray-50 hover:bg-orange-50 border-2 border-transparent'
                }`}
                onClick={() => setCurrentParagraph(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      paragraphs[index] 
                        ? 'bg-green-100 text-green-700' 
                        : currentParagraph === index
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {paragraphs[index] ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900 text-sm">{section.title}</div>
                      <div className="text-xs text-gray-600">{section.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => !paragraphs[currentParagraph] && generateParagraph(currentParagraph)}
            disabled={isGenerating || !!paragraphs[currentParagraph]}
            className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? '正在生成...' : paragraphs[currentParagraph] ? '已生成' : '生成段落'}
          </button>
        </div>

        {/* Paragraph Content & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {mockOutline[currentParagraph]?.title} - 内容
              </h3>
              {paragraphs[currentParagraph] && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="编辑内容"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

            {!paragraphs[currentParagraph] ? (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">请点击左侧"生成段落"按钮</p>
              </div>
            ) : isEditing ? (
              <div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    保存并重新分析
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="text-gray-800 leading-relaxed text-justify">
                  {paragraphs[currentParagraph]?.content}
                </p>
              </div>
            )}
          </div>

          {/* Analysis Section */}
          {paragraphs[currentParagraph] && !isEditing && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Eye className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">分析</h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {paragraphs[currentParagraph]?.analysis}
                </p>
              </div>

              {/* Purpose */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">作用</h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {paragraphs[currentParagraph]?.purpose}
                </p>
              </div>

              {/* Highlights */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">亮点</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {paragraphs[currentParagraph]?.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full border border-yellow-200"
                    >
                      <Lightbulb className="w-3 h-3 inline-block mr-1" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          {paragraphs.length > 0 && paragraphs.every(p => p !== undefined) && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  已完成所有段落生成和分析
                </div>
                <button
                  onClick={() => onNavigate('polish')}
                  className="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  下一步：全文润色
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParagraphAnalyzer;