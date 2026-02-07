import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



export default function DetailOfRooms() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [property,setProperty]=useState({});

  const navigate=useNavigate()
    const params=useParams();
    console.log(params);

    const apiCall=async()=>{
        const resp=await axios.get(`http://localhost:8000/api/detail?city=${params.cityName}&room=${params.id}`)
   
   console.log(resp.data.detail);
   setProperty(resp.data.detail[0])
   
    }
    useEffect(()=>{
        apiCall()
    },[])
 
  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const pricePerNight = parseFloat(property.price_per_night);
  const subtotal = nights * pricePerNight;
  const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.05) : 0; // 5% service fee
  const total = subtotal + serviceFee;

  const amenities = [
    { name: 'WiFi', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0', available: property.has_wifi },
    { name: 'Air Conditioning', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222', available: property.has_ac },
    { name: 'Kitchen', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', available: property.has_kitchen },
    { name: 'Free Parking', icon: 'M6 18L18 6M6 6l12 12', available: property.has_parking },
    { name: 'UPS Backup', icon: 'M13 10V3L4 14h7v7l9-11h-7z', available: property.has_ups_backup },
    { name: '24/7 Security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', available: property.has_security }
  ];

  return (
    <div className="min-h-screen bg-white p-4">
<div className='text-center p-8 bg-linear-to-b from-blue-50 to-white'>
  <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 drop-shadow-sm'>
    {params.cityName.charAt(0).toUpperCase()+params.cityName.slice(1)}
  </h1>
  <div className='w-32 h-1.5 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 mx-auto rounded-full mt-3'></div>
</div>
      {/* Hero Image */}
<div className="w-100 h-50 md:h-75 lg:h-125 relative overflow-hidden bg-gray-100">
  <img 
    src={property.main_pic} 
    alt={property.title}
    className="w-full h-full object-cover object-center rounded"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
  
  {/* Back Button */}
  <button 
    onClick={() => navigate(-1)}
    className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
  >
    <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>
  
  {/* Favorite Button */}
  <button className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
    <svg className="w-6 h-6 text-red-500 group-hover:fill-red-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  </button>

  {/* Property Badge */}
  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="font-semibold text-gray-900">Premium Property</span>
    </div>
  </div>

  {/* Share Button */}
  <button className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
    <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  </button>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {property.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{property.avg_rating}</span>
                  <span className="text-gray-600">({property.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{property.location_sector}</span>
                </div>
              </div>
            </div>

            {/* Host Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <div className="flex items-center gap-4">
                <img 
                  src={"/host.jpg"} 
                  alt={property.hosted_by}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <p className="text-sm text-gray-600">Hosted by</p>
                  <h3 className="text-xl font-bold text-gray-900">Abu Bakr Shiraz</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-600">Verified Host</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.special_info}
              </p>
            </div>

            {/* What this place offers */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  amenity.available ? (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">{amenity.name}</span>
                    </div>
                  ) : null
                ))}
              </div>
            </div>

            {/* Complete Host Details */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet your host</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={"/host.jpg"} 
                    alt={"Abu Bakr Shiraz"}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{"Abu Bakr Shiraz"}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">{property.total_reviews} Reviews</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Verified</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Response time</p>
                        <p className="text-gray-600">Within an hour</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Hosting since</p>
                        <p className="text-gray-600">January 2022</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Properties</p>
                        <p className="text-gray-600">3 active listings</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Hello! I'm Ahmed, a property owner in Islamabad. I love hosting guests and ensuring they have a comfortable stay. My properties are well-maintained and located in prime areas of the city. I'm always available to help my guests with any questions or concerns.
                  </p>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      Rs {pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/ night</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-900">{property.avg_rating}</span>
                    <span className="text-gray-600">· {property.total_reviews} reviews</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                      <input 
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                      <input 
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                      <option value="5">5+ guests</option>
                    </select>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                    <div className="flex items-center justify-between text-blue-900">
                      <span className="font-semibold">Total Nights:</span>
                      <span className="text-xl font-bold">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                    </div>
                  </div>
                )}

                <button 
                  disabled={!checkInDate || !checkOutDate || nights <= 0}
                  className={`w-full font-bold py-4 rounded-lg transition-all shadow-lg mb-3 ${
                    checkInDate && checkOutDate && nights > 0
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {checkInDate && checkOutDate && nights > 0 ? 'Book Now' : 'Select Dates to Book'}
                </button>
                <button 
                  disabled={!checkInDate || !checkOutDate || nights <= 0}
                  className={`w-full font-bold py-4 rounded-lg transition-all ${
                    checkInDate && checkOutDate && nights > 0
                      ? 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                      : 'bg-white border-2 border-gray-300 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Reserve
                </button>

                {!checkInDate || !checkOutDate || nights <= 0 ? (
                  <p className="text-center text-sm text-gray-600 mt-4">
                    You won't be charged yet
                  </p>
                ) : null}

                {nights > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span className="flex items-center gap-2">
                        Rs {pricePerNight.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="flex items-center gap-1">
                        Service fee
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="font-semibold">Rs {serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-blue-600">Rs {total.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Safety Info */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Safe & Secure</h4>
                    <p className="text-sm text-gray-600">Your payment information is protected with industry-standard encryption.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}