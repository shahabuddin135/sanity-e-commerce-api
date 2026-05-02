"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ChevronDown } from "lucide-react";
import { useBaseUrl } from "@/lib/useBaseUrl";
import CopyButton from "@/components/CopyButton";
import Image from "next/image";

const endpoints = [
  {
    title: "Get All Products",
    method: "GET",
    path: "/api/products",
    description: "Retrieve a list of all products in the catalog as a JSON array.",
    responseFields: [
      { name: "id", description: "Unique product identifier" },
      { name: "name", description: "Product name" },
      { name: "description", description: "Detailed product description" },
      { name: "price", description: "Current price (in paise/cents)" },
      { name: "originalPrice", description: "Original price before discount" },
      { name: "discount", description: "Discount percentage" },
      { name: "category", description: "Product category" },
      { name: "tags", description: "Array of product tags" },
      { name: "mainImage", description: "Main product image URL object" },
      { name: "sideAngleImages", description: "Array of angle image URLs" },
      { name: "color", description: "Available colors" },
      { name: "sizes", description: "Available sizes" },
      { name: "stock", description: "Current stock count" },
      { name: "dimensions", description: "Product dimensions (width, height, depth, weight)" },
      { name: "material", description: "Primary material used" },
      { name: "warranty", description: "Warranty details object" },
      { name: "rating", description: "Rating average and breakdown" },
      { name: "features", description: "Array of product feature strings" },
    ],
    exampleResponse: `[
  {
    "id": "SS002",
    "name": "Modern Leather Sofa",
    "price": 320000,
    "originalPrice": 350000,
    "discount": 8.57,
    "category": "Sofas",
    "tags": ["Leather", "Modern", "Luxury"],
    "mainImage": "https://BASE_URL/images/bed-main.jpeg",
    "sideAngleImages": [
      { "key": "side1", "url": "https://BASE_URL/images/bed%20(5).jpeg" }
    ],
    "color": ["Black", "Brown"],
    "stock": 8,
    "material": "Genuine Leather",
    "warranty": { "summary": "2 Years Warranty" },
    "rating": { "average": 4.6 }
  }
]`,
  },
  {
    title: "Get Single Product",
    method: "GET",
    path: "/api/products/[id]",
    description: "Retrieve details of a specific product by its ID.",
    responseFields: [
      { name: "id", description: "Unique product identifier" },
      { name: "name", description: "Product name" },
      { name: "price", description: "Current price" },
      { name: "mainImage", description: "Main product image URL" },
      { name: "sideAngleImages", description: "Array of angle image objects" },
      { name: "warranty", description: "Warranty details object" },
      { name: "rating", description: "Rating average and breakdown" },
      { name: "features", description: "Array of product feature strings" },
    ],
    exampleResponse: `{
  "id": "SS002",
  "name": "Modern Leather Sofa",
  "price": 320000,
  "mainImage": "https://BASE_URL/images/bed-main.jpeg",
  "warranty": { "summary": "2 Years Warranty" },
  "rating": { "average": 4.6 },
  "features": ["Maximum Load Capacity: 300 KG", "Handmade: Yes"]
}`,
  },
  {
    title: "Get All Images",
    method: "GET",
    path: "/api/images",
    description: "Retrieve a list of all available hosted images with their full absolute URLs.",
    responseFields: [
      { name: "images", description: "Array of image objects" },
      { name: "name", description: "Image filename" },
      { name: "url", description: "Full absolute URL (reflects current host)" },
    ],
    exampleResponse: `{
  "images": [
    {
      "name": "bed-main.jpeg",
      "url": "https://BASE_URL/images/bed-main.jpeg"
    },
    {
      "name": "bed%20(5).jpeg",
      "url": "https://BASE_URL/images/bed%20(5).jpeg"
    }
  ]
}`,
  },
  {
    title: "Access Individual Image",
    method: "GET",
    path: "/images/[filename]",
    description: "Directly access a specific image file by its filename from the public directory.",
    responseFields: [
      { name: "—", description: "Returns the raw image binary (JPEG / PNG / WebP)" },
    ],
    exampleResponse: `// Direct browser URL — returns the image file:
https://BASE_URL/images/bed-main.jpeg`,
  },
];

