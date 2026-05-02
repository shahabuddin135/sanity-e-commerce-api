'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/visualize', label: 'Visualize' },
  { href: '/sanity-guide', label: 'Sanity' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-stone-200/70 ${
        scrolled ? 'bg-[#F4F0E6]/92 backdrop-blur-md' : 'bg-[#F4F0E6]/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif italic text-[1.1rem] leading-none text-stone-800 hover:text-stone-500 transition-colors"
        >
          furniture<span className="not-italic text-stone-300 mx-[2px]">·</span>api
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 text-stone-600 hover:text-stone-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-current origin-center transition-all duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-current origin-center transition-all duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-72 border-t border-stone-200' : 'max-h-0'} bg-[#F4F0E6]`}>
        <nav className="px-8 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[0.625rem] uppercase tracking-[0.3em] text-stone-600 hover:text-stone-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

