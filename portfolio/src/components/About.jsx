import { Briefcase, MapPin, Code2 } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { profile } from '../data/profile.js';
import { experience } from '../data/experience.js';

const facts = [
  { icon: Briefcase, label: 'Current role', value: 'Senior WordPress Developer' },
  { icon: Code2, label: 'Focus', value: 'WordPress, WooCommerce & Custom Themes' },
  { icon: MapPin, label: 'Based in', value: 'Pakistan' },
];

const strengths = [
  'Converting Figma and Adobe XD designs into WordPress websites',
  'WordPress theme customization and backend development',
  'HTML-to-WordPress and HTML-to-Laravel development',
  'E-commerce development and Shopify',
];

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-5 lg:px-8">
        <Reveal className="lg:col-span-2">
          <div className="glass relative overflow-hidden rounded-3xl p-8 glow-border">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon-purple/20 blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan font-display text-2xl font-bold text-white">
                {profile.shortName}
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{profile.name}</h3>
              <p className="mt-1 text-neon-cyan">{profile.title}</p>
              <ul className="mt-8 space-y-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 text-neon-purple" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
                      <p className="text-sm text-slate-200">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-3">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neon-cyan">About me</p>
            <h2 className="section-title">Senior WordPress Developer with e-commerce experience.</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              I build professional and e-commerce websites, turning design files into fast, responsive WordPress sites
              that are easy for clients to manage. My work spans custom theme development, page builders, WooCommerce
              stores and front-end integrations with Laravel and Shopify.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {strengths.map((s) => (
                <li key={s} className="glass rounded-2xl p-5 text-sm leading-relaxed text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-neon-purple/40">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {experience.map((job) => (
                <div key={job.company} className="rounded-2xl border border-white/10 p-5">
                  <p className="font-display text-base font-semibold text-white">{job.company}</p>
                  <p className="mt-1 text-xs text-slate-400">{job.role}</p>
                  <p className="mt-3 text-xs text-neon-cyan">{job.period}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
