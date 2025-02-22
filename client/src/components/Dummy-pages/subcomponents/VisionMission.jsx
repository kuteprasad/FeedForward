import { motion } from "framer-motion";

const VisionMission = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const cards = [
    {
      title: "Our Vision",
      subtitle: "A world with no hunger.",
      items: [
        { emoji: "🌍", text: "Reduce food waste." },
        { emoji: "💡", text: "Inspire sustainable change." }
      ]
    },
    {
      title: "Our Mission",
      subtitle: "Connecting surplus to smiles.",
      items: [
        { emoji: "🔗", text: "Bridge the gap." },
        { emoji: "⚙️", text: "Leverage technology." }
      ]
    }
  ];

  return (
    <div className="py-20 bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] text-center transition-colors duration-300">
      <motion.h2
        className="text-4xl font-bold mb-12 text-[var(--text-light)] dark:text-[var(--text-dark)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Vision & Mission
      </motion.h2>
      
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="p-8 bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                     rounded-xl shadow-lg border border-[var(--border-light)] 
                     dark:border-[var(--border-dark)] transition-colors duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotate: index === 0 ? 1 : -1 }}
          >
            <motion.h3
              className="text-2xl font-semibold mb-2 text-[var(--text-light)] 
                       dark:text-[var(--text-dark)]"
              variants={textVariants}
            >
              {card.title}
            </motion.h3>
            
            <motion.p
              className="text-[var(--text-light)] dark:text-[var(--text-dark)] 
                       opacity-80 mb-4"
              variants={textVariants}
            >
              {card.subtitle}
            </motion.p>
            
            <motion.ul
              className="space-y-2"
              variants={textVariants}
            >
              {card.items.map((item, idx) => (
                <li 
                  key={idx}
                  className="flex items-center justify-center text-[var(--text-light)] 
                           dark:text-[var(--text-dark)] opacity-90"
                >
                  <span className="mr-2 text-xl">{item.emoji}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default VisionMission;