'use client';

import Image from 'next/image';
import { Marcellus } from 'next/font/google';
import collage from '../../../public/purple-profile-transformed-transformed.jpeg';
import { motion } from 'framer-motion';
import { Youtube, Linkedin, Github } from 'lucide-react';

const marcellus = Marcellus({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/shahabuddin135',
    label: 'GitHub Profile'
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/shahab-uddin-368086300/',
    label: 'LinkedIn Profile'
  },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/@voyagershahab',
    label: 'YouTube Channel'
  }
];

export default function About() {
  return (
    <section className={`flex flex-col items-center pt-20 justify-center min-h-screen p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50 ${marcellus.className}`}>
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-1/2 text-left ">
          <motion.h1 
            className="text-5xl md:text-6xl font-normal mb-4 text-indigo-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Shahabuddin
          </motion.h1>
          <motion.h2 
            className="text-2xl font-light text-indigo-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Developer | Innovator
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I am a passionate developer with a love for building impactful solutions using the latest technologies. 
            My journey in programming has shaped my skills in web development, APIs, and design. I strive to deliver 
            efficient, user-friendly, and creative projects that make a difference.
          </motion.p>
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Thank you for visiting my project! I am always open to new ideas and collaborations. 
            Feel free to reach out if you would like to work together.
          </motion.p>
          <motion.div 
            className="flex gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 1 }}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="overflow-hidden rounded-full w-60 h-60 md:w-80 md:h-80 border-4 border-indigo-200 shadow-2xl">
            <Image
              src={collage}
              alt="Shahabuddin"
              className="w-full h-full object-cover"
              placeholder="blur"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

