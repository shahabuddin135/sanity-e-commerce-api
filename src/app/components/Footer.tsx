import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-[#F4F0E6] mt-24">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif italic text-2xl text-stone-800 mb-4 leading-none">
              furniture<span className="not-italic text-stone-300 mx-[2px]">·</span>api
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-[220px]">
              A free, open REST API for furniture product data. No auth. No limits. No cost.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 mb-5">Navigation</p>
            <nav className="flex flex-col gap-3">
              {[
                ['/', 'Home'],
                ['/docs', 'API Docs'],
                ['/visualize', 'Visualize'],
                ['/sanity-guide', 'Sanity Guide'],
                ['/about', 'About'],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* API */}
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 mb-5">Endpoints</p>
            <div className="flex flex-col gap-3">
              <Link href="/api/products" className="text-xs font-mono text-stone-500 hover:text-stone-900 transition-colors">
                /api/products
              </Link>
              <Link href="/api/images" className="text-xs font-mono text-stone-500 hover:text-stone-900 transition-colors">
                /api/images
              </Link>
              <a
                href="https://github.com/shahabuddin135"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stone-400 hover:text-stone-700 transition-colors mt-2 flex items-center gap-1.5"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300">
            © {year} Furniture API — MIT License
          </p>
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300">
            Free · Open · Public
          </p>
        </div>
      </div>
    </footer>
  )
}

