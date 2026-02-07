import React, { useState, useCallback } from 'react';
import { 
  Home, Building2, Mountain, DoorOpen, MapPin, 
  Wifi, Wind, Flame, Shield, 
  Upload, X, Check, ChevronLeft, ChevronRight,
  DollarSign, FileText, Sparkles,
  AlertCircle, Save, Send
} from 'lucide-react';
import { apiCall } from '../api/apiCall';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// --- INITIAL STATE ---
const initialState = {
  propertyType: '',
  spaceType: '',
  address: '',
  city: '',
  country: '',
  maxGuests: 1,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  essentials: [],
  safety: [],
  features: [],
  customAmenities: [],
  photos: [],
  coverPhotoIndex: 0,
  title: '',
  description: '',
  pricePerNight: '',
  cleaningFee: '',
  minimumStay: 1
};

// --- HELPER COMPONENTS ---

const NumberInput = React.memo(({ label, value, onChange, min = 0, max = 100, step = 1 }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700">{label}</label>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        className="w-10 h-10 rounded-full border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center disabled:opacity-40"
        disabled={value <= min}
      >
        <span className="text-xl text-slate-600">−</span>
      </button>
      <div className="w-16 text-center">
        <span className="text-2xl font-semibold text-slate-800">{value}</span>
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + step))}
        className="w-10 h-10 rounded-full border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center disabled:opacity-40"
        disabled={value >= max}
      >
        <span className="text-xl text-slate-600">+</span>
      </button>
    </div>
  </div>
));

const Step1 = ({ formData, updateFormData, errors, propertyTypes, spaceTypes }) => (
  <div className="space-y-8 animate-fadeIn">
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Property Basics</h2>
      <p className="text-slate-600">Let's start with the fundamentals of your space</p>
    </div>

    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">Property Type</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {propertyTypes.map(type => {
          const Icon = type.icon;
          const isSelected = formData.propertyType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => updateFormData('propertyType', type.id)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                isSelected ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white'
              }`}
            >
              <Icon className={`w-8 h-8 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="font-medium">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-slate-700 mb-2">Street Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => updateFormData('city', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => updateFormData('country', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <NumberInput label="Max Guests" value={formData.maxGuests} onChange={(val) => updateFormData('maxGuests', val)} min={1} />
      <NumberInput label="Bedrooms" value={formData.bedrooms} onChange={(val) => updateFormData('bedrooms', val)} />
      <NumberInput label="Beds" value={formData.beds} onChange={(val) => updateFormData('beds', val)} min={1} />
      <NumberInput label="Bathrooms" value={formData.bathrooms} onChange={(val) => updateFormData('bathrooms', val)}  />
    </div>
  </div>
);

