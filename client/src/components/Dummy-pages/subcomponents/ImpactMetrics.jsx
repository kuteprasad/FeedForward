import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUtensils, FaHandsHelping, FaBox, FaTruck } from "react-icons/fa";

// Simple CountUp component using Framer Motion's animate
const CountUp = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, end, {
      duration: 2,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ImpactMetrics = () => {
  return (
    <div className="py-20 bg-[var(--bg)] dark:bg-[var(--bg)] text-center transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-10 text-[var(--text)] dark:text-[var(--text)]">
        Our Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6">
        {[
          {
            icon: FaUtensils,
            title: "Total Meals Donated",
            value: 100000,
            suffix: "+",
          },
          {
            icon: FaHandsHelping,
            title: "Total NGOs Connected",
            value: 500,
            suffix: "+",
          },
          {
            icon: FaBox,
            title: "Food Waste Reduced",
            value: 50,
            suffix: " Tons",
          },
          {
            icon: FaTruck,
            title: "Active Deliveries",
            value: 120,
            suffix: "+",
          },
        ].map((metric, index) => (
          <motion.div
            key={index}
            className="p-6 bg-[var(--card-bg)] 
                     rounded-xl shadow-lg transition-colors duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <metric.icon className="text-4xl text-[var(--primary-teal)] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-[var(--text)] dark:text-[var(--text)]">
              {metric.title}
            </h3>
            <p className="text-[var(--text)] dark:text-[var(--text)] opacity-80 mt-2">
              <CountUp end={metric.value} suffix={metric.suffix} />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImpactMetrics;