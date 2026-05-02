'use client'

import Image from 'next/image'
import Link from 'next/link'
import CopyButton from '@/components/CopyButton'
import { motion } from 'framer-motion'
import { useBaseUrl } from '@/lib/useBaseUrl'

const GALLERY = [
  { src: '/images/white-sofa-main.jpeg',      label: 'Sofa',   aspect: 'tall'  },
  { src: '/images/black-chair-main.jpeg',     label: 'Chair',  aspect: 'short' },
  { src: '/images/marble-table-main (1).jpeg', label: 'Table',  aspect: 'short' },
  { src: '/images/brown-sofa-main.jpeg',      label: 'Lounge', aspect: 'tall'  },
]

const LINKS = [
  { href: '/docs',          label: 'API Docs',      num: '01' },
  { href: '/visualize',     label: 'Visualize',     num: '02' },
  { href: '/sanity-guide',  label: 'Sanity Guide',  num: '03' },
  { href: '/about',         label: 'Developer',     num: '04' },
]

const FEATURES = [
  ['Zero Auth',  'No API keys needed'],
  ['CORS Open',  'Works from any origin'],
  ['Read-only',  'Safe GET endpoints'],
  ['JSON',       'Standard REST format'],
]

export default function Home() {
  const baseUrl = useBaseUrl()

  return (
    <main className="bg-[#F4F0E6] overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* Left — copy */}
        <motion.div
          className="flex flex-col justify-between pt-28 pb-16 px-8 lg:px-16 xl:px-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {/* Top label bar */}
          <div className="flex items-center gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">REST API</span>
            <span className="h-px flex-1 bg-stone-200" />
            <span className="text-[0.6rem] font-mono text-stone-300">v1.0</span>
          </div>

          {/* Display headline */}
          <div>
            <h1
              className="font-serif italic font-light text-stone-900 leading-[0.88] tracking-[-0.015em] mb-8"
              style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7rem)' }}
            >
              Objects,<br />
              Beautifully<br />
              Served.
            </h1>

            <p className="text-sm text-stone-500 max-w-[280px] leading-relaxed mb-12">
              A free, open REST API returning structured furniture product data —
              products, images, metadata. No authentication required.
            </p>

            {/* Endpoints */}
            <div className="border-t border-stone-200 pt-8 space-y-5">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 mb-6">
                Endpoints
              </p>
              {[
                { path: 'api/products', desc: 'Full product catalog' },
                { path: 'api/images',   desc: 'All hosted image URLs' },
              ].map((ep, i) => (
                <div key={ep.path} className="group flex items-start gap-4">
                  <span className="text-[0.6rem] font-mono text-stone-300 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-stone-600 group-hover:text-stone-900 transition-colors truncate">
                      {baseUrl || 'https://your-domain.com'}/{ep.path}
                    </p>
                    <p className="text-[0.6rem] text-stone-400 mt-0.5">{ep.desc}</p>
                  </div>
                  <CopyButton text={`${baseUrl || 'https://your-domain.com'}/${ep.path}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom status */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-400">
              Free · Open · No Auth Required
            </span>
          </div>
        </motion.div>

        {/* Right — hero image */}
        <motion.div
          className="relative h-[65vh] lg:h-screen overflow-hidden"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/white-sofa-main.jpeg"
            alt="Elegant white sofa"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          <div className="absolute bottom-6 right-6 text-[0.55rem] uppercase tracking-[0.3em] text-white/50">
            01 / Hero
          </div>
        </motion.div>
      </section>

      {/* ── IMAGE GALLERY ──────────────────────────────────────── */}
      <section className="border-t border-stone-200 py-16 px-8 lg:px-16 xl:px-20">
        <div className="flex items-center gap-4 mb-10">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Product Catalog</p>
          <span className="h-px flex-1 bg-stone-200" />
          <p className="text-[0.6rem] font-mono text-stone-300 shrink-0">02 / Gallery</p>
        </div>

        {/* 4-column grid — first and last are taller */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.src}
              className="group relative overflow-hidden bg-stone-100"
              style={{ aspectRatio: img.aspect === 'tall' ? '3/4' : '4/5' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.04] group-hover:scale-100"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="absolute bottom-3 left-4 text-[0.55rem] uppercase tracking-[0.28em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPLORE GRID ───────────────────────────────────────── */}
      <section className="border-t border-stone-200 py-16 px-8 lg:px-16 xl:px-20">
        <div className="flex items-center gap-4 mb-12">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Explore</p>
          <span className="h-px flex-1 bg-stone-200" />
          <p className="text-[0.6rem] font-mono text-stone-300 shrink-0">03 / Navigation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-stone-200">
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border-r border-b border-stone-200 px-8 py-10 hover:bg-stone-100/60 transition-colors"
            >
              <p className="text-[0.6rem] font-mono text-stone-300 mb-5">{link.num}</p>
              <p className="font-serif italic text-[1.6rem] leading-tight text-stone-700 group-hover:text-stone-900 transition-colors mb-4">
                {link.label}
              </p>
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-400 group-hover:text-stone-600 transition-colors">
                View →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SECOND IMAGE — full bleed mood shot ────────────────── */}
      <section className="border-t border-stone-200">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src="/images/lava-lamp-main.jpeg"
            alt="Lava lamp"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0D0C09]/30" />
          {/* Centered overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/50 mb-4">
              04 / About the API
            </p>
            <h2
              className="font-serif italic font-light text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              Designed for Developers,<br />Inspired by Objects.
            </h2>
          </div>
          <div className="absolute bottom-6 right-8 text-[0.55rem] uppercase tracking-[0.3em] text-white/40">
            04 / Mood
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ───────────────────────────────────────── */}
      <section className="border-t border-stone-200 border-b">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-200">
          {FEATURES.map(([title, desc]) => (
            <div key={title} className="px-8 py-10">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-700 mb-2 font-medium">{title}</p>
              <p className="text-[0.6rem] text-stone-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

