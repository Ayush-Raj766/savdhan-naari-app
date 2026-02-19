import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface PanicButtonProps {
  onPress: () => void;
}

const PanicButton = ({ onPress }: PanicButtonProps) => {
  const { t } = useTranslation();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onPress}
      className="relative w-32 h-32 rounded-full bg-emergency text-emergency-foreground font-bold text-lg shadow-2xl emergency-pulse flex flex-col items-center justify-center gap-1"
    >
      <AlertTriangle className="h-8 w-8" />
      <span className="text-sm font-bold">{t('dashboard.panicButton')}</span>
    </motion.button>
  );
};

export default PanicButton;
