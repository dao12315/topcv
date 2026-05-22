import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Speech, Sparkles, Wand2, ChevronRight, CheckCircle2, RotateCcw, AlertCircle, Bookmark, Check } from 'lucide-react';
import { CVData } from '../types';

interface VoiceToCVProps {
  onApplyAndNext: (parsedSkills: string[], summary: string, extraCVData?: Partial<CVData>) => void;
}

export default function VoiceToCV({ onApplyAndNext }: VoiceToCVProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<'maintenance' | 'it'>('maintenance');
  const [transcript, setTranscript] = useState('Tôi làm bảo trì máy móc 3 năm ở KCN VSIP');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Suggested audio templates
  const scenarios = [
    {
      id: 'maintenance' as const,
      title: 'Kỹ thuật Bảo trì viên',
      desc: 'Mẫu việc làm kỹ thuật & lao động',
      phrase: 'Tôi làm bảo trì máy móc 3 năm ở KCN VSIP',
      icon: '🛠️'
    },
    {
      id: 'it' as const,
      title: 'Lập trình viên CNTT',
      desc: 'Mẫu công nghệ thông tin',
      phrase: 'Tôi là kỹ sư hệ thống với 3 năm kinh nghiệm, có chuyên môn sâu về lập trình Java Spring Boot, React, quản trị Docker và phát triển ứng dụng di động Flutter.',
      icon: '💻'
    }
  ];

  // Sync default phrase when user changes selected scenario
  const handleScenarioChange = (type: 'maintenance' | 'it') => {
    setSelectedScenario(type);
    const target = scenarios.find(s => s.id === type);
    if (target) {
      setTranscript(target.phrase);
    }
    setShowResult(false);
  };

  // Simulate typing effect for the voice transcription
  const startVoiceRecording = () => {
    setIsRecording(true);
    setShowResult(false);
    setTranscript('');
    
    const targetPhrase = scenarios.find(s => s.id === selectedScenario)?.phrase || '';
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < targetPhrase.length) {
        setTranscript(targetPhrase.substring(0, currentIndex + 2));
        currentIndex += 2;
      } else {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 40);
  };

  const handleGenerateCV = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 1500); 
  };

  const handleApply = () => {
    if (selectedScenario === 'maintenance') {
      // Overrides the CV state dynamically to represent Maintenance
      const skills = ['Bảo trì', 'Máy dập', 'An toàn lao động', 'Khắc phục sự cố', 'Hệ thống điện', 'KCN VSIP'];
      const summary = 'Kỹ thuật viên bảo trì máy móc cơ khí giàu kinh nghiệm với hơn 3 năm làm việc thực chiến tại Khu công nghiệp VSIP. Chuyên nghiệp trong công tác vận hành, bảo dưỡng định kỳ các dòng máy dập tự động công suất lớn và xử lý kịp thời các sự cố kỹ thuật hạ tầng cơ điện nhà xưởng.';
      
      const extraData: Partial<CVData> = {
        fullName: 'Nguyễn Văn Đạo',
        targetPosition: 'Nhân viên Bảo trì Máy móc',
        summary: summary,
        skills: skills,
        experience: [
          {
            role: 'Nhân viên Kỹ thuật Bảo trì Thiết bị',
            company: 'Công ty TNHH Sản xuất Linh kiện VSIP',
            duration: '03/2023 - Hiện tại',
            achievements: [
              'Chịu trách nhiệm bảo trì định kỳ, căn chỉnh dòng máy dập thủy lực công nghiệp dập phôi tự động',
              'Định vị nhanh các lỗi rơ-le, quá tải dòng điện cơ khí, cắt giảm 15% tỷ lệ dừng chuyền sản xuất',
              'Tuân thủ 100% quy trình an toàn lao động và bảo hộ tại khu chế xuất nhà máy'
            ]
          },
          {
            role: 'Phụ tá bảo dưỡng dây chuyền lắp ráp',
            company: 'Xưởng cơ khí Gia công Chi tiết Máy',
            duration: '01/2022 - 02/2023',
            achievements: [
              'Hỗ trợ thợ cả kiểm tra mức dầu mỡ hệ thống xi-lanh và thay thế lưỡi dập mòn định kỳ',
              'Thực hiện ghi chép lịch trình nhật ký vận hành máy móc kỹ lưỡng hàng ngày'
            ]
          }
        ]
      };
      onApplyAndNext(skills, summary, extraData);
    } else {
      // Overrides the CV state to represent IT (as initially pre-configured)
      const skills = ['React', 'Spring Boot', 'Docker', 'AWS', 'Flutter', 'Git', 'CI/CD'];
      const summary = 'Kỹ sư Hệ thống & Lập trình viên Fullstack với 3 năm kinh nghiệm thực tế. Chuyên thiết kế kiến trúc backend bằng Spring Boot, thiết lập cấu trúc DevOps qua Docker/AWS và lập trình tối ưu hóa giao diện ứng dụng đa nền tảng React & Flutter.';
      
      const extraData: Partial<CVData> = {
        fullName: 'Nguyễn Minh Đức',
        targetPosition: 'Frontend Developer & Java Engineer',
        summary: summary,
        skills: skills,
        experience: [
          {
            role: 'Lập trình viên Full-Stack',
            company: 'TechNova Solution Co.',
            duration: '2023 - Hiện tại',
            achievements: [
              'Tái cấu trúc API RESTful Spring Boot tăng hiệu suất truy vấn cơ sở dữ liệu lên 25%',
              'Dẫn dắt phát triển ứng dụng di động lai đa nền tảng Flutter đáp ứng hơn 10.000 người dùng hàng ngày',
              'Đóng gói hạ tầng bằng container Docker và triển khai luồng phân phối tự động trên hệ sinh thái AWS'
            ]
          }
        ]
      };
      onApplyAndNext(skills, summary, extraData);
    }
  };

  // Helper lists for keywords displayed based on template scenario
  const extractedKeywords = selectedScenario === 'maintenance' 
    ? [
        { label: 'Bảo trì', desc: 'Bảo trì máy móc cơ học', type: 'core' },
        { label: 'Máy dập', desc: 'Kiểm tra căn chỉnh lỗi máy dập', type: 'tool' },
        { label: '3 năm', desc: 'Thời gian thâm niên thực chiến', type: 'exp' },
        { label: 'KCN VSIP', desc: 'Môi trường nhà xưởng lớn', type: 'loc' }
      ]
    : [
        { label: 'Kỹ sư hệ thống', desc: 'Vai trò chuyên môn kỹ thuật', type: 'core' },
        { label: 'Spring Boot', desc: 'Ngôn ngữ & framework thế mạnh', type: 'tool' },
        { label: 'Docker & AWS', desc: 'Năng lực vận hành container', type: 'tool' },
        { label: 'React / Flutter', desc: 'Lập trình giao diện đa năng', type: 'tool' }
      ];

  return (
    <div className="space-y-5 pb-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-base font-bold text-gray-800">Tạo CV bằng giọng nói AI</h2>
        <p className="text-[11px] text-gray-500 leading-relaxed px-4">
          Bấm nút nói hoặc chọn kịch bản mẫu bên dưới để xem AI tự động phân tách từ khóa kỹ năng của bạn
        </p>
      </div>

      {/* Select Pre-set Audio Scenario Card */}
      <div className="bg-white border border-gray-155 rounded-2xl p-3 shadow-xs space-y-2">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block px-1">
          💡 Chọn kịch bản nói thử hoặc nhập tự do:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {scenarios.map((scen) => {
            const isSelected = selectedScenario === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => handleScenarioChange(scen.id)}
                className={`p-2.5 rounded-xl border text-left transition duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-brand bg-brand-light/30 ring-1 ring-brand'
                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{scen.icon}</span>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-800 truncate">{scen.title}</h4>
                    <p className="text-[9px] text-gray-400 truncate">{scen.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recording Area */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col items-center justify-center space-y-3.5 relative">
        <div className="relative">
          {isRecording && (
            <>
              <motion.div
                animate={{ scale: [1, 1.7, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="absolute inset-0 bg-brand/20 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
                className="absolute inset-0 bg-brand/35 rounded-full"
              />
            </>
          )}

          <button
            onClick={startVoiceRecording}
            disabled={isRecording || isGenerating}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md relative z-10 transition cursor-pointer active:scale-95 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-brand text-white hover:bg-brand-dark'
            }`}
          >
            {isRecording ? (
              <span className="w-4 h-4 bg-white rounded-xs" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="text-center space-y-0.5">
          <span className="text-xs font-bold text-gray-700">
            {isRecording ? 'Đang lắng nghe... Hãy nói ngay' : 'Bấm mic để mô phỏng phát biểu'}
          </span>
          <p className="text-[10px] text-gray-400">
            {isRecording ? 'Giới thiệu bản thân, kỹ năng và dự án...' : '(Tự động gõ chữ mô phỏng tiếng Việt chuẩn)'}
          </p>
        </div>

        {/* Visualizer audio waves */}
        {isRecording && (
          <div className="flex items-center gap-1 h-5 pt-1">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [6, i % 2 === 0 ? 18 : 12, 6] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="w-0.5 bg-brand rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Transcription Editor - "sửa lại voice" */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2.5">
        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
          <span className="flex items-center gap-1 text-gray-600">
            <Speech className="w-3.5 h-3.5 text-brand" />
            Nội dung nhận diện giọng nói (Có thể tự sửa):
          </span>
          {isRecording && <span className="text-red-500 flex items-center gap-1 animate-pulse">● ĐANG GHI</span>}
        </div>

        {/* User can edit the transcript freely! */}
        <textarea
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            setShowResult(false);
          }}
          placeholder="Hãy kể về năng lực của bạn hoặc sửa nội dung tại đây..."
          disabled={isRecording || isGenerating}
          rows={3}
          className="w-full text-xs font-medium text-gray-700 p-3 bg-white rounded-xl border border-gray-200 outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/10 transition leading-relaxed resize-none shadow-inner"
        />

        {!isRecording && !showResult && (
          <button
            onClick={handleGenerateCV}
            disabled={isGenerating || !transcript.trim()}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:from-amber-600 hover:to-orange-600 active:scale-97 transition duration-150 cursor-pointer text-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
            <span>AI bóc tách từ khóa & tạo CV</span>
          </button>
        )}
      </div>

      {/* AI Analyzing status */}
      {isGenerating && (
        <div className="bg-brand-light/35 border border-brand/15 rounded-2xl p-5 text-center space-y-3.5">
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="text-brand"
            >
              <Wand2 className="w-7 h-7" />
            </motion.div>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-brand-dark">AI đang tách lọc phân tích nội dung</h4>
            <div className="w-28 h-1 bg-brand-light rounded-full mx-auto overflow-hidden">
              <motion.div 
                animate={{ x: [-60, 60] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="w-16 h-full bg-brand rounded-full"
              />
            </div>
            <p className="text-[10px] text-brand/80 font-bold">Tìm kiếm từ khóa: (Bảo trì, Máy dập, 3 năm)...</p>
          </div>
        </div>
      )}

      {/* Structured CV Result displaying bóc tách từ khóa */}
      <AnimatePresence>
        {showResult && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* AI Keywords Extraction Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 animate-bounce" />
                <span>KẾT QUẢ BÓC TÁCH TỪ KHÓA BẰNG AI:</span>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-0.5">
                {extractedKeywords.map((tag, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col bg-white border border-amber-200/80 rounded-xl px-3 py-1.5 shadow-2xs select-none hover:border-amber-400 transition"
                  >
                    <span className="text-[13px] font-extrabold text-brand flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {tag.label}
                    </span>
                    <span className="text-[9px] text-gray-500 mt-0.5">{tag.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-amber-800 leading-relaxed italic bg-amber-100/40 p-2 rounded-lg font-medium">
                * AI đã tự động chuẩn hóa kiến thức chuyên ngành liên quan đến <strong>{selectedScenario === 'maintenance' ? 'Bảo trì cơ khí & VSIP' : 'Kỹ sư Phần mềm'}</strong> dựa trên từ khóa cốt lõi của bạn.
              </p>
            </div>

            {/* Structure CV Output */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 block">
                Nội dung đề xuất đưa vào CV:
              </span>

              {/* Box 1: Position & Summary */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-3xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-extrabold text-brand tracking-wider">
                    Vị trí ứng tuyển & Tóm tắt
                  </span>
                  <span className="bg-brand-light text-brand px-1.5 py-0.5 rounded text-[8px] font-bold">Chuẩn hóa AI</span>
                </div>
                <h4 className="text-xs font-bold text-gray-800">
                  {selectedScenario === 'maintenance' ? 'Nhân viên Bảo trì Máy móc' : 'Frontend Developer Intern'}
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed font-normal">
                  {selectedScenario === 'maintenance' 
                    ? 'Kỹ thuật viên bảo trì máy móc cơ khí giàu kinh nghiệm với hơn 3 năm làm việc thực chiến tại Khu công nghiệp VSIP. Chuyên sâu vận hành, bảo dưỡng, căn chỉnh các loại máy dập tự động, hệ thống cơ khí và tối ưu dây chuyền sản xuất luôn an toàn, liền mạch.'
                    : 'Kỹ sư Hệ thống sục sôi đam mê lập trình với 3 năm lập trình backend Spring Boot và thiết kế UI mượt mà bằng React, Flutter.'
                  }
                </p>
              </div>

              {/* Box 2: Skills Identified */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-3xs space-y-2">
                <span className="text-[9px] uppercase font-extrabold text-brand tracking-wider block">
                  Kỹ năng được chọn lọc thêm vào bộ hồ sơ
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedScenario === 'maintenance' 
                    ? ['Bảo trì', 'Máy dập', 'An toàn lao động', 'Khắc phục sự cố', 'Hệ thống điện', 'VSIP'] 
                    : ['React', 'Spring Boot', 'Docker', 'AWS', 'Flutter', 'Git', 'CI/CD']
                  ).map((skill, index) => (
                    <span 
                      key={index} 
                      className="text-[10px] font-bold bg-brand-light/40 text-brand-dark px-2.5 py-1 rounded-lg border border-brand/10 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-brand" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 3: Experience Details */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-3xs space-y-1.5">
                <span className="text-[9px] uppercase font-extrabold text-brand tracking-wider block">
                  Trải nghiệm / Lịch sử kinh nghiệm
                </span>
                <div className="space-y-1">
                  <h5 className="text-[11px] font-bold text-gray-800">
                    {selectedScenario === 'maintenance' ? 'Nhân viên Kỹ thuật Bảo trì - Linh kiện VSIP' : 'Lập trình viên chuyên trách - TechNova Co.'}
                  </h5>
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    {selectedScenario === 'maintenance'
                      ? '• Trực tiếp căn sửa các bộ máy dập linh kiện kim loại; khắc phục sự cố rò dầu xi-lanh và thay thế khuôn dập chính xác.\n• Tiết giảm thời gian dừng chuyền không đáng có tại xưởng sản xuất KCN VSIP xuống mức thấp kỷ lục.'
                      : '• Thiết lập cấu trúc microservices; nâng cấp giao diện, sửa lỗi và phát hành ứng dụng trên kho ứng dụng Google Play / AppStore.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Controls */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={startVoiceRecording}
                className="px-4 py-3 border border-gray-200 bg-white rounded-xl text-gray-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-95 transition cursor-pointer font-sans"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                Nói lại
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 bg-brand text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-brand-dark shadow-xs active:scale-95 transition cursor-pointer font-sans"
              >
                <span>Đồng ý & Nạp vào CV</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
