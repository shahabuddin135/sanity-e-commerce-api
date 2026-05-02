'use client';

import { useRef } from 'react';
import { JSONCrack, type JSONCrackRef } from 'jsoncrack-react';

interface Props {
  json: string;
}

export default function JsonCrackCanvas({ json }: Props) {
  const crackerRef = useRef<JSONCrackRef>(null);

  return (
    <div className="flex-1 flex flex-col">
      {/* Zoom controls */}
      <div className="border-b border-stone-200 px-8 lg:px-16 xl:px-20 py-4 flex items-center gap-6">
        <div className="flex items-center gap-0 border border-stone-200 overflow-hidden ml-auto">
          <button
            onClick={() => crackerRef.current?.zoomIn()}
            className="px-4 py-2 text-[0.6rem] uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors border-r border-stone-200"
          >
            + Zoom In
          </button>
          <button
            onClick={() => crackerRef.current?.zoomOut()}
            className="px-4 py-2 text-[0.6rem] uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors border-r border-stone-200"
          >
            − Zoom Out
          </button>
          <button
            onClick={() => crackerRef.current?.centerView()}
            className="px-4 py-2 text-[0.6rem] uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            ⊙ Center
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full h-[calc(100vh-22rem)]" style={{ minHeight: '500px' }}>
        <JSONCrack
          ref={crackerRef}
          json={json}
          theme="light"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
