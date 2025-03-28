'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onCloseAction, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseAction();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCloseAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <div className="fixed inset-0" onClick={onCloseAction}></div>
        
        <div className="inline-block w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] bg-white rounded-lg text-left align-middle shadow-xl transform transition-all my-8">
          <div className="bg-[#8f527b] px-4 py-3 sm:px-6 sm:py-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {title}
              </h3>
              <button
                onClick={onCloseAction}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 