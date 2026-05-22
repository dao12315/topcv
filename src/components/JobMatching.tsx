import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Briefcase, MapPin, DollarSign, Sparkles, Check, X, ShieldAlert, CheckCircle, ChevronRight } from 'lucide-react';
import { Job } from '../types';

interface JobMatchingProps {
  jobs: Job[];
  onApplyJob: (jobId: string) => void;
  cvScore: number;
}

export default function JobMatching({ jobs, onApplyJob, cvScore }: JobMatchingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'intern' | 'fulltime' | 'parttime'>('all');
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [successApplyJob, setSuccessApplyJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedType === 'all') return matchesSearch;
    if (selectedType === 'intern') return matchesSearch && job.type.toLowerCase().includes('thực tập');
    if (selectedType === 'fulltime') return matchesSearch && job.type.toLowerCase().includes('toàn thời gian');
    if (selectedType === 'parttime') return matchesSearch && job.type.toLowerCase().includes('bán thời gian');
    return matchesSearch;
  });

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

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none font-sans">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedType === 'all' ? 'bg-brand text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Tất cả ({jobs.length})
          </button>
          <button
            onClick={() => setSelectedType('intern')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedType === 'intern' ? 'bg-brand text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Thực tập
          </button>
          <button
            onClick={() => setSelectedType('fulltime')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedType === 'fulltime' ? 'bg-brand text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Full-time
          </button>
          <button
            onClick={() => setSelectedType('parttime')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedType === 'parttime' ? 'bg-brand text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Part-time
          </button>
        </div>
      </div>

      {/* Matching summary metrics text */}
      <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider px-1">
        TÌM THẤY {currentActiveMatches} VIỆC LÀM PHÙ HỢP
      </span>

      {/* Jobs List container with dynamic card designs */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
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
