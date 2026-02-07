import React, { useState } from 'react';

export default function PopularLink() {
  const categories = [
    { id: 1, heading: "Apartments" },
    { id: 2, heading: "Houses" },
    { id: 3, heading: "PG & Co-living" },
    { id: 4, heading: "Furnished" },
    { id: 5, heading: "Unfurnished" },
    { id: 6, heading: "Short-Term Rent" }
  ];

  const categoryData = {
    1: [ // Apartments
      { city: "Lahore", roomType: "2 Bedroom" },
      { city: "Karachi", roomType: "3 Bedroom" },
      { city: "Islamabad", roomType: "Studio" },
      { city: "Rawalpindi", roomType: "1 Bedroom" },
      { city: "Faisalabad", roomType: "Penthouse" },
      { city: "Multan", roomType: "2 Bedroom" }
    ],
    2: [ // Houses
      { city: "Lahore", roomType: "Villa" },
      { city: "Islamabad", roomType: "Bungalow" },
      { city: "Karachi", roomType: "Townhouse" },
      { city: "Peshawar", roomType: "Duplex" },
      { city: "Multan", roomType: "5 Bedroom" }
    ],
    3: [ // PG & Co-living
      { city: "Lahore", roomType: "Shared Room" },
      { city: "Karachi", roomType: "Private Room" },
      { city: "Islamabad", roomType: "Single Room" },
      { city: "Rawalpindi", roomType: "Double Room" },
      { city: "Faisalabad", roomType: "Triple Room" },
      { city: "Gujranwala", roomType: "Shared Room" }
    ],
    4: [ // Furnished
      { city: "Lahore", roomType: "Luxury Suite" },
      { city: "Islamabad", roomType: "Executive Suite" },
      { city: "Karachi", roomType: "Deluxe" },
      { city: "Rawalpindi", roomType: "Premium" },
      { city: "Multan", roomType: "Standard" }
    ],
    5: [ // Unfurnished
      { city: "Lahore", roomType: "3 Bedroom" },
      { city: "Karachi", roomType: "4 Bedroom" },
      { city: "Islamabad", roomType: "2 Bedroom" },
      { city: "Sialkot", roomType: "5 Bedroom" },
      { city: "Faisalabad", roomType: "1 Bedroom" },
      { city: "Multan", roomType: "Studio" }
    ],
    6: [ // Short-Term Rent
      { city: "Lahore", roomType: "Studio" },
      { city: "Islamabad", roomType: "1 Bedroom" },
      { city: "Karachi", roomType: "Serviced Apartment" },
      { city: "Rawalpindi", roomType: "2 Bedroom" }
    ]
  };

  const [activeCategory, setActiveCategory] = useState(1);

  const selectedCategory = categories.find(cat => cat.id === activeCategory);
  const selectedData = categoryData[activeCategory];

  return (
    <div className=" bg-white">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Property Listings
          </h1>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                    : 'bg-blue-500 bg-opacity-50 text-white hover:bg-opacity-70 hover:shadow-md'
                }`}
              >
                {category.heading}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {selectedCategory.heading}
          </h2>
          <p className="text-sm text-gray-600">
            {selectedData.length} locations available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedData.map((item, index) => (
            <div 
              key={index}
              className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-400 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-600 p-1.5 rounded">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-1">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-sm text-gray-700">
                      {item.roomType}
                    </span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}