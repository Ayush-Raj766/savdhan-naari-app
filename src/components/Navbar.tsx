import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { Shield, Home, LayoutDashboard, Users, FileText, LogIn, LogOut, Globe } from 'lucide-react';

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, language, setLanguage, logout } = useStore();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    // i18next language change
    import('@/i18n').then((mod) => mod.default.changeLanguage(newLang));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Navbar - Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-between px-6 glass-card border-b">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-display">Savdhan Naari</span>
        </Link>

        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <NavItem to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} label={t('nav.dashboard')} active={isActive('/dashboard')} />
              <NavItem to="/contacts" icon={<Users className="h-4 w-4" />} label={t('nav.contacts')} active={isActive('/contacts')} />
              <NavItem to="/logs" icon={<FileText className="h-4 w-4" />} label={t('nav.logs')} active={isActive('/logs')} />
              <button onClick={() => { logout(); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
                <LogOut className="h-4 w-4" />
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={<LogIn className="h-4 w-4" />} label={t('nav.login')} active={isActive('/login')} />
              <NavItem to="/register" icon={null} label={t('nav.register')} active={isActive('/register')} highlight />
            </>
          )}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent transition-colors ml-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </nav>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t flex items-center justify-around h-16 px-2">
        {isAuthenticated ? (
          <>
            <MobileNavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label={t('nav.dashboard')} active={isActive('/dashboard')} />
            <MobileNavItem to="/contacts" icon={<Users className="h-5 w-5" />} label={t('nav.contacts')} active={isActive('/contacts')} />
            <MobileNavItem to="/logs" icon={<FileText className="h-5 w-5" />} label={t('nav.logs')} active={isActive('/logs')} />
            <button onClick={toggleLanguage} className="flex flex-col items-center gap-0.5 text-muted-foreground">
              <Globe className="h-5 w-5" />
              <span className="text-[10px]">{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>
          </>
        ) : (
          <>
            <MobileNavItem to="/" icon={<Home className="h-5 w-5" />} label={t('nav.home')} active={isActive('/')} />
            <MobileNavItem to="/login" icon={<LogIn className="h-5 w-5" />} label={t('nav.login')} active={isActive('/login')} />
            <button onClick={toggleLanguage} className="flex flex-col items-center gap-0.5 text-muted-foreground">
              <Globe className="h-5 w-5" />
              <span className="text-[10px]">{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>
          </>
        )}
      </nav>
    </>
  );
};

const NavItem = ({ to, icon, label, active, highlight }: { to: string; icon: React.ReactNode; label: string; active: boolean; highlight?: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      highlight
        ? 'gradient-primary text-primary-foreground'
        : active
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:bg-accent'
    }`}
  >
    {icon}
    {label}
  </Link>
);

const MobileNavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link to={to} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

export default Navbar;
