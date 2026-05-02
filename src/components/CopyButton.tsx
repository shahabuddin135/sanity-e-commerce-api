'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

type CopyButtonProps = {
    text?: string;
    textToCopy?: string;
};

export default function CopyButton({ text, textToCopy }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const value = text ?? textToCopy ?? '';

    const handleCopy = async () => {
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // ignore
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 text-[0.6rem] uppercase tracking-[0.15em] border px-2 py-1 shrink-0 transition-colors duration-200 ${
                copied
                    ? 'border-stone-400 text-stone-700'
                    : 'border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700'
            }`}
            aria-label="Copy to clipboard"
        >
            {copied ? (
                <>
                    <Check size={9} strokeWidth={2.5} />
                    <span>Copied</span>
                </>
            ) : (
                <>
                    <Copy size={9} strokeWidth={2} />
                    <span>Copy</span>
                </>
            )}
        </button>
    );
}
