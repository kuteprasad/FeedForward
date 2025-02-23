import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHandHoldingHeart,
  FaRecycle,
  FaArrowRight,
} from "react-icons/fa";
import { MdCompost } from "react-icons/md";
import { GiCook } from "react-icons/gi";
import donationPng from "../../assets/donation.png";
import compostPng from "../../assets/compost.png";
import repurposePng from "../../assets/repurpose.png";

const WasteDisposal = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <FaHandHoldingHeart className="w-12 h-12 text-green-600" />,
      title: "1. Donate",
      description:
        "Partner with local food banks or charities to donate edible surplus food. This helps feed those in need while reducing waste.",
      image: donationPng,
    },
    {
      icon: <MdCompost className="w-12 h-12 text-green-600" />,
      title: "2. Compost",
      description:
        "Turn food scraps into nutrient-rich compost for gardens and farms. Composting reduces landfill waste and enriches soil.",
      image: compostPng,
    },
    {
      icon: <GiCook className="w-12 h-12 text-green-600" />,
      title: "3. Repurpose",
      description:
        "Get creative with surplus food by turning it into new dishes, preserves, or animal feed. Repurposing minimizes waste and maximizes value.",
      image: repurposePng,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-8">
      {/* Hero Section with Animation */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <FaLeaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-green-900 mb-4">
          Eco-Friendly Surplus Food Disposal
        </h1>
        <p className="text-xl text-green-700">
          Turning Food Waste into Sustainable Solutions
        </p>
      </motion.header>

      {/* Interactive Steps Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-green-900 text-center mb-12">
          How to Dispose of Surplus Food Sustainably
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Steps Navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-green-900 hover:bg-green-100"
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  {step.icon}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p
                      className={
                        activeStep === index ? "text-white" : "text-green-700"
                      }
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step Image */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-16 bg-white rounded-lg p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <h3 className="text-4xl font-bold text-green-600 mb-2">40%</h3>
            <p className="text-green-700">of food is wasted globally</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <h3 className="text-4xl font-bold text-green-600 mb-2">1.3B</h3>
            <p className="text-green-700">tonnes wasted annually</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <h3 className="text-4xl font-bold text-green-600 mb-2">$1T</h3>
            <p className="text-green-700">economic loss per year</p>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <motion.section
        className="text-center mb-16"
        whileInView={{ opacity: [0, 1], y: [20, 0] }}
      >
        <h2 className="text-3xl font-semibold text-green-900 mb-4">
          Join the Movement
        </h2>
        <p className="text-lg text-green-700 mb-6">
          Start making a difference today by adopting eco-friendly food disposal
          practices.
        </p>
        <motion.button
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <FaArrowRight />
        </motion.button>
      </motion.section>

      {/* References Section */}
      <section className="max-w-4xl mx-auto mb-16 text-sm text-green-700">
        <h3 className="font-semibold mb-2">References:</h3>
        <ul className="space-y-1">
          <li>
            <a
              href="https://www.fao.org/food-loss-and-food-waste/flw-data"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 underline"
            >
              Food and Agriculture Organization (FAO) - Food Loss and Waste
              Database
            </a>
          </li>
          <li>
            <a
              href="https://www.unep.org/resources/report/unep-food-waste-index-report-2021"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 underline"
            >
              UNEP Food Waste Index Report 2021
            </a>
          </li>
         
        </ul>
        <p className="mt-4 text-xs">
          Images sourced from Unsplash - Free to use under the Unsplash License
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center text-green-700">
        <p>© {new Date().getFullYear()} FeedForward. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WasteDisposal;
