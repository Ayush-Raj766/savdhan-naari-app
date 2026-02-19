import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login({ name: 'Priya Sharma', phone: '9876543210', age: 28, gender: 'female', role: 'user' });
    toast.success('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 gradient-hero">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-bold">{t('auth.loginTitle')}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t('auth.loginSubtitle')}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('auth.phone')} / {t('auth.email')}</label>
              <input
                type="text"
                value={form.identifier}
                onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('auth.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Link to="#" className="text-xs text-primary hover:underline mt-1 inline-block">{t('auth.forgotPassword')}</Link>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm">
              {t('auth.login')}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or</span></div>
          </div>

          <div className="space-y-2">
            <button className="w-full py-3 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-colors">
              {t('auth.googleLogin')}
            </button>
            <button className="w-full py-3 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition-colors">
              {t('auth.appleLogin')}
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">{t('nav.register')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
