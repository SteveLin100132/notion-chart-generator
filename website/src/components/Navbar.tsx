import React, { useState } from "react";
import { useGithubStars } from "../hooks/useGithubStars";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const stars = useGithubStars("SteveLin100132/notion-chart-generator");

  function formatStars(stars: number | null): string {
    if (stars === null) return "-";
    if (stars >= 1000) return (Math.round(stars / 100) / 10).toFixed(1) + "K";
    return stars.toString();
  }
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 py-2 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 rounded-full glass-effect-no-shadow backdrop-blur-sm bg-white/50 border border-gray-300/50 px-2">
          {/* Left: Logo (mobile 只顯示 image) */}
          <div
            className="flex items-center gap-2 pl-4 md:min-w-[260px] min-w-[50px] justify-start cursor-pointer"
            onClick={() => {
              const el = document.getElementById("hero");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img
              src="./logo.png"
              alt="logo"
              className="w-7 h-7 object-contain"
            />
            <span className="font-bold text-lg text-black hidden md:inline">
              Notion Chart Generator
            </span>
          </div>

          {/* Center: Nav Links (原本項目，僅桌機顯示) */}
          <div className="flex-1 justify-center items-center gap-8 hidden md:flex">
            {[
              { label: "特色功能", id: "features" },
              { label: "技術棧", id: "tech-stack" },
              { label: "使用說明", id: "how-to-use" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative px-2 py-1 font-medium text-black transition-colors overflow-visible group"
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-8 bg-black group-hover:rounded scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left pointer-events-none z-0"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Right: GitHub only (僅桌機顯示) */}
          <div className="flex items-center gap-2 md:min-w-[260px] min-w-[100px] pr-1 justify-end">
            <a
              href="https://github.com/SteveLin100132/notion-chart-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent text-black font-semibold hover:bg-gray-100/50 transition-colors duration-300 md:flex-nowrap whitespace-nowrap justify-center text-base"
            >
              {/* GitHub icon */}
              <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {/* Star icon */}
              {/* <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
              </svg> */}
              <span className="flex-shrink-0 font-light">
                {formatStars(stars)}
              </span>
            </a>
            {/* Hamburger button (mobile only) */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full ml-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 rounded-lg backdrop-blur-sm bg-white/50 border border-gray-200 py-4 px-6 flex flex-col gap-4 text-center">
            <button
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-black font-medium hover:text-primary transition-colors py-2"
            >
              特色功能
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById("tech-stack");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-black font-medium hover:text-primary transition-colors py-2"
            >
              技術棧
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById("how-to-use");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-black font-medium hover:text-primary transition-colors py-2"
            >
              使用說明
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
