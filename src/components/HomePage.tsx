import React from 'react';
import { PenTool, ArrowRight, Star, Users, Clock, Sparkles, BookOpen, Palette } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      title: '智能大纲生成',
      description: '根据主题和要求，AI智能生成结构清晰的作文大纲',
      icon: PenTool,
      color: 'from-orange-400 to-red-400',
    },
    {
      title: '段落深度分析',
      description: '逐段生成内容，提供内容、分析、作用、亮点四维度解读',
      icon: BookOpen,
      color: 'from-amber-400 to-orange-400',
    },
    {
      title: '全文润色优化',
      description: '整体润色文章，提升质量和表达效果，对比展示修改',
      icon: Palette,
      color: 'from-yellow-400 to-amber-400',
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6 animate-bounce">
          <Star className="w-4 h-4 mr-2" />
          AI驱动的教师作文辅助工具
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            珠字
          </span>
          <br />
          <span className="text-3xl sm:text-4xl text-gray-700">让作文教学更高效</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          借助AI智能技术，为语文教师提供从大纲生成到段落分析再到全文润色的一站式解决方案，
          让您专注于教学方法设计，提升教学效率。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2 text-orange-500" />
            <span>适用于中小学及高等教育教师</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 text-orange-500" />
            <span>平均节省 50% 备课时间</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('writing')}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Sparkles className="w-5 h-5 inline-block mr-2" />
          开始创作
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="p-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          三步轻松开始
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold text-lg">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">输入要求</h3>
            <p className="text-gray-600 text-sm">填写作文主题、受众、字数等基本信息</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold text-lg">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI智能生成</h3>
            <p className="text-gray-600 text-sm">系统自动生成大纲、段落内容和深度分析</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold text-lg">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">润色完善</h3>
            <p className="text-gray-600 text-sm">一键润色优化，获得高质量的示范作文</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">开始您的智能教学之旅</h2>
          <p className="text-orange-100 mb-6">让AI成为您的教学助手，提升作文教学质量</p>
          <button
            onClick={() => onNavigate('writing')}
            className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200 transform hover:scale-105"
          >
            立即开始使用
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;