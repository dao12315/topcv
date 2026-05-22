import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Briefcase, MapPin, DollarSign, Sparkles, Check, X, ShieldAlert, CheckCircle, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { Job } from '../types';

interface JobMatchingProps {
  jobs: Job[];
  onApplyJob: (jobId: string) => void;
  cvScore: number;
  initialCategory?: 'all' | 'technical' | 'labor' | 'office';
  onCategoryChange?: (category: 'all' | 'technical' | 'labor' | 'office') => void;
}

export default function JobMatching({ jobs, onApplyJob, cvScore, initialCategory = 'all', onCategoryChange }: JobMatchingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'intern' | 'fulltime' | 'parttime'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'labor' | 'office'>(initialCategory);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [successApplyJob, setSuccessApplyJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sync with prop changes from home quick action
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Reset page when search or filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedCategory]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesType = true;
    if (selectedType === 'intern') matchesType = job.type.toLowerCase().includes('thực tập');
    else if (selectedType === 'fulltime') matchesType = job.type.toLowerCase().includes('toàn thời gian') || job.type.toLowerCase().includes('fulltime');
    else if (selectedType === 'parttime') matchesType = job.type.toLowerCase().includes('bán thời gian') || job.type.toLowerCase().includes('parttime');

    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory = job.category === selectedCategory;
    }

    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleApplyClick = (job: Job) => {
    setApplyingJobId(job.id);
    
    // Simulate HR transmission delay
    setTimeout(() => {
      setApplyingJobId(null);
      setSuccessApplyJob(job);
      onApplyJob(job.id);
    }, 1200);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 80) return 'text-brand bg-brand-light/50 border-brand/20';
    return 'text-amber-600 bg-amber-50 border-amber-100';
  };

  const currentActiveMatches = filteredJobs.length;

  return (
    <div className="space-y-5 pb-6">
      {/* Page header and score notice */}
      <div className="space-y-1.5">
        <h2 className="text-lg font-bold text-gray-800">Khớp việc làm AI tự động</h2>
        <p className="text-xs text-gray-500">Dựa trên CV đạt {cvScore} điểm của bạn, hệ thống lọc và tính toán tỷ lệ tương thích</p>
      </div>

      {/* Filter and search form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4.5 shadow-sm space-y-3.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm công ty, vị trí (Frontend, Java...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-xl border border-gray-100 focus:outline-none focus:border-brand/40"
          />
        </div>

        {/* Filter pills - Type selection */}
        <div className="space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-0.5">Hình thức</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none font-sans">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedType === 'all' ? 'bg-brand text-white shadow-xs' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedType('intern')}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedType === 'intern' ? 'bg-brand text-white shadow-xs' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Thực tập
            </button>
            <button
              onClick={() => setSelectedType('fulltime')}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedType === 'fulltime' ? 'bg-brand text-white shadow-xs' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Cố định (Full-time)
            </button>
            <button
              onClick={() => setSelectedType('parttime')}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedType === 'parttime' ? 'bg-brand text-white shadow-xs' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              Bán thời gian
            </button>
          </div>
        </div>

        {/* Filter pills - Category Selection */}
        <div className="space-y-1 pt-1 border-t border-gray-100">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-0.5">Nhóm đối tượng</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none font-sans">
            <button
              onClick={() => {
                setSelectedCategory('all');
                onCategoryChange?.('all');
              }}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'all' ? 'bg-brand text-white shadow-xs' : 'bg-gray-100/70 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tất cả nhóm
            </button>
            <button
              onClick={() => {
                setSelectedCategory('technical');
                onCategoryChange?.('technical');
              }}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'technical' ? 'bg-blue-600 text-white shadow-xs' : 'bg-blue-50/70 text-blue-800 hover:bg-blue-100/80'
              }`}
            >
              ⚙️ Kỹ thuật & CNTT
            </button>
            <button
              onClick={() => {
                setSelectedCategory('labor');
                onCategoryChange?.('labor');
              }}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'labor' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80'
              }`}
            >
              📦 Lao động phổ thông
            </button>
            <button
              onClick={() => {
                setSelectedCategory('office');
                onCategoryChange?.('office');
              }}
              className={`px-2.5 py-1.2 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'office' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-indigo-50/70 text-indigo-800 hover:bg-indigo-100/80'
              }`}
            >
              💼 Nhân viên văn phòng
            </button>
          </div>
        </div>
      </div>

      {/* Matching summary metrics text */}
      <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider px-1">
        TÌM THẤY {currentActiveMatches} VIỆC LÀM PHÙ HỢP
      </span>

      {/* Jobs List container with dynamic card designs */}
      <div className="space-y-4">
        {paginatedJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white border rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden transition-all duration-300 ${
              job.applied ? 'border-gray-200 opacity-90' : 'border-gray-100'
            }`}
          >
            {/* Corner Match Tag badge overlay */}
            <div className={`absolute top-0 right-0 py-1.5 px-4 rounded-bl-2xl text-[11px] font-extrabold border-l border-b flex items-center gap-1 ${getMatchScoreColor(job.matchScore)}`}>
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Match {job.matchScore}%</span>
            </div>

            {/* Job core detail */}
            <div className="space-y-1.5 pr-20 font-sans">
              <h3 className="font-bold text-sm text-gray-800 tracking-tight leading-snug">{job.title}</h3>
              <p className="text-xs font-extrabold text-brand">{job.company}</p>
            </div>

            {/* Meta tags parameters */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 pt-1">
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold truncate">{job.salary}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-medium">Lớp việc: {job.type}</span>
              </div>
            </div>

            {/* AI Skills Audit (Matched vs Missing) */}
            <div className="bg-gray-50 rounded-2xl p-3 space-y-2.5 text-[11px]">
              {/* Matched skills */}
              {job.matchedSkills.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                    <Check className="w-3 h-3" /> Trùng khớp ({job.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {job.matchedSkills.map((sk, index) => (
                      <span key={index} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing skills */}
              {job.missingSkills.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3" /> Kỹ năng thiếu ({job.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1 font-sans">
                    {job.missingSkills.map((sk, index) => (
                      <span key={index} className="px-2 py-0.5 bg-amber-50/60 text-amber-800 rounded font-semibold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              {job.applied ? (
                <div className="w-full py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs text-center border border-emerald-100 flex items-center justify-center gap-1.5 font-sans">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Đã nộp hồ sơ bằng CVConnect AI</span>
                </div>
              ) : (
                <button
                  onClick={() => handleApplyClick(job)}
                  disabled={applyingJobId !== null}
                  className="w-full py-3 bg-brand text-white rounded-xl font-bold text-xs hover:bg-brand-dark transition flex items-center justify-center gap-1.5 active:scale-98 shadow-sm cursor-pointer font-sans"
                >
                  {applyingJobId === job.id ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang nộp hồ sơ...</span>
                    </div>
                  ) : (
                    <>
                      <span>Ứng tuyển ngay với CV</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center space-y-2">
            <span className="text-3xl">🔍</span>
            <h4 className="text-sm font-bold text-gray-700">Không tìm thấy việc làm phù hợp</h4>
            <p className="text-xs text-gray-400">Hãy thử gõ từ khóa khác hoặc bổ sung kỹ năng vào CV của bạn</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 px-1 select-none font-sans">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl border flex items-center justify-center transition active:scale-95 ${
                currentPage === 1
                  ? 'border-gray-100 text-gray-300 bg-gray-50/50 cursor-not-allowed'
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isSelected = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-brand text-white shadow-xs'
                        : 'text-gray-500 hover:bg-gray-100 bg-white border border-gray-100 shadow-2xs'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl border flex items-center justify-center transition active:scale-95 ${
                currentPage === totalPages
                  ? 'border-gray-100 text-gray-300 bg-gray-50/50 cursor-not-allowed'
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Success Apply Toast/Modal overlay */}
      <AnimatePresence>
        {successApplyJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessApplyJob(null)}
              className="absolute inset-0 bg-black/50"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-[360px] rounded-3xl p-6 text-center space-y-4 shadow-2xl z-10 border border-gray-100"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-center shadow-inner">
                <CheckCircle className="w-8 h-8 font-bold" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-gray-800">Nộp hồ sơ thành công!</h4>
                <p className="text-xs text-gray-500">
                  Hồ sơ của bạn đã được chuyển tới phòng nhân sự <span className="font-bold text-gray-800">{successApplyJob.company}</span> ngay lập tức trên Zalo.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3 text-left space-y-1 border border-gray-100/60">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">THÔNG TIN KHỚP NỘP</p>
                <p className="text-xs font-bold text-gray-800">{successApplyJob.title}</p>
                <p className="text-[11px] text-gray-500">{successApplyJob.company}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSuccessApplyJob(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 font-semibold text-xs rounded-xl flex-1 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
                >
                  Để sau
                </button>
                <button
                  onClick={() => {
                    setSuccessApplyJob(null);
                    // Force navigation to tracking tab
                    document.getElementById('nav-tab-tracking')?.click();
                  }}
                  className="px-4 py-2 bg-brand text-white font-bold text-xs rounded-xl flex-1 hover:bg-brand-dark shadow-sm active:scale-95 transition cursor-pointer"
                >
                  Theo dõi ngay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
