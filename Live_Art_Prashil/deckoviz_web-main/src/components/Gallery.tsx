import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Abstract');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const categories = ['Abstract', 'Landscapes', 'Portraits', 'Minimalist', 'Digital Art'];

  const galleryItems: GalleryItem[] = [
    // Abstract Category
    {
      id: 1,
      image: '/images/Gemini_Generated_Image_13xtu213xtu213xt.jpeg',
      title: 'Abstract Art 1',
      category: 'Abstract'
    },
    {
      id: 2,
      image: '/images/Gemini_Generated_Image_13xtu513xtu513xt.jpeg',
      title: 'Abstract Art 2',
      category: 'Abstract'
    },
    {
      id: 3,
      image: '/images/Gemini_Generated_Image_13xtu613xtu613xt.jpeg',
      title: 'Abstract Art 3',
      category: 'Abstract'
    },
    {
      id: 4,
      image: '/images/Gemini_Generated_Image_2n33ho2n33ho2n33.jpeg',
      title: 'Abstract Art 4',
      category: 'Abstract'
    },
    {
      id: 5,
      image: '/images/Gemini_Generated_Image_331ux1331ux1331u.jpeg',
      title: 'Abstract Art 5',
      category: 'Abstract'
    },
    {
      id: 6,
      image: '/images/Gemini_Generated_Image_37pr6z37pr6z37pr.jpeg',
      title: 'Abstract Art 6',
      category: 'Abstract'
    },
    {
      id: 7,
      image: '/images/Gemini_Generated_Image_3gz8ov3gz8ov3gz8.jpeg',
      title: 'Abstract Art 7',
      category: 'Abstract'
    },
    {
      id: 8,
      image: '/images/Gemini_Generated_Image_3gz8ow3gz8ow3gz8.jpeg',
      title: 'Abstract Art 8',
      category: 'Abstract'
    },
    {
      id: 9,
      image: '/images/Gemini_Generated_Image_3gz8oy3gz8oy3gz8.jpeg',
      title: 'Abstract Art 9',
      category: 'Abstract'
    },
    {
      id: 10,
      image: '/images/Gemini_Generated_Image_3gz8p13gz8p13gz8.jpeg',
      title: 'Abstract Art 10',
      category: 'Abstract'
    },

    // Landscapes Category
    {
      id: 11,
      image: '/images/Gemini_Generated_Image_3nahv13nahv13nah.jpeg',
      title: 'Mountain View',
      category: 'Landscapes'
    },
    {
      id: 12,
      image: '/images/Gemini_Generated_Image_52pei052pei052pe.jpg',
      title: 'Coastal Scene',
      category: 'Landscapes'
    },
    {
      id: 13,
      image: '/images/Gemini_Generated_Image_7awqtl7awqtl7awq.jpeg',
      title: 'Forest Path',
      category: 'Landscapes'
    },
    {
      id: 14,
      image: '/images/Gemini_Generated_Image_7bvrcz7bvrcz7bvr.jpeg',
      title: 'Desert Sunset',
      category: 'Landscapes'
    },
    {
      id: 15,
      image: '/images/Gemini_Generated_Image_7bvrd07bvrd07bvr.jpeg',
      title: 'Lake Reflection',
      category: 'Landscapes'
    },
    {
      id: 16,
      image: '/images/Gemini_Generated_Image_13xtu213xtu213xt.jpeg',
      title: 'Valley View',
      category: 'Landscapes'
    },
    {
      id: 17,
      image: '/images/Gemini_Generated_Image_13xtu513xtu513xt.jpeg',
      title: 'Waterfall Scene',
      category: 'Landscapes'
    },
    {
      id: 18,
      image: '/images/Gemini_Generated_Image_13xtu613xtu613xt.jpeg',
      title: 'Mountain Lake',
      category: 'Landscapes'
    },
    {
      id: 19,
      image: '/images/Gemini_Generated_Image_2n33ho2n33ho2n33.jpeg',
      title: 'Autumn Forest',
      category: 'Landscapes'
    },
    {
      id: 20,
      image: '/images/Gemini_Generated_Image_331ux1331ux1331u.jpeg',
      title: 'Beach Sunset',
      category: 'Landscapes'
    },

    // Portraits Category
    {
      id: 21,
      image: '/images/Gemini_Generated_Image_37pr6z37pr6z37pr.jpeg',
      title: 'Portrait Study 1',
      category: 'Portraits'
    },
    {
      id: 22,
      image: '/images/Gemini_Generated_Image_3gz8ov3gz8ov3gz8.jpeg',
      title: 'Portrait Study 2',
      category: 'Portraits'
    },
    {
      id: 23,
      image: '/images/Gemini_Generated_Image_3gz8ow3gz8ow3gz8.jpeg',
      title: 'Portrait Study 3',
      category: 'Portraits'
    },
    {
      id: 24,
      image: '/images/Gemini_Generated_Image_3gz8oy3gz8oy3gz8.jpeg',
      title: 'Portrait Study 4',
      category: 'Portraits'
    },
    {
      id: 25,
      image: '/images/Gemini_Generated_Image_3gz8p13gz8p13gz8.jpeg',
      title: 'Portrait Study 5',
      category: 'Portraits'
    },
    {
      id: 26,
      image: '/images/Gemini_Generated_Image_3nahv13nahv13nah.jpeg',
      title: 'Portrait Study 6',
      category: 'Portraits'
    },
    {
      id: 27,
      image: '/images/Gemini_Generated_Image_52pei052pei052pe.jpg',
      title: 'Portrait Study 7',
      category: 'Portraits'
    },
    {
      id: 28,
      image: '/images/Gemini_Generated_Image_7awqtl7awqtl7awq.jpeg',
      title: 'Portrait Study 8',
      category: 'Portraits'
    },
    {
      id: 29,
      image: '/images/Gemini_Generated_Image_7bvrcz7bvrcz7bvr.jpeg',
      title: 'Portrait Study 9',
      category: 'Portraits'
    },
    {
      id: 30,
      image: '/images/Gemini_Generated_Image_7bvrd07bvrd07bvr.jpeg',
      title: 'Portrait Study 10',
      category: 'Portraits'
    },

    // Minimalist Category
    {
      id: 31,
      image: '/images/Gemini_Generated_Image_13xtu213xtu213xt.jpeg',
      title: 'Minimal Design 1',
      category: 'Minimalist'
    },
    {
      id: 32,
      image: '/images/Gemini_Generated_Image_13xtu513xtu513xt.jpeg',
      title: 'Minimal Design 2',
      category: 'Minimalist'
    },
    {
      id: 33,
      image: '/images/Gemini_Generated_Image_13xtu613xtu613xt.jpeg',
      title: 'Minimal Design 3',
      category: 'Minimalist'
    },
    {
      id: 34,
      image: '/images/Gemini_Generated_Image_2n33ho2n33ho2n33.jpeg',
      title: 'Minimal Design 4',
      category: 'Minimalist'
    },
    {
      id: 35,
      image: '/images/Gemini_Generated_Image_331ux1331ux1331u.jpeg',
      title: 'Minimal Design 5',
      category: 'Minimalist'
    },
    {
      id: 36,
      image: '/images/Gemini_Generated_Image_37pr6z37pr6z37pr.jpeg',
      title: 'Minimal Design 6',
      category: 'Minimalist'
    },
    {
      id: 37,
      image: '/images/Gemini_Generated_Image_3gz8ov3gz8ov3gz8.jpeg',
      title: 'Minimal Design 7',
      category: 'Minimalist'
    },
    {
      id: 38,
      image: '/images/Gemini_Generated_Image_3gz8ow3gz8ow3gz8.jpeg',
      title: 'Minimal Design 8',
      category: 'Minimalist'
    },
    {
      id: 39,
      image: '/images/Gemini_Generated_Image_3gz8oy3gz8oy3gz8.jpeg',
      title: 'Minimal Design 9',
      category: 'Minimalist'
    },
    {
      id: 40,
      image: '/images/Gemini_Generated_Image_3gz8p13gz8p13gz8.jpeg',
      title: 'Minimal Design 10',
      category: 'Minimalist'
    },

    // Digital Art Category
    {
      id: 41,
      image: '/images/Gemini_Generated_Image_3nahv13nahv13nah.jpeg',
      title: 'Digital Creation 1',
      category: 'Digital Art'
    },
    {
      id: 42,
      image: '/images/Gemini_Generated_Image_52pei052pei052pe.jpg',
      title: 'Digital Creation 2',
      category: 'Digital Art'
    },
    {
      id: 43,
      image: '/images/Gemini_Generated_Image_7awqtl7awqtl7awq.jpeg',
      title: 'Digital Creation 3',
      category: 'Digital Art'
    },
    {
      id: 44,
      image: '/images/Gemini_Generated_Image_7bvrcz7bvrcz7bvr.jpeg',
      title: 'Digital Creation 4',
      category: 'Digital Art'
    },
    {
      id: 45,
      image: '/images/Gemini_Generated_Image_7bvrd07bvrd07bvr.jpeg',
      title: 'Digital Creation 5',
      category: 'Digital Art'
    },
    {
      id: 46,
      image: '/images/Gemini_Generated_Image_13xtu213xtu213xt.jpeg',
      title: 'Digital Creation 6',
      category: 'Digital Art'
    },
    {
      id: 47,
      image: '/images/Gemini_Generated_Image_13xtu513xtu513xt.jpeg',
      title: 'Digital Creation 7',
      category: 'Digital Art'
    },
    {
      id: 48,
      image: '/images/Gemini_Generated_Image_13xtu613xtu613xt.jpeg',
      title: 'Digital Creation 8',
      category: 'Digital Art'
    },
    {
      id: 49,
      image: '/images/Gemini_Generated_Image_2n33ho2n33ho2n33.jpeg',
      title: 'Digital Creation 9',
      category: 'Digital Art'
    },
    {
      id: 50,
      image: '/images/Gemini_Generated_Image_331ux1331ux1331u.jpeg',
      title: 'Digital Creation 10',
      category: 'Digital Art'
    }
  ];

  const filteredItems = galleryItems.filter(item => item.category === activeCategory);
  const currentItem = filteredItems[currentImageIndex];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-center mb-4">
          Explore Our <span className="text-primary-600">Art Gallery</span>
        </h2>
        <p className="section-description">
          Discover a curated collection of stunning artworks across various categories.
        </p>

        {/* Category Tabs */}
        <div className="relative mb-8">
          <div className="flex justify-start md:justify-center overflow-x-auto whitespace-nowrap flex-nowrap gap-2 px-4 py-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentImageIndex(0);
                }}
                className={`px-4 py-2 rounded-lg transition-colors min-w-max ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Gradient fade effect for mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
        </div>

        {/* Image Display */}
        <div className="relative max-w-xl mx-auto">
          {/* Exact fit without cropping */}
          <div className="bg-gray-100 rounded-xl overflow-hidden h-100 flex items-center justify-center ">
            {currentItem && (
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Title */}
          {currentItem && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-2 rounded-lg">
              <p className="text-center">{currentItem.title}</p>
            </div>
          )}

          {/* Image Dots */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;