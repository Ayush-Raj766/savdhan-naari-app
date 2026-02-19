import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', otp: '', aadhaar: '', gender: '', age: '',
    pin: '', password: '', confirmPassword: '',
  });

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  const sendOtp = () => {
    if (form.phone.length < 10) {
      toast.error('Enter valid phone number');
      return;
    }
    setOtpSent(true);
    toast.success('OTP sent!');
  };

  const verifyOtp = () => {
    if (form.otp.length === 6) {
      setOtpVerified(true);
      toast.success('OTP verified!');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) { toast.error('Please verify OTP first'); return; }
    if (form.aadhaar.length !== 12) { toast.error('Aadhaar must be 12 digits'); return; }
    if (Number(form.age) < 13) { toast.error('Age must be at least 13'); return; }
    if (form.pin.length !== 4) { toast.error('PIN must be 4 digits'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (!consent) { toast.error('Please accept the consent'); return; }

    login({ name: form.name, phone: form.phone, age: Number(form.age), gender: form.gender, role: 'user' });
    toast.success('Registration successful!');
    navigate('/contacts');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 gradient-hero">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-bold">{t('auth.registerTitle')}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t('auth.registerSubtitle')}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Field label={t('auth.fullName')}>
              <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="form-input" required />
            </Field>

            <Field label={t('auth.phone')}>
              <div className="flex gap-2">
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="form-input flex-1" required />
                <button type="button" onClick={sendOtp} disabled={otpVerified} className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold whitespace-nowrap disabled:opacity-50">
                  {otpVerified ? '✓' : t('auth.sendOtp')}
                </button>
              </div>
            </Field>

            {otpSent && !otpVerified && (
              <Field label={t('auth.otp')}>
                <div className="flex gap-2">
                  <input type="text" value={form.otp} onChange={(e) => update('otp', e.target.value)} maxLength={6} className="form-input flex-1" />
                  <button type="button" onClick={verifyOtp} className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-semibold">{t('auth.verifyOtp')}</button>
                </div>
              </Field>
            )}

            <Field label={t('auth.aadhaar')}>
              <input type="text" value={form.aadhaar} onChange={(e) => update('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))} maxLength={12} className="form-input" required />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label={t('auth.gender')}>
                <select value={form.gender} onChange={(e) => update('gender', e.target.value)} className="form-input" required>
                  <option value="">—</option>
                  <option value="female">{t('auth.female')}</option>
                  <option value="male">{t('auth.male')}</option>
                  <option value="other">{t('auth.other')}</option>
                </select>
              </Field>
              <Field label={t('auth.age')}>
                <input type="number" value={form.age} onChange={(e) => update('age', e.target.value)} min={13} className="form-input" required />
              </Field>
            </div>

            <Field label={t('auth.emergencyPin')}>
              <input type="password" value={form.pin} onChange={(e) => update('pin', e.target.value.replace(/\D/g, '').slice(0, 4))} maxLength={4} className="form-input" required />
            </Field>

            <Field label={t('auth.password')}>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => update('password', e.target.value)} className="form-input pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <Field label={t('auth.confirmPassword')}>
              <input type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} className="form-input" required />
            </Field>

            <label className="flex items-start gap-2 text-sm cursor-pointer pt-2">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-primary" />
              <span className="text-muted-foreground">{t('auth.consent')}</span>
            </label>

            <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm mt-2">
              {t('auth.register')}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or</span></div>
          </div>

          <div className="space-y-2">
            <button className="w-full py-3 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-colors">{t('auth.googleLogin')}</button>
            <button className="w-full py-3 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-colors">{t('auth.appleLogin')}</button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">{t('nav.login')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-sm font-medium mb-1 block">{label}</label>
    {children}
  </div>
);

export default Register;
