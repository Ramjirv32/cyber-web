import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IDCard from './IDCard';

const MembershipCardPreview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [membershipData, setMembershipData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("Initializing...");

  useEffect(() => {
    const checkMembership = async () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      
      setDebugInfo(`Token exists: ${!!token}, Email exists: ${!!email}`);
      
      if (!token || !email) {
        setIsLoading(false);
        return;
      }
      
      try {
        setDebugInfo("Checking membership status...");
        console.log("Checking membership for email:", email);
        
        // Fetch membership directly by email
        const membershipResponse = await axios.get(`https://b-gray-phi.vercel.app/api/membership/email/${email}`);
        console.log("Membership response:", membershipResponse.data);
        setDebugInfo("Got membership response");
        
        if (membershipResponse.data.success && membershipResponse.data.membership) {
          setMembershipData(membershipResponse.data.membership);
          setDebugInfo("Membership data set successfully");
        } else {
          setDebugInfo("No membership data found");
        }
      } catch (error: any) {
        console.error('Error fetching membership data:', error);
        setError('Could not load membership information');
        setDebugInfo(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkMembership();
  }, []);
  
  // Always render something for debugging purposes
  return (
    <div className="w-full bg-gray-50 py-8 px-4 border-t border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="w-full flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : membershipData ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Your Membership Card</h2>
            <div className="flex flex-col items-center">
              <div className="transform scale-75 md:scale-90 lg:scale-100 origin-top">
                <IDCard
                  name={membershipData.name}
                  position={membershipData.position}
                  idNumber={membershipData.idNumber}
                  issueDate={membershipData.issueDate}
                  expiryDate={membershipData.expiryDate}
                  department={membershipData.department}
                  photoUrl={membershipData.photoUrl}
                />
              </div>
              
              <Link 
                to={`/id-card/${membershipData.idNumber}`}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition-colors"
              >
                View Full Card
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            {error ? (
              <p>Error: {error}</p>
            ) : (
              <p>No membership card available</p>
            )}
            <p className="mt-2 text-sm text-gray-400">Debug: {debugInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipCardPreview;