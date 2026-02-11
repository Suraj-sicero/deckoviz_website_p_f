import React, { useState } from "react";

const ToggleGallerySection: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [imageToggle, setImageToggle] = useState<boolean>(false);

  const imagesSet1: string[] = [
    "/toggleimg/img1.png",
    "/toggleimg/img2.png",
    "/toggleimg/img3.png",
    "/toggleimg/img4.png",
  ];

  const imagesSet2: string[] = [
    "/toggleimg/img5.png",
    "/toggleimg/img6.png",
    "/toggleimg/img7.png",
    "/toggleimg/img8.png",
  ];

  const images = imageToggle ? imagesSet2 : imagesSet1;

  return (
    <section
      className={`relative w-full py-49 px-6 transition-all duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* ✨ Glowing Border Wrapper */}
      <div
        className={`relative max-w-6xl mx-auto rounded-3xl p-8 transition-all duration-500 ${
          darkMode
            ? "border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            : "border border-black/10 shadow-[0_0_40px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* 🔥 Left Toggle (Image Switch) */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="text-sm">Day</span>
          <button
            onClick={() => setImageToggle(!imageToggle)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
              imageToggle ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                imageToggle ? "translate-x-7" : ""
              }`}
            />
          </button>
          <span className="text-sm">Night</span>
        </div>

        {/* 🔥 Right Toggle (Dark Mode) */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span>☀️</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                darkMode ? "translate-x-7" : ""
              }`}
            />
          </button>
          <span>🌙</span>
        </div>

        {/* 🖼 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {images.map((img, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition duration-300 hover:scale-105 ${
                darkMode
                  ? "bg-neutral-900 shadow-[0_0_25px_rgba(255,255,255,0.05)]"
                  : "bg-gray-100 shadow-[0_0_25px_rgba(0,0,0,0.06)]"
              }`}
            >
              <img
                src={img}
                alt={`gallery-${index}`}
                className="w-full h-[380px] object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Scenary {index + 1}
                </h3>
                <p className="text-sm opacity-70">
                  A Frame for every need.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToggleGallerySection;
