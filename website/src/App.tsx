import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import TechStackSection from "./components/TechStackSection";
import HowToUseSection from "./components/HowToUseSection";

function App() {
  useScrollAnimation();

  useEffect(() => {
    // 平滑滾動支援
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Global Grid Background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
        <div className="h-full w-full bg-grid-pattern bg-grid-size"></div>
      </div>

      {/* Radial White Fade Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="h-full w-full bg-radial-fade-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TechStackSection />
          <HowToUseSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
