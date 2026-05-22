import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, GraduationCap, Briefcase, Landmark } from 'lucide-react';
import { CVTemplate, CVData } from '../types';
import { mockTemplates } from '../mockData';

interface TemplateSelectionProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
  onNextStep: () => void;
}

export default function TemplateSelection({ selectedTemplate, onSelectTemplate, onNextStep }: TemplateSelectionProps) {
  
  const getTemplateIcon = (id: string, color: string) => {
    switch (id) {
      case 'modern-student':
        return <GraduationCap className="w-5 h-5 text-blue-500" />;
      case 'simple-worker':
        return <Briefcase className="w-5 h-5 text-emerald-500" />;
      case 'professional-office':
        return <Landmark className="w-5 h-5 text-indigo-500" />;
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-5 pb-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-gray-800">Chọn mẫu CV mơ ước của bạn</h2>
        <p className="text-xs text-gray-500">Mẫu thiết kế chuẩn ATS, tinh tế và tối ưu cho từng nhóm ngành</p>
      </div>

      <div className="space-y-4">
        {mockTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          return (
            <motion.div
              key={template.id}
              whileTap={{ scale: 0.98 }}
              className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 relative ${
                isSelected 
                  ? 'border-brand bg-brand-light/20 shadow-sm' 
                  : 'border-gray-100 bg-white hover:shadow-sm'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-brand">
                  <CheckCircle2 className="w-5 h-5 fill-brand text-white" />
                </div>
              )}

              <div className="flex gap-4">
                {/* Visual design representation representing resume style */}
                <div className="w-16 h-20 bg-gray-50 rounded-lg border border-gray-200/60 p-2 flex flex-col justify-between overflow-hidden shadow-inner flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.accentColor }} />
                    <div className="w-8 h-1.5 bg-gray-300 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-10 h-1 bg-gray-200 rounded" />
                    <div className="w-11 h-1 bg-gray-200 rounded" />
                    <div className="w-8 h-1 bg-gray-200 rounded" />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="w-5 h-2 bg-gray-100 rounded" />
                    <div className="w-4 h-1.5 bg-gray-200 rounded" />
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    {getTemplateIcon(template.id, template.accentColor)}
                    <h3 className="font-bold text-sm text-gray-800">{template.name}</h3>
                  </div>
                  <p className="text-[11px] font-bold text-brand">{template.targetUser}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{template.description}</p>
                </div>
              </div>

              {/* Quick sample preview tag list */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-650 font-semibold font-sans">Chuẩn ATS</span>
                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-655 font-semibold font-sans">Đơn giản</span>
                <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-655 font-semibold font-sans">Chuẩn hóa AI</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-4">
        <button
          id="btn-template-next"
          disabled={!selectedTemplate}
          onClick={onNextStep}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-98 ${
            selectedTemplate 
              ? 'bg-brand text-white shadow-md hover:bg-brand-dark cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Tiếp tục: Tạo nội dung bằng giọng nói</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
