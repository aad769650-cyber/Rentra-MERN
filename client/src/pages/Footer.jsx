import React from 'react';

export default function Footer() {
  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Safety Tips", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" }
  ];

  const exploreLinks = [
    { name: "Rent Apartments", href: "#" },
    { name: "Buy Properties", href: "#" },
    { name: "Sell Property", href: "#" },
    { name: "Post Listing", href: "#" },
    { name: "Agent Directory", href: "#" }
  ];

  return (
        <>
      <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Company */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Explore */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">
         <img src="logo.svg" alt="logo" className='w-20 h-10' />
              © 2026 Rentra. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
 </> );
}