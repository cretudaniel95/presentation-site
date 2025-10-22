'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-600" />
            <span className="font-bold text-lg text-secondary-900">Presentation</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#about" className="text-secondary-600 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="#gallery" className="text-secondary-600 hover:text-primary-600 transition">
              Gallery
            </Link>
            <Link href="#contact" className="text-secondary-600 hover:text-primary-600 transition">
              Contact
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
            Welcome to Your Professional Presentation
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
            Showcase your work, share your story, and connect with your audience in a beautiful,
            modern way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              View Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            About Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-secondary-600 mb-6">
                We are dedicated to providing exceptional services and creating memorable experiences.
              </p>
              <p className="text-lg text-secondary-600 mb-6">
                With years of expertise and a passion for excellence, we bring your vision to life.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-secondary-500">Featured Image</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            Our Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 flex items-center justify-center">
                  <p className="text-secondary-500">Gallery Item {item}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-secondary-900 mb-2">Gallery Item {item}</h3>
                  <p className="text-secondary-600 text-sm">Beautiful showcase of our work</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            Get in Touch
          </h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="w-full px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary-400">
            &copy; 2024 Presentation Site. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
