"use client";
import { motion } from "framer-motion";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import VideoSection from "@/components/VideoSection/page";
import Navbar from "@/components/Navbar/page";
import Image from "next/image";

const HeroSection = () => {
  const ref = useRef(null);

  const [randomValues, setRandomValues] = useState<
    { left: number; top: number }[]
  >([]);

  useEffect(() => {
    setRandomValues(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #000000 0%, #000000 50%, #1a1a1a 100%)",
      }}
    >
      <div className="absolute inset-0">
        {randomValues.map(({}, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50"
          >
            <span className="text-purple-400 text-sm md:text-base font-medium">
              Your Vision, Our Expertise
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting Visuals That
            <motion.span
              className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Captivate
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover my portfolio of creative edits, motion designs, and
            cinematic visuals
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-lg text-white font-medium"
            >
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden border border-zinc-700 px-8 py-3 rounded-lg text-white"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-zinc-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-purple-400 animate-bounce" />
      </motion.div>
    </section>
  );
};

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const word = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AboutSection = () => {
  const aboutRef = useRef(null);
  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000000 0%, #0d0d0d 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <motion.div
          className="lg:w-1/2 text-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono">
            About <span className="text-purple-400">Me</span>
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-lg font-mono leading-relaxed"
            variants={sentence}
            initial="hidden"
            whileInView="visible"
          >
            {"Hi, I'm Alang! A passionate content creator and video editor specializing in AMVs, motion graphics, and social media edits. With a love for storytelling and a keen eye for detail, I transform raw footage into visually stunning masterpieces. Let's create something amazing together!"
              .split(" ")
              .map((wordText, index) => (
                <motion.span
                  key={index}
                  variants={word}
                  className="mr-1 inline-block"
                >
                  {wordText}
                </motion.span>
              ))}
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-48 h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden shadow-lg border-4 border-purple-400"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src="/profile.jpg"
              alt="About Me"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ToolsSection = () => {
  const ref = useRef(null);

  const [randomValues, setRandomValues] = useState<
    { left: number; top: number }[]
  >([]);

  useEffect(() => {
    // Generate random values only on the client
    setRandomValues(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  const tools = [
    { name: "Adobe After Effects", icon: "https://skillicons.dev/icons?i=ae" },
    { name: "Adobe Premiere Pro", icon: "https://skillicons.dev/icons?i=pr" },
    { name: "Blender", icon: "https://skillicons.dev/icons?i=blender" },
    {
      name: "CapCut",
      icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png",
    },
    {
      name: "Canva",
      icon: "https://freelogopng.com/images/all_img/1656733637logo-canva-png.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="tools"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0d0d0d 0%, #1a1a1a 100%)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {randomValues.map(({}, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16 font-mono"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
          }}
        >
          Tools I{" "}
          <motion.span
            className="text-purple-400 inline-block"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Use
          </motion.span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1],
                transition: {
                  rotate: {
                    repeat: Infinity,
                    duration: 0.3,
                    repeatType: "reverse",
                  },
                },
              }}
              className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors duration-300"
            >
              <motion.div
                className="mb-4 relative"
                whileHover={{
                  rotate: 360,
                  transition: { duration: 0.5 },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-purple-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={64} // Tambahkan lebar
                  height={64} // Tambahkan tinggi
                  className="w-16 h-16 relative z-10"
                />
              </motion.div>
              <motion.h3
                className="text-white text-lg font-medium font-mono text-center"
                whileHover={{
                  color: "#A78BFA",
                  transition: { duration: 0.2 },
                }}
              >
                {tool.name}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const contactRef = useRef(null);
  return (
    <section
      ref={contactRef}
      id="contact"
      className="py-20 bg-zinc-900"
      style={{
        background:
          "linear-gradient(to bottom, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Let&apos;s <span className="text-purple-400">Collaborate</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
            />
            <button
              type="submit"
              className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300 font-mono"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 bg-black border-t border-zinc-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-zinc-500 text-sm font-mono">
        © 2025 Alang.aep | Professional Video Editing Services
      </p>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-screen bg-black">
          <Navbar />
          <HeroSection />

          <VideoSection />
          <AboutSection />
          <ToolsSection />
          <ContactSection />
          <Footer />
        </div>
      </body>
    </html>
  );
}
