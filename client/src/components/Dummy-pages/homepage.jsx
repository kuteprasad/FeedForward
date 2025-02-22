import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from '../layout/Navbar';
import heroImage from '../assets/hero-image.png'; // Make sure to add your hero image

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full hero-section  flex items-center relative overflow-hidden min-h-screen bg-[var(--section-bg-light)] dark:bg-[var(--section-bg-dark)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-teal)]/20 via-[var(--primary-teal)]/10 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center justify-between gap-12">
            {/* Left Content */}
            <div className="w-1/2 flex flex-col h-full">
              <h1 className="relative">
                <span className="block text-6xl font-extrabold mb-2 leading-tight tracking-tight font-display animate-fade-in">
                  Rescue Surplus Food,
                </span>
                <span className="block text-6xl font-extrabold leading-tight tracking-tight font-display animate-fade-in delay-200">
                  Feed Those in Need
                </span>
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-[var(--primary-teal)] mt-4"></div>
              </h1>
              <p className="text-xl mb-16 text-gray-600 dark:text-gray-400">
                Connecting food donors with NGOs for real-time redistribution.
              </p>
              <div className="flex gap-6 mt-auto mb-8">
                <button className="px-8 py-4 rounded-full font-semibold text-lg bg-[var(--cta-bg-light)] dark:bg-[var(--cta-bg-dark)] text-[var(--cta-text-light)] dark:text-[var(--cta-text-dark)] border border-[var(--border-light)] dark:border-[var(--border-dark)] hover:bg-[var(--primary-teal)] hover:text-white transition-all">
                  Donate Surplus Food
                </button>
                <button className="px-8 py-4 rounded-full font-semibold text-lg bg-[var(--cta-bg-light)] dark:bg-[var(--cta-bg-dark)] text-[var(--cta-text-light)] dark:text-[var(--cta-text-dark)] border border-[var(--border-light)] dark:border-[var(--border-dark)] hover:bg-[var(--primary-teal)] hover:text-white transition-all">
                  Find Food Assistance
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-1/2">
              <img 
                src={heroImage} 
                alt="Food Donation" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-6">Location</h4>
              <p className="text-gray-300">123 Food Street, Charity Lane</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Support</h4>
              <p className="text-gray-300">help@feedforward.com</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-l-full text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-teal)]"
                />
                <button className="bg-[var(--primary-teal)] text-white px-6 rounded-r-full hover:bg-[var(--primary-teal)] transition-colors">
                  Join
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Follow Us</h4>
              <div className="flex gap-6">
                <FaFacebook className="text-2xl hover:text-[var(--primary-teal)] cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-[var(--primary-teal)] cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-[var(--primary-teal)] cursor-pointer" />
                <FaLinkedin className="text-2xl hover:text-[var(--primary-teal)] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
