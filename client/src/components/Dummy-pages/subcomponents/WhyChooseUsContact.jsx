import { motion } from "framer-motion";
import { Button } from "@headlessui/react";
import foodDonationImage from '../../assets/why_choose_us.jpg';
import {
  FaBolt, FaMapMarkerAlt, FaChartBar, FaUsers,
  FaPhone, FaEnvelope, FaMapPin,
  FaFacebook, FaInstagram, FaLinkedin,
} from "react-icons/fa";

export default function WhyChooseUsContact() {
  return (
    <>
      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] 
                         flex flex-col md:flex-row items-center transition-colors duration-300">
        <div className="md:w-1/2 px-6 text-left">
          <h2 className="text-4xl font-bold mb-6 text-[var(--accent-orange)]">
            Why Choose FeedForward?
          </h2>
          <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-lg mb-8">
            Transforming surplus into smiles with real-time technology & community-driven impact.
          </p>
          <div className="space-y-6">
            {[
              { icon: FaBolt, text: "Real-time Food Matching – AI-driven tech ensures fast & efficient food distribution." },
              { icon: FaMapMarkerAlt, text: "Geo-location Based Connectivity – Matches donors & NGOs instantly." },
              { icon: FaChartBar, text: "Data-Driven Insights – Track donations & impact effortlessly." },
              { icon: FaUsers, text: "Community-Centered Approach – Strengthening bonds between food donors & NGOs." }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4"
              >
                <item.icon className="text-[var(--accent-orange)] text-3xl" />
                <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-lg">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2 h-110 bg-cover bg-center relative">
          <img 
            src={foodDonationImage

            } 
            alt="Food Donation" 
            className="w-full h-full object-cover rounded-lg"
          />
          <motion.div whileHover={{ scale: 1.05 }} className="absolute bottom-4 left-4">
            <Button className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                           text-[var(--accent-orange)] border border-[var(--accent-orange)] 
                           px-6 py-2 rounded-lg transition-colors duration-300">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-6 bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] 
                         flex flex-col md:flex-row items-center transition-colors duration-300">
        <div className="md:w-1/2 bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)] 
                      p-8 rounded-lg shadow-lg transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-4 text-[var(--text-light)] dark:text-[var(--text-dark)]">
            Send Us a Message
          </h3>
          <form>
            {["Your Name", "Your Email"].map((placeholder, index) => (
              <input
                key={index}
                type={index === 1 ? "email" : "text"}
                placeholder={placeholder}
                className="w-full p-2 mb-4 bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
                         text-[var(--text-light)] dark:text-[var(--text-dark)]
                         border border-[var(--border-light)] dark:border-[var(--border-dark)]
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-teal)]
                         transition-colors duration-300"
              />
            ))}
            <textarea
              placeholder="Your Message"
              className="w-full p-2 mb-4 bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
                       text-[var(--text-light)] dark:text-[var(--text-dark)]
                       border border-[var(--border-light)] dark:border-[var(--border-dark)]
                       rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-teal)]
                       transition-colors duration-300"
            ></textarea>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="bg-[var(--primary-teal)] text-white px-6 py-2 rounded-lg 
                             hover:bg-[var(--primary-teal)]/90 transition-colors duration-300">
                Send Message
              </Button>
            </motion.div>
          </form>
        </div>

        <div className="md:w-1/2 px-6 text-left">
          <h2 className="text-4xl font-bold mb-6 text-[var(--primary-teal)]">
            Get in Touch With Us!
          </h2>
          <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-lg mb-8">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
          <div className="space-y-6">
            {[
              { icon: FaPhone, text: "+91 12345 67890" },
              { icon: FaEnvelope, text: "support@feedforward.com" },
              { icon: FaMapPin, text: "Pune, India" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <item.icon className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-2xl" />
                <p className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-lg">
                  {item.text}
                </p>
              </div>
            ))}
            <div className="flex space-x-4 mt-4">
              {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, index) => (
                <Icon
                  key={index}
                  className="text-[var(--text-light)] dark:text-[var(--text-dark)] text-3xl 
                           cursor-pointer hover:text-[var(--primary-teal)] 
                           hover:scale-110 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}