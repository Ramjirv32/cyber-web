import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const H = () => {
  const [membershipId, setMembershipId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembershipId = async () => {
      try {
        // Get email from localStorage
        const email = localStorage.getItem('email');
        
        if (!email) {
          setError("User not logged in");
          setIsLoading(false);
          return;
        }

        // Fetch membership data using the user's email
        const response = await axios.get(`https://b-gray-phi.vercel.app/api/membership/email/${email}`);
        
        if (response.data.success && response.data.membership) {
          setMembershipId(response.data.membership.idNumber);
        } else {
          setError("No membership found");
        }
      } catch (error) {
        console.error("Error fetching membership:", error);
        setError("Failed to load membership information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembershipId();
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Member Dashboard</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : error ? (
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-red-500">{error}</p>
          <p className="mt-4 text-gray-600">You may need to apply for membership first.</p>
          <Link 
            to="/membership-form" 
            className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Apply for Membership
          </Link>
        </div>
      ) : membershipId ? (
        <div className="text-center space-y-6">
          <p className="text-gray-700">Welcome to the member area!</p>
          
          <Link 
            to={`/id-card/${membershipId}`} 
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            View My Membership Card
          </Link>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/events" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              Upcoming Events
            </Link>
            <Link to="/research-initiatives" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              Research Initiatives
            </Link>
            <Link to="/education-programs" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              Education Programs
            </Link>
            <Link to="/innovation-hub" className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              Innovation Hub
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">No membership information found.</p>
          <Link 
            to="/membership-form" 
            className="mt-4 inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Apply for Membership
          </Link>
        </div>
      )}
    </div>
  );
};

export default H;
