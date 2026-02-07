import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import {   Navigate, useNavigate } from 'react-router';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

const navigate=useNavigate()
  const adminEmail="Bakr@gmail.com";
  const adminPassword="Bakr123abd";


  const handleSubmit = () => {
    console.log('Admin login submitted:', formData);
    // Handle admin login here


if (adminEmail.toLowerCase()==formData.email.toLowerCase()&&formData.password.toLowerCase()==adminPassword.toLowerCase()) {
    localStorage.setItem("isAuthenticate",true);
    console.log("ok");
    
//  <Navigate to={"/admin"} replace/>
navigate("/admin")
}


    setFormData({
    email: '',
    password: ''
    })
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg3djFoLTd6bS0xMCAwaDd2MWgtN3ptLTEwIDBoN3YxaC03em0tMTAgMGg3djFoLTd6bS0xMCAwaDd2MWgtN3ptLTEwIDBoN3YxaC03em0tMTAgMGg3djFoLTd6bS0xMCAwaDd2MWgtN3ptLTEwIDBoN3YxaC03em0tMTAgMGg3djFoLTd6bS0xMCAwaDd2MWgtN3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-8 border border-slate-700/50">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl mb-2 shadow-lg shadow-purple-500/50 animate-pulse">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="text-slate-400">Secure access for administrators only</p>
          </div>

          {/* Form Fields */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
                Administrator Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3.5 bg-slate-900/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none placeholder-slate-500"
                  placeholder="admin@company.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3.5 bg-slate-900/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none placeholder-slate-500"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500 hover:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                Reset credentials
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Access Dashboard
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-slate-700">
            <div className="flex items-start space-x-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 mt-0.5 text-purple-400 shrink-0" />
              <p>
                This is a secure area. All login attempts are monitored and logged for security purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Protected by advanced security protocols
          </p>
        </div>
      </div>
    </div>
  );
}