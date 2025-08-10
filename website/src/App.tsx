import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

function App() {
  useScrollAnimation();

  useEffect(() => {
    // 平滑滾動支援
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* <TechStackSection />
        <HowToUseSection /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
