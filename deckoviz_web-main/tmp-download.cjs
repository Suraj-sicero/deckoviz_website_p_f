const https = require('https');
const http = require('http');
const fs = require('fs');

const download = (url, path) => {
  const client = url.startsWith('https') ? https : http;
  client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
    if(res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
      console.log(`Redirecting ${url} to ${res.headers.location}`);
      download(res.headers.location, path);
    } else if (res.statusCode === 200) {
      res.pipe(fs.createWriteStream(path));
      res.on('end', () => console.log(`Downloaded ${path}`));
    } else {
      console.log(`Failed to download ${url}: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error with ${url}: ${err.message}`);
  });
};

download('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/g1.jpg');
download('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/g2.jpg');
download('https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/g3.jpg');
download('https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&q=80', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/g4.jpg');
download('https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/g5.jpg');

download('https://i.pinimg.com/736x/e8/28/11/e828112ea1446c27a69ce9fd789804ac.jpg', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/main1.jpg');
download('https://i.pinimg.com/736x/13/ab/dc/13abdc4a9b6360c442aba267f4d53386.jpg', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/main2.jpg');
download('https://i.pinimg.com/736x/d3/2d/cb/d32dcb7469c4b31f7979eb98dbdb557c.jpg', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/main3.jpg');
download('https://i.pinimg.com/736x/97/da/5c/97da5c3d3494613f730da795965b3d87.jpg', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/main4.jpg');
download('https://i.pinimg.com/736x/ed/3d/1f/ed3d1f63878a4f606ef8ed170834b330.jpg', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/main5.jpg');
download('https://www.istitutomarangoni.com/marangoni/entities/course/Digital_art_direction.png', 'd:/deckoviz-demo/deckoviz_web-main/public/images/designed_for/main6.png');