const Step2 = ({ formData, toggleAmenity, amenitiesData }) => (
  <div className="space-y-8 animate-fadeIn">
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Amenities</h2>
      <p className="text-slate-600">What does your place offer?</p>
    </div>

    {Object.entries(amenitiesData).map(([category, items]) => (
      <div key={category} className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-800 capitalize">{category}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {items.map(amenity => {
            const Icon = amenity.icon;
            const isSelected = formData[category].includes(amenity.id);
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => toggleAmenity(category, amenity.id)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="font-medium">{amenity.label}</span>
                {isSelected && <Check className="w-4 h-4 text-emerald-600 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

const Step3 = ({ formData, updateFormData, handlePhotoUpload, removePhoto }) => (
  <div className="space-y-8 animate-fadeIn">
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Final Details</h2>
      <p className="text-slate-600">Complete your listing with photos and pricing</p>
    </div>

    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">Photos (min 5)</label>
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:bg-emerald-50 transition-all cursor-pointer">
        <input type="file" multiple accept="image/*" name='RoomImage' onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
        <label htmlFor="photo-upload" className="flex flex-col items-center cursor-pointer">
          <Upload className="w-12 h-12 text-slate-400 mb-2" />
          <p className="font-medium">Click to upload photos</p>
        </label>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-4">
        {formData.photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden border">
            <img src={photo.preview} className="w-full h-full object-cover" alt="preview" />
            <button onClick={() => removePhoto(photo.id)} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full shadow-sm">
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Listing Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData('title', e.target.value)}
          placeholder="e.g. Modern Loft in Downtown"
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Tell guests about your space..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500 resize-none"
        />
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Price per Night ($)</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="number"
            value={formData.pricePerNight}
            onChange={(e) => updateFormData('pricePerNight', e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Cleaning Fee ($)</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="number"
            value={formData.cleaningFee}
            onChange={(e) => updateFormData('cleaningFee', e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const Host = () => {
   const navigate=useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialState);

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: Building2 },
    { id: 'house', label: 'House', icon: Home },
    { id: 'villa', label: 'Villa', icon: Mountain },
    { id: 'room', label: 'Room', icon: DoorOpen }
  ];

  const amenitiesData = {
    essentials: [
      { id: 'wifi', label: 'WiFi', icon: Wifi },
      { id: 'ac', label: 'Air conditioning', icon: Wind },
      { id: 'heating', label: 'Heating', icon: Flame }
    ],
    safety: [{ id: 'smoke', label: 'Smoke detector', icon: Shield }],
    features: [{ id: 'parking', label: 'Parking', icon: MapPin }]
  };

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleAmenity = useCallback((category, amenityId) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(amenityId)
        ? prev[category].filter(id => id !== amenityId)
        : [...prev[category], amenityId]
    }));
  }, []);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file, preview: URL.createObjectURL(file), id: Math.random().toString(36).substr(2, 9)
    }));
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter(p => p.id !== photoId) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Show all data in console
    console.log("FINAL FORM SUBMISSION DATA:", formData);



const data=new FormData();
// console.log(formData.photos[0].file);


data.append("RoomImage",formData.photos[0].file)
data.append("title",formData.title)




data.append("address", formData.address);
data.append("bathrooms", formData.bathrooms);
data.append("bedrooms", formData.bedrooms);
data.append("beds", formData.beds);
data.append("city", formData.city);
data.append("cleaningFee", formData.cleaningFee);
data.append("country", formData.country);
data.append("coverPhotoIndex", formData.coverPhotoIndex);
data.append("customAmenities", JSON.stringify(formData.customAmenities));
data.append("description", formData.description);
data.append("essentials", JSON.stringify(formData.essentials));
data.append("features", JSON.stringify(formData.features));
data.append("maxGuests", formData.maxGuests);
data.append("minimumStay", formData.minimumStay);



data.append("pricePerNight", formData.pricePerNight);
data.append("propertyType", formData.propertyType);
data.append("safety", JSON.stringify(formData.safety));
data.append("spaceType",formData.spaceType);




    apiCall(data)
    
    // 2. Alert success
    toast.success("🎉 Listing published successfully!");
    
    // 3. Clear all fields and return to step 1
    setFormData(initialState);
    setCurrentStep(1);
    navigate("/hostDashBoard")
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} updateFormData={updateFormData} propertyTypes={propertyTypes} />;
      case 2: return <Step2 formData={formData} toggleAmenity={toggleAmenity} amenitiesData={amenitiesData} />;
      case 3: return <Step3 formData={formData} updateFormData={updateFormData} handlePhotoUpload={handlePhotoUpload} removePhoto={removePhoto} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        <div className="p-6 border-b border-slate-100">
           <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl font-bold text-slate-800">Become a Host</h1>
              <span className="text-sm font-medium text-slate-500">Step {currentStep} of 3</span>
           </div>
           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
           </div>
        </div>

        <div className="p-8 min-h-125">
          {renderStep()}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button 
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(s => s - 1)}
            className="px-6 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </div>
          </button>

          <div className="flex gap-4">
            {currentStep < 3 ? (
              <button 
                type="button"
                onClick={() => setCurrentStep(s => s + 1)}
                className="px-8 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 transition-all shadow-md flex items-center gap-1"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="submit"
                className="px-8 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Publish Listing
              </button>
            )}
          </div>
        </div>
      </form>
      
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default Host;