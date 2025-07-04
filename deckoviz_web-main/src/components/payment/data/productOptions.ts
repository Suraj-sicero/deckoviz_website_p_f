export const frameSizeOptions = [
  { 
    name: "Starter Unit (43 inches)", 
    image: "images/Gemini_Generated_Image_7awqtl7awqtl7awq.jpeg", 
    price: 649,
    description: "Perfect for small to medium rooms"
  },
  { 
    name: "Premium Unit (55 inches)", 
    image: "images/Gemini_Generated_Image_3gz8oz3gz8oz3gz8.jpeg", 
    price: 849,
    description: "Ideal for living rooms and offices"
  },
  { 
    name: "Ultra Unit (65 inches)", 
    image: "images/Gemini_Generated_Image_nkwnr0nkwnr0nkwn.jpg", 
    price: 1049,
    description: "Premium choice for large spaces"
  }
];

export const frameTypeOptions = [
  { name: "Classic Wood", image: "https://t4.ftcdn.net/jpg/09/59/36/87/360_F_959368717_FGNtAD4EemvvQGp9ihmwNvFX1Zvr480l.jpg" },
  { name: "Modern Metal", image: "https://us.123rf.com/450wm/zarahmad/zarahmad2502/zarahmad250212662/241665182-old-vintage-picture-frame-on-wooden-table-and-dark-background-3d-rendering.jpg?ver=6" },
  { name: "Vintage Ornate", image: "https://www.harpgallery.com/blog/wp-content/uploads/2022/04/art-16-2-1024x682.jpg" },
  { name: "Minimalist", image: "https://easysuger.com/cdn/shop/files/il_fullxfull.3532824556_hhpd.jpg?v=1717403765&width=1946" }
];

export const unitOptions = Array.from({ length: 15 }, (_, i) => `${i + 1} Unit${i === 0 ? '' : 's'}`);