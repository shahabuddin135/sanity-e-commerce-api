'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Youtube, Linkedin, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Github,   href: 'https://github.com/shahabuddin135',                    label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shahab-uddin-368086300/',  label: 'LinkedIn' },
  { icon: Youtube,  href: 'https://www.youtube.com/@voyagershahab',               label: 'YouTube'  },
];

export default function About() {
  return (
    <main className="bg-[#F4F0E6] min-h-screen">

      {/* ── HERO PORTRAIT ─────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen border-b border-stone-200">
        {/* Left — image */}
        <motion.div
          className="relative h-[65vh] lg:h-screen overflow-hidden order-2 lg:order-1"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="https://res.cloudinary.com/didt1ywys/image/upload/v1777747574/grainy-profic_nksp2z.png"
            alt="Shahabuddin — developer"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="img-grain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-[0.55rem] uppercase tracking-[0.3em] text-white/50 z-20">
            Portrait
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          className="flex flex-col justify-between pt-28 pb-16 px-8 lg:px-16 xl:px-20 order-1 lg:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {/* Top label */}
          <div className="flex items-center gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">Developer</span>
            <span className="h-px flex-1 bg-stone-200" />
            <span className="text-[0.6rem] font-mono text-stone-300">About</span>
          </div>

          {/* Main content */}
          <div>
            <h1
              className="font-serif italic font-light text-stone-900 leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              Shahab<br />uddin.
            </h1>

            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-500 mb-3">
              AI Engineer · Software Lead · Founder
            </p>

            <div className="h-px bg-stone-200 mb-8 w-16" />

            <p className="text-sm text-stone-600 leading-relaxed max-w-sm mb-5">
              Full-stack AI engineer building production SaaS, autonomous agents, and
              developer tools. Creator of SLC — a language framework for orchestrating
              AI agents toward project completion with minimal token overhead.
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm mb-12">
              Co-founder of 24/7 AI Technologies. Software Lead at 24/7 Logistics.
              Currently building Wise Manager and WeWise Labs products.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-stone-500 border border-stone-200 px-3 py-2 hover:border-stone-800 hover:text-stone-900 hover:bg-stone-50 transition-all duration-200"
                >
                  <s.icon className="w-3 h-3" />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom label */}
          <div className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300">
            Voyagers Creative
          </div>
        </motion.div>
      </section>

      {/* ── SECONDARY IMAGE BAND ──────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[50vh]">
          {[
            '/images/mirrors-main.jpeg',
            '/images/flower-lamp-main.jpeg',
            '/images/round-table-main.jpeg',
          ].map((src, i) => (
            <motion.div
              key={src}
              className="relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="img-grain" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
          <div className="flex items-center gap-4 mb-14">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Experience</p>
            <span className="h-px flex-1 bg-stone-200" />
          </div>

          <div className="space-y-0 max-w-3xl">
            {[
              {
                role: 'Co-Founder & Software Lead',
                org: '24/7 AI Technologies',
                period: 'Current',
                note: 'Co-founded with the CEO of 24/7 Logistics. Building an IT company focused on AI-driven enterprise solutions. Currently in formation.',
              },
              {
                role: 'Software Lead',
                org: '24/7 Logistics — 24x7logistics.com.pk',
                period: 'Current',
                note: 'Appointed to lead the software division. Responsible for architecting and delivering the company\'s digital infrastructure.',
              },
              {
                role: 'Full-Stack Developer & Team Lead',
                org: 'WeWise Labs — wewiselabs.com',
                period: '8 months · Current',
                note: 'R&D, team leadership, and product development. Building AI SaaS products with Next.js, Sanity CMS, Cloudinary, and OpenAI integration.',
              },
              {
                role: 'Next.js Developer',
                org: 'Techverse51 — techverse51.com',
                period: '1+ year',
                note: 'Led frontend architecture for an LMS platform. Managed UI systems, performance, and coordinated with backend and product teams.',
              },
              {
                role: 'Angular Developer — Internship',
                org: 'Panacloud — panacloud.com',
                period: '3 months',
                note: 'Developed ERP system modules using Angular and enterprise architecture patterns.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-[1fr_auto] gap-6 py-7 border-b border-stone-100 last:border-0 group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div>
                  <p className="font-serif italic text-lg text-stone-800 mb-0.5">{item.role}</p>
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-500 mb-3">{item.org}</p>
                  <p className="text-xs text-stone-400 leading-relaxed max-w-lg">{item.note}</p>
                </div>
                <p className="text-[0.6rem] font-mono text-stone-300 shrink-0 pt-1 whitespace-nowrap">{item.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
          <div className="flex items-center gap-4 mb-14">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Projects</p>
            <span className="h-px flex-1 bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200">
            {[
              {
                name: 'Wise Manager',
                tag: 'Product · In Development',
                desc: 'AI-native project management tool for small to medium teams. Like Jira and ClickUp, but with a built-in AI agent that autonomously handles the manual overhead of project management — task assignment, status updates, blockers, and reporting.',
                url: null,
              },
              {
                name: 'SLC — Spec Language for Cognition',
                tag: 'Language · Framework',
                desc: 'A purpose-built language and framework for orchestrating AI agents. Designed to direct agents toward project completion with precise task scoping, reducing token usage and preventing runaway context window consumption.',
                url: null,
              },
              {
                name: 'Business Automation Agents',
                tag: 'AI Agents · Automation',
                desc: 'Autonomous agents that handle end-to-end business operations: content creation, social media publishing, market research, and competitor analysis. Deliver structured weekly briefings and strategic suggestions to the owner.',
                url: null,
              },
              {
                name: 'Nodis',
                tag: 'Desktop App · Productivity',
                desc: 'Desktop productivity application using fun GIFs and distraction-blocking mechanics to help users stay focused and in flow.',
                url: 'https://nodis.wewiselabs.com',
              },
              {
                name: 'Coloriqo',
                tag: 'Design Tool',
                desc: 'Colour palette tool for developers and designers. Generates production-ready colour codes in three formats directly from palette selections.',
                url: 'https://coloriqo.wewiselabs.com',
              },
              {
                name: 'Edu Chat',
                tag: 'Hackathon · Team Lead · 24h',
                desc: 'Offline education platform with an integrated LLM system. Enables students to learn without internet access, with auto-generated quizzes and visual learning materials. Led a team of 4.',
                url: null,
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="bg-[#F4F0E6] p-8 flex flex-col gap-4 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-serif italic text-xl text-stone-800">{p.name}</p>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-300 hover:text-stone-700 transition-colors shrink-0 mt-1"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <p className="text-[0.55rem] uppercase tracking-[0.25em] text-stone-400">{p.tag}</p>
                <p className="text-xs text-stone-500 leading-relaxed flex-1">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREELANCE CLIENTS ─────────────────────────────── */}
      <section className="border-b border-stone-200">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
          <div className="flex items-center gap-4 mb-14">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Clients</p>
            <span className="h-px flex-1 bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {[
              {
                name: 'Techverse51',
                url: 'https://techverse51.com',
                desc: 'Full LMS platform. Led frontend architecture, UI systems, and performance.',
              },
              {
                name: 'Tanoli Removals',
                url: 'https://tanoliremovals.co.uk',
                desc: 'UK removals company. Built full website and booking flow.',
              },
              {
                name: 'Abeera Studio',
                url: 'https://abeera-studio.vercel.app',
                desc: 'Creative studio portfolio and showcase site.',
              },
            ].map((c, i) => (
              <motion.a
                key={i}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F4F0E6] p-8 flex flex-col gap-3 group hover:bg-stone-50 transition-colors duration-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-serif italic text-lg text-stone-800 group-hover:text-stone-900 transition-colors">{c.name}</p>
                  <ExternalLink size={12} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                </div>
                <p className="text-[0.55rem] font-mono text-stone-300">{c.url.replace('https://', '')}</p>
                <p className="text-xs text-stone-500 leading-relaxed">{c.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
        <div className="flex items-center gap-4 mb-14">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Skills</p>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              area: 'Languages & Frameworks',
              items: ['Next.js · React · TypeScript', 'Angular · Python · FastAPI', 'SLC (own language)', 'Tailwind CSS · GSAP'],
            },
            {
              area: 'AI & Agents',
              items: ['OpenAI Agents SDK', 'RAG System Design', 'LLM Integration', 'Business Automation Agents', 'SLC Framework (AI orchestration)'],
            },
            {
              area: 'Infrastructure & Tools',
              items: ['PostgreSQL · MySQL · Sanity CMS', 'Cloudinary · Vercel', 'Docker (learning) · Kubernetes', 'Git · GitHub · Figma'],
            },
          ].map(({ area, items }) => (
            <div key={area}>
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 mb-5">{area}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-stone-600">
                    <span className="text-stone-300 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-stone-200 flex flex-wrap items-center gap-6">
          <a
            href="mailto:voyagersvrs135@gmail.com"
            className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-600 hover:text-stone-900 transition-colors border-b border-stone-300 pb-0.5"
          >
            voyagersvrs135@gmail.com →
          </a>
          <Link
            href="/docs"
            className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 hover:text-stone-700 transition-colors"
          >
            Explore the API
          </Link>
          <a
            href="https://wewiselabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 hover:text-stone-700 transition-colors"
          >
            WeWise Labs
          </a>
        </div>
      </section>

    </main>
  );
}