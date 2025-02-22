import { motion } from "framer-motion";
import { FaBox, FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: FaClipboardList,
      title: "List Surplus Food",
      description: "Restaurants, caterers, and individuals list surplus food on our platform."
    },
    {
      icon: FaMapMarkerAlt,
      title: "Match with NGOs",
      description: "FeedForward's smart algorithm connects food donors with nearby NGOs."
    },
    {
      icon: FaBox,
      title: "Deliver & Track",
      description: "Food is picked up and tracked in real-time to ensure it reaches those in need."
    }
  ];

  return (
    <div className="py-20 bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] text-center transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-10 text-[var(--text-light)] dark:text-[var(--text-dark)]">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                     p-6 rounded-xl shadow-lg text-center w-80 
                     transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <step.icon className="text-4xl text-[var(--primary-teal)] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)]">
              {step.title}
            </h3>
            <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] opacity-80 mt-2">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;