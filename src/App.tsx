import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  FileText as FileIcon, 
  Briefcase as JobIcon, 
  Clock as TrackIcon, 
  Sparkles, 
  ChevronLeft, 
  MoreHorizontal, 
  Wifi, 
  Battery, 
  Navigation,
  CheckCircle,
  GraduationCap,
  Zap,
  Phone as PhoneIcon,
  MessageSquare as MessageSquareIcon,
  Globe as GlobeIcon,
  Image as ImageIcon,
  Camera as CameraIcon
} from 'lucide-react';

// Data types & Mocks
import { CVData, Job, Application, CVTemplate } from './types';
import { defaultCVData, mockJobs, mockInitialApplications } from './mockData';

// Subcomponents
import HomeScreen from './components/HomeScreen';
import TemplateSelection from './components/TemplateSelection';
import VoiceToCV from './components/VoiceToCV';
import ScanCertificate from './components/ScanCertificate';
import CVEditor from './components/CVEditor';
import JobMatching from './components/JobMatching';
import ApplicationTracking from './components/ApplicationTracking';

export default function App() {
  // Navigation & Wizard states
  const [activeTab, setActiveTab] = useState<'home' | 'cv' | 'jobs' | 'tracking'>('home');
  const [cvStep, setCvStep] = useState<'templates' | 'voice' | 'scan' | 'editor'>('templates');
  
  // Storage state
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('modern-student');
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockInitialApplications);

  // Simulated live clock state in notification bar
  const [currentTime, setCurrentTime] = useState('09:41');
  
  // Category selection & Smartphone OS launcher states
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'labor' | 'office'>('all');
  const [isAppOpened, setIsAppOpened] = useState<boolean>(false);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleApplyVoiceToCV = (parsedSkills: string[], summary: string, extraCVData?: Partial<CVData>) => {
    // Append newly parsed skills from voice processing
    const currentSkills = extraCVData?.skills ? [...extraCVData.skills] : [...cvData.skills];
    if (parsedSkills.length > 0 && !extraCVData?.skills) {
      parsedSkills.forEach(s => {
        if (!currentSkills.includes(s)) {
          currentSkills.push(s);
        }
      });
    }

    setCvData(prevResult => ({
      ...prevResult,
      summary: summary,
      skills: currentSkills,
      score: 82, // voice transcription updates base completeness
      ...extraCVData
    }));

    // Transition to Certificate scan step
    setCvStep('scan');
  };

  const handleAddCertificates = (selectedCertificates: string[]) => {
    setCvData(prevResult => ({
      ...prevResult,
      certificates: selectedCertificates,
      score: 85 // adding verified certifications bumps score automatically
    }));

    // Transition to CV Editor step
    setCvStep('editor');
  };

  const handleUpdateCV = (updated: CVData) => {
    setCvData(updated);
  };

  const handleSaveCVAndFindJobs = () => {
    // Navigate directly to jobs page
    setActiveTab('jobs');
  };

  const handleApplyJob = (jobId: string) => {
    // Update jobs list state
    setJobs(prevJobs => prevJobs.map(job => {
      if (job.id === jobId) {
        return { ...job, applied: true };
      }
      return job;
    }));

    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    // Create a new realistic Application entry
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newApplication: Application = {
      id: `app-dyn-${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      company: targetJob.company,
      salary: targetJob.salary,
      status: 'applied',
      appliedDate: formattedDate,
      hrZalo: targetJob.hrZalo || 'https://zalo.me/0332817798',
      hrName: targetJob.hrName || 'Anh Đạo',
      timeline: [
        {
          status: 'applied',
          label: 'Đã nộp hồ sơ bằng CVConnect AI',
          description: 'Hồ sơ đã được gửi thành công qua hệ thống Zalo Mini App tới bộ phận nhân sự.',
          time: `${formattedDate} ${formattedTime}`,
          completed: true
        },
        {
          status: 'viewed',
          label: 'Nhà tuyển dụng trích lọc CV',
          description: 'Hệ thống tự động đồng bộ hóa chỉ số tương thích chất lượng hồ sơ của bạn.',
          time: 'Đang xếp hàng độc quyền',
          completed: false
        }
      ]
    };

    setApplications(prev => [newApplication, ...prev]);
  };

  const activeJobMatchesCount = jobs.filter(j => !j.applied).length;
  const activeApplicationsCount = applications.length;

  const handleBackNavigation = () => {
    if (activeTab === 'cv') {
      if (cvStep === 'editor') setCvStep('scan');
      else if (cvStep === 'scan') setCvStep('voice');
      else if (cvStep === 'voice') setCvStep('templates');
      else {
        setActiveTab('home');
      }
    } else {
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row items-center justify-center font-sans p-0 md:p-8 select-none relative gap-8">
      {/* Decorative Brand Companion Panel side-by-side with smartphone mockup (Visible on MD and larger) */}
      <div className="hidden lg:flex flex-col max-w-[380px] space-y-6 text-gray-800 self-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center text-white shadow-md shadow-brand/25">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-brand tracking-tight">CVConnect AI</h1>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Trợ lý tìm việc AI</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium italic">
            &ldquo;Tạo CV bằng AI, tìm việc phù hợp ngay trên Zalo&rdquo;
          </p>
        </div>

        {/* Dashboard Live Status Overview */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">ĐANG ĐỒNG BỘ TRỰC TUYẾN</span>
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase">Live AI</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Trạng thái CV</span>
              <span className={`font-bold ${cvData.score >= 85 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {cvData.score}% Hoàn thiện
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Việc làm phù hợp</span>
              <span className="font-bold text-brand">{activeJobMatchesCount} vị trí tuyển dụng</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Hồ sơ đã nộp</span>
              <span className="font-bold text-brand-dark">{activeApplicationsCount} đơn tuyển</span>
            </div>
          </div>
        </div>

        {/* Informative Guide Card */}
        <div className="bg-brand-light border border-brand/20 p-5 rounded-3xl space-y-2">
          <h4 className="text-xs font-extrabold text-brand uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-brand/10 text-brand" />
            AI Voice & OCR Mini App
          </h4>
          <p className="text-xs text-brand-dark/100 leading-relaxed font-medium">
            Sử dụng công nghệ giọng nói thông minh và quét tài liệu tự động ngay trên khung mô phỏng bên cạnh để tạo CV tức thì.
          </p>
        </div>

        {/* Operating System Interactive Reset Card */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-3 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-base">📲</span>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mô phỏng Điện thoại</p>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
            Thoát ứng dụng CVConnect bất kỳ lúc nào để quay trở về màn hình điện thoại chính (launcher) và trải nghiệm ấn vào icon mở app.
          </p>
          <button
            onClick={() => {
              setIsAppOpened(false);
              setIsLaunching(false);
            }}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold text-xs rounded-xl transition text-center cursor-pointer flex items-center justify-center gap-1.5"
          >
            Đóng app về màn hình chính
          </button>
        </div>
      </div>

      {/* Mock smartphone device frame */}
      <div className="w-full max-w-[430px] min-h-screen md:min-h-[820px] md:h-[820px] bg-[#f7f8fa] flex flex-col md:rounded-[40px] md:shadow-[0_24px_50px_rgba(0,104,255,0.08),_0_8px_20px_rgba(0,0,0,0.05)] md:border-[8px] md:border-gray-800 relative overflow-hidden border-gray-100 shrink-0 select-none">
        
        {/* Subtle circular front-facing camera punch-hole (chấm tròn camera) */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-50 shadow-inner flex items-center justify-center pointer-events-none ring-1 ring-white/10">
          <div className="w-0.5 h-0.5 bg-indigo-900/65 rounded-full" />
        </div>

        {/* Smartphone simulated Operating System status bar */}
        <div className={`h-10 px-6 flex items-center justify-between text-[11px] font-bold select-none z-40 shrink-0 md:pt-4 transition-all duration-300 ${isAppOpened ? 'bg-white/90 backdrop-blur-md text-gray-800' : 'bg-transparent text-white'}`}>
          <span className="font-sans font-extrabold">{currentTime}</span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] rounded px-1.2 py-0.2 font-sans tracking-widest leading-none font-bold ${isAppOpened ? 'bg-brand text-white' : 'bg-white/20 text-white'}`}>LTE</span>
            <Wifi className="w-3.5 h-3.5 tracking-tighter" />
            <Battery className="w-4 h-4 fill-current rotate-0" />
          </div>
        </div>

        {!isAppOpened ? (
          /* Phone desktop launcher */
          <div className="flex-1 relative bg-gradient-to-tr from-slate-950 via-indigo-950 to-emerald-950 flex flex-col p-6 overflow-hidden">
            {/* Ambient Wallpapers & Background blobs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand/15 rounded-full blur-3xl pointer-events-none" />
            
            {isLaunching ? (
              /* Splash screen during boot transition */
              <div className="absolute inset-0 bg-[#10b981] flex flex-col items-center justify-center text-white z-50 animate-fadeIn">
                <div className="p-4 bg-white/10 rounded-[32px] mb-4 backdrop-blur-md shadow-lg">
                  <Sparkles className="w-12 h-12 text-white fill-white animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">TopCV AI</h1>
                <p className="text-white/70 text-xs mt-1.5 font-medium uppercase tracking-wider">Hệ thống CV & Khớp Việc Thông Minh</p>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-[9px] text-white/50 font-bold tracking-widest uppercase mt-1">Khởi tạo Mini Applet...</span>
                </div>
              </div>
            ) : (
              /* Normal Home Launcher State */
              <div className="flex-1 flex flex-col justify-between z-10 pt-4 pb-8">
                {/* Large OS Clock & Date */}
                <div className="text-center space-y-1 text-white select-none">
                  <h2 className="text-4xl font-extrabold tracking-tight drop-shadow-md">{currentTime}</h2>
                  <p className="text-[11px] font-bold text-gray-300 tracking-wide uppercase drop-shadow-sm font-sans">
                    {(() => {
                      const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
                      const now = new Date();
                      return `${daysOfWeek[now.getDay()]}, Ngày ${now.getDate()} Tháng ${now.getMonth() + 1}`;
                    })()}
                  </p>
                </div>

                {/* Grid of App Icons */}
                <div className="grid grid-cols-4 gap-4 gap-y-6 px-1 my-auto">
                  {/* Icon 1: Phone */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center text-white shadow-md active:scale-95 transition">
                      <PhoneIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white">Điện thoại</span>
                  </div>

                  {/* Icon 2: Messages */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-sky-400 rounded-2xl flex items-center justify-center text-white shadow-md active:scale-95 transition">
                      <MessageSquareIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white">Tin nhắn</span>
                  </div>

                  {/* Icon 3: Browser */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-2xl flex items-center justify-center text-white shadow-md active:scale-95 transition">
                      <GlobeIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white">Safari</span>
                  </div>

                  {/* Icon 4: TOPCV AI SPECIAL TARGET ICON */}
                  <button
                    onClick={() => {
                      setIsLaunching(true);
                      setTimeout(() => {
                        setIsLaunching(false);
                        setIsAppOpened(true);
                      }, 1200);
                    }}
                    className="flex flex-col items-center gap-1.5 focus:outline-none focus:ring-0 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#10b981] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/40 ring-4 ring-white/10 active:scale-95 transition relative hover:scale-105 duration-200">
                      <Sparkles className="w-5 h-5 fill-white text-white animate-pulse" />
                      {/* Premium AI Glow Tag */}
                      <span className="absolute -top-1.5 -right-1 bg-yellow-400 text-slate-900 font-black text-[7px] px-1 rounded-full border border-white scale-90">
                        AI
                      </span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-bold tracking-tight drop-shadow-sm group-hover:text-white transition">TopCV AI</span>
                  </button>

                  {/* Row 2 Apps */}
                  {/* Icon 5: Zalo */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-[#0068FF] rounded-2xl flex items-center justify-center text-white font-black text-[11px] shadow-sm active:scale-95 transition">
                      Zalo
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white">Zalo</span>
                  </div>

                  {/* Icon 6: Photos */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-md active:scale-95 transition">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white">Ảnh</span>
                  </div>

                  {/* Icon 7: Camera */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-gray-700 to-gray-500 rounded-2xl flex items-center justify-center text-white shadow-md active:scale-95 transition">
                      <CameraIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white font-sans">Máy ảnh</span>
                  </div>

                  {/* Icon 8: Weather */}
                  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-amber-200 rounded-2xl flex items-center justify-center text-white text-base shadow-md active:scale-95 transition">
                      ⛅
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold tracking-tight drop-shadow-sm group-hover:text-white">Thời tiết</span>
                  </div>
                </div>

                {/* Instructions banner */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center space-y-1 select-none">
                  <p className="text-[11px] font-bold text-yellow-300 flex items-center justify-center gap-1 font-sans">
                    <span>💡</span> Hướng dẫn mô phỏng điện thoại
                  </p>
                  <p className="text-[10px] text-gray-200 leading-normal font-sans">
                    Chọn icon <span className="font-bold text-emerald-400">TopCV AI</span> màu xanh lá để trải nghiệm mở Zalo Mini App. Bạn có thể thoát ra lại màn hình này bằng nút ở cột bên trái bất kỳ lúc nào!
                  </p>
                </div>
              </div>
            )}

            {/* Bottom swipe launcher gesture bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
          </div>
        ) : (
          /* Real interactive applet content inside frame */
          <>
            {/* Custom Zalo Mini App Top Header Navigation */}
            <header className="h-14 bg-white border-b border-gray-100 px-4 flex items-center justify-between select-none shrink-0 z-40 relative">
          <div className="flex items-center gap-2">
            {(activeTab !== 'home' || (activeTab === 'cv' && cvStep !== 'templates')) ? (
              <button
                onClick={handleBackNavigation}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-90 transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 stroke-[2.5]" />
              </button>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-tr from-brand to-brand-dark rounded-xl flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 fill-white text-white animate-pulse" />
              </div>
            )}
            
            <div>
              <h2 className="text-sm font-extrabold font-display text-gray-800 tracking-tight">
                {activeTab === 'home' && 'CVConnect AI'}
                {activeTab === 'cv' && 'Quản lý CV'}
                {activeTab === 'jobs' && 'Gợi ý Việc làm'}
                {activeTab === 'tracking' && 'Theo dõi ứng tuyển'}
              </h2>
              <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                {activeTab === 'home' && 'Trợ lý tìm việc AI'}
                {activeTab === 'cv' && `Đạt ${cvData.score} Điểm`}
                {activeTab === 'jobs' && 'AI matching'}
                {activeTab === 'tracking' && `${activeApplicationsCount} đơn hồ sơ`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-4 right-14" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-4 right-14" />
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center active:scale-90 transition cursor-pointer">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </header>

        {/* CV Stepper Progress bar (rendered only when user is inside the CV wizard) */}
        {activeTab === 'cv' && (
          <div className="bg-white px-6 py-3 border-b border-gray-100 shadow-xs shrink-0 select-none">
            <div className="flex justify-between items-center relative">
              {/* background tracking line aligned exactly to the center of the 24px (h-6) bubbles (12px top offset) */}
              <div className="absolute inset-x-6 h-[2px] bg-gray-100 top-3 -translate-y-1/2 z-0" />
              <div 
                className="absolute inset-x-6 h-[2px] bg-brand top-3 -translate-y-1/2 z-0 transition-all duration-300 origin-left"
                style={{
                  transform: `translateY(-50%) scaleX(${
                    cvStep === 'templates' ? 0 :
                    cvStep === 'voice' ? 0.3333 :
                    cvStep === 'scan' ? 0.6666 : 1
                  })`
                }}
              />

              {/* Step indicator bubbles */}
              {[
                { id: 'templates', label: '1. Mẫu' },
                { id: 'voice', label: '2. Nói' },
                { id: 'scan', label: '3. Quét' },
                { id: 'editor', label: '4. Sửa' }
              ].map((step, index) => {
                const isCompleted = 
                  (cvStep === 'voice' && index < 1) ||
                  (cvStep === 'scan' && index < 2) ||
                  (cvStep === 'editor' && index < 3);
                const isActive = cvStep === step.id;

                return (
                  <button
                    key={step.id}
                    disabled={!isCompleted && !isActive}
                    onClick={() => setCvStep(step.id as any)}
                    className="relative z-10 flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-brand text-white ring-4 ring-brand/15 scale-110' 
                        : isCompleted 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </span>
                    <span className={`text-[10px] font-bold tracking-tight transition ${
                      isActive ? 'text-brand' : 'text-gray-450'
                    }`}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Scrollable Viewport Stage */}
        <main className="flex-1 overflow-y-auto px-4 py-3.5 scrollbar-none pb-4 bg-[#F4F6F9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${cvStep}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && (
                <HomeScreen
                  cvData={cvData}
                  onNavigateToTab={setActiveTab}
                  onStartCVWizard={(step) => {
                    setActiveTab('cv');
                    setCvStep(step);
                  }}
                  matchCount={activeJobMatchesCount}
                  onSelectCategory={(category) => {
                    setSelectedCategory(category);
                    setActiveTab('jobs');
                  }}
                />
              )}

              {activeTab === 'cv' && (
                <>
                  {cvStep === 'templates' && (
                    <TemplateSelection
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={handleSelectTemplate}
                      onNextStep={() => setCvStep('voice')}
                    />
                  )}
                  {cvStep === 'voice' && (
                    <VoiceToCV
                      onApplyAndNext={handleApplyVoiceToCV}
                    />
                  )}
                  {cvStep === 'scan' && (
                    <ScanCertificate
                      onAddCertificates={handleAddCertificates}
                      currentPosition={cvData.targetPosition}
                    />
                  )}
                  {cvStep === 'editor' && (
                    <CVEditor
                      cvData={cvData}
                      onUpdateCV={handleUpdateCV}
                      onSaveCVAndFindJobs={handleSaveCVAndFindJobs}
                      selectedTemplateId={selectedTemplate || undefined}
                    />
                  )}
                </>
              )}

              {activeTab === 'jobs' && (
                <JobMatching
                  jobs={jobs}
                  onApplyJob={handleApplyJob}
                  cvScore={cvData.score}
                  initialCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              )}

              {activeTab === 'tracking' && (
                <ApplicationTracking
                  applications={applications}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Smartphone simulated Bottom navigation bar (Zalo Inspired) */}
        <nav className="h-18 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-40 select-none pb-2.5 shrink-0 relative">
          {/* Tab 1 */}
          <button
            id="nav-tab-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group`}
          >
            <HomeIcon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${activeTab === 'home' ? 'text-brand stroke-[2.5]' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-semibold mt-1 transition ${activeTab === 'home' ? 'text-brand font-bold' : 'text-gray-500'}`}>
              Trang chủ
            </span>
            {activeTab === 'home' && (
              <motion.div layoutId="nav-dot" className="absolute bottom-1 w-1 h-1 bg-brand rounded-full" />
            )}
          </button>

          {/* Tab 2 */}
          <button
            id="nav-tab-cv"
            onClick={() => setActiveTab('cv')}
            className={`flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group`}
          >
            <FileIcon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${activeTab === 'cv' ? 'text-brand stroke-[2.5]' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-semibold mt-1 transition ${activeTab === 'cv' ? 'text-brand font-bold' : 'text-gray-500'}`}>
              CV của tôi
            </span>
            {activeTab === 'cv' && (
              <motion.div layoutId="nav-dot" className="absolute bottom-1 w-1 h-1 bg-brand rounded-full" />
            )}
          </button>

          {/* Tab 3 */}
          <button
            id="nav-tab-jobs"
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group`}
          >
            <div className="relative">
              <JobIcon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${activeTab === 'jobs' ? 'text-brand stroke-[2.5]' : 'text-gray-400'}`} />
              {activeJobMatchesCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand text-white font-sans font-bold text-[8px] rounded-full h-4 min-w-4 flex items-center justify-center px-1 border border-white">
                  {activeJobMatchesCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold mt-1 transition ${activeTab === 'jobs' ? 'text-brand font-bold' : 'text-gray-500'}`}>
              Việc làm
            </span>
            {activeTab === 'jobs' && (
              <motion.div layoutId="nav-dot" className="absolute bottom-1 w-1 h-1 bg-brand rounded-full" />
            )}
          </button>

          {/* Tab 4 */}
          <button
            id="nav-tab-tracking"
            onClick={() => setActiveTab('tracking')}
            className={`flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer group`}
          >
            <div className="relative">
              <TrackIcon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${activeTab === 'tracking' ? 'text-brand stroke-[2.5]' : 'text-gray-400'}`} />
              {activeApplicationsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-purple-500 text-white font-sans font-bold text-[8px] rounded-full h-4 min-w-4 flex items-center justify-center px-1 border border-white">
                  {activeApplicationsCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold mt-1 transition ${activeTab === 'tracking' ? 'text-brand font-bold' : 'text-gray-500'}`}>
              Theo dõi
            </span>
            {activeTab === 'tracking' && (
              <motion.div layoutId="nav-dot" className="absolute bottom-1 w-1 h-1 bg-brand rounded-full" />
            )}
          </button>
        </nav>
        </>
        )}

        {/* Bottom Safety Home Bar indicator mockup */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-50 pointer-events-none hidden md:block" />

      </div>
    </div>
  );
}
