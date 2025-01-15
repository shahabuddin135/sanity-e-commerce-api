'use client'

import Link from 'next/link'
import React from 'react'
import CopyButton from '@/components/CopyButton'
import { motion } from 'framer-motion'
import { Marcellus } from 'next/font/google'
import { ArrowRight, Code, Book, Upload, User } from 'lucide-react'

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
})

const apiUrl = `https://template-6-api.vercel.app`

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-4xl pt-16 mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 ${marcellus.className}`}>
            Welcome
          </h1>
          <p className={`text-xl md:text-2xl text-indigo-600 ${marcellus.className}`}>
            Explore, Create, Innovate
          </p>
          <p className={`${marcellus.className} text-indigo-600`}>
           &quot;Don&apos;t forget to read the Docs!&quot; <span>—wise man</span>
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-600" />
            API Endpoints
          </h2>
          <div className="space-y-4">
            {[
              { endpoint: 'products', description: 'Get all products' },
              { endpoint: 'images', description: 'Get all images' }
            ].map((item, index) => (
              <motion.div 
                key={item.endpoint}
                className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-gray-600 break-all font-mono">{`${apiUrl}/api/${item.endpoint}`}</p>
                  <p className="text-xs text-indigo-600 mt-1">{item.description}</p>
                </div>
                <CopyButton textToCopy={`${apiUrl}/api/${item.endpoint}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            { href: '/api/products', text: 'View JSON', icon: <Code />, bgColor: 'bg-indigo-600', hoverColor: 'hover:bg-indigo-700' },
            { href: '/docs', text: 'Read API Docs', icon: <Book />, bgColor: 'bg-purple-600', hoverColor: 'hover:bg-purple-700' },
            { href: '/sanity-guide', text: 'Upload To Sanity', icon: <Upload />, bgColor: 'bg-pink-600', hoverColor: 'hover:bg-pink-700' },
            { href: '/about', text: 'Meet The Developer', icon: <User />, bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' }
          ].map((item, index) => (
            <Link key={item.href} href={item.href} className="w-full">
              <motion.button 
                className={`w-full ${item.bgColor} text-white px-4 py-3 rounded-lg ${item.hoverColor} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 shadow-md flex items-center justify-center gap-2 group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                <span>{item.text}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          
        </motion.div>
      </main>
    </div>
  )
}

