import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UsePostReturn {
  step: number;
  handleNext: () => void;
  handlePrev: () => void;
}

export const usePost = (): UsePostReturn => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(2);
    navigate('/post/write');
  };

  const handlePrev = () => {
    setStep(1);
    navigate('/map');
  };

  return {
    step,
    handleNext,
    handlePrev,
  };
};
