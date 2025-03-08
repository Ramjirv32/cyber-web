import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 1.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {children}
    </>
  );
};

export default LoadingWrapper;
