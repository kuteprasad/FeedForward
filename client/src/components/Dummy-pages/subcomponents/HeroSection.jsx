import { Button } from "@headlessui/react";
import { FaTruck, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [animateTruck, setAnimateTruck] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateTruck((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center text-center 
                 bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] 
                 transition-colors duration-300"
    >
      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-3xl px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-[var(--text-light)] dark:text-[var(--text-dark)] 
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Reduce Food Waste. <br /> Feed Communities in Need.
        </h1>
        <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] 
                    text-base sm:text-lg mt-4">
          A real-time platform connecting surplus food sources with NGOs to
          ensure no meal goes to waste.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="border border-[var(--primary-teal)] text-[var(--primary-teal)] 
                     px-6 py-3 text-lg rounded-xl shadow-lg 
                     hover:bg-[var(--primary-teal)] hover:text-white transition-all"
          >
            Donate Food
          </Button>
          <Button
            className="border border-[var(--primary-teal)] text-[var(--primary-teal)] 
                     px-6 py-3 text-lg rounded-xl shadow-lg 
                     hover:bg-[var(--primary-teal)] hover:text-white transition-all"
          >
            Find NGOs
          </Button>
        </div>
      </motion.div>

      {/* Animated Icons */}
      <motion.div
        className="absolute bottom-10 right-10 text-[var(--primary-teal)] 
                 dark:text-[var(--accent-orange)] text-3xl hidden sm:block"
        animate={{ x: animateTruck ? -20 : 20 }}
        transition={{ yoyo: Infinity, duration: 1 }}
      >
        <FaTruck />
      </motion.div>
      <motion.div
        className="absolute top-1/4 left-10 text-[var(--accent-orange)] 
                 dark:text-[var(--primary-teal)] text-2xl hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaUtensils />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-20 text-[var(--accent-orange)] 
                 dark:text-[var(--primary-teal)] text-2xl hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
      >
        <FaUtensils />
      </motion.div>
    </div>
  );
};

export default HeroSection;