import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import { auth } from '../../config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { Mail, Lock } from 'react-feather'; 

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({
    email: false,
    google: false
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, email: true });

    try {
      if (!email || !password) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter email and password',
          timer: 2000,
        });
        return;
      }

      const response = await fetch('https://b-gray-phi.vercel.app/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      
        signal: AbortSignal.timeout(30000) 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'An error occurred. Please try again.'
        }));
        throw new Error(errorData.message);
      }

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Please verify your email',
          timer: 1500,
        });
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } else {
        throw new Error(data.message || 'Unable to create account');
      }
    } catch (error) {
      console.error("Error in connecting:", error);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: error.message || 'Unable to connect to the server. Please try again.',
        timer: 2000,
      });
    } finally {
      setIsLoading({ ...isLoading, email: false });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading({ ...isLoading, google: true });
    
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      
      const response = await axios.post(`https://b-gray-phi.vercel.app/signin`, {
        email: result.user.email,
        password: result.user.uid
      });


      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Signed in with Google!',
          text: `Please Login to continue`,
          timer: 1500,
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/membership-form');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Sign-In Failed',
        text: getErrorMessage(error),
        timer: 3000,
      });
    } finally {
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Response:", error.response);
      return `API Error: ${error.response?.data?.message || error.message}`;
    }
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled. Please contact the administrator.';
      case 'auth/popup-blocked':
        return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'The sign-in popup was closed before authentication could complete. Please try again.';
      default:
        return `An unexpected error occurred: ${error.message}. Please try again.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto" data-aos="fade-up">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-600">Join our community today</p>
          </div>

          <div className="mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading.google || isLoading.email}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading.google ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              )}
              {isLoading.google ? 'Signing in...' : 'Sign up with Google'}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading.email || isLoading.google}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading.email ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/LogIn" className="font-medium text-red-600 hover:text-red-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}