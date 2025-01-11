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

const apiUrl =  `https://template-6-api.vercel.app`;

export default function Home() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-4xl pt-28 md:pt-16  mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-5xl md:text-7xl font-bold text-indigo-700 ${marcellus.className}`}>
            Welcome
          </h1>
          <p className={`text-xl md:text-2xl text-indigo-600 ${marcellus.className}`}>
            Don&apos;t forget to read the Docs!
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">API Endpoints</h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm md:text-base text-gray-600 break-all font-mono">{`${apiUrl}/api/products`}</p>
              <CopyButton textToCopy={`${apiUrl}/api/products`} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm md:text-base text-gray-600 break-all font-mono">{`${apiUrl}/api/images`}</p>
              <CopyButton textToCopy={`${apiUrl}/api/images`} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/api/products" className="w-full">
            <motion.button 
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View JSON
            </motion.button>
          </Link>
          <Link href="/docs" className="w-full">
            <motion.button 
              className="w-full bg-white text-indigo-600 px-6 py-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read the Docs
            </motion.button>
          </Link>
          <Link href="/sanity-guide" className="w-full">
            <motion.button 
              className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload To Sanity
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/about" className={` ${marcellus.className} text-lg text-indigo-600 hover:text-indigo-800 transition-colors duration-300 underline`}>
            Meet The Developer
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
