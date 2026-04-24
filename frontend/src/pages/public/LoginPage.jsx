import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Shield, Activity, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await login(formData.email, formData.password);

      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'client') {
        navigate('/client');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/50 dark:from-primary-900/20 to-indigo-100/50 dark:to-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -m-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/50 dark:from-blue-900/20 to-cyan-100/50 dark:to-cyan-900/20 rounded-full blur-3xl opacity-50"></div>

      {/* Main Container - Split Layout */}
      <div className="max-w-5xl w-full flex flex-col lg:flex-row bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-800 relative z-10 overflow-hidden">
        
        {/* Left Side: Graphic / Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 flex-col justify-between p-12">
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Dashboard and Analytics" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-gray-900/90"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg mb-8 border border-white/20">
              <span className="text-white font-bold text-3xl leading-none">C</span>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Manage your business with clarity.
            </h1>
            <p className="text-primary-100 text-lg max-w-sm">
              Securely access your executive dashboards, manage IT infrastructure, and track project milestones.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center text-white/80">
              <Shield className="w-5 h-5 mr-3 text-primary-400" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center text-white/80">
              <Activity className="w-5 h-5 mr-3 text-primary-400" />
              <span>Real-time analytics</span>
            </div>
            <div className="flex items-center text-white/80">
              <Lock className="w-5 h-5 mr-3 text-primary-400" />
              <span>Encrypted data protection</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center lg:text-left mb-8">
            {/* Mobile logo (visible only on small screens) */}
            <Link to="/" className="lg:hidden inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 shadow-lg mb-6 transition-transform hover:scale-105">
              <span className="text-white font-bold text-3xl leading-none">C</span>
            </Link>
            
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm mb-8">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Demo Credentials:</strong><br />
              Admin: admin@connect.com / admin123<br />
              Client: Any email / any password
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full flex justify-center py-3 text-base shadow-md hover:shadow-lg mt-6"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" /> Sign in
                </>
              )}
            </Button>
          </form>

          <p className="text-center lg:text-left mt-8 text-sm text-gray-600 dark:text-gray-400">
            New to Client Connect?{' '}
            <Link to="/contact" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;