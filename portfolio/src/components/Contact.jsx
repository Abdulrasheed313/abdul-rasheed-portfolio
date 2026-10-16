import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { profile } from '../data/profile.js';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const serviceOptions = [
  'Custom WordPress Website Development',
  'Figma/XD to WordPress Conversion',
  'Elementor & WPBakery Development',
  'WooCommerce & E-commerce Stores',
  'WordPress Theme Customization',
  'Shopify Store Development',
  'HTML to WordPress Conversion',
  'HTML to Laravel Integration',
  'Other',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition duration-300 focus:bg-ink-900 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18),0_0_24px_-6px_rgba(168,85,247,0.4)] ${
    hasError ? 'border-red-500/60' : 'border-white/10 focus:border-neon-cyan/60'
  }`;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', subject: '', service: '', budget: '', message: '', consent: false, website: '' },
    mode: 'onTouched',
  });

  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const inFlight = useRef(false);

  const onSubmit = async (data) => {
    // Honeypot: real users leave this empty; bots tend to fill it.
    if (data.website) {
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' });
      reset();
      return;
    }
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus({ type: 'loading', message: 'Sending your message…' });

    try {
      if (!emailjsConfigured) {
        throw new Error('Contact form is not configured yet. Please email me directly.');
      }
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          service: data.service,
          budget: data.budget || 'Not specified',
          message: data.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent. I will get back to you soon.' });
      reset();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message && !err.status
          ? err.message
          : 'Something went wrong and your message was not sent. Please try again or email me directly.',
      });
    } finally {
      inFlight.current = false;
    }
  };

  const busy = isSubmitting || status.type === 'loading';

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neon-cyan">Contact</p>
          <h2 className="section-title">Let&apos;s build something great together.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            Have a project in mind? Share a few details and I will get back to you to discuss the next steps.
          </p>

          <ul className="mt-10 space-y-5">
            <li>
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 text-slate-200 transition hover:text-white">
                <span className="rounded-xl bg-white/5 p-3 text-neon-purple transition group-hover:bg-neon-purple/15"><Mail size={18} aria-hidden="true" /></span>
                {profile.email}
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="group flex items-center gap-4 text-slate-200 transition hover:text-white">
                <span className="rounded-xl bg-white/5 p-3 text-neon-blue transition group-hover:bg-neon-blue/15"><Phone size={18} aria-hidden="true" /></span>
                {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-slate-200 transition hover:text-white">
                <span className="rounded-xl bg-white/5 p-3 text-neon-cyan transition group-hover:bg-neon-cyan/15"><Linkedin size={18} aria-hidden="true" /></span>
                LinkedIn profile
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass glow-border relative rounded-3xl p-6 sm:p-8" aria-describedby="form-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" id="name" error={errors.name?.message} required>
                <input id="name" autoComplete="name" className={inputClass(errors.name)} placeholder="Jane Doe"
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name', { required: 'Please enter your name.', minLength: { value: 2, message: 'Name must be at least 2 characters.' } })} />
              </Field>

              <Field label="Email address" id="email" error={errors.email?.message} required>
                <input id="email" type="email" autoComplete="email" className={inputClass(errors.email)} placeholder="you@company.com"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email', { required: 'Please enter your email address.', pattern: { value: EMAIL_RE, message: 'Please enter a valid email address.' } })} />
              </Field>

              <Field label="Subject" id="subject" error={errors.subject?.message} required className="sm:col-span-2">
                <input id="subject" className={inputClass(errors.subject)} placeholder="E.g. New WooCommerce store"
                  aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined}
                  {...register('subject', { required: 'Please add a subject.' })} />
              </Field>

              <Field label="Service" id="service" error={errors.service?.message} required>
                <select id="service" className={inputClass(errors.service)} aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                  {...register('service', { required: 'Please choose a service.' })}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((o) => <option key={o} value={o} className="bg-ink-900">{o}</option>)}
                </select>
              </Field>

              <Field label="Project budget (optional)" id="budget">
                <input id="budget" className={inputClass(false)} placeholder="E.g. $500 – $1,000" {...register('budget')} />
              </Field>

              <Field label="Message" id="message" error={errors.message?.message} required className="sm:col-span-2">
                <textarea id="message" rows={5} className={inputClass(errors.message)} placeholder="Tell me about your project, goals and timeline."
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message', { required: 'Please write a message.', minLength: { value: 20, message: 'Please share at least 20 characters.' } })} />
              </Field>
            </div>

            {/* Honeypot: hidden from people, visible to bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-slate-400">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-ink-900 accent-neon-purple"
                {...register('consent', { validate: (v) => v === true || 'Please agree to the privacy policy to continue.' })} />
              <span>I agree that my details may be used to reply to this enquiry.</span>
            </label>
            {errors.consent && <p id="consent-error" role="alert" className="mt-2 text-xs text-red-400">{errors.consent.message}</p>}

            <button type="submit" disabled={busy} aria-busy={busy}
              className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
              {busy ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…</> : <>Send message <Send size={16} aria-hidden="true" /></>}
            </button>

            <div id="form-status" role="status" aria-live="polite" className="mt-5 min-h-[1.5rem] text-sm">
              {status.type === 'success' && <p className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={16} aria-hidden="true" />{status.message}</p>}
              {status.type === 'error' && <p role="alert" className="flex items-center gap-2 text-red-400"><AlertCircle size={16} aria-hidden="true" />{status.message}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, id, error, required, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}{required && <span className="text-neon-cyan"> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