function EndpointRow({
  ep,
  index,
  open,
  toggle,
  baseUrl,
}: {
  ep: (typeof endpoints)[0];
  index: number;
  open: boolean;
  toggle: () => void;
  baseUrl: string;
}) {
  const displayUrl = (s: string) =>
    baseUrl ? s.replace(/BASE_URL/g, baseUrl.replace(/^https?:\/\//, "")) : s;

  const fullUrl = `${baseUrl || "https://your-domain.com"}${ep.path}`;

  return (
    <div className="border-b border-stone-200 last:border-b-0 transition-colors duration-150 hover:bg-stone-50/50">
      <button
        onClick={toggle}
        className={`w-full flex items-center gap-6 py-6 text-left group transition-colors duration-150 ${open ? 'bg-stone-50/70' : ''}`}
      >
        <span className="text-[0.6rem] font-mono text-stone-300 shrink-0 w-6">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-400 shrink-0 w-8 font-mono bg-stone-100 border border-stone-200 px-1.5 py-0.5">
          {ep.method}
        </span>
        <code className={`flex-1 text-xs font-mono truncate transition-colors ${
          open ? 'text-stone-900' : 'text-stone-700 group-hover:text-stone-900'
        }`}>
          {ep.path}
        </code>
        <span className="hidden md:block text-[0.6rem] text-stone-400 shrink-0 max-w-[240px] truncate">
          {ep.description}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-stone-700' : 'text-stone-400 group-hover:text-stone-600'}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-14 space-y-8">
              <div className="flex items-center gap-3">
                <code className="flex-1 text-xs font-mono text-stone-600 bg-stone-100 border border-stone-200 px-4 py-2.5 overflow-x-auto block">
                  {fullUrl}
                </code>
                <CopyButton text={fullUrl} />
              </div>

              <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">
                {ep.description}
              </p>

              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400 mb-4">
                  Response Fields
                </p>
                <div className="space-y-3 border-t border-stone-200 pt-4">
                  {ep.responseFields.map((field, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <code className="shrink-0 text-[0.7rem] font-mono text-stone-600 w-36 pt-0.5">
                        {field.name}
                      </code>
                      <span className="text-xs text-stone-400 leading-relaxed">
                        {field.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone-400">
                    Example Response
                  </p>
                  <CopyButton text={displayUrl(ep.exampleResponse)} />
                </div>
                <div className="border border-stone-200 overflow-hidden">
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneLight}
                    customStyle={{
                      margin: 0,
                      background: "#FAF8F4",
                      fontSize: "0.72rem",
                      padding: "1.25rem 1.5rem",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {displayUrl(ep.exampleResponse)}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DocsPage() {
  const baseUrl = useBaseUrl();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <main className="bg-[#F4F0E6] min-h-screen">
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image
            src="/images/white-chair-main.jpeg"
            alt="Chair"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F0E6] via-[#F4F0E6]/50 to-transparent" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400">Reference</span>
              <span className="h-px w-16 bg-stone-200" />
            </div>
            <h1
              className="font-serif italic font-light text-stone-900 leading-[0.9] mb-6"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
            >
              API<br />Reference.
            </h1>
            <p className="text-sm text-stone-500 max-w-md leading-relaxed mb-8">
              All endpoints are read-only <code className="font-mono text-stone-700">GET</code> requests.
              No authentication required. Image URLs dynamically reflect the current host.
            </p>
            <div className="inline-flex items-center gap-3">
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-400">Base URL</span>
              <code className="text-xs font-mono text-stone-600 bg-stone-100 border border-stone-200 px-3 py-1.5">
                {baseUrl || "https://your-domain.com"}
              </code>
              <CopyButton text={baseUrl || "https://your-domain.com"} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-8 lg:px-16 xl:px-20 py-16">
        <div className="flex items-center gap-4 mb-8">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-stone-400 shrink-0">Endpoints</p>
          <span className="h-px flex-1 bg-stone-200" />
          <p className="text-[0.6rem] font-mono text-stone-300 shrink-0">{endpoints.length} Routes</p>
        </div>

        <div className="hidden md:flex items-center gap-6 py-3 border-b border-stone-200">
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300 w-6 shrink-0">No</span>
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300 shrink-0 w-8">Verb</span>
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300 flex-1">Path</span>
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-stone-300 max-w-[240px]">Description</span>
          <span className="w-4" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {endpoints.map((ep, i) => (
            <EndpointRow
              key={i}
              ep={ep}
              index={i}
              open={openIdx === i}
              toggle={() => toggle(i)}
              baseUrl={baseUrl}
            />
          ))}
        </motion.div>
      </section>
    </main>
  );
}
