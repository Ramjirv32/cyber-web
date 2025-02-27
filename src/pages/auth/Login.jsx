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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

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

     
      const response = await axios.post(`http://localhost:5000/login`, {
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
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', email);
        }
        navigate('/Home');
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
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
   
      const response = await axios.post(`http://localhost:5000/login`, {
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
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/Home');
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
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(`http://localhost:5000/login`, {
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
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/Home');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="mb-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
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
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in
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

