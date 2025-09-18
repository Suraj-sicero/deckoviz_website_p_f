import React from 'react';

const Youtube: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          See Deckoviz in Action
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover how our smart frames transform any space into a personal sanctuary.
          Watch the video to experience the magic.
        </p>

        {/* Video Container - ensures aspect ratio is maintained */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/ge6KgCR2C4M?autoplay=0&controls=1&modestbranding=1&rel=0"
            title="Deckoviz Product Showcase"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Youtube;