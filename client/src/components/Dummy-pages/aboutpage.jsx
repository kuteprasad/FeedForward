import DonorNgoSection from "./subcomponents/DonorNgoSection";
import HeroSection from "./subcomponents/Herosection";
import HowItWorks from "./subcomponents/HowITWorks";
import ImpactMetrics from "./subcomponents/ImpactMetrics";
import VisionMission from "./subcomponents/VisionMission";
import WhyChooseUsContact from "./subcomponents/WhyChooseUsContact";

const About = () => {
	return (
		// We will device these factor to home and About .../
		<>  
			<HeroSection />
			<ImpactMetrics />
			<HowItWorks />
			<VisionMission />
			
			<DonorNgoSection />
			<WhyChooseUsContact />
		</>
	);
};

export default About;
