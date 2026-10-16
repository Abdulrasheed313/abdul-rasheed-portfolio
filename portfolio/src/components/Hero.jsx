import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { profile } from '../data/profile.js';
import { heroBadges } from '../data/skills.js';
import { useCanRender3D } from '../hooks/useCanRender3D.js';

const ThreeDScene = lazy(() => import('./ThreeDScene.jsx'));

const headlineWords = profile.headline.split(' ');

const badgePositions = [
  'top-[18%] left-[4%]',
  'top-[30%] right-[2%]',
  'bottom-[26%] left-[0%]',
  'bottom-[18%] right-[6%]',
  'top-[6%] right-[26%]',
];

export default function Hero() {
  const can3D = useCanRender3D();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      {/* Ambient gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-neon-purple/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-neon-cyan/15 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-neon-blue/10 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-slate-300 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#22d3ee]" />
            {profile.title}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="sr-only">{profile.name}. {profile.headline}</span>
            <span aria-hidden="true">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`mr-[0.25em] inline-block ${
                    ['High-Performance', 'Creative'].includes(word) ? 'gradient-text' : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            <span className="font-medium text-slate-200">{profile.name}.</span> {profile.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary">View My Projects <ArrowRight size={18} /></a>
            <a href="#contact" className="btn-ghost">Let&apos;s Work Together</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-full border border-white/10 p-2.5 text-slate-300 transition hover:border-neon-cyan/50 hover:text-white">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Send email" className="rounded-full border border-white/10 p-2.5 text-slate-300 transition hover:border-neon-cyan/50 hover:text-white">
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Visual column */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <div className="glass absolute inset-6 rounded-[2rem] glow-border" aria-hidden="true" />
          {can3D ? (
            <Suspense fallback={<FallbackOrb />}>
              <div className="absolute inset-0"><ThreeDScene /></div>
            </Suspense>
          ) : (
            <FallbackOrb />
          )}

          {heroBadges.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              className={`absolute ${badgePositions[i]} animate-float rounded-full border border-white/10 bg-ink-900/70 px-3.5 py-1.5 text-xs font-medium text-slate-200 shadow-lg shadow-black/40 backdrop-blur-md`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-slate-500 transition hover:text-slate-300"
      >
        <span>Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}

function FallbackOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="h-56 w-56 rounded-full bg-gradient-to-br from-neon-purple via-neon-blue to-neon-cyan opacity-70 blur-sm animate-float" />
    </div>
  );
}
