'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import nextDynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useBaseUrl } from '@/lib/useBaseUrl';

const JsonCrackCanvas = nextDynamic(() => import('./JsonCrackCanvas'), { ssr: false });

type Tab = 'products' | 'images';

const tabs: { id: Tab; label: string; path: string }[] = [
  { id: 'products', label: 'Products', path: '/api/products' },
  { id: 'images',   label: 'Images',   path: '/api/images'   },
];

export default function VisualizePage() {
  const baseUrl    = useBaseUrl();

  const [activeTab,  setActiveTab]  = useState<Tab>('products');
  const [data,       setData]       = useState<object | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  useEffect(() => {
    if (!baseUrl) return;
    const tab = tabs.find((t) => t.id === activeTab);
    if (!tab) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetch(`${baseUrl}${tab.path}`)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((json) => setData(json))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [baseUrl, activeTab]);

  return (
    <main className="bg-[#F4F0E6] min-h-screen flex flex-col">

      {/* ── HEADER ──────────────────────────────────────── */}
      <section className="border-b border-stone-200 px-8 lg:px-16 xl:px-20 pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">Visualize</span>
            <span className="h-px flex-1 bg-stone-200 max-w-[6rem]" />
          </div>

          <h1
            className="font-serif italic font-light text-stone-900 leading-[0.9] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            JSON Graph<br />Explorer.
          </h1>
          <p className="text-sm text-stone-500 max-w-lg leading-relaxed">
            Powered by{' '}
            <a
              href="https://jsoncrack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 underline underline-offset-2 hover:text-stone-900"
            >
              JSON Crack
            </a>
            {' '}— pan, zoom, and explore the API response as an interactive node graph.
          </p>
        </motion.div>
      </section>

      {/* ── TOOLBAR ─────────────────────────────────────── */}
      <section className="border-b border-stone-200 px-8 lg:px-16 xl:px-20 py-4 flex flex-wrap items-center gap-6">
        {/* Tab switcher */}
        <div className="flex items-center gap-0 border border-stone-200 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 text-[0.6rem] uppercase tracking-[0.22em] transition-colors ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-stone-100'
                  : 'bg-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>



      </section>

      {/* ── CANVAS ──────────────────────────────────────── */}
      <section className="flex-1 relative flex flex-col">
        {/* Status overlay */}
        {(loading || error || !baseUrl || !data) && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#F4F0E6]/80">
            {!baseUrl && (
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-400">Initialising…</p>
            )}
            {baseUrl && loading && (
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-400 animate-pulse">
                Loading data…
              </p>
            )}
            {error && (
              <p className="text-[0.6rem] uppercase tracking-[0.22em] text-red-400">
                Error — {error}
              </p>
            )}
          </div>
        )}

        {data && <JsonCrackCanvas json={JSON.stringify(data)} />}
      </section>

    </main>
  );
}
