import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Save, Star, ArrowUpRight, Flame, Plus, Trash2, Edit3, Check, Smartphone, CheckSquare, Eye, Download, Mail, Phone, MapPin, Award, FileText, CheckCircle2 } from 'lucide-react';
import { CVData } from '../types';

interface CVEditorProps {
  cvData: CVData;
  onUpdateCV: (updated: CVData) => void;
  onSaveCVAndFindJobs: () => void;
  selectedTemplateId?: string;
}

export default function CVEditor({ cvData, onUpdateCV, onSaveCVAndFindJobs, selectedTemplateId = 'modern-student' }: CVEditorProps) {
  const [showOptimizationPanel, setShowOptimizationPanel] = useState(false);
  const [showCVPreviewModal, setShowCVPreviewModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  // Local state for editing form fields
  const [fullName, setFullName] = useState(cvData.fullName);
  const [email, setEmail] = useState(cvData.email);
  const [phone, setPhone] = useState(cvData.phone);
  const [targetPosition, setTargetPosition] = useState(cvData.targetPosition);
  const [summary, setSummary] = useState(cvData.summary);
  const [skills, setSkills] = useState(cvData.skills);
  const [experience, setExperience] = useState(cvData.experience);
  const [certs, setCerts] = useState(cvData.certificates);

  const handleApplyOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate AI rewriting the CV data
    setTimeout(() => {
      setIsOptimizing(false);
      setShowOptimizationPanel(false);
      
      // Update fields to metric-rich polished representations
      const optimizedSummary = 'Sinh viên năm 3 chuyên ngành Công nghệ thông tin sở hữu nền tảng lập trình vững chắc về phát triển Web. Có khả năng tự nghiên cứu và tư duy logic nhạy bén, đã được chứng minh qua việc thiết kế giao diện React và phát triển Spring Boot cho các dự án thực tế đạt hiệu suất cao.';
      
      const optimizedSkills = [...skills];
      if (!optimizedSkills.includes('Typescript')) optimizedSkills.push('Typescript');
      if (!optimizedSkills.includes('Teamwork')) optimizedSkills.push('Teamwork');
      if (!optimizedSkills.includes('Communication')) optimizedSkills.push('Communication');

      const optimizedExperience = [
        {
          role: 'Thành viên CLB Tin học - Ban Kỹ thuật Trưởng nhóm',
          company: 'Trường ĐH Khoa học Tự nhiên',
          duration: '09/2024 - Hiện tại',
          achievements: [
            'Trực tiếp thiết kế lập trình giao diện hệ thống đăng ký sự kiện của CLB bằng React, thu hút hơn 1,200 thành viên truy cập và giảm thiểu tỷ lệ tải chậm của trang đi 30%',
            'Phối hợp nhịp nhàng làm việc nhóm hỗ trợ kỹ thuật vận hành 3 cuộc thị lập trình quy mô cấp trường'
          ]
        },
        {
          role: 'Dự án Cá nhân: Web Quản Lý Chi Tiêu hiệu năng cao',
          company: 'Dự án học tập cá nhân',
          duration: '11/2025 - 02/2026',
          achievements: [
            'Phát triển ứng dụng Web cá nhân sử dụng React & TailwindCSS giúp trực quan hóa tài chính, tối ưu hiệu năng render danh sách giao dịch lớn tăng 25% độ mượt mà',
            'Tự thiết kế cơ sở biểu đồ dạng cột sinh động báo cáo thu chi chi tiết hàng tháng'
          ]
        }
      ];

      // Update local states
      setSummary(optimizedSummary);
      setSkills(optimizedSkills);
      setExperience(optimizedExperience);

      // Save into parent state
      onUpdateCV({
        fullName,
        email,
        phone,
        targetPosition,
        summary: optimizedSummary,
        skills: optimizedSkills,
        experience: optimizedExperience,
        certificates: certs,
        score: 92,
        isOptimized: true
      });
    }, 1800);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      setNewSkill('');
      updateParentCV({ skills: updated });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    updateParentCV({ skills: updated });
  };

  const updateParentCV = (partial: Partial<CVData>) => {
    onUpdateCV({
      fullName,
      email,
      phone,
      targetPosition,
      summary,
      skills,
      experience,
      certificates: certs,
      score: cvData.score,
      isOptimized: cvData.isOptimized,
      ...partial
    });
  };

  const handleGenericSave = () => {
    updateParentCV({});
    onSaveCVAndFindJobs();
  };

  return (
    <div className="space-y-6 pb-20 relative">
      {/* CV Analytics Dashboard - Floating Ring */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-500 uppercase">ĐÁNH GIÁ CHẤT LƯỢNG CV</span>
            {cvData.isOptimized && (
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">Tối ưu bởi AI</span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-800">{cvData.score}</span>
            <span className="text-xs text-gray-400">/ 100 điểm</span>
          </div>
          <p className="text-[11px] text-gray-500">
            {cvData.isOptimized 
              ? 'CV của bạn đạt chuẩn nổi bật, sẵn sàng tiếp xúc các HR chuyên môn cao.'
              : 'Đề xuất: 3 nội dung cần cải tiến để đạt điểm 92/100 chuyên nghiệp.'}
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative w-18 h-18 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className={`${cvData.isOptimized ? 'text-emerald-500' : 'text-brand'}`}
              strokeWidth="3.2"
              strokeDasharray={`${cvData.score}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: `${cvData.score}, 100` }}
              transition={{ duration: 1 }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute font-bold text-sm text-gray-700">{cvData.score}%</div>
        </div>
      </div>

      {/* AI Suggestion Alert banner */}
      {!cvData.isOptimized && (
        <motion.div 
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex justify-between items-center gap-3"
        >
          <div className="flex gap-2.5 items-start">
            <span className="text-xl mt-0.5">✨</span>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-900">Tính năng tối ưu hóa CV bằng AI</h4>
              <p className="text-[11px] text-amber-700 leading-relaxed font-medium">Bộ lọc AI đề xuất chỉnh sửa kỹ năng và viết lại mô tả dự án định lượng thành tựu hữu ích.</p>
            </div>
          </div>
          <button
            onClick={() => setShowOptimizationPanel(true)}
            className="bg-brand text-white font-bold text-[11px] py-2 px-3 rounded-xl hover:bg-brand-dark shrink-0 shadow-sm cursor-pointer"
          >
            Xem gợi ý
          </button>
        </motion.div>
      )}

      {/* Editor Body Fields */}
      <div className="space-y-4">
        {/* Section 1: Thống tin cá nhân */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Thông tin cá nhân</h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-[11px] text-gray-500 font-medium mb-1">Họ tên của bạn</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); updateParentCV({ fullName: e.target.value }); }}
                className="w-full text-xs font-bold text-gray-800 bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-brand/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] text-gray-500 font-medium mb-1">Email liên hệ</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); updateParentCV({ email: e.target.value }); }}
                  className="w-full text-xs text-gray-800 bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-brand/40"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); updateParentCV({ phone: e.target.value }); }}
                  className="w-full text-xs text-gray-800 bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-brand/40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Vị trí & Giới thiệu */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Mục tiêu & Định hướng</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-gray-500 font-medium mb-1">Vị trí ứng tuyển mong muốn</label>
              <input
                type="text"
                value={targetPosition}
                onChange={(e) => { setTargetPosition(e.target.value); updateParentCV({ targetPosition: e.target.value }); }}
                className="w-full text-xs font-bold text-gray-800 bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-500 font-medium mb-1">Giới thiệu bản thân</label>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => { setSummary(e.target.value); updateParentCV({ summary: e.target.value }); }}
                className="w-full text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Kỹ năng & Chứng chỉ */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Kỹ năng chuyên môn</h3>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {skills.map((skill, index) => (
                <span key={index} className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-gray-400 hover:text-red-500 font-bold ml-0.5 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Thêm kỹ năng mới (ví dụ: VueJS, SQL...)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
                className="flex-1 text-xs text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 focus:outline-none"
              />
              <button
                onClick={handleAddSkill}
                className="px-3 bg-brand-light text-brand font-bold text-xs rounded-lg border border-brand/20 hover:bg-brand/10 transition flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Certificates lists (including OCR added items) */}
          {certs.length > 0 && (
            <div className="pt-3 border-t border-gray-100">
              <span className="block text-[11px] text-gray-500 font-medium mb-1.5">Chứng chỉ đã trích xuất</span>
              <div className="space-y-1.5">
                {certs.map((certItem, ind) => (
                  <div key={ind} className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-emerald-800">{certItem}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">Đã xác minh</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Kinh nghiệm & Dự án */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Kinh nghiệm & Dự án thực tế</h3>
          
          <div className="space-y-4 divide-y divide-gray-100">
            {experience.map((exp, ind) => (
              <div key={ind} className="pt-3 first:pt-0 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{exp.role}</h4>
                    <p className="text-[10px] text-gray-500">{exp.company} • {exp.duration}</p>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">Dự án #{ind + 1}</span>
                </div>
                
                <ul className="list-disc list-inside space-y-1">
                  {exp.achievements.map((ach, aInd) => (
                    <li key={aInd} className="text-xs text-gray-650 leading-relaxed list-none pl-3.5 relative">
                      <span className="absolute left-0.5 top-2 w-1.5 h-1.5 rounded-full bg-brand" />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Sticky Form CTA */}
      <div className="pt-4 flex gap-3">
        <button
          onClick={() => {
            updateParentCV({});
            setShowCVPreviewModal(true);
          }}
          className="flex-1 py-4 px-4 bg-[#10b981] text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md hover:bg-emerald-600 transition active:scale-98 cursor-pointer"
        >
          <Eye className="w-4 h-4 animate-pulse animate-duration-1000" />
          <span>Hoàn tất & Xem Mẫu CV</span>
        </button>
      </div>

      {/* AI Suggestion Slider Draw / Modal */}
      <AnimatePresence>
        {showOptimizationPanel && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-transparent">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptimizationPanel(false)}
              className="absolute inset-0 bg-black/50"
            />

            {/* Sliding Drawer Body (limited width to fit mobile-first look) */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl p-6 space-y-5 flex flex-col max-h-[85vh] overflow-y-auto"
            >
              {/* Pill Handle bar */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto" />

              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                    Đề xuất từ AI Trợ lý CV
                  </h3>
                  <p className="text-xs text-gray-500">Giúp tối ưu hóa CV của bạn vượt qua vòng kiểm tuyển chuyên môn</p>
                </div>
                <div className="bg-amber-50 py-1.5 px-2.5 rounded-xl border border-amber-100 flex flex-col items-center">
                  <span className="text-xs font-bold text-amber-800">82 → 92</span>
                  <span className="text-[8px] text-amber-600 font-mono">DỰ KIẾN</span>
                </div>
              </div>

              {/* Suggestions items cards */}
              <div className="space-y-3">
                {/* Proposal #1 */}
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Hành động 1: Thêm keyword tuyển dụng Frontend Intern
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    CV hiện tại chưa đề cập đến <span className="font-semibold text-gray-900">Typescript</span>. Robot lọc hồ sơ yêu cầu kiến thức ngôn ngữ này cho 84% tin tuyển dụng tương tự.
                  </p>
                </div>

                {/* Proposal #2 */}
                <div className="bg-yellow-50/50 border border-yellow-105 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-900">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Hành động 2: Định lượng kết quả trong kinh nghiệm
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mô tả dự án &ldquo;Web Quản Lý Chi Tiêu&rdquo; của bạn có phần chung chung. AI sẽ tối ưu viết lại bổ sung số liệu: <span className="italic text-gray-700 font-medium">&ldquo;tối ưu hóa danh sách, cải thiện hiệu suất render tăng 25%&rdquo;</span>.
                  </p>
                </div>

                {/* Proposal #3 */}
                <div className="bg-brand-light/40 border border-brand/20 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-dark">
                    <span className="w-2 h-2 rounded-full bg-brand" />
                    Hành động 3: Thêm kỹ năng Teamwork & Communication
                  </div>
                  <p className="text-xs text-brand-dark/95 leading-relaxed font-normal">
                    Vai trò hoạt động CLB của bạn nên làm bật tính cộng tác và giao tiếp. AI sẽ bổ sung 2 kỹ năng thiết yếu này.
                  </p>
                </div>
              </div>

              {/* Action Buttons inside custom popup */}
              <div className="pt-2">
                <button
                  onClick={handleApplyOptimization}
                  disabled={isOptimizing}
                  className="w-full py-4 bg-brand text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-brand-dark transition active:scale-95 disabled:opacity-80 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                  {isOptimizing ? 'AI đang viết lại nội dung...' : 'Áp dụng đề xuất & Xem kết quả'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* CV Physical Document Template Preview Modal */}
        {showCVPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCVPreviewModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />

            {/* Document Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-[415px] h-[85vh] bg-[#f0f2f5] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fadeIn"
            >
              {/* Header Actions Area */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#10b981]">XEM TRƯỚC MẪU CV GIẤY</span>
                </div>
                <button 
                  onClick={() => setShowCVPreviewModal(false)}
                  className="text-xs font-bold text-gray-400 bg-white/10 px-2.5 py-1 rounded-lg hover:text-white cursor-pointer"
                >
                  Quay lại
                </button>
              </div>

              {/* Toast notifier for downloads */}
              {downloadSuccess && (
                <div className="mx-4 mt-3 bg-emerald-500 text-white px-3 py-2 rounded-xl text-[10px] font-bold text-center animate-bounce shadow-sm relative">
                  ✓ {downloadSuccess}
                </div>
              )}

              {/* Simulated Paper A4 viewport layout */}
              <div className="flex-1 overflow-y-auto p-3.5 flex justify-center bg-slate-100">
                <div 
                  id="cv-paper-document"
                  className="w-full bg-white rounded-xl shadow-md border border-gray-100 p-4 font-sans relative flex flex-col justify-between space-y-2.5"
                  style={{ minHeight: '490px', maxHeight: '540px' }}
                >
                  {/* Top-Right watermark score with compact design */}
                  <div className="absolute top-3 right-3 text-right bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md flex flex-col items-center">
                    <span className="text-[7px] font-extrabold text-emerald-700 tracking-wider">ĐIỂM AI:</span>
                    <span className="text-[11px] font-black text-emerald-600">{cvData.score}%</span>
                  </div>

                  {/* Header info */}
                  <div className="space-y-1 border-b border-gray-100 pb-2" style={{ borderLeftWidth: '3px', borderLeftColor: selectedTemplateId === 'modern-student' ? '#3B82F6' : selectedTemplateId === 'simple-worker' ? '#10B981' : '#6366F1', paddingLeft: '6px' }}>
                    <h1 className="text-xs font-black text-slate-800 uppercase tracking-tight">{fullName || 'Nguyễn Minh Đức'}</h1>
                    <p className="text-[8px] font-extrabold italic text-brand" style={{ color: selectedTemplateId === 'modern-student' ? '#3B82F6' : selectedTemplateId === 'simple-worker' ? '#10B981' : '#6366F1' }}>
                      {targetPosition || 'Kỹ sư Phần mềm Fullstack / DevOps'}
                    </p>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[8px] text-gray-400 font-bold font-sans">
                      <span className="flex items-center gap-0.5">
                        <Mail className="w-2 h-2 text-gray-450" />
                        {email || 'duc.nguyen@gmail.com'}
                      </span>
                      <span className="flex items-center gap-0.5 font-sans">
                        <Phone className="w-2 h-2 text-gray-450" />
                        {phone || '0987 654 321'}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-2 h-2 text-gray-450" />
                        Hà Nội
                      </span>
                    </div>
                  </div>

                  {/* Tóm tắt chuyên môn */}
                  <div className="space-y-0.5">
                    <h2 className="text-[8px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-2.5 h-2.5 font-bold" style={{ color: selectedTemplateId === 'modern-student' ? '#3B82F6' : selectedTemplateId === 'simple-worker' ? '#10B981' : '#6366F1' }} />
                      Giới thiệu bản thân
                    </h2>
                    <p className="text-[8px] text-gray-500 leading-normal text-justify font-sans font-medium">
                      {summary || 'Lập trình viên chuyên nghiệp với đam mê thiết bị nhúng và phát triển hệ thống Cloud chịu tải lớn.'}
                    </p>
                  </div>

                  {/* Kỹ năng chuyên môn */}
                  <div className="space-y-1">
                    <h2 className="text-[8px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1 font-sans">
                      <Sparkles className="w-2.5 h-2.5 font-bold" style={{ color: selectedTemplateId === 'modern-student' ? '#3B82F6' : selectedTemplateId === 'simple-worker' ? '#10B981' : '#6366F1' }} />
                      Kỹ năng cốt lõi
                    </h2>
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="text-[7.5px] font-black px-1.5 py-0.5 rounded border text-stone-700 bg-stone-50"
                          style={{ borderColor: selectedTemplateId === 'modern-student' ? '#bfdbfe' : selectedTemplateId === 'simple-worker' ? '#a7f3d0' : '#c7d2fe' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Kinh nghiệm & Dự án */}
                  <div className="space-y-1">
                    <h2 className="text-[8px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-2.5 h-2.5 font-bold" style={{ color: selectedTemplateId === 'modern-student' ? '#3B82F6' : selectedTemplateId === 'simple-worker' ? '#10B981' : '#6366F1' }} />
                      Kinh nghiệm làm việc & Dự án
                    </h2>
                    <div className="space-y-1.5 pl-0.5">
                      {experience.map((exp, ind) => (
                        <div key={ind} className="space-y-0.5 border-l border-gray-100 pl-2 ml-0.5">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-[8px] font-bold text-gray-800">{exp.role}</h4>
                            <span className="text-[7px] text-gray-400 font-bold">{exp.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[7px] text-gray-400 font-extrabold uppercase tracking-wide">{exp.company}</p>
                          </div>
                          <div className="space-y-0.5 mt-0.5">
                            {exp.achievements.slice(0, 2).map((ach, aInd) => (
                              <p key={aInd} className="text-[7.5px] text-gray-500 leading-normal pl-2.5 relative">
                                <span className="absolute left-0 top-1 w-1 h-1 bg-gray-450 rounded-full" />
                                {ach}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chứng chỉ & kiểm định */}
                  {certs.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-gray-100">
                      <h2 className="text-[8px] font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                        Chứng chỉ đã xác minh bởi TopCV
                      </h2>
                      <div className="flex flex-wrap gap-1 pl-0.5">
                        {certs.map((cert, cIdx) => (
                          <div key={cIdx} className="bg-emerald-50/50 border border-emerald-100 rounded-md px-1.5 py-0.5 flex items-center gap-1 text-[7px] font-bold text-emerald-800">
                            <span>{cert}</span>
                            <span className="text-[6px] text-emerald-600 uppercase font-black">✓ Verified</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Document Footer stamp */}
                  <div className="pt-1.5 text-center border-t border-gray-150 flex items-center justify-between text-[6.5px] text-gray-400 uppercase tracking-wider select-none font-sans font-bold">
                    <span>Mẫu: {selectedTemplateId === 'modern-student' ? 'Sinh viên xanh' : selectedTemplateId === 'simple-worker' ? 'Lao động vàng' : 'Văn phòng tím'}</span>
                    <span>Hệ thống TopCV AI Engine</span>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky CTA Drawer bar */}
              <div className="bg-white p-4 border-t border-gray-100 space-y-2.5 shrink-0 select-none">
                <div className="grid grid-cols-2 gap-2.5">
                  <button 
                    onClick={() => {
                      setDownloadSuccess(`Đang kết xuất tệp PDF...`);
                      setTimeout(() => {
                        setDownloadSuccess(`Đang xuất ảnh Mẫu CV thành công!`);
                        const cleanName = fullName.replace(/\s+/g, '_');
                        setTimeout(() => {
                          setDownloadSuccess(`Đã tải mẫu 'CV_${cleanName}.pdf' về điện thoại!`);
                          setTimeout(() => setDownloadSuccess(null), 3000);
                        }, 1200);
                      }, 1000);
                    }}
                    className="py-3 border border-gray-200 rounded-xl text-gray-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-95 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tải PDF/Ảnh mẫu
                  </button>

                  <button 
                    onClick={() => {
                      setShowCVPreviewModal(false);
                      handleGenericSave();
                    }}
                    className="py-3 bg-[#10b981] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-600 shadow-md active:scale-95 transition cursor-pointer"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    Lưu & Tìm việc ngay
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
