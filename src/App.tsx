import React, { useState } from 'react';
import { PenTool, Settings, History, Home } from 'lucide-react';
import HomePage from './components/HomePage';
import WritingWorkflow from './components/WritingWorkflow';
import SettingsPage from './components/SettingsPage';
import HistoryPage from './components/HistoryPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'writing':
        return <WritingWorkflow onNavigate={setCurrentPage} />;
      case 'settings':
        return <SettingsPage onNavigate={setCurrentPage} />;
      case 'history':
        return <HistoryPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-orange-600 cursor-pointer hover:text-orange-700 transition-colors"
                   onClick={() => setCurrentPage('home')}>
                珠字
              </div>
              <div className="hidden sm:block text-sm text-gray-600">教师作文辅助工具</div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'home' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Home className="w-4 h-4 inline-block mr-1" />
                首页
              </button>
              <button
                onClick={() => setCurrentPage('writing')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'writing' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <PenTool className="w-4 h-4 inline-block mr-1" />
                写作助手
              </button>
              <button
                onClick={() => setCurrentPage('history')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'history' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <History className="w-4 h-4 inline-block mr-1" />
                历史
              </button>
              <button
                onClick={() => setCurrentPage('settings')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'settings' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Settings className="w-4 h-4 inline-block mr-1" />
                设置
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;