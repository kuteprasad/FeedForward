import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FoodTruckSimulation() {
  const [simulationStep, setSimulationStep] = useState("collecting");
  const [foodCollected, setFoodCollected] = useState(0);
  const [foodProcessed, setFoodProcessed] = useState(0);
  const [foodDistributed, setFoodDistributed] = useState(0);
  const [foodDisposed, setFoodDisposed] = useState(0);

  useEffect(() => {
    let processTimeout;
    let distributionTimeout;
    let disposalTimeout;

    if (simulationStep === "collecting") {
      const collectedAmount = Math.floor(Math.random() * 80) + 20;
      setFoodCollected(collectedAmount);
      processTimeout = setTimeout(() => setSimulationStep("coldStore"), 2000);
    } else if (simulationStep === "coldStore") {
      const processedAmount = Math.floor(foodCollected * 0.9);
      setFoodProcessed(processedAmount);
      distributionTimeout = setTimeout(() => setSimulationStep("distributing"), 3000);
    } else if (simulationStep === "distributing") {
      const distributedAmount = Math.floor(foodProcessed * 0.8);
      setFoodDistributed(distributedAmount);
      disposalTimeout = setTimeout(() => setSimulationStep("disposal"), 4000);
    } else if (simulationStep === "disposal") {
      setFoodDisposed(foodProcessed - foodDistributed);
    }

    return () => {
      clearTimeout(processTimeout);
      clearTimeout(distributionTimeout);
      clearTimeout(disposalTimeout);
    };
  }, [simulationStep, foodCollected, foodProcessed]);

  const phaseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="simulation-container">
      {/* <h1>Food Rescue Simulation</h1> */}

      <div className="phase-container">
        {/* Collecting Phase */}
        <motion.div
          className={`phase ${simulationStep === "collecting" ? "active" : ""}`}
          variants={phaseVariants}
          initial="hidden"
          animate={simulationStep === "collecting" ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <h2>Collecting Food</h2>
          <p>Volunteers are collecting food.</p>
          {simulationStep === "collecting" && (
            <motion.div
              className="animation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.img
                src="https://media.gettyimages.com/id/1435451322/photo/unrecognizable-volunteer-organizing-donations-in-boxes-wearing-protective-gloves.jpg?s=612x612&w=gi&k=20&c=zbpqvr9sRGym_p6A78MXEeoNeUOXRiaYc4pkycB7FIQ="
                alt="Collecting Food"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
              <p>Collected: {foodCollected} units</p>
            </motion.div>
          )}
        </motion.div>

        {/* Cold Store Phase */}
        <motion.div
          className={`phase ${simulationStep === "coldStore" ? "active" : ""}`}
          variants={phaseVariants}
          initial="hidden"
          animate={simulationStep === "coldStore" ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <h2>Cold Store & Processing</h2>
          <p>Food is being processed for safety and quality.</p>
          {simulationStep === "coldStore" && (
            <motion.div
              className="animation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.img
                src="https://plus.unsplash.com/premium_photo-1663039952001-48ffa8f42c78?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHByb2Nlc3Npbmd8ZW58MHx8MHx8fDA%3D"
                alt="Processing Food"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
              <p>Processed: {foodProcessed} units</p>
            </motion.div>
          )}
        </motion.div>

        {/* Distribution Phase */}
        <motion.div
          className={`phase ${simulationStep === "distributing" ? "active" : ""}`}
          variants={phaseVariants}
          initial="hidden"
          animate={simulationStep === "distributing" ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <h2>Distributing Food</h2>
          <p>Food is being distributed to those in need.</p>
          {simulationStep === "distributing" && (
            <motion.div
              className="animation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.img
                src="https://www.shutterstock.com/image-photo/provide-help-free-food-distribution-260nw-1275671032.jpg"
                alt="Distributing Food"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
              <p>Distributed: {foodDistributed} units</p>
            </motion.div>
          )}
        </motion.div>

        {/* Disposal Phase */}
        <motion.div
          className={`phase ${simulationStep === "disposal" ? "active" : ""}`}
          variants={phaseVariants}
          initial="hidden"
          animate={simulationStep === "disposal" ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <h2>Eco-Friendly Disposal</h2>
          <p>Remaining food is being disposed of responsibly.</p>
          {simulationStep === "disposal" && (
            <motion.div
              className="animation-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JqfUZ0I5J1GbkQCpezzM8_fR98oTmrcLBA&s"
                alt="Disposing Food"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
              <p>Disposed: {foodDisposed} units</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const style = `
.simulation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 30px;
  background-color: #f9f9f9;
}

h1 {
  color: #2E8B57;
  font-size: 2.5em;
  margin-bottom: 40px;
}

.phase-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
}

.phase {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.phase.active {
  border: 2px solid #4CAF50;
  transform: scale(1.05);
}

h2 {
  color: #4CAF50;
  font-size: 1.8em;
  margin-bottom: 20px;
}

.phase p {
  color: #333;
  font-size: 1.1em;
}

.animation-container {
  margin-top: 20px;
  text-align: center;
}

.animation-container img {
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

.phase p {
  font-size: 1.1em;
  color: #333;
}
`;

if (typeof document !== "undefined") {
  if (!document.getElementById("food-truck-simulation-style")) {
    const styleElement = document.createElement("style");
    styleElement.id = "food-truck-simulation-style";
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
  }
}
