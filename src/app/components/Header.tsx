'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 lg:px-8"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-xl mx-auto">
        <ul className="flex justify-center items-center space-x-6 sm:space-x-8 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-full px-6 py-3">
          <li>
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              Home
            </Link>
          </li>
         
          <li>
            <Link href="/sanity-guide" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              Sanity Docs
            </Link>
          </li>
          <li>
            <Link href="/docs" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              API Docs
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  )
}

export default Header

