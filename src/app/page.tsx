'use client'

import Link from 'next/link'
import React from 'react'
import CopyButton from '@/components/CopyButton'
import { motion } from 'framer-motion'
import { Marcellus } from 'next/font/google'

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
})


const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.VERCEL_URL ? `https://template-6-api.vercel.app` : 'http://localhost:3000')

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-4xl mx-auto space-y-12">
        <motion.h1 
          className={`text-4xl md:text-6xl font-bold text-center text-gray-900 }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
           <span className={`text-indigo-600 ${marcellus.className}`}>Welcome</span>
           <br />
           <span className={`text-indigo-600 text-[20px] ${marcellus.className}`}>Don&apos;t forget to read the Docs!</span>
        </motion.h1>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">API Endpoint</h2>
          <div className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm md:text-base text-gray-600 break-all">{`${apiUrl}/api/products`}</p>
            <CopyButton textToCopy={`${apiUrl}/api/products`} />
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/api/products" className="w-full sm:w-auto">
            <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              View JSON
            </button>
          </Link>
          <Link href="/docs" className="w-full sm:w-auto">
            <button className="w-full bg-white text-indigo-600 px-6 py-3 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Read the Docs
            </button>
          </Link>
        </motion.div>
      </main>

    </div>
  )
}

