import { Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile.js';

const navLinks = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-ink-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-bold gradient-text">{profile.shortName}.</p>
          <p className="mt-3 max-w-xs text-sm text-slate-400">{profile.name}, {profile.title}.</p>
          <div className="mt-5 flex gap-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-neon-cyan/50 hover:text-white"><Linkedin size={16} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-neon-cyan/50 hover:text-white"><Mail size={16} /></a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">Quick links</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map(([label, href]) => (
              <li key={href}><a href={href} className="text-slate-400 transition hover:text-white">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="md:text-right">
          <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-neon-cyan/50 hover:text-white">
            Back to top
          </a>
          <p className="mt-6 text-xs text-slate-500">&copy; {year} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
