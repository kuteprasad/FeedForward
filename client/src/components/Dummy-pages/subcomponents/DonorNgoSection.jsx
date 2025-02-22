import { motion } from "framer-motion";
import { FaBuilding, FaHandHoldingHeart } from "react-icons/fa";

const DonorNgoSection = () => {
  const cards = [
    {
      icon: FaBuilding,
      title: "For Food Donors",
      description: "Restaurants, hotels, and caterers can easily donate surplus food.",
      features: [
        "Quick and easy listing process",
        "Real-time tracking of donations",
        "Tax deduction receipts",
        "Impact metrics dashboard"
      ]
    },
    {
      icon: FaHandHoldingHeart,
      title: "For NGOs",
      description: "Connect with food donors and manage distributions efficiently.",
      features: [
        "Real-time food availability alerts",
        "Streamlined collection process",
        "Distribution tracking",
        "Beneficiary management"
      ]
    }
  ];

  return (
    <div className="py-20 bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                       p-8 rounded-xl shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <card.icon className="text-5xl text-[var(--primary-teal)] mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-light)] dark:text-[var(--text-dark)]">
                {card.title}
              </h3>
              <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] opacity-80 mb-6">
                {card.description}
              </p>
              <ul className="space-y-3">
                {card.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-[var(--text-light)] dark:text-[var(--text-dark)] opacity-80"
                  >
                    <span className="w-2 h-2 bg-[var(--primary-teal)] rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorNgoSection;