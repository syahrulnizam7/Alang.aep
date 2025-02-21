"use client";
import { motion } from "framer-motion";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import VideoSection from "@/components/VideoSection/page";
import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-sans"
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
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover my portfolio of creative edits, motion designs, and
            cinematic visuals
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <Link href="/videos" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-lg text-white font-medium"
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
            </Link>

            <a
              href="https://www.alangkun.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full group relative overflow-hidden border border-zinc-700 px-8 py-3 rounded-lg text-white"
              >
                <span className="relative z-10">More About Me</span>
                <div className="absolute inset-0 bg-zinc-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
            </a>
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

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-24 px-6 lg:px-12 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000000 0%, #0d0d0d 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="lg:col-span-7 text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            About <span className="text-purple-400">Me</span>
          </h2>
          <motion.p
            className="text-zinc-400 text-lg leading-relaxed mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi, I&apos;m <span className="text-white font-semibold">Alang</span>
            ! A passionate content creator and video editor specializing in{" "}
            <span className="text-purple-400">AMVs</span>,{" "}
            <span className="text-purple-400">motion graphics</span>, and{" "}
            <span className="text-purple-400">social media edits</span>. With a
            love for storytelling and a keen eye for detail, I transform raw
            footage into visually stunning masterpieces.{" "}
            <span className="block mt-3 font-semibold text-white">
              Let&apos;s create something amazing together!
            </span>
          </motion.p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-lg overflow-hidden shadow-lg border border-purple-400"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            {/* Animasi Gradient Fade */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-purple-500 via-purple-900 to-transparent z-10"
              animate={{ opacity: [0.1, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>

            {/* Profile Image */}
            <Image
              src="/profile.jpg"
              alt="About Me"
              width={300}
              height={300}
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
    // Generate random values for particles
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

  // Variants untuk container (animasi masuk/keluar)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
  };

  // Variants untuk animasi tools (zoom-in, bounce, & rotate)
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotate: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      rotate: 15,
      transition: { duration: 0.4 },
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
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.4, 1],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Title Animasi */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16 font-sans"
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

        {/* Animasi Grid Tools */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.1,
                rotate: [-5, 5],
                transition: {
                  rotate: {
                    repeat: Infinity,
                    duration: 0.2,
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
                  width={64}
                  height={64}
                  className="w-16 h-16 relative z-10"
                />
              </motion.div>
              <motion.h3
                className="text-white text-lg font-medium font-sans text-center"
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

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const ContactSection = () => {
  const contactRef = useRef(null);

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/alang.kun",
      color: "hover:text-pink-500",
    },
    {
      name: "WhatsApp",
      icon: Phone,
      href: "https://wa.me/6285278048446",
      color: "hover:text-green-500",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:alangkun7@gmail.com",
      color: "hover:text-blue-500",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      href: "https://tiktok.com/@alang.kun",
      color: "hover:text-[#ff0050]",
    },
  ];

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      scale: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="py-20 bg-zinc-900 min-h-screen flex items-center perspective-1000"
      style={{
        background:
          "linear-gradient(to bottom, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16 font-sans"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          Let&apos;s <span className="text-purple-400">Connect</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto perspective-1000">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-6 bg-zinc-800/50 rounded-xl border border-zinc-700 ${social.color} group relative overflow-hidden transform-gpu`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  initial={{ rotate: 0, scale: 0 }}
                  whileHover={{
                    rotate: 180,
                    scale: 2,
                    transition: { duration: 0.6 },
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <social.icon />
                </motion.div>

                {/* Text */}
                <motion.span
                  className="text-sm font-medium text-zinc-300 group-hover:text-white mt-3 relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  {social.name}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 bg-black border-t border-zinc-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-zinc-500 text-sm font-sans">
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
