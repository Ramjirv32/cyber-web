import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IDCard from './IDCard';

export default function IDCardLoader() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await axios.get(`https://b-gray-phi.vercel.app/api/membership/${id}`);
        if (response.data.success) {
          setUserData(response.data.membership);
        } else {
          setError('Failed to load membership information');
        }
      } catch (error) {
        setError('Error loading membership card');
        console.error('Error fetching membership data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembershipData();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  if (error || !userData) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 text-lg mb-2">Error</div>
        <p>{error || 'Membership information not found'}</p>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center py-10">
      <IDCard
        name={userData.name}
        position={userData.position}
        idNumber={userData.idNumber}
        issueDate={userData.issueDate}
        expiryDate={userData.expiryDate}
        department={userData.department}
        photoUrl={userData.photoUrl}
      />
    </div>
  );
}