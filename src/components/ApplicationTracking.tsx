import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, MessageSquare, Briefcase, DollarSign, Eye, AlertTriangle, CalendarRange, MapPin, ExternalLink } from 'lucide-react';
import { Application, ApplicationStatus } from '../types';

interface ApplicationTrackingProps {
  applications: Application[];
}

export default function ApplicationTracking({ applications }: ApplicationTrackingProps) {
  const [selectedAppId, setSelectedAppId] = useState<string>(
    applications.length > 0 ? applications[0].id : ''
  );

  const selectedApp = applications.find(app => app.id === selectedAppId) || applications[0];

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Đã nộp hồ sơ</span>;
      case 'viewed':
        return <span className="bg-brand-light text-brand border border-brand/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Tuyển dụng đã xem</span>;
      case 'interview':
        return <span className="bg-purple-100 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase animate-pulse">Lịch phỏng vấn</span>;
      case 'rejected':
        return <span className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Từ chối ứng tuyển</span>;
      default:
        return null;
    }
  };

  const getProgressPercent = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied': return 'w-[15%]';
      case 'viewed': return 'w-[50%]';
      case 'interview': return 'w-[85%]';
      case 'rejected': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-gray-800">Theo dõi ứng tuyển</h2>
        <p className="text-xs text-gray-500">Cập nhật thời gian thực quy trình xét duyệt và lịch hẹn phỏng vấn từ nhà tuyển dụng</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center space-y-3 shadow-sm">
          <span className="text-3xl">📭</span>
          <h4 className="text-sm font-bold text-gray-700">Chưa có hồ sơ ứng tuyển nào</h4>
          <p className="text-xs text-gray-400">Sang mục &ldquo;Việc làm&rdquo;, tìm một công ty phù hợp và tiến hành ứng tuyển ngay nhé!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* horizontal scroll selector for applied jobs cards */}
          <div className="space-y-1.5">
            {applications.length > 1 && (
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-extrabold px-1 uppercase select-none">
                <span>Đơn ứng tuyển ({applications.length})</span>
                <span className="text-brand flex items-center gap-1">Trượt ngang xem thêm 💬</span>
              </div>
            )}
            <div className="flex gap-2.5 overflow-x-auto pb-2.5 scrollbar-none font-sans flex-nowrap snap-x">
              {applications.map((app) => {
                const isSelected = app.id === selectedAppId;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all min-w-[205px] w-[205px] shrink-0 snap-center flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-brand text-white border-brand shadow-md scale-[1.01]' 
                        : 'bg-white border-gray-100 text-gray-800 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-brand-light/70' : 'text-gray-400'}`}>
                        {app.company}
                      </p>
                      <h4 className="text-xs font-bold leading-tight line-clamp-1">{app.jobTitle}</h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dashed border-current/20 flex justify-between items-center text-[10px]">
                      <span className={isSelected ? 'text-white/80 font-medium' : 'text-gray-500 font-medium'}>
                        {app.appliedDate}
                      </span>
                      <span className={isSelected ? 'bg-white/20 text-white px-2 py-0.5 rounded-full font-bold' : 'bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-bold'}>
                        {app.status === 'interview' ? 'PV' : app.status === 'viewed' ? 'Đã Xem' : 'Đơn mới'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active app pipeline summary in detail view layout */}
          {selectedApp && (
            <motion.div
              layoutId="tracking-detail-card"
              className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-5"
            >
              {/* Employer Info */}
              <div className="flex justify-between items-start font-sans">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-gray-800">{selectedApp.jobTitle}</h3>
                  <p className="text-xs font-extrabold text-brand">{selectedApp.company}</p>
                </div>
                {getStatusBadge(selectedApp.status)}
              </div>

              {/* Progress visual horizontal line */}
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-brand rounded-full transition-all duration-500 ${getProgressPercent(selectedApp.status)}`} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                  <span>Nộp đơn</span>
                  <span>Sơ lọc</span>
                  <span>Phỏng vấn</span>
                  <span>Kết quả</span>
                </div>
              </div>

              {/* Direct Zalo operational CTA */}
              <div className="flex gap-2.5 pt-1.5 border-t border-b border-gray-100 py-3">
                <a 
                  href={selectedApp.hrZalo || 'https://zalo.me/0332817798'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#0068FF] text-white rounded-xl font-bold text-xs flex-1 flex items-center justify-center gap-1.5 hover:bg-[#005ad4] transition duration-205 cursor-pointer text-center select-none"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white/10" />
                  Chat Zalo với {selectedApp.hrName || 'Anh Đạo'}
                </a>
                <button 
                  onClick={() => alert('Hệ thống đang mở bản CV ứng tuyển đã tối ưu hóa của bạn.')}
                  className="px-4 py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-xs flex-1 flex items-center justify-center gap-1.5 hover:bg-gray-100 transition duration-205 cursor-pointer select-none"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Xem bản CV nộp
                </button>
              </div>

              {/* Timeline list stepper detailed view (Requirement 8 progress timeline) */}
              <div className="space-y-4">
                <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  TIẾN TRÌNH CHI TIẾT
                </span>

                <div className="space-y-5 relative pl-5.5 before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-gray-100 font-sans">
                  {selectedApp.timeline.map((item, index) => (
                    <div key={index} className="relative space-y-1">
                      {/* Timeline status indicator circle check */}
                      <span className={`absolute -left-5.5 top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                        item.completed 
                          ? 'bg-brand border-brand text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {item.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>

                      <div className="space-y-0.5">
                        <div className="flex justify-between items-baseline">
                          <h4 className={`text-xs font-bold ${item.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                            {item.label}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-medium font-mono">{item.time}</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${item.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
