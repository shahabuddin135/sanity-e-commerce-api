'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Image from 'next/image';
import CopyButton from '@/components/CopyButton';

const steps = [
  {
    title: 'Login to Sanity and Create API Token',
    content: [
      'Go to Sanity.io and log in to your account.',
      'Navigate to your project where you want to upload data.',
      'Click on the API tab.',
      'Under Tokens, click Add API Token.',
      'Name your token and select Editor permissions.',
      'Copy the generated token.',
    ],
  },
  {
    title: 'Set Up Environment Variables',
    content: [
      'Open your project in VS Code.',
      'In the root of your project, create a file named .env.local if it doesn\'t already exist.',
      'Add the following variables to the .env.local file:',
    ],
    lang: 'bash',
    code: `NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=your_sanity_token`,
  },
  {
    title: 'Install Required Packages',
    content: ['Run the following commands in your terminal:'],
    lang: 'bash',
    code: 'npm install @sanity/client axios dotenv',
  },
  {
    title: 'Create Sanity Schema',
    content: [
      'In your Sanity studio, create a new schema for your products.',
      'Navigate to the schemas directory and create product.js.',
    ],
    code: `export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'id',          title: 'ID',          type: 'string' },
    { name: 'name',        title: 'Name',        type: 'string' },
    { name: 'description', title: 'Description', type: 'text'   },
    { name: 'price',       title: 'Price',       type: 'number' },
    { name: 'mainImage',   title: 'Main Image',  type: 'string' },
    {
      name: 'sideAngleImages',
      title: 'Side Angle Images',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}`,
  },
  {
    title: 'Create the Import Script',
    content: [
      'In the root of your project, create a folder named scripts.',
      'Inside scripts, create importSanityData.mjs and paste the following:',
    ],
    code: `import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn:    false,
  token:     process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-08-31',
});

async function uploadImageToSanity(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer  = Buffer.from(response.data);
  const asset   = await client.assets.upload('image', buffer, {
    filename: url.split('/').pop(),
  });
  return { _type: 'image', asset: { _ref: asset._id } };
}

async function importProducts() {
  // Replace with your deployed API base URL
  const { data: products } = await axios.get('https://your-domain.com/api/products');

  for (const product of products) {
    const mainImage = await uploadImageToSanity(product.mainImage);
    const sideAngleImages = (
      await Promise.all(
        product.sideAngleImages.map(async ({ key, url }) => {
          const img = await uploadImageToSanity(url);
          return img ? { _key: key, key, image: img } : null;
        })
      )
    ).filter(Boolean);

    await client.create({ _type: 'product', ...product, mainImage, sideAngleImages });
    console.log('Uploaded:', product.name);
  }
}

importProducts();`,
  },
  {
    title: 'Add Script to package.json',
    content: ['Open package.json and add to the scripts section:'],
    lang: 'json',
    code: `"scripts": {
  "import-data": "node scripts/importSanityData.mjs"
}`,
  },
  {
    title: 'Execute the Import',
    content: [
      'Ensure all previous steps are complete.',
      'Run the import script and watch the terminal for progress logs.',
    ],
    lang: 'bash',
    code: 'npm run import-data',
  },
  {
    title: 'Best Practices',
    content: [
      'Never commit .env files to version control.',
      'Use different tokens for development and production.',
      'Validate and sanitise data before uploading.',
      'Batch uploads for large datasets to avoid rate limiting.',
      'Always back up your Sanity dataset before bulk imports.',
      'Test with a small dataset first.',
    ],
  },
];

export default function SanityGuide() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <main className="bg-[#F4F0E6] min-h-screen">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative border-b border-stone-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[52vh]">
          {/* Text */}
          <div className="flex flex-col justify-between pt-28 pb-14 px-8 lg:px-16 xl:px-20">
            <div className="flex items-center gap-4">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">Guide</span>
              <span className="h-px flex-1 bg-stone-200" />
              <span className="text-[0.6rem] font-mono text-stone-300">Sanity CMS</span>
            </div>
            <div>
              <h1
                className="font-serif italic font-light text-stone-900 leading-[0.9] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                Import Data<br />into Sanity.
              </h1>
              <p className="text-sm text-stone-500 max-w-sm leading-relaxed">
                A step-by-step guide to uploading your products and images
                into Sanity CMS using the REST API and a Node.js script.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[40vh] lg:h-auto overflow-hidden">
            <Image
              src="/images/white-sofa-main.jpeg"
              alt=""
              fill
              className="object-cover grayscale"
            />
            <div className="img-grain" />
            <div className="absolute inset-0 bg-[#F4F0E6]/20" />
          </div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 py-20">
        <div className="flex items-center gap-4 mb-14">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">
            {steps.length} Steps
          </span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="max-w-3xl">
          {steps.map((step, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`border-b border-stone-200 last:border-b-0 transition-colors duration-200 ${isOpen ? 'bg-stone-50/60' : ''}`}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className={`w-full flex items-baseline gap-6 py-6 text-left group hover:bg-stone-50 transition-colors duration-150 px-2 -mx-2 ${isOpen ? 'bg-stone-50/60' : ''}`}
                >
                  <span className="text-[0.6rem] font-mono text-stone-300 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-serif italic text-xl transition-colors flex-1 ${isOpen ? 'text-stone-900' : 'text-stone-800 group-hover:text-stone-900'}`}>
                    {step.title}
                  </span>
                  <span
                    className={`text-xs font-mono shrink-0 transition-all duration-300 ${isOpen ? 'text-stone-700 rotate-180' : 'text-stone-300 group-hover:text-stone-600'}`}
                    style={{ display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  >
                    ↓
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-12 space-y-2">
                        <ul className="space-y-1.5 mb-5">
                          {step.content.map((line, j) => (
                            <li key={j} className="flex gap-3 text-sm text-stone-600 leading-relaxed">
                              <span className="text-stone-300 shrink-0">—</span>
                              {line}
                            </li>
                          ))}
                        </ul>
                        {step.code && (
                          <div className="border border-stone-200 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-stone-200 bg-stone-100/60">
                              <span className="text-[0.55rem] uppercase tracking-[0.22em] text-stone-400">Code</span>
                              <CopyButton text={step.code} />
                            </div>
                            <SyntaxHighlighter
                              language={step.lang ?? 'javascript'}
                              style={atomOneLight}
                              customStyle={{
                                margin: 0,
                                background: '#FDFCF9',
                                fontSize: '0.77rem',
                                padding: '1.25rem 1.5rem',
                                lineHeight: '1.7',
                              }}
                            >
                              {step.code}
                            </SyntaxHighlighter>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
