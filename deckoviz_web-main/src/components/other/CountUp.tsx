import React, { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({ 
  from, 
  to, 
  duration = 2, 
  suffix = '', 
  className = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      onUpdate: value => {
        setCount(value);
      }
    });
    
    return () => controls.stop();
  }, [from, to, duration]);

  // Format the number based on decimals
  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.round(count).toString();

  return (
    <span className={className}>
      {formattedCount}{suffix}
    </span>
  );
};

export default CountUp;