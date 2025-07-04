export const frameSizeOptions = [
  { 
    name: "Starter Unit (43 inches)", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", 
    price: 649,
    description: "Perfect for small to medium rooms"
  },
  { 
    name: "Premium Unit (55 inches)", 
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop", 
    price: 849,
    description: "Ideal for living rooms and offices"
  },
  { 
    name: "Ultra Unit (65 inches)", 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", 
    price: 1049,
    description: "Premium choice for large spaces"
  }
];

export const frameTypeOptions = [
  { name: "Classic Wood", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=200&h=150&fit=crop" },
  { name: "Modern Metal", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=150&fit=crop" },
  { name: "Vintage Ornate", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=150&fit=crop" },
  { name: "Minimalist", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&h=150&fit=crop" }
];

export const unitOptions = Array.from({ length: 15 }, (_, i) => `${i + 1} Unit${i === 0 ? '' : 's'}`);