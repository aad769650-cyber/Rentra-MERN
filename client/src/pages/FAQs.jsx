import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const faqData = [
    {
      category: "Getting Started",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple! Click on the 'Sign Up' button in the top right corner, enter your email address, create a password, and verify your email. You can also sign up using your Google or Facebook account for faster registration."
        },
        {
          question: "Is it free to list my property?",
          answer: "Yes, listing your property is completely free! We only charge a small service fee when you successfully complete a booking. There are no upfront costs, monthly fees, or hidden charges for hosts."
        },
        {
          question: "How do I search for properties?",
          answer: "Use our search bar to enter your destination, check-in and check-out dates, and number of guests. You can filter results by price, property type, amenities, and more to find the perfect place for your stay."
        }
      ]
    },
    {
      category: "Booking & Payments",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted channels."
        },
        {
          question: "When will I be charged for my booking?",
          answer: "For most bookings, you'll be charged immediately after confirmation. However, some hosts may require a deposit upfront with the remaining balance due closer to your check-in date. The payment schedule will be clearly shown before you confirm your booking."
        },
        {
          question: "What is your cancellation policy?",
          answer: "Cancellation policies vary by host and property. Options include flexible (full refund up to 24 hours before check-in), moderate (full refund up to 5 days before), and strict (50% refund up to 7 days before). Always check the specific policy before booking."
        },
        {
          question: "Can I get a refund if I cancel?",
          answer: "Refunds depend on the cancellation policy of the property and when you cancel. If you cancel within the allowed timeframe, you'll receive a refund according to the policy. Service fees may be non-refundable in some cases."
        }
      ]
    },
    {
      category: "For Hosts",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      questions: [
        {
          question: "How do I set my pricing?",
          answer: "You have full control over your pricing. Set your nightly rate, cleaning fee, and any additional charges. You can also use our smart pricing tool that automatically adjusts rates based on demand, seasonality, and local events."
        },
        {
          question: "How and when do I receive payments?",
          answer: "Payments are released to your account 24 hours after guest check-in. You can choose to receive payments via direct bank transfer, PayPal, or other supported methods. Processing typically takes 3-5 business days."
        },
        {
          question: "What if a guest damages my property?",
          answer: "All bookings include host protection coverage. If a guest causes damage, report it within 14 days of checkout with photos and receipts. Our team will review the claim and process compensation accordingly. You can also require a security deposit for added protection."
        }
      ]
    },
    {
      category: "For Guests",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      questions: [
        {
          question: "Can I contact the host before booking?",
          answer: "Yes! You can message hosts directly through our platform before making a reservation. This allows you to ask questions about the property, amenities, house rules, or anything else you'd like to know."
        },
        {
          question: "What if I have issues during my stay?",
          answer: "Contact your host immediately through the app or our 24/7 customer support team. For urgent issues like safety concerns or access problems, our support team is available around the clock to assist you."
        },
        {
          question: "How do reviews work?",
          answer: "After your stay, both you and the host can leave reviews within 14 days. Reviews are only published once both parties have submitted theirs, or after the 14-day window closes. Honest reviews help maintain trust in our community."
        }
      ]
    },
    {
      category: "Safety & Security",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      questions: [
        {
          question: "How do you verify hosts and guests?",
          answer: "We verify identities through government-issued IDs, phone numbers, and email addresses. Hosts must provide additional verification for their properties. We also use secure payment processing and never share your financial information."
        },
        {
          question: "Is my personal information safe?",
          answer: "Yes, we use industry-standard encryption and security measures to protect your data. Your payment information is never shared with hosts, and your personal contact details are only revealed after a confirmed booking."
        },
        {
          question: "What should I do if I feel unsafe?",
          answer: "Your safety is our top priority. If you ever feel unsafe, contact our emergency support line immediately. We also recommend meeting in public spaces when viewing properties and trusting your instincts."
        }
      ]
    }
  ];

  const toggleAccordion = (questionIndex) => {
    setOpenIndex(openIndex === questionIndex ? null : questionIndex);
  };

  const currentCategory = faqData[activeCategory];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our rental platform
          </p>
        </div>

        {/* Category Selection Tabs */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-8 shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-3 justify-center">
            {faqData.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-100 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                </svg>
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category FAQs */}
        <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-sm border border-gray-200">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-300">
            <div className="bg-blue-600 p-3 rounded-xl shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentCategory.icon} />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {currentCategory.category}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {currentCategory.questions.length} frequently asked questions
              </p>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {currentCategory.questions.map((item, questionIndex) => {
              const isOpen = openIndex === questionIndex;

              return (
                <div 
                  key={questionIndex}
                  className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleAccordion(questionIndex)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`mt-1 transition-all duration-300 ${isOpen ? 'rotate-90 text-blue-600' : 'text-gray-400'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-lg text-gray-800 block mb-1">
                          {item.question}
                        </span>
                        <span className="text-sm text-gray-500">
                          Click to {isOpen ? 'collapse' : 'expand'}
                        </span>
                      </div>
                    </div>
                    <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <div 
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-6 pl-16">
                      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-600 shadow-inner">
                        <p className="text-gray-700 leading-relaxed text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-20 w-8 h-8 flex justify-center items-center shrink-0 font-bold rounded-full">
            R
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-blue-100 mb-6">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </button>
            <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}