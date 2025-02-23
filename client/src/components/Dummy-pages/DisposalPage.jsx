import { useState } from "react";
import { motion } from "framer-motion";
import {
	FaHandsHelping,
	FaSeedling,
	FaRecycle,
	FaPhoneAlt,
	FaLeaf,
	FaTrashAlt,
} from "react-icons/fa";
import {
	MdOutlineFastfood,
	MdOutlineFactory,
	MdOutlineCleaningServices,
} from "react-icons/md";
import { Button } from "../basic/Button";
// import { Button } from "@/components/ui/button";

export default function DisposalPage() {
	const [foodAmount, setFoodAmount] = useState("small");

	return (
		<div className="p-4 space-y-10 bg-gradient-to-b from-green-50 to-green-100 ">
			{/* Try to Feed People Section */}
			<div className="text-center space-y-4 mt-30">
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="text-3xl font-bold"
				>
					Got Extra Food? Let’s Not Waste It!
				</motion.h1>
				<p className="text-gray-700">
					Join us in feeding people and reducing food waste. Your small act can
					make a huge difference.
				</p>
				<p className="text-gray-600 max-w-3xl mx-auto">
					Whether you’re a restaurant, event organizer, or just someone with
					leftovers, our platform helps you connect with local shelters, food
					banks, and communities in need. Every donation contributes to a more
					sustainable and compassionate world.
				</p>
				<motion.div whileHover={{ scale: 1.05 }}>
					<Button className="bg-green-600 hover:bg-green-700 text-white">
						Donate to Those in Need
					</Button>
				</motion.div>
				<div className="flex justify-center gap-6 mt-6">
					<div className="text-center">
						<FaHandsHelping className="text-green-500 text-4xl" />
						<p className="mt-2">10,000+ Meals Shared</p>
					</div>
					<div className="text-center">
						<MdOutlineFastfood className="text-yellow-500 text-4xl" />
						<p className="mt-2">150+ Local Shelters</p>
					</div>
					<div className="text-center">
						<FaLeaf className="text-green-400 text-4xl" />
						<p className="mt-2">Eco-Friendly Practices</p>
					</div>
					<div className="text-center">
						<FaTrashAlt className="text-red-500 text-4xl" />
						<p className="mt-2">Reduced Landfill Waste</p>
					</div>
				</div>
			</div>

			{/* What Else Section */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">But What Else?</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						{
							icon: <FaSeedling />,
							label: "Compost",
							desc: "Turn scraps into soil nutrients.",
						},
						{
							icon: <FaRecycle />,
							label: "Recycling",
							desc: "Manage packaging or food containers.",
						},
						{
							icon: <MdOutlineFactory />,
							label: "Biofuel",
							desc: "Convert waste into energy.",
						},
					].map((item, index) => (
						<motion.div
							key={index}
							whileHover={{ scale: 1.05 }}
							className="p-4 bg-white rounded-2xl shadow-md"
						>
							<div className="text-4xl text-green-500">{item.icon}</div>
							<h3 className="text-xl font-medium mt-4">{item.label}</h3>
							<p className="text-gray-600 mt-2">{item.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Food Amount Toggle */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Choose Food Amount</h2>
				<div className="flex justify-center space-x-4">
					<Button
						onClick={() => setFoodAmount("small")}
						className={`${
							foodAmount === "small" ? "bg-green-700" : "bg-green-500"
						}`}
					>
						Small Amount
					</Button>
					<Button
						onClick={() => setFoodAmount("large")}
						className={`${
							foodAmount === "large" ? "bg-green-700" : "bg-green-500"
						}`}
					>
						Large Amount
					</Button>
				</div>

				{foodAmount === "small" ? (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="p-4 bg-white rounded-2xl shadow-md"
					>
						<h3 className="text-xl font-medium">Small Disposal Methods</h3>
						<p className="text-gray-600">
							Use community compost bins, donate to local food banks, or set up
							a sharing fridge.
						</p>
					</motion.div>
				) : (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="p-4 bg-white rounded-2xl shadow-md"
					>
						<h3 className="text-xl font-medium">Large Disposal Methods</h3>
						<p className="text-gray-600">
							Partner with industrial composting sites, food recycling plants,
							or organizations that repurpose food waste for sustainable
							products.
						</p>
					</motion.div>
				)}
			</section>

			{/* Disposal Methods Section */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Explore Disposal Methods</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[
						{
							icon: <FaLeaf />,
							label: "Vermicomposting",
							desc: "Use worms to decompose food scraps naturally.",
						},
						{
							icon: <MdOutlineCleaningServices />,
							label: "Anaerobic Digestion",
							desc: "Break down waste to produce biogas.",
						},
						{
							icon: <FaTrashAlt />,
							label: "Landfill Management",
							desc: "Ensure proper disposal to reduce environmental impact.",
						},
						{
							icon: <FaRecycle />,
							label: "Upcycling",
							desc: "Transform food waste into new, usable products.",
						},
					].map((item, index) => (
						<motion.div
							key={index}
							whileHover={{ scale: 1.05 }}
							className="p-4 bg-white rounded-2xl shadow-md"
						>
							<div className="text-4xl text-green-500">{item.icon}</div>
							<h3 className="text-xl font-medium mt-4">{item.label}</h3>
							<p className="text-gray-600 mt-2">{item.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Contact Section */}
			<section className="text-center p-6 bg-green-200 rounded-2xl">
				<h2 className="text-2xl font-semibold">
					Try to Contact Our Disposal Method System
				</h2>
				<motion.div
					whileHover={{ scale: 1.05 }}
					className="inline-flex items-center gap-2 mt-4"
				>
					<FaPhoneAlt className="text-green-700 text-2xl" />
					<Button className="bg-green-600 hover:bg-green-700 text-white">
						Contact Us
					</Button>
				</motion.div>
				<p className="mt-4 text-gray-600">
					We can help you manage food disposal efficiently and sustainably.
					Let’s make a change together!
				</p>
			</section>
		</div>
	);
}

// Let me know if you want me to enhance anything or add more content! 🚀✨
