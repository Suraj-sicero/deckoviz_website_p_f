import React, { useEffect, useRef } from "react";

const CursorSpark: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    const animate = () => {
      // smooth trailing ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(animate);
    };

    animate();

    // expand on hover
    const hoverables = document.querySelectorAll("button,a");

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        ring.style.transform = "translate(-50%, -50%) scale(1.8)";
        ring.style.borderColor = "#a855f7";
      });

      el.addEventListener("mouseleave", () => {
        ring.style.transform = "translate(-50%, -50%) scale(1)";
        ring.style.borderColor = "rgba(168,85,247,0.5)";
      });
    });

  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "#a855f7",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          border: "1.5px solid rgba(168,85,247,0.5)",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.25s ease, border-color 0.25s ease",
        }}
      />
    </>
  );
};

export default CursorSpark;