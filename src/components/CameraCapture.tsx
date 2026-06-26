/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import FaceGuide from './FaceGuide';

interface CameraCaptureProps {
  onCapture: (photoBase64: string | null) => void;
  capturedPhoto: string | null;
}

type CameraStatus = 'PENDING' | 'ACTIVE' | 'DENIED' | 'UNSUPPORTED';

export default function CameraCapture({ onCapture, capturedPhoto }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<CameraStatus>('PENDING');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize and request camera
  const startCamera = async () => {
    setStatus('PENDING');
    setErrorMessage('');
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('UNSUPPORTED');
      setErrorMessage('Browser Anda tidak mendukung akses kamera.');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: false
      });
      setStream(mediaStream);
      setStatus('ACTIVE');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      setStatus('DENIED');
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setErrorMessage('Izin kamera ditolak. Silakan berikan izin di pengaturan browser.');
      } else {
        setErrorMessage('Gagal membuka kamera: ' + (error.message || 'Kamera tidak ditemukan'));
      }
    }
  };

  useEffect(() => {
    if (!capturedPhoto) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [capturedPhoto]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        
        // Mirror horizontally for front camera feel
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    onCapture(null);
  };

  return (
    <div id="camera-capture-container" className="w-full bg-white rounded-[18px] border border-[#E3EAF3] p-4 shadow-[0_8px_24px_rgba(15,31,61,0.06)] mb-4 text-center">
      <div className="relative aspect-[4/3] rounded-[12px] bg-slate-900 overflow-hidden mb-4 flex items-center justify-center">
        {capturedPhoto ? (
          /* Render Captured Image */
          <div className="relative w-full h-full">
            <img 
              src={capturedPhoto} 
              alt="Snapshot" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#10B981] text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Foto Terambil
            </div>
          </div>
        ) : (
          /* Render Live Camera Feed or Placeholders */
          <>
            {status === 'ACTIVE' && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            )}

            {status === 'ACTIVE' && <FaceGuide />}

            {status === 'PENDING' && (
              <div className="flex flex-col items-center justify-center gap-3 text-white/70 p-4">
                <RefreshCw className="w-8 h-8 animate-spin text-[#0F5FEA]" />
                <span className="text-xs font-semibold">Mengakses kamera depan...</span>
              </div>
            )}

            {(status === 'DENIED' || status === 'UNSUPPORTED') && (
              <div className="absolute inset-0 bg-[#F8FAFD] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <h4 className="text-[#0B1F44] text-[14px] font-bold mb-1">Kamera Tidak Tersedia</h4>
                <p className="text-[#66738D] text-[11px] leading-relaxed max-w-[240px] mb-4">
                  {errorMessage || 'Izinkan akses kamera agar absensi dapat divalidasi dengan swafoto.'}
                </p>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-[#0F5FEA] hover:bg-[#0F5FEA]/90 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Coba Lagi
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Capture or Retake Buttons */}
      <div className="flex justify-center">
        {capturedPhoto ? (
          <button
            onClick={handleRetake}
            className="w-full h-[46px] border border-[#DCE4F0] hover:bg-slate-50 text-[#0B1F44] rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-[#66738D]" />
            Ambil Ulang Foto
          </button>
        ) : (
          <button
            disabled={status !== 'ACTIVE'}
            onClick={handleCapture}
            className={`w-full h-[46px] rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-2 transition-all ${
              status === 'ACTIVE'
                ? 'bg-[#0F5FEA] text-white hover:bg-[#0F5FEA]/90 active:scale-[0.98] shadow-md shadow-blue-100 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Camera className="w-4 h-4" />
            Ambil Foto
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
