import React from 'react'
import { useEffect } from 'react'
import { ApproveRoom, DeleteRoom, getAllData, RejectRoom } from '../api/apiCall'
import { useState } from 'react'
import { Search, Home, MapPin, DollarSign, Users, Calendar, Bed, Bath, Image, Check, X, Edit, Trash2, Eye, ChevronDown, ChevronUp, Menu, Bell, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';

const Admin = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedProperty, setExpandedProperty] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const [editingId, setEditingId] = useState(null);
  const [properties,setProperties]=useState([])
const navigate=useNavigate()
  useEffect(()=>{
    console.log("inside");
    
const data=getAllData().then((res)=>{
  console.log("res",res);
  return setProperties(res)
  
})
console.log(properties);

  },[])
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return `$${Math.abs(parseFloat(price)).toFixed(2)}`;
  };

  const handleApprove = (id) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, status: 'approved' } : prop
    ));


ApproveRoom(id)

  };

  const handleReject = (id) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, status: 'rejected' } : prop
    ));


    RejectRoom(id)
  };

  const handleDelete = (id) => {
      setProperties(properties.filter(prop => prop.id !== id));
    toast.info(`Room at id :${id} deleted `)


 DeleteRoom(id)

  };

  const toggleExpand = (id) => {
    setExpandedProperty(expandedProperty === id ? null : id);
  };


  

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || prop.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 h-1"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Management Dashboard</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users, orders, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <button className="hidden md:relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
     
              
              <button className="hidden sm:flex p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>

              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">bakr@gmail.com</p>
                </div>
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full hidden  md:flex items-center justify-center text-white font-semibold">
                  AU
                </div>
              </div>

              <button className=" sm:flex p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
              onClick={
()=>{
  
                    localStorage.removeItem("isAuthenticate") ;
              navigate("/loginAdmin")
}}>
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, city, or address..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          
          
          
          
          
          
          
          <div className="group relative bg-linear-to-br from-white to-gray-50 rounded-2xl  transition-all duration-300 overflow-hidden border border-gray-100">
  {/* Decorative linear overlay */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400/10 to-purple-400/10 rounded-bl-full"></div>
  
  {/* Content */}
  <div className="relative p-6">
    {/* Header with icon */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <img src={property.photos} alt="Host Image" className='w-12 h-12 rounded-xl'/>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{property.full_name}</h3>
          <p className="text-sm text-gray-500">{property.email}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
    </div>

 

    {/* Footer action */}
  
  </div>

  {/* Hover effect overlay */}
  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl transition-all duration-300"></div>
</div>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
              {/* Property Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>-
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.address}, {property.city}, {property.country}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Listed: {formatDate(property.created_at)}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(property.id)}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {expandedProperty === property.id ? 
                      <ChevronUp className="w-5 h-5 text-gray-600" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    }
                  </button>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Per Night</div>
                      <div className="font-semibold text-gray-900">{formatPrice(property.pricePerNight)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Type</div>
                      <div className="font-semibold text-gray-900 capitalize">{property.propertyType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Bedrooms</div>
                      <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Bathrooms</div>
                      <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Max Guests</div>
                      <div className="font-semibold text-gray-900">{property.maxGuests}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Min Stay</div>
                      <div className="font-semibold text-gray-900">{property.minimumStay} night{property.minimumStay > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProperty === property.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Property Photo */}
                      <div className="lg:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Image className="w-4 h-4" />
                          Property Photo
                        </h3>
                        <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
                          <img 
                            src={property.photos} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="lg:col-span-2 space-y-4">
                        {/* Description */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                          <p className="text-sm text-gray-600">{property.description || 'No description provided'}</p>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Pricing Details</h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Price per night:</span>
                                <span className="font-medium">{formatPrice(property.pricePerNight)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Cleaning fee:</span>
                                <span className="font-medium">{formatPrice(property.cleaningFee)}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Accommodation</h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Beds:</span>
                                <span className="font-medium">{property.beds}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Space type:</span>
                                <span className="font-medium">{property.spaceType || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Essentials</div>
                              <div className="text-sm text-gray-600">
                                {property.essentials.length > 0 ? property.essentials.join(', ') : 'None listed'}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Features</div>
                              <div className="text-sm text-gray-600">
                                {property.features.length > 0 ? property.features.join(', ') : 'None listed'}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Safety</div>
                              <div className="text-sm text-gray-600">
                                {property.safety.length > 0 ? property.safety.join(', ') : 'None listed'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {property.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(property.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(property.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProperties.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Admin
















