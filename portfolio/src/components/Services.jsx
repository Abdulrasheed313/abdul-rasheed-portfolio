import { useRef } from 'react';
import * as Icons from 'lucide-react';
import Reveal from './Reveal.jsx';
import { services } from '../data/services.js';

function TiltCard({ service }) {
  const ref = useRef(null);
  const Icon = Icons[service.icon] || Icons.Circle;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="glass group h-full rounded-2xl p-7 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-neon-purple/40 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue p-3 text-white shadow-lg shadow-purple-700/30 transition group-hover:scale-110">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.description}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neon-cyan">Services</p>
          <h2 className="section-title">How I can help</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <TiltCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
