import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'agent') {
        navigate('/agent/dashboard');
      } else {
        navigate('/client/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -m-32 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/50 to-indigo-100/50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -m-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/50 to-cyan-100/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 shadow-soft mb-6 group transition-transform hover:scale-105">
            <span className="text-white font-bold text-3xl leading-none">C</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your client portal
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <Input 
              id="email" 
              type="email" 
              label="Email address"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              id="password" 
              type="password" 
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full flex justify-center py-3 text-base shadow-md hover:shadow-lg" 
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

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
