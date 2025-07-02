import { useNavigate } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';

export const useNavigationWithLoading = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const navigateWithLoading = (path: string, delay: number = 800) => {
    showLoading();
    
    setTimeout(() => {
      navigate(path);
      hideLoading();
    }, delay);
  };

  return { navigateWithLoading };
};
