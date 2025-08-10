import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect-no-shadow" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="./logo.png"
              alt="Notion Chart Generator"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-xl text-primary">
              Notion Chart Generator
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-text hover:text-primary transition-colors font-medium font-sans"
            >
              特色功能
            </button>
            <button
              onClick={() => scrollToSection("tech-stack")}
              className="text-text hover:text-primary transition-colors font-medium font-sans"
            >
              技術棧
            </button>
            <button
              onClick={() => scrollToSection("how-to-use")}
              className="text-text hover:text-primary transition-colors font-medium font-sans"
            >
              使用說明
            </button>
            <motion.a
              href="https://github.com/SteveLin100132/notion-chart-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium font-sans hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 space-y-4"
          >
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left text-text hover:text-primary transition-colors font-medium font-sans py-2"
            >
              特色功能
            </button>
            <button
              onClick={() => scrollToSection("tech-stack")}
              className="block w-full text-left text-text hover:text-primary transition-colors font-medium font-sans py-2"
            >
              技術棧
            </button>
            <button
              onClick={() => scrollToSection("how-to-use")}
              className="block w-full text-left text-text hover:text-primary transition-colors font-medium font-sans py-2"
            >
              使用說明
            </button>
            <a
              href="https://github.com/SteveLin100132/notion-chart-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-primary text-white px-6 py-2 rounded-lg font-medium font-sans text-center hover:bg-primary/90 transition-colors"
            >
              GitHub
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
