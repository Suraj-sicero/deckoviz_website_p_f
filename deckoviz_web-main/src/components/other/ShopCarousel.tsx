import { useEffect, useState } from "react";

export default function ShopCarousel({ images = [], interval = 4000, className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(id);
  }, [images.length, interval]);

  if (!images.length) return null;

return (
  <div className={`relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-[40px] ${className}`}>
      {images.map((img, i) => (
<img
  key={i}
  src={img}
  alt="carousel"
  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
  ${i === index ? "opacity-100" : "opacity-0"}`}
/>
      ))}
    </div>
  );
}