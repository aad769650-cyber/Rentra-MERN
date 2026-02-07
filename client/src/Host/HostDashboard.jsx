import React, { useEffect, useState } from 'react';
import { Plus, Home, DollarSign, Calendar, Users, Settings, Bell, Search, MapPin, Star, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getProfileInfo,getAllPostData, Logout } from '../api/apiCall';

export default function HostDashboard() {
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
const [hostProfile,setHostProfile]=useState({})
const [recentListings,setRecentListings]=useState([])
const navigate=useNavigate()
useEffect(()=>{
getProfileInfo().then((res)=>{
  console.log(res);
  setHostProfile(res)
  
})



getAllPostData().then((res)=>{
  console.log(res.msg);
  setRecentListings(res.msg)
  
})

},[])


  // Sample data
 

  const stats = [
    { label: "Total Listings", icon: Home, color: "bg-blue-500" },
    { label: "Bookings", icon: Calendar, color: "bg-purple-500" },
    { label: "Total Guests" , icon: Users, color: "bg-orange-500" }
  ];

  // const recentListings = [
  //   { id: 1, name: "Cozy Downtown Loft", location: "New York, NY", price: "$120/night", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop", status: "Active" },
  //   { id: 2, name: "Beach House Retreat", location: "Malibu, CA", price: "$350/night", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop", status: "Active" },
  //   { id: 3, name: "Mountain Cabin Escape", location: "Aspen, CO", price: "$280/night", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=400&h=300&fit=crop", status: "Inactive" }
  // ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Host Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <LogOut className="w-5 h-5 text-red-600 cursor-pointer" 
                onClick={()=>{
                  Logout();
                  
                  
                  
                  navigate("/")
                  
                  }}/>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img 
                src={hostProfile.profile_picture_url} 
                alt={hostProfile.full_name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">{hostProfile.full_name}</h2>
              <p className="text-gray-600 mb-2">{hostProfile.email}</p>
              <div className="flex items-center gap-4 justify-center sm:justify-start text-sm text-gray-500">
                <span>2024</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">5</span>
                </span>
              </div>
            </div>
            <NavLink 
            to={"/host"}
              onClick={() => setShowAddRoomForm(true)}
              className="bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Room
            </NavLink>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{recentListings.length}</p>
            </div>
          ))}
        </div>

        {/* Recent Listings */}
   <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-xl font-semibold text-gray-900">Your Listings</h3>
    <button className="text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors">
      View All
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {recentListings.map((listing) => (
      <div 
        key={listing.id}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img 
            src={listing.photos} 
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              listing.status === 'active' 
                ? 'bg-green-500 text-white' 
                : listing.status === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-500 text-white'
            }`}>
              {listing.status}
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-white/90 backdrop-blur-sm text-gray-700">
              {listing.propertyType}
            </span>
          </div>
        </div>
        
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-pink-500 transition-colors line-clamp-1">
          {listing.title}
        </h4>
        
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{listing.city}, {listing.country}</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {listing.maxGuests} guests
          </span>
          <span className="flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            {listing.bedrooms} bed
          </span>
          <span>{listing.bathrooms} bath</span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <p className="font-semibold text-gray-900 text-lg">
            ${listing.pricePerNight}
          </p>
          <span className="text-gray-600 text-sm">/ night</span>
        </div>
        
        {listing.cleaningFee && parseFloat(listing.cleaningFee) > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            +${listing.cleaningFee} cleaning fee
          </p>
        )}
      </div>
    ))}
  </div>
</div>
      </div>

      {/* Add Room Form Modal Placeholder */}
      {showAddRoomForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Add New Room</h3>
              <button 
                onClick={() => setShowAddRoomForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600">Your existing form component goes here...</p>
          </div>
        </div>
      )}
    </div>
  );
}