import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, Briefcase, ChevronRight, TrendingUp, Award, Zap, Users, ChevronDown, ChevronUp, Wrench, Building } from 'lucide-react';
import { CVData } from '../types';

interface HomeScreenProps {
  cvData: CVData;
  onNavigateToTab: (tab: 'home' | 'cv' | 'jobs' | 'tracking') => void;
  onStartCVWizard: (step: 'templates' | 'voice' | 'scan' | 'editor') => void;
  matchCount: number;
  onSelectCategory?: (category: 'all' | 'technical' | 'labor' | 'office') => void;
}

export default function HomeScreen({ cvData, onNavigateToTab, onStartCVWizard, matchCount, onSelectCategory }: HomeScreenProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand via-brand/95 to-brand-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        {/* Abstract background blobs for decorative styling */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-brand-light/20 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Trợ lý tìm việc AI</span>
          </div>
          
          <div>
            <h1 id="app-welcome-title" className="text-2xl font-bold tracking-tight">CVConnect AI</h1>
            <p className="text-white/90 text-sm mt-1 leading-relaxed">
              &ldquo;Tạo CV bằng AI, tìm việc phù hợp ngay trên Zalo&rdquo;
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              id="btn-home-create-cv"
              onClick={() => onStartCVWizard('templates')}
              className="px-5 py-3 bg-white text-brand font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-brand-light transition active:scale-95 shadow-md flex-1 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Tạo CV mới bằng AI
            </button>
            <button
              id="btn-home-find-jobs"
              onClick={() => onNavigateToTab('jobs')}
              className="px-5 py-3 bg-brand-dark/40 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-brand-dark/60 border border-white/20 transition active:scale-95 flex-1 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              Tìm việc ngay
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats - Metric Grid */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Số liệu tài khoản của bạn</h2>
        <div className="grid grid-cols-3 gap-3">
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer"
            onClick={() => {
              onNavigateToTab('cv');
              onStartCVWizard('templates');
            }}
          >
            <div className="w-10 h-10 bg-brand-light text-brand rounded-full flex items-center justify-center mb-2.5">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500">Mẫu CV sẵn có</span>
            <span className="text-lg font-bold text-gray-800 mt-0.5">3 mẫu</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer"
            onClick={() => onNavigateToTab('jobs')}
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-2.5">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500">Việc tìm thấy</span>
            <span className="text-lg font-bold text-gray-800 mt-0.5">{matchCount} tin</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer"
            onClick={() => {
              onNavigateToTab('cv');
              onStartCVWizard('editor');
            }}
          >
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-2.5">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500">Điểm hồ sơ</span>
            <span className="text-lg font-bold text-gray-800 mt-0.5">{cvData.score}%</span>
          </motion.div>
        </div>
      </div>

      {/* Target Audiences Dropdown Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Lọc nhanh việc làm</p>
              <h3 className="text-xs font-bold text-gray-700">Nhóm Đối Tượng Tìm Việc</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-brand bg-brand-light px-2 py-0.5 rounded-md">
              {isDropdownOpen ? 'Thu gọn' : 'Bấm chọn'}
            </span>
            {isDropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 stroke-[2.5]" />
            )}
          </div>
        </button>

        {isDropdownOpen && (
          <div className="border-t border-gray-100 p-3 bg-gray-50/30 space-y-2 animate-fadeIn">
            {/* Option 1: Kỹ thuật / CNTT */}
            <div
              onClick={() => onSelectCategory?.('technical')}
              className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-brand hover:shadow-xs transition cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 group-hover:text-brand transition">Kỹ thuật & Công nghệ</h4>
                  <p className="text-[10px] text-gray-500">Lập trình, Mạng IT, DevOps, Hệ thống nhúng...</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand group-hover:translate-x-0.5 transition" />
            </div>

            {/* Option 2: Lao động phổ thông */}
            <div
              onClick={() => onSelectCategory?.('labor')}
              className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-brand hover:shadow-xs transition cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 group-hover:text-brand transition">Lao động Phổ thông</h4>
                  <p className="text-[10px] text-gray-500">Giao hàng, Phục vụ nhà hàng, Đóng gói, Kho vận...</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand group-hover:translate-x-0.5 transition" />
            </div>

            {/* Option 3: Văn phòng */}
            <div
              onClick={() => onSelectCategory?.('office')}
              className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-brand hover:shadow-xs transition cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 group-hover:text-brand transition">Nhân viên Văn phòng</h4>
                  <p className="text-[10px] text-gray-500">Hành chính, Kế toán tổng hợp, Nhập liệu, Thiết kế...</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand group-hover:translate-x-0.5 transition" />
            </div>
          </div>
        )}
      </div>

      {/* AI Features Checklist / Feature Tour */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 px-2 bg-amber-100 rounded text-amber-700 text-[10px] font-bold uppercase tracking-wider">AI Powered</div>
            <h3 className="font-bold text-gray-800 text-sm">Trợ lý AI đồng hành cùng bạn</h3>
          </div>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        </div>

        <div className="space-y-3.5">
          <div 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
            onClick={() => { onNavigateToTab('cv'); onStartCVWizard('voice'); }}
          >
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                AI Voice to CV 
                <span className="text-[9px] bg-red-100 text-red-600 px-1 py-0.2 rounded font-mono">HOT</span>
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Chỉ cần nói về bản thân, AI sẽ tự viết thành các phần mục CV chuẩn chỉnh.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
          </div>

          <div 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
            onClick={() => { onNavigateToTab('cv'); onStartCVWizard('scan'); }}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-semibold text-gray-800">Scan Certificate & OCR</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Chụp hình chứng nhận học tập, IELTS, Google. AI quét thông tin và add vào CV.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
          </div>

          <div 
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
            onClick={() => { onNavigateToTab('cv'); onStartCVWizard('editor'); }}
          >
            <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-semibold text-gray-800">AI CV Optimization</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Phân tích CV, chỉ ra điểm thiếu sót và tự động nâng cao chất lượng từ 82 lên 92 điểm.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
          </div>
        </div>
      </div>

      {/* Short Quick Tip Panel */}
      <div className="bg-brand-light border border-brand/20 rounded-2xl p-4 flex gap-3">
        <span className="text-xl">💡</span>
        <div className="text-xs space-y-1">
          <p className="font-extrabold text-brand">Tip ứng tuyển thành công</p>
          <p className="text-brand-dark/90 leading-relaxed font-medium">
            Hồ sơ có chứng chỉ được AI phát hiện tăng tỷ lệ mời phỏng vấn lên gấp <span className="font-extrabold text-brand">2.5 lần</span>. Hãy thử tính năng Quét chứng chỉ ngay!
          </p>
        </div>
      </div>
    </div>
  );
}
