import DonorNgoSection from "./subcomponents/DonorNgoSection";
import HeroSection from "./subcomponents/Herosection";
import HowItWorks from "./subcomponents/HowITWorks";
import ImpactMetrics from "./subcomponents/ImpactMetrics";
import VisionMission from "./subcomponents/VisionMission";
import WhyChooseUsContact from "./subcomponents/WhyChooseUsContact";

const About = () => {
	const foodSafetyTips = [
		"Wash your hands thoroughly before handling food.",
		"Store food at appropriate temperatures.",
		"Cook food to the recommended internal temperature.",
		"Don't cross-contaminate raw and cooked food.",
		// ... more tips
	];

	const faq = [
		{
			question: "How can I donate food?",
			answer:
				"You can post donation details on our platform, and NGOs will be notified.",
		},
		{
			question: "How do I become a volunteer?",
			answer:
				"Sign up on our platform, and you'll receive notifications about pickup requests.",
		},
		// ... more FAQs
	];
	return (
		// We will device these factor to home and About .../
		<>
			<HeroSection />
			<ImpactMetrics />
			<HowItWorks />
			<VisionMission />

			<DonorNgoSection />
			<WhyChooseUsContact />
			{/* Food Safety */}
			<section className="food-safety py-12 bg-gray-100 dark:bg-gray-800">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8 text-center text-[var(--text)]">
						Food Safety
					</h2>
					<p className="text-lg mb-4 text-center text-[var(--text)]">
						We prioritize food safety. Please follow these guidelines:
					</p>
					<ul className="food-safety-tips list-disc pl-6 text-lg text-[var(--text)]">
						{foodSafetyTips.map((tip, index) => (
							<li key={index}>{tip}</li>
						))}
					</ul>
					{/* You could also include links to external food safety resources */}
				</div>
			</section>

			{/* Transparency/Accountability */}
			<section className="transparency py-12">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8 text-center text-[var(--text)]">
						Transparency & Accountability
					</h2>
					<p className="text-lg text-center text-[var(--text)]">
						We are committed to transparency. All donations are tracked, and we
						ensure they reach the intended beneficiaries. We publish
						[Reports/Summaries] regularly.
					</p>
					{/* You might include links to reports or visualizations of donation data */}
				</div>
			</section>

			{/* Get Involved */}
			<section className="get-involved py-12 bg-gray-100 dark:bg-gray-800">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8 text-center text-[var(--text)]">
						Get Involved
					</h2>
					<p className="text-lg text-center text-[var(--text)]">
						Want to make a difference? Here's how you can help:
					</p>
					<div className="get-involved-options grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
						{" "}
						{/* Grid layout */}
						<div className="get-involved-option p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md transition hover:scale-105">
							<h3 className="text-2xl font-semibold mb-4 text-[var(--primary-teal)]">
								Donate Food
							</h3>
							<p className="text-lg text-[var(--text)]">
								Donate surplus food from your business or home.
							</p>
							<button className="bg-[var(--primary-teal)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-teal-dark)] transition">
								Donate Now
							</button>{" "}
							{/* Styled button */}
						</div>
						<div className="get-involved-option p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md transition hover:scale-105">
							<h3 className="text-2xl font-semibold mb-4 text-[var(--primary-teal)]">
								Volunteer
							</h3>
							<p className="text-lg text-[var(--text)]">
								Help us pick up and deliver food to those in need.
							</p>
							<button className="bg-[var(--primary-teal)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-teal-dark)] transition">
								Volunteer Now
							</button>{" "}
							{/* Styled button */}
						</div>
						<div className="get-involved-option p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md transition hover:scale-105">
							<h3 className="text-2xl font-semibold mb-4 text-[var(--primary-teal)]">
								Spread the Word
							</h3>
							<p className="text-lg text-[var(--text)]">
								Tell your friends and family about our platform.
							</p>
							{/* Add social media sharing buttons */}
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="faq py-12">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8 text-center text-[var(--text)]">
						Frequently Asked Questions
					</h2>
					<div className="faq-list space-y-4">
						{" "}
						{/* Added spacing */}
						{faq.map((item, index) => (
							<div
								key={index}
								className="faq-item p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md transition"
							>
								<h3 className="text-xl font-semibold mb-2 text-[var(--primary-teal)]">
									{item.question}
								</h3>
								<p className="text-lg text-[var(--text)]">{item.answer}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Environmental Impact */}
			<section className="environmental-impact py-12 bg-gray-100 dark:bg-gray-800">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold mb-8 text-center text-[var(--text)]">
						Environmental Impact
					</h2>
					<p className="text-lg text-center text-[var(--text)]">
						By reducing food waste, we're also helping the environment. We've
						helped divert X amount of food from landfills, which translates to
						[quantifiable environmental benefits, e.g., reduced greenhouse gas
						emissions, water conservation].
					</p>
					{/* You could include visuals or infographics to illustrate the environmental impact. */}
				</div>
			</section>
		</>
	);
};

export default About;
