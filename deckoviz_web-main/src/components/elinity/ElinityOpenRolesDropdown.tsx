import { useState, useEffect, useRef } from "react";

function OpenRolesDropdown() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dropdownRef = useRef(null);

  const roles = [
    { name: "Founding Growth and Content Lead", link: "/foundgrowth" },
    { name: "Software Engineer", link: "/software" },
    { name: "Head of Design & Experiences", link: "/designhead" },
    { name: "Head of AI Research", link: "/headai" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{
        marginTop: "25px",
        position: "relative",
        display: "inline-block",
        width: isMobile ? "100%" : "auto",
        fontFamily: "'Inter', sans-serif",
        textTransform: "lowercase" // Matching your lowercase brand style
      }}
    >
      {/* Button - Updated to Royal Blue/Indigo Gradient */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "14px 26px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(90deg, #3B82F6, #7B3FE4)",
          color: "#fff",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          width: isMobile ? "100%" : "auto",
          boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)", // Blue brand glow
          transition: "all 0.25s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.3)";
        }}
      >
        open roles ▾
      </button>

      {/* Dropdown - Enhanced Glassmorphism */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: 0,
          right: isMobile ? 0 : "auto",
          minWidth: isMobile ? "100%" : "280px",
          background: "rgba(10, 10, 15, 0.85)", // Deep space background
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
          zIndex: 50,

          /* Animation */
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0px)" : "translateY(-10px)",
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {roles.map((role, index) => (
          <a
            key={index}
            href={role.link}
            style={{
              display: "block",
              padding: "18px 22px",
              textDecoration: "none",
              color: "#a3a3a3",
              fontSize: "14px",
              fontWeight: 400,
              transition: "all 0.2s ease",
              borderBottom:
                index !== roles.length - 1
                  ? "1px solid rgba(255, 255, 255, 0.03)"
                  : "none"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.08)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.paddingLeft = "26px"; // Subtle slide effect
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#a3a3a3";
              e.currentTarget.style.paddingLeft = "22px";
            }}
            onClick={() => setOpen(false)}
          >
            {role.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default OpenRolesDropdown;