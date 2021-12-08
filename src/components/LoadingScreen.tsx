import { useEffect, useState } from 'react';
import { Progress } from './Progress'

export function LoadingScreen() {
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
      console.log('LoadingScreen, isanimating: true');
      setIsAnimating(true);
      return (): void => {
        console.log('LoadingScreen, isanimating: false');
          setIsAnimating(false);
      };
    }, []);

  return (
    <Progress isAnimating={isAnimating}/>
  );
};
