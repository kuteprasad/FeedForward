import React from "react";
// import "./ColdStorage.css"; // Import your CSS file
import { motion } from "framer-motion";

const ColdStorage = () => {
	const processSteps = [
		{
			title: "Excess Food Collection",
			image: "https://source.unsplash.com/random/300x200/?food,catering", // Random image URL
			subtitle: "From Caterers & Events",
			points: [
				"Partner with caterers, restaurants, and event venues.",
				"Coordinate with food businesses for safe surplus food.",
			],
		},
		{
			title: "Collection through Vehicles",
			image: "https://source.unsplash.com/random/300x200/?truck,delivery", // Random image URL
			subtitle: "Safe & Efficient Transport",
			points: [
				"Refrigerated vehicles ensure food safety.",
				"Trained drivers follow strict hygiene protocols.",
			],
		},
		{
			title: "Storing at Optimum Temperatures",
			image: "https://source.unsplash.com/random/300x200/?cold,storage", // Random image URL
			subtitle: "Preserving Freshness",
			points: [
				"Immediate transport to temperature-controlled facilities.",
				"Network of warehouses to preserve food freshness.",
			],
		},
		{
			title: "Food Testing",
			image: "https://source.unsplash.com/random/300x200/?lab,food", // Random image URL
			subtitle: "Quality Assurance",
			points: [
				"Rigorous quality checks and testing before distribution.",
				"Thorough inspections by food safety experts.",
			],
		},
		{
			title: "Re-heating",
			image: "https://source.unsplash.com/random/300x200/?kitchen,cooking", // Random image URL
			subtitle: "Safe & Hygienic Preparation",
			points: [
				"Safe and hygienic reheating methods for warm meals.",
				"Modern kitchens with strict hygiene standards.",
			],
		},
		{
			title: "Food Distribution",
			image: "https://source.unsplash.com/random/300x200/?food,donation", // Random image URL
			subtitle: "Reaching Those in Need",
			points: [
				"Distribution through partner organizations and volunteers.",
				"Serving vulnerable populations in need.",
			],
		},
	];
	return (
		<div className="cold-storage-container">
			{" "}
			{/* Main container */}
			<section className="our-process py-12">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{" "}
						{/* Responsive grid */}
						{processSteps.map((step, index) => (
							<motion.div
								key={index}
								className="process-step p-6 rounded-lg bg-white shadow-md transition hover:scale-105 flex flex-col" // Flexbox for vertical alignment
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
							>
								<img
									src={step.image}
									alt={step.title}
									className="process-step-image rounded-lg object-cover mb-4 h-48 w-full" // Image styling
								/>
								<div className="flex flex-col flex-grow">
									{" "}
									{/* Content container */}
									<h3 className="text-xl font-semibold mb-2">
										{step.title}
									</h3>{" "}
									{/* Smaller title */}
									<ul className="list-disc pl-5 text-sm flex-grow">
										{" "}
										{/* Smaller list, takes up available space */}
										{step.points.map((point, i) => (
											<li key={i}>{point}</li>
										))}
									</ul>
									<p className="text-center text-gray-500 mt-2 text-sm">
										{step.subtitle}
									</p>{" "}
									{/* Subtitle below, smaller */}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ColdStorage;
