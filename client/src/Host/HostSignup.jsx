import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Upload } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerHost } from '../api/apiCall';

export default function HostSignup() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!profileImage) {
      newErrors.profileImage = 'Profile img is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {

        setFormData(()=>{return {
        ...formData,
        profileImage: profileImage ? profileImage : 'No image uploaded'
    }})
      console.log('Form submitted successfully:',formData);
    }else{return {msg:"error"}}
      const actualData=new FormData();

      actualData.append("profileImage",formData.profileImage)
      actualData.append("name",formData.fullName)
      actualData.append("email",formData.email)
      actualData.append("password",formData.password);

console.log(formData);

 try {
        const resp=registerHost(actualData).then((data)=>{
            console.log(data,"1");
     if(data.status==200){
                setFormData({   fullName: '',
    email: '',
    password: ''

    
 })
 setProfileImage(null)
setImagePreview(null)
   

 toast.success("Login Successfully")
navigate("/hostDashboard")

}
        }).catch((err)=>{
          console.log(err);
          
        })



    console.log(resp,"2");
    



 } catch (error) {
    console.log(error);
      setFormData({   fullName: '',
    email: '',
    password: ''

 })
 alert("error in submitting")
 }
      // Here you would typically send the data to your backend

};

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account As a Host
            </h1>
            <p className="text-gray-500 text-sm">Join us and start your journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                     
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="profile-upload" 
                  className="absolute bottom-0 right-0 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full p-2 cursor-pointer shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-xl"
                >
                  <Upload className="w-4 h-4 text-white" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                     name="profileImage"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">Click to upload profile picture</p>
             {errors.profileImage && (
                <p className="mt-1 text-xs text-red-500">{errors.profileImage}</p>
              )}
            </div>

            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'fullName' ? 'text-indigo-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                    errors.fullName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 transition-all duration-200 outline-none ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <NavLink 
                to="/hostLogin" 
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200 hover:underline"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By signing up, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}