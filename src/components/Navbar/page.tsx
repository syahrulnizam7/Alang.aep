import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State untuk mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
              onClick={toggleMenu} // Menjalankan toggleMenu saat ditekan
            >
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </motion.button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {["Hero", "Edits", "About", "Tools", "Contact"].map((item) => {
              const sectionId = item.toLowerCase().replace(" ", "-");
              return (
                <li key={item}>
                  <Link
                    href={`/#${sectionId}`}
                    className="text-sm text-zinc-400 hover:text-purple-400 transition-all duration-300 relative group"
                  >
                    <span>{item}</span>
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-purple-400 transition-all duration-300 w-0 group-hover:w-full" />
                  </Link>
                </li>
              );
            })}

            <Link href="/videos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-blue-500 text-sm text-white px-5 py-2.5 rounded-lg font-medium"
              >
                <span className="relative z-10">Explore</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </motion.button>
            </Link>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-lg py-5"
          >
            <ul className="flex flex-col items-center space-y-6">
              {["Hero", "Edits", "About", "Tools", "Contact"].map((item) => {
                const sectionId = item.toLowerCase().replace(" ", "-");
                return (
                  <li key={item}>
                    <Link
                      href={`/#${sectionId}`}
                      className="text-lg text-zinc-400 hover:text-purple-400 transition-all duration-300"
                      onClick={() => setMenuOpen(false)} // Tutup menu saat item diklik
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
              <Link href="/videos">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Explore
                </motion.button>
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
