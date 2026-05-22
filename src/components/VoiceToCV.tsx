import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Speech, Sparkles, Wand2, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface VoiceToCVProps {
  onApplyAndNext: (parsedSkills: string[], summary: string) => void;
}

export default function VoiceToCV({ onApplyAndNext }: VoiceToCVProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Full target text to type out
  const fullTranscript = 'Tôi là sinh viên năm 3 ngành Công nghệ thông tin, có kinh nghiệm React, Spring Boot và đã làm 2 dự án web.';

  // Simulate typing effect for the voice transcription
  useEffect(() => {
    if (!isRecording) return;
    
    setTranscript('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullTranscript.length) {
        setTranscript(fullTranscript.substring(0, currentIndex + 1));
        currentIndex += 2; // Type 2 letters at once to make it realistic and fast
      } else {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setShowResult(false);
    setTranscript('');
  };

  const handleGenerateCV = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 1800); // 1.8 seconds artificial logic delay
  };

  const handleApply = () => {
    // Skills to append
    const skills = ['React', 'Spring Boot', 'Frontend Development', 'Web Applications'];
    const summary = 'Sinh viên năm 3 ngành Công nghệ thông tin với kiến thức nền tảng vững chắc và mong muốn phát triển chuyên sâu trong mảng phát triển Web, đặc biệt sử dụng React và Spring Boot framework.';
    onApplyAndNext(skills, summary);
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-gray-800">Tạo CV bằng giọng nói AI</h2>
        <p className="text-xs text-gray-500">Kể về kinh nghiệm, trường học hay dự án của bạn theo cách nói tự nhiên nhất</p>
      </div>

      {/* Mic Animation UI Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          {isRecording && (
            <>
              <motion.div
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 bg-brand/20 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
                className="absolute inset-0 bg-brand/30 rounded-full"
              />
            </>
          )}

          <button
            onClick={handleStartRecording}
            disabled={isRecording || isGenerating}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative z-10 transition cursor-pointer ${
              isRecording 
                ? 'bg-red-500 text-white' 
                : 'bg-brand text-white hover:bg-brand-dark'
            }`}
          >
            {isRecording ? (
              <span className="w-5 h-5 bg-white rounded-sm animate-pulse" />
            ) : (
              <Mic className="w-7 h-7" />
            )}
          </button>
        </div>

        <div className="text-center space-y-1">
          <span className="text-xs font-semibold text-gray-600">
            {isRecording ? 'Đang lắng nghe... Hãy nói ngay' : 'Nhấn nút và nói để AI tổng hợp'}
          </span>
          <p className="text-[10px] text-gray-400">
            {isRecording ? 'Giới thiệu bản thân, kỹ năng và dự án quý giá của bạn...' : '(Hỗ trợ tiếng Việt giọng Bắc - Trung - Nam)'}
          </p>
        </div>

        {/* Visualizer sound wave bars */}
        {isRecording && (
          <div className="flex items-center gap-1.5 h-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [8, i % 2 === 0 ? 24 : 16, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.1,
                }}
                className="w-1 bg-brand rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Transcription View */}
      {(transcript || showResult) && (
        <div className="bg-gray-50 rounded-2xl p-4.5 border border-gray-100 space-y-2">
          <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400">
            <span className="flex items-center gap-1 text-gray-500">
              <Speech className="w-3.5 h-3.5" />
              BẢN DỊCH GIỌNG NÓI:
            </span>
            {isRecording && <span className="text-red-500 flex items-center gap-1">● REC</span>}
          </div>
          <p className="text-xs text-gray-700 font-medium leading-relaxed italic bg-white p-3 rounded-xl border border-gray-100/60 shadow-inner">
            &ldquo;{transcript || fullTranscript}&rdquo;
          </p>

          {!isRecording && !showResult && (
            <button
              onClick={handleGenerateCV}
              disabled={isGenerating}
              className="w-full mt-3 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:from-amber-600 hover:to-orange-600 active:scale-98 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
              <span>AI tạo nội dung CV</span>
            </button>
          )}
        </div>
      )}

      {/* Generating state loader */}
      {isGenerating && (
        <div className="bg-brand-light/40 border border-brand/20 rounded-2xl p-6 text-center space-y-3">
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="text-brand"
            >
              <Wand2 className="w-8 h-8" />
            </motion.div>
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-brand-dark">AI đang phân tích giọng nói</h4>
            <div className="w-32 h-1 bg-brand-light rounded-full mx-auto overflow-hidden">
              <motion.div 
                animate={{ x: [-80, 80] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-20 h-full bg-brand rounded-full"
              />
            </div>
            <p className="text-[10px] text-brand/80 font-semibold">Đang nhận diện Kỹ năng, Kinh nghiệm, Mục tiêu...</p>
          </div>
        </div>
      )}

      {/* Structured Result Display */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-1 bg-amber-50 rounded-lg p-2.5 border border-amber-100 text-[11px] text-amber-800 font-medium font-sans">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>AI đã xếp sắp nội dung của bạn thành 4 danh mục chuyên nghiệp:</span>
            </div>

            <div className="space-y-3">
              {/* Category 1 */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-brand tracking-wider">Giới thiệu bản thân</span>
                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  Sinh viên năm 3 ngành Công nghệ thông tin với kiến thức lập trình cơ bản và yêu thích lập trình web.
                </p>
              </div>

              {/* Category 2 */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-brand tracking-wider">Kỹ năng phát hiện</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Spring Boot', 'Lập trình Web'].map((skill, index) => (
                    <span key={index} className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category 3 */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-brand tracking-wider">Kinh nghiệm / Dự án</span>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  Đã thực hiện và đóng góp trong <span className="font-bold text-gray-900">2 dự án lập trình web</span> với vai trò lập trình viên chính.
                </p>
              </div>

              {/* Category 4 */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-brand tracking-wider">Mục tiêu nghề nghiệp</span>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Mong muốn thực tập để cọ xát thực tế, học hỏi quy trình chuyên nghiệp và làm việc trên môi trường sản phẩm thực.
                </p>
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                onClick={handleStartRecording}
                className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-95 transition cursor-pointer font-sans"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Nói lại
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 bg-brand text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-brand-dark shadow-sm active:scale-95 transition cursor-pointer font-sans"
              >
                <span>Thêm vào CV & Đi tiếp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
