import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';

const EmergencyLogs = () => {
  const { t } = useTranslation();
  const { emergencyLogs } = useStore();

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        {t('logs.title')}
      </motion.h1>

      {emergencyLogs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>{t('logs.noLogs')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {emergencyLogs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  log.status === 'sent' ? 'bg-emergency/10 text-emergency' : 'bg-success/10 text-success'
                }`}>
                  {log.status === 'sent' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{log.location}</p>
                  <p className="text-xs text-muted-foreground">{log.date} • {log.time}</p>
                  <p className="text-xs text-muted-foreground">{log.station}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  log.status === 'sent' ? 'bg-emergency/10 text-emergency' : 'bg-success/10 text-success'
                }`}>
                  {log.status === 'sent' ? t('logs.sent') : t('logs.cancelled')}
                </span>
                <button className="text-primary text-xs flex items-center gap-1 hover:underline">
                  <MapPin className="h-3 w-3" />{t('logs.viewMap')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyLogs;
