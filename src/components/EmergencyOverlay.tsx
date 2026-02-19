import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

interface EmergencyOverlayProps {
  onCancel: () => void;
  onExpire: () => void;
}

const EmergencyOverlay = ({ onCancel, onExpire }: EmergencyOverlayProps) => {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(30);
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'countdown' | 'cancelled' | 'sending'>('countdown');
  const store = useStore();

  useEffect(() => {
    if (status !== 'countdown') return;
    if (seconds <= 0) {
      setStatus('sending');
      onExpire();
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, status, onExpire]);

  const handlePinSubmit = () => {
    // Mock PIN check — in production, validate against user's stored PIN
    if (pin === '1234') {
      setStatus('cancelled');
      setTimeout(onCancel, 1500);
    } else {
      setPin('');
    }
  };

  if (status === 'cancelled') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-success"
      >
        <div className="text-center text-success-foreground">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">✓</motion.div>
          <h2 className="text-3xl font-bold">{t('emergency.cancelled')}</h2>
        </div>
      </motion.div>
    );
  }

  if (status === 'sending') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-emergency"
      >
        <div className="text-center text-emergency-foreground">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-6xl mb-4">🚨</motion.div>
          <h2 className="text-3xl font-bold">{t('emergency.sendingSos')}</h2>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-emergency/95 backdrop-blur-sm"
    >
      <div className="text-center text-emergency-foreground p-8 max-w-md mx-auto">
        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {t('emergency.detected')}
        </motion.h1>

        <p className="text-lg mb-8 opacity-90">
          {t('emergency.enterPin', { seconds })}
        </p>

        {/* Countdown circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="6"
              strokeDasharray={`${(seconds / 30) * 283} 283`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
            {seconds}
          </span>
        </div>

        {/* PIN input */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-14 rounded-lg bg-emergency-foreground/20 border-2 border-emergency-foreground/40 flex items-center justify-center text-2xl font-bold"
            >
              {pin[i] ? '●' : ''}
            </div>
          ))}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((num, i) => (
            <button
              key={i}
              onClick={() => {
                if (num === null) return;
                if (num === 'del') {
                  setPin((p) => p.slice(0, -1));
                } else if (pin.length < 4) {
                  const newPin = pin + num;
                  setPin(newPin);
                  if (newPin.length === 4) {
                    setTimeout(() => {
                      if (newPin === '1234') {
                        setStatus('cancelled');
                        setTimeout(onCancel, 1500);
                      } else {
                        setPin('');
                      }
                    }, 200);
                  }
                }
              }}
              disabled={num === null}
              className={`h-14 rounded-xl text-xl font-bold transition-colors ${
                num === null ? 'invisible' : 'bg-emergency-foreground/20 hover:bg-emergency-foreground/30 active:bg-emergency-foreground/40'
              }`}
            >
              {num === 'del' ? '⌫' : num}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

import { useState, useEffect } from 'react';
export default EmergencyOverlay;
