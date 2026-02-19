import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, MapPin, Watch, Lock, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Zap className="h-6 w-6" />, title: t('landing.feature1Title'), desc: t('landing.feature1Desc') },
    { icon: <Watch className="h-6 w-6" />, title: t('landing.feature2Title'), desc: t('landing.feature2Desc') },
    { icon: <MapPin className="h-6 w-6" />, title: t('landing.feature3Title'), desc: t('landing.feature3Desc') },
    { icon: <Lock className="h-6 w-6" />, title: t('landing.feature4Title'), desc: t('landing.feature4Desc') },
  ];

  const steps = [
    { num: '01', title: t('landing.step1Title'), desc: t('landing.step1Desc') },
    { num: '02', title: t('landing.step2Title'), desc: t('landing.step2Desc') },
    { num: '03', title: t('landing.step3Title'), desc: t('landing.step3Desc') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-hero min-h-screen flex items-center pt-20 md:pt-0">
        <div className="container mx-auto px-4 py-12 md:py-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold text-primary">Savdhan Naari</span>
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-extrabold leading-tight">
                {t('landing.heroTitle')}
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-md">
                {t('landing.heroSubtitle')}
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-base shadow-lg hover:opacity-90 transition-opacity">
                  {t('landing.getStarted')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-base hover:bg-accent transition-colors">
                  {t('landing.loginBtn')}
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <img src={heroImage} alt="Women safety illustration" className="rounded-2xl shadow-2xl w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              {t('landing.missionTitle')}
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              {t('landing.missionText')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('landing.featuresTitle')}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('landing.howItWorksTitle')}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="text-center">
                <div className="text-5xl font-extrabold text-gradient-primary mb-4">{s.num}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">Savdhan Naari</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">{t('landing.footerPrivacy')}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t('landing.footerTerms')}</a>
          </div>
          <p>© 2026 Savdhan Naari. {t('landing.footerRights')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
