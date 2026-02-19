import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

const TrustedContacts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { contacts, addContact, removeContact } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (contacts.length >= 5) return;
    if (contacts.some((c) => c.phone === phone)) {
      toast.error(t('contacts.duplicate'));
      return;
    }
    addContact({ id: Date.now().toString(), name, phone });
    setName('');
    setPhone('');
    toast.success(`${name} added!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Users className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-bold">{t('contacts.title')}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t('contacts.subtitle')}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg space-y-5">
          {/* Counter */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < contacts.length ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {i + 1}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">{contacts.length}/5 {t('contacts.added')}</p>

          {/* Add form */}
          {contacts.length < 5 && (
            <form onSubmit={handleAdd} className="space-y-3">
              <input type="text" placeholder={t('contacts.name')} value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
              <input type="tel" placeholder={t('contacts.phone')} value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" required />
              <button type="submit" className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" /> {t('contacts.addContact')}
              </button>
            </form>
          )}

          {/* Contacts list */}
          <div className="space-y-2">
            {contacts.map((c) => (
              <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
                <button onClick={() => removeContact(c.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Continue */}
          <button
            onClick={() => navigate('/dashboard')}
            disabled={contacts.length < 5}
            className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('contacts.continue')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TrustedContacts;
