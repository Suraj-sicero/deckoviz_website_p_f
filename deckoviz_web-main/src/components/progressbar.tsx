import { useEffect, useRef, useState } from "react";

const ProgressBar = ({ value = 95, delay = 600 }) => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStart(true);
          }, delay); // ⏱ delay here

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-purple-800 via-indigo-700 to-pink-500"
        style={{ width: start ? `${value}%` : "0%" }}
      />
    </div>
  );
};

export default ProgressBar;