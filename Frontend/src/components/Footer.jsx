import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Us</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay informed with our curated news from trusted sources worldwide.
              Personalize your feed and never miss important updates.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[{ to: '/', text: 'Home' }, { to: '/profile', text: 'Profile' }, { to: '#', text: 'Categories' }, { to: '#', text: 'Trending' }].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map((text, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to our newsletter for daily news updates.
            </p>
            <form className="space-y-3">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {currentYear} NewsAggregator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
