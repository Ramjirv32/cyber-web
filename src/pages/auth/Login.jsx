'use client';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Swal from 'sweetalert2';
import { auth } from '../../config/firebase';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { Mail, Lock } from 'react-feather';
import { API_URL } from '../../config/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({
    email: false,
    google: false,
    github: false
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogin = async (e) => {
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

     
      const response = await axios.post(`https://b-gray-phi.vercel.app/login`, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful',
          timer: 1500,
        }).then(() => {
          showMembershipConfirmation();
        });
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', email);
          
          // Dispatch custom event to notify components about authentication change
          window.dispatchEvent(new Event('authStatusChanged'));
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Error in login:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: getErrorMessage(error),
        timer: 2000,
      });
    } finally {
      setIsLoading({ ...isLoading, email: false });
    }
  };

  // this is demo
  const handleGoogleSignIn = async () => {
    setIsLoading({ ...isLoading, google: true });
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
   
      const response = await axios.post(`https://b-gray-phi.vercel.app/login`, {
       email: result.user.email,
       password: result.user.uid
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

   

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Signed in with Google!',
          text: `Welcome ${result.user.displayName}`,
          timer: 1500,
        }).then(() => {
          showMembershipConfirmation();
        });
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', result.user.email); // Use the email from result, not the state
          
          // Dispatch custom event to notify components about authentication change
          window.dispatchEvent(new Event('authStatusChanged'));
        }
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
      navigate("/SignIn");
    } finally {
      setIsLoading({ ...isLoading, google: false });
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading((prevState) => ({ ...prevState, github: true }));
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(`https://b-gray-phi.vercel.app/login`, {
        email: result.user.email,
        password: result.user.uid
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
localStorage.setItem('email', result.user.email);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Signed in with GitHub!',
          text: `Welcome ${result.user.displayName}`,
          timer: 1500,
        }).then(() => {
          showMembershipConfirmation();
        });
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', result.user.email); // Use the email from result, not the state
          
          // Dispatch custom event to notify components about authentication change
          window.dispatchEvent(new Event('authStatusChanged'));
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error("GitHub Sign-In Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'GitHub Sign-In Failed',
        text: getErrorMessage(error),
        timer: 3000,
      });
    } finally {
      setIsLoading((prevState) => ({ ...prevState, github: false }));
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

  const checkMembershipStatus = async (email) => {
    try {
      const response = await axios.get(`https://b-gray-phi.vercel.app/api/membership/check/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error checking membership status:', error);
      return { isMember: false };
    }
  };

  const showMembershipConfirmation = async () => {
    // Get the current user's email
    const userEmail = localStorage.getItem('email');
    
    if (!userEmail) {
      navigate('/Home');
      return;
    }
    
    try {
      // Check if user already has valid membership
      const membershipStatus = await checkMembershipStatus(userEmail);
      
      // If user is already a member with active status, go directly to home
      if (membershipStatus.isMember) {
        navigate('/Home');
        return;
      }
      
      // If membership expired or user is not a member, show the popup
      return Swal.fire({
        title: 'Membership Status',
        text: 'Do You Like to become a Member of SCIS?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          // User wants to become a member
          navigate('/membership-form');
        } else {
          // User doesn't want to become a member
          navigate('/Home');
        }
      });
    } catch (error) {
      console.error("Error in membership check:", error);
      // Default to showing the popup if there's an error
      return Swal.fire({
        title: 'Membership Status',
        text: 'Do You Like to become a Member of SCIS?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/membership-form');
        } else {
          navigate('/Home');
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto" data-aos="fade-up">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="mb-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={isLoading.email || isLoading.google || isLoading.github}
            >
              {isLoading.google ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Sign in with Google
                </>
              )}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading.email || isLoading.google || isLoading.github}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoading.email ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/SignIn" className="font-medium text-red-600 hover:text-red-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

