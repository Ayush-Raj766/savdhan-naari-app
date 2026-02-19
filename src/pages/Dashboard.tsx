import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Activity, Mic, MapPin, Radio, Pencil, Clock, Map } from 'lucide-react';
import { useStore } from '@/store/useStore';
import PanicButton from '@/components/PanicButton';
import EmergencyOverlay from '@/components/EmergencyOverlay';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { t } = useTranslation();
  const store = useStore();
  const [showEmergency, setShowEmergency] = useState(false);
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);

  const handlePanic = () => setShowPanicConfirm(true);
  const confirmPanic = () => {
    setShowPanicConfirm(false);
    toast.success('SOS Triggered!');
    store.addEmergencyLog({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      location: 'Current Location',
      station: 'Nearest Station',
      status: 'sent',
    });
  };

  // Simulate watch alert
  const simulateAlert = () => setShowEmergency(true);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">{t('dashboard.title')}</motion.h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">{t('dashboard.profile')}</h2>
            <button className="text-primary text-xs flex items-center gap-1"><Pencil className="h-3 w-3" />{t('dashboard.editProfile')}</button>
          </div>
          <div className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">Name:</span> {store.user?.name || 'Priya Sharma'}</p>
            <p><span className="text-muted-foreground">Age:</span> {store.user?.age || 28}</p>
            <p><span className="text-muted-foreground">Phone:</span> {store.user?.phone || '9876543210'}</p>
          </div>
        </motion.div>

        {/* Watch Status */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">{t('dashboard.watchStatus')}</h2>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${store.watchConnected ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {store.watchConnected ? t('dashboard.connected') : t('dashboard.disconnected')}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatusItem icon={<Heart className="h-4 w-4 text-emergency" />} label={t('dashboard.heartRate')} value={`${store.heartRate} ${t('dashboard.bpm')}`} />
            <StatusItem icon={<Activity className="h-4 w-4 text-success" />} label={t('dashboard.motion')} value={t('dashboard.normal')} />
            <StatusItem icon={<Mic className="h-4 w-4 text-primary" />} label={t('dashboard.microphone')} value={t('dashboard.active')} />
          </div>
        </motion.div>
      </div>

      {/* Live Location placeholder */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-5 rounded-2xl bg-card border border-border">
        <h2 className="font-bold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{t('dashboard.liveLocation')}</h2>
        <div className="w-full h-48 md:h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Map className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">Google Maps will appear here</p>
            <p className="text-xs">{t('dashboard.nearestStation')}: CP Police Station</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions + Panic */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-5 rounded-2xl bg-card border border-border">
        <h2 className="font-bold mb-4">{t('dashboard.quickActions')}</h2>
        <div className="flex flex-col items-center gap-4">
          <PanicButton onPress={handlePanic} />
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            <ActionBtn icon={<Radio className="h-4 w-4" />} label={t('dashboard.liveTracking')} onClick={() => toast.success('Live tracking enabled!')} />
            <ActionBtn icon={<Clock className="h-4 w-4" />} label={t('dashboard.checkIn')} onClick={() => toast.success('Check-in timer started!')} />
          </div>
          <button onClick={simulateAlert} className="text-xs text-muted-foreground underline mt-2">Simulate Watch Alert (Demo)</button>
        </div>
      </motion.div>

      {/* Panic Confirm Dialog */}
      {showPanicConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-2xl p-6 max-w-sm w-full border border-border shadow-xl">
            <h3 className="text-lg font-bold mb-2">{t('emergency.confirmPanic')}</h3>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowPanicConfirm(false)} className="flex-1 py-3 rounded-xl border border-border font-medium text-sm">{t('emergency.cancel')}</button>
              <button onClick={confirmPanic} className="flex-1 py-3 rounded-xl bg-emergency text-emergency-foreground font-bold text-sm">{t('emergency.confirm')}</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Emergency Overlay */}
      {showEmergency && (
        <EmergencyOverlay
          onCancel={() => setShowEmergency(false)}
          onExpire={() => {
            setShowEmergency(false);
            store.addEmergencyLog({
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
              time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
              location: 'Watch Location',
              station: 'Nearest Station',
              status: 'sent',
            });
          }}
        />
      )}
    </div>
  );
};

const StatusItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="text-center p-2 rounded-xl bg-muted">
    <div className="flex justify-center mb-1">{icon}</div>
    <p className="text-[10px] text-muted-foreground">{label}</p>
    <p className="text-xs font-bold">{value}</p>
  </div>
);

const ActionBtn = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-2 p-3 rounded-xl border border-border hover:bg-accent transition-colors text-sm font-medium">
    {icon}{label}
  </button>
);

export default Dashboard;
