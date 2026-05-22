import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, FileImage, Camera, Sparkles, Check, ChevronRight, Award, Trash2, Plus, Calendar, Landmark } from 'lucide-react';
import { DetectedCertificate } from '../types';

interface ScanCertificateProps {
  onAddCertificates: (certs: string[]) => void;
  currentPosition?: string;
}

export default function ScanCertificate({ onAddCertificates, currentPosition = '' }: ScanCertificateProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDone, setScannedDone] = useState(false);
  const [certsList, setCertsList] = useState<DetectedCertificate[]>([]);
  
  // States for manual input
  const [showManualForm, setShowManualForm] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertYear, setNewCertYear] = useState(new Date().getFullYear().toString());

  // Determine standard presets based on current CV position
  const isMaintenanceMode = currentPosition.toLowerCase().includes('bảo trì') || 
                            currentPosition.toLowerCase().includes('máy móc') ||
                            currentPosition.toLowerCase().includes('lao động') ||
                            currentPosition.toLowerCase().includes('vận hành');

  const defaultPresets: DetectedCertificate[] = isMaintenanceMode 
    ? [
        {
          id: 'cert-m1',
          name: 'Chứng nhận An toàn Lao động Nhóm 3 (Vận hành thiết bị có yêu cầu nghiêm ngặt)',
          issuer: 'Trung tâm Huấn luyện An toàn Cơ khí',
          year: '2025',
          status: 'detected'
        },
        {
          id: 'cert-m2',
          name: 'Chứng chỉ Nghề Kỹ thuật Vận hành & Bảo dưỡng Máy dập Công nghiệp',
          issuer: 'Trường Cao đẳng Nghề VSIP / Bình Dương',
          year: '2024',
          status: 'detected'
        },
        {
          id: 'cert-m3',
          name: 'Chứng nhận Đào tạo Vận hành Dây chuyền Cơ khí Thủy lực',
          issuer: 'Ban Quản lý KCN VSIP Hải Phòng',
          year: '2525',
          status: 'detected'
        }
      ]
    : [
        {
          id: 'cert-1',
          name: 'Google UX Design Professional Certificate',
          issuer: 'Google (Coursera)',
          year: '2025',
          status: 'detected'
        },
        {
          id: 'cert-2',
          name: 'IELTS Academic - Band 6.5',
          issuer: 'IDP Education',
          year: '2024',
          status: 'detected'
        },
        {
          id: 'cert-3',
          name: 'Java Spring Boot Development Basic',
          issuer: 'FPT Software Academy',
          year: '2025',
          status: 'detected'
        }
      ];

  // Initialize certificates list with predefined values
  useEffect(() => {
    setCertsList(defaultPresets);
  }, [currentPosition]);

  const startScanningMock = () => {
    setIsScanning(true);
    setScannedDone(false);
    
    // Simulate OCR scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScannedDone(true);
      // Mark presets as added so they highlight immediately
      setCertsList(defaultPresets.map(c => ({ ...c, status: 'added' })));
    }, 2000);
  };

  const handleToggleCert = (id: string) => {
    setCertsList(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'added' ? 'detected' : 'added'
        };
      }
      return c;
    }));
  };

  const selectedCertsCount = certsList.filter(c => c.status === 'added').length;

  const handleAddAndProceed = () => {
    const activeCerts = certsList
      .filter(c => c.status === 'added')
      .map(c => `${c.name} (${c.issuer} - ${c.year})`);
    onAddCertificates(activeCerts);
  };

  const handleCreateManualCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertIssuer.trim()) return;

    const customCert: DetectedCertificate = {
      id: `manual-cert-${Date.now()}`,
      name: newCertName.trim(),
      issuer: newCertIssuer.trim(),
      year: newCertYear || new Date().getFullYear().toString(),
      status: 'added' // Force active immediately
    };

    setCertsList(prev => [customCert, ...prev]);
    setScannedDone(true); // Treat as scanned if we manually added elements
    
    // Reset form states
    setNewCertName('');
    setNewCertIssuer('');
    setShowManualForm(false);
  };

  const handleDeleteCert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering list toggle
    setCertsList(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-gray-800">Quét & Nhận diện Chứng chỉ</h2>
        <p className="text-xs text-gray-500">Chụp bằng Camera, tải ảnh chứng chỉ hoặc nhập thủ công để AI tích hợp vào CV</p>
      </div>

      {/* Simulated Scanner Area */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
        {!isScanning && !scannedDone ? (
          <div 
            onClick={startScanningMock}
            className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-gray-50/50 hover:border-brand/40 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-brand-light text-brand rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Camera className="w-7 h-7" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-700">Chụp ảnh / Tải ảnh lên quét</p>
              <p className="text-[10px] text-gray-400 mt-1">AI tự động phân tích OCR bóc tách nội dung bằng cấp</p>
            </div>
            <div className="flex gap-2 pt-2">
              <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 flex items-center gap-1">
                <FileImage className="w-4 h-4 text-gray-400" /> Cam / JPG / PNG
              </span>
              <span className="text-[9px] bg-brand-light px-2 py-0.5 rounded text-brand font-extrabold">
                {isMaintenanceMode ? 'Dành cho Kỹ thuật & Lao động' : 'Dành cho CNTT / Văn phòng'}
              </span>
            </div>
          </div>
        ) : isScanning ? (
          <div className="border border-brand/20 bg-brand-light/20 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden h-48">
            {/* Pulsing visual laser scanner line animate */}
            <motion.div
              animate={{ y: [-10, 160, -10] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_#10B981] z-20"
            />
            
            {/* Dummy Mock Certificate Canvas under the laser */}
            <div className="w-32 h-24 bg-white rounded border border-gray-200 p-2 flex flex-col justify-between opacity-40 select-none">
              <span className="text-[7px] font-bold text-gray-400 uppercase text-center block">CERTIFICATE OF MERIT</span>
              <div className="space-y-1 my-1">
                <div className="h-1 bg-gray-300 rounded w-16 mx-auto" />
                <div className="h-0.5 bg-gray-200 rounded w-20 mx-auto" />
                <div className="h-0.5 bg-gray-100 rounded w-12 mx-auto" />
              </div>
              <div className="flex justify-between items-center text-[5px]">
                <div className="w-3 h-3 rounded-full border border-gray-300" />
                <div className="w-6 h-1 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="text-center mt-4 space-y-1 relative z-10">
              <span className="text-xs font-bold text-brand flex items-center justify-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                AI OCR đang quét bằng cấp...
              </span>
              <p className="text-[10px] text-gray-400">Trích xuất Tên, Nơi cấp chứng chỉ và Năm hiệu lực</p>
            </div>
          </div>
        ) : (
          /* Scanned finished / Certificates list */
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-xs flex items-center justify-between">
              <span className="font-semibold flex items-center gap-1.5 font-sans">
                <Check className="w-4 h-4 text-emerald-600 bg-white rounded-full p-0.5" />
                AI đã trích xuất danh sách chứng chỉ phù hợp!
              </span>
              <button 
                onClick={startScanningMock}
                className="text-[10px] text-brand font-bold hover:underline cursor-pointer"
              >
                Quét lại
              </button>
            </div>

            {/* List of Scanned Certificates with custom checkbox toggles */}
            <div className="space-y-2.5">
              {certsList.map((cert) => {
                const isAdded = cert.status === 'added';
                return (
                  <div
                    key={cert.id}
                    onClick={() => handleToggleCert(cert.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isAdded 
                        ? 'border-emerald-500 bg-emerald-50/20' 
                        : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 max-w-[85%]">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isAdded ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{cert.name}</h4>
                        <p className="text-[9px] text-gray-500 leading-relaxed font-medium">Cấp bởi: {cert.issuer} • Năm {cert.year}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => handleDeleteCert(cert.id, e)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                        isAdded 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {isAdded && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Manual Certificate Insertion Section */}
        <div className="pt-2 border-t border-gray-100">
          {!showManualForm ? (
            <button
              onClick={() => {
                setShowManualForm(true);
                setScannedDone(true); // Unlock scanned results list to combine
              }}
              className="w-full py-2.5 border border-dashed border-gray-200 rounded-xl text-gray-600 hover:text-brand hover:border-brand/40 hover:bg-brand-light/10 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Chỉnh sửa: Thêm bằng cấp/chứng chỉ thủ công</span>
            </button>
          ) : (
            <form onSubmit={handleCreateManualCert} className="bg-gray-50 rounded-2xl p-4 border border-gray-150 space-y-3">
              <h4 className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Nhập thông tin chứng nhận mới:</h4>
              
              <div className="space-y-2">
                <div className="relative">
                  <Award className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Tên chứng chỉ (ví dụ: Chứng nhận thợ hàn 3G)"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:border-brand outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Landmark className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Nơi cấp"
                      value={newCertIssuer}
                      onChange={(e) => setNewCertIssuer(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:border-brand outline-none transition"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Năm cấp"
                      value={newCertYear}
                      onChange={(e) => setNewCertYear(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:border-brand outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowManualForm(false)}
                  className="px-3 py-1.5 text-[11px] font-bold text-gray-500 hover:bg-gray-250 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-[11px] font-bold bg-brand text-white rounded-xl hover:bg-brand-dark"
                >
                  Xác nhận thêm
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div>
        <button
          disabled={!scannedDone || selectedCertsCount === 0}
          onClick={handleAddAndProceed}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition active:scale-98 ${
            scannedDone && selectedCertsCount > 0
              ? 'bg-brand text-white shadow-md hover:bg-brand-dark cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Lưu {selectedCertsCount} chứng chỉ vào CV & Đi tiếp</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
