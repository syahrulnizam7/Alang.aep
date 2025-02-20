import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="group">
            <motion.h1
              className="text-2xl md:text-3xl font-bold font-mono"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Alang
              </span>
              <span className="text-white">.aep</span>
              <motion.span
                className="inline-block text-purple-400 ml-1"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
            </motion.h1>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-white p-2"
            >
              <div className="w-6 h-0.5 bg-white mb-1.5" />
              <div className="w-6 h-0.5 bg-white mb-1.5" />
              <div className="w-6 h-0.5 bg-white" />
            </motion.button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {["Hero", "Edits", "About", "Tools", "Contact"].map((item) => {
              const sectionId = item.toLowerCase().replace(" ", "-"); // Format id sesuai dengan yang digunakan di section
              return (
                <li key={item}>
                  <Link
                    href={`/#${sectionId}`} // Navigasi ke halaman utama dengan hash
                    className={`text-sm transition-all duration-300 relative group ${
                      // Anda bisa menambahkan logika untuk menandai section aktif jika diperlukan
                      false
                        ? "text-purple-400"
                        : "text-zinc-400 hover:text-purple-400"
                    }`}
                  >
                    <span>{item}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-purple-400 transition-all duration-300 ${
                        false ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-blue-500 text-sm text-white px-5 py-2.5 rounded-lg font-medium"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
