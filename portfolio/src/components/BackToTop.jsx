import { useEffect, useState } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { profile } from '../data/profile.js';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <a
        href="#contact"
        aria-label="Go to contact form"
        className="glass flex h-11 w-11 items-center justify-center rounded-full text-neon-cyan transition hover:-translate-y-0.5 hover:border-neon-cyan/50"
      >
        <Mail size={18} aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`glass flex h-11 w-11 items-center justify-center rounded-full text-white transition duration-300 hover:-translate-y-0.5 ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        tabIndex={visible ? 0 : -1}
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
      <span className="sr-only">{profile.email}</span>
    </div>
  );
}
