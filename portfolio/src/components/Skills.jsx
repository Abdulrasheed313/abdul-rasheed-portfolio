import * as Icons from 'lucide-react';
import Reveal from './Reveal.jsx';
import { skills } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neon-cyan">Skills</p>
          <h2 className="section-title">Tools of the trade</h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, i) => {
            const Icon = Icons[skill.icon] || Icons.Circle;
            return (
              <Reveal key={skill.name} delay={(i % 4) * 0.05}>
                <li className="group glass relative h-full overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.35)]">
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 p-2.5 text-neon-cyan transition group-hover:scale-110">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium leading-snug text-slate-200">{skill.name}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
