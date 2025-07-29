import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Copy, Download, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface TextPolisherProps {
  onNavigate: (page: string) => void;
}

const TextPolisher: React.FC<TextPolisherProps> = ({ onNavigate }) => {
  const [originalText, setOriginalText] = useState('');
  const [polishedText, setPolishedText] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [changes, setChanges] = useState<any[]>([]);

  const mockOriginalText = `在科技日新月异的今天，人工智能正以前所未有的速度改变着我们的生活方式。从智能手机到自动驾驶汽车，从语音助手到智能家居，AI技术的应用已经深入到社会的各个角落。然而，在享受科技便利的同时，我们也应该思考：人工智能究竟是人类进步的助推器，还是潜在的威胁？

从理论层面来看，人工智能作为人类智慧的延伸，具有巨大的积极意义。著名科学家霍金曾说过："人工智能可能是人类历史上最好的事情，也可能是最坏的事情。"这句话道出了AI的双面性。在积极方面，AI能够处理海量数据，进行复杂计算，解决人类难以独立完成的问题。

在现实应用中，我们可以看到无数成功案例证明了AI的价值。以医疗领域为例，IBM的Watson系统能够在几秒钟内分析患者的病历，为医生提供治疗建议。在教育方面，自适应学习系统根据学生的学习进度，提供个性化的学习内容。

然而，我们也不能忽视AI发展可能带来的挑战。就业市场的冲击、隐私安全的担忧等问题确实存在。但我认为，关键在于如何正确引导和规范AI的发展。

总而言之，人工智能既不是万能的救世主，也不是可怕的终结者。面对AI时代的到来，我们既要拥抱变化，也要保持理性。让我们携手共建一个人机和谐共存的美好未来。`;

  const handleLoadSample = () => {
    setOriginalText(mockOriginalText);
  };

  const handlePolish = async () => {
    if (!originalText.trim()) {
      alert('请先输入需要润色的文本');
      return;
    }

    setIsPolishing(true);
    
    // 模拟AI润色过程
    setTimeout(() => {
      const polished = `在科技风起云涌的新时代，人工智能正以势不可挡的磅礴力量，重塑着人类文明的每一个细节。从掌中的智能终端到纵横驰骋的无人驾驶车辆，从贴心的语音管家到运筹帷幄的智慧家居系统，AI的触角已然延伸至社会肌理的深处。然而，当我们沉醉于科技带来的无限便利时，一个深刻的哲学命题也随之浮现：人工智能，究竟是推动人类走向辉煌未来的强劲引擎，还是潜伏在暗处的达摩克利斯之剑？

从理论的高度审视，人工智能作为人类智慧结晶的升华与延展，其积极意义可谓深远而广阔。正如那位洞察宇宙奥秘的伟大科学家史蒂芬·霍金所言："人工智能可能成为人类历史上最伟大的成就，但也可能是最后的成就。"这句话如醍醐灌顶，一语道破了AI所具有的双刃剑属性。从光明的一面来看，AI能够在瞬息之间处理人类穷其一生也难以企及的海量信息，进行精密复杂的运算推理，破解那些曾让人类望而却步的难题，如疾病的精准诊断、气候变化的预测建模、城市交通的智能调度等。

在现实世界的舞台上，一个个生动鲜活的成功案例正为AI的价值做着最有力的证明。且看医疗这片充满希望的沃土：IBM精心打造的Watson智能诊疗系统，能够在电光火石之间深度解析患者的完整病历、基因图谱以及全球最前沿的医学研究成果，为医生量身定制个性化的治疗方案，其诊断准确率竟高达90%以上，堪称医学奇迹。再观教育这座知识的殿堂：自适应学习平台如同一位无比耐心的私人导师，时刻洞察着每位学生的学习节奏与认知特点，精心调配最适宜的学习资源，让因材施教不再是遥不可及的理想。

诚然，我们也不能对AI发展路径上的荆棘视而不见。劳动力市场的深刻变革、个人隐私安全的严峻考验、技术依赖症的潜在风险——这些问题如影随形，不容回避。但我深信，解决之道在于如何以智慧之光照亮AI发展的前路。政府需要运用立法之笔绘制规范的蓝图，企业应当肩负起社会责任的神圣使命，而每一位公民也必须在数字素养的修炼中不断精进。唯有政府、企业、社会多方携手，形成治理合力，才能让AI真正成为造福人类的普罗米修斯之火，而非毁灭文明的潘多拉魔盒。

综而观之，人工智能既非无所不能的救世主神明，亦非令人闻风丧胆的终结者恶魔，它本质上是人类智慧与创造力的忠实映射和无限延伸。面对AI时代汹涌而来的滚滚洪流，我们既要以开放的胸怀热烈拥抱变革的春风，也要以理性的目光冷静审视挑战的险滩。让我们携起手来，共同描绘一幅人机和谐共生的壮美画卷，让人工智能成为推动人类文明向更高境界跃升的磅礴动力！`;

      setPolishedText(polished);
      
      // 模拟变更记录
      const mockChanges = [
        { type: '词汇替换', original: '日新月异', polished: '风起云涌', reason: '更具文学色彩' },
        { type: '句式优化', original: '以前所未有的速度', polished: '以势不可挡的磅礴力量', reason: '增强表达力度' },
        { type: '修辞增强', original: '深入到社会的各个角落', polished: '延伸至社会肌理的深处', reason: '使用更精准的比喻' },
        { type: '逻辑连接', original: '然而，在享受科技便利的同时', polished: '然而，当我们沉醉于科技带来的无限便利时', reason: '加强情感色彩' },
        { type: '引言优化', original: '著名科学家霍金', polished: '洞察宇宙奥秘的伟大科学家史蒂芬·霍金', reason: '增加人物描述的深度' }
      ];
      
      setChanges(mockChanges);
      setIsPolishing(false);
    }, 3000);
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
            <Sparkles className="w-8 h-8 text-orange-600 mr-3" />
            全文润色优化
          </h1>
          <p className="text-gray-600 mt-1">AI智能润色，提升文章质量和表达效果</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">原始文本</h2>
            <button
              onClick={handleLoadSample}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              加载示例文本
            </button>
          </div>
          
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="请粘贴或输入需要润色的作文内容..."
            className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm leading-relaxed"
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              {originalText ? `${originalText.length} 字符` : '请输入文本'}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => copyText(originalText)}
                disabled={!originalText}
                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                title="复制原文"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handlePolish}
                disabled={isPolishing || !originalText.trim()}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPolishing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    润色中...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    开始润色
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">润色结果</h2>
            {polishedText && (
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                {showComparison ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showComparison ? '隐藏对比' : '查看对比'}
              </button>
            )}
          </div>
          
          {!polishedText ? (
            <div className="h-96 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p>润色结果将在这里显示</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                <div className="prose max-w-none text-sm leading-relaxed text-justify">
                  {polishedText}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  润色后：{polishedText.length} 字符
                  <span className="ml-2 text-green-600">
                    (+{polishedText.length - originalText.length})
                  </span>
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
                    onClick={() => downloadText(polishedText, '润色后作文.txt')}
                    className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="下载文本"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setOriginalText(polishedText);
                      setPolishedText('');
                      setChanges([]);
                    }}
                    className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="再次润色"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Changes Analysis */}
      {showComparison && changes.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">润色修改详情</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {changes.map((change, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    {change.type}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">原文：</span>
                    <span className="text-red-600 line-through">{change.original}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">修改：</span>
                    <span className="text-green-600 font-medium">{change.polished}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {change.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">润色功能说明</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-orange-700 mb-2">词汇优化</h4>
            <p>替换平淡词汇，使用更具表现力的词语，提升文章的文学性和感染力。</p>
          </div>
          <div>
            <h4 className="font-medium text-orange-700 mb-2">句式美化</h4>
            <p>调整句子结构，增加变化性，避免单一句式，让表达更加丰富多样。</p>
          </div>
          <div>
            <h4 className="font-medium text-orange-700 mb-2">逻辑增强</h4>
            <p>优化段落间的连接，加强逻辑关系，使文章结构更加清晰流畅。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPolisher;