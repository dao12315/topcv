import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, FileImage, Camera, Sparkles, Check, ChevronRight, Award, Trash2 } from 'lucide-react';
import { DetectedCertificate } from '../types';
import { mockDetectedCertificates } from '../mockData';

interface ScanCertificateProps {
  onAddCertificates: (certs: string[]) => void;
}

export default function ScanCertificate({ onAddCertificates }: ScanCertificateProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDone, setScannedDone] = useState(false);
  const [certsList, setCertsList] = useState<DetectedCertificate[]>(mockDetectedCertificates);

  const startScanningMock = () => {
    setIsScanning(true);
    setScannedDone(false);
    
    // Simulate OCR scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScannedDone(true);
      // Reset statuses to detected
      setCertsList(mockDetectedCertificates.map(c => ({ ...c, status: 'detected' })));
    }, 2200);
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
      .map(c => `${c.name} (${c.issuer})`);
    onAddCertificates(activeCerts);
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-gray-800">Quét & Nhận diện Chứng chỉ</h2>
        <p className="text-xs text-gray-500">Chụp bằng Camera hoặc tải ảnh chứng ngoại ngữ, tin học để AI tự động trích xuất</p>
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
              <p className="text-xs font-bold text-gray-700">Tải ảnh hoặc Quét trực tiếp</p>
              <p className="text-[10px] text-gray-400 mt-1">Hỗ trợ định dạng JPG, PNG, PDF tối đa 10MB</p>
            </div>
            <div className="flex gap-2 pt-2">
              <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 flex items-center gap-1">
                <FileImage className="w-3 h-3" /> JPG/PNG
              </span>
              <span className="text-[9px] bg-brand-light px-2 py-0.5 rounded text-brand font-extrabold">Bằng cấp ngoại ngữ</span>
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
                AI OCR đang quét dữ liệu...
              </span>
              <p className="text-[10px] text-gray-400">Trích xuất tên chứng chỉ, cơ sở đào tạo, năm hiệu lực</p>
            </div>
          </div>
        ) : (
          /* Scanned finished */
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-xs flex items-center justify-between">
              <span className="font-semibold flex items-center gap-1.5 font-sans">
                <Check className="w-4 h-4 text-emerald-600 bg-white rounded-full p-0.5" />
                AI đã trích xuất thành công 3 chứng chỉ!
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
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isAdded ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800">{cert.name}</h4>
                        <p className="text-[10px] text-gray-500">{cert.issuer} • Lấy năm {cert.year}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isAdded 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-gray-300 bg-white'
                    }`}>
                      {isAdded && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer operations */}
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
          <span>Thêm {selectedCertsCount} chứng chỉ vào CV & Đi tiếp</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
