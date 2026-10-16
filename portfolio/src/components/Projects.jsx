import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { projects, projectCategories } from '../data/projects.js';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neon-cyan">Projects</p>
          <h2 className="section-title">Selected work</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="group" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  filter === cat
                    ? 'border-neon-cyan/60 bg-neon-cyan/10 text-white'
                    : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.id}>
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-neon-purple/40 hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.45)]">
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-purple-950/50">
                  <span className="rounded-full border border-neon-cyan/30 bg-ink-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                    Demo placeholder
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-wider text-neon-purple">{p.category}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{t}</span>
                    ))}
                  </div>
                  <a href={p.link} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon-cyan transition hover:gap-2">
                    View details <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
