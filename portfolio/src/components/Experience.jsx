import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neon-cyan">Experience</p>
          <h2 className="section-title">Work timeline</h2>
        </Reveal>

        <ol className="relative mt-14 border-l border-white/10 pl-8">
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-neon-purple via-neon-blue to-neon-cyan"
            style={{ height: '100%', left: -0.5 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative mb-12 last:mb-0"
            >
              <span aria-hidden="true" className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_12px_#22d3ee]" />
              <p className="text-xs uppercase tracking-wider text-neon-cyan">{job.period}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">{job.role}</h3>
              <p className="text-sm text-slate-400">{job.company}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.points.map((pt) => (
                  <li key={pt} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
