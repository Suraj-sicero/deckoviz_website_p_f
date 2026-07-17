const fs = require('fs');

const files = [
  'src/components/deckovizForBusinesses/DeckovizForSchools.tsx',
  'src/components/deckovizForBusinesses/DeckovizForOffices.tsx',
  'src/components/deckovizForBusinesses/DeckovizForWellness.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Master wrapper
  content = content.replace(/className="bg-white min-h-screen/g, 'className="bg-[#0A0A0B] min-h-screen');
  content = content.replace(/text-gray-900 font-sans"/g, 'text-white font-sans"');

  // Background gradients
  content = content.replace(/<div className="absolute inset-0 bg-\[radial-gradient\([^\]]+\)\] [^>]+><\/div>/g, 
  `{/* Animated Gradient Layers */}
          <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-blue-600/20 via-indigo-500/10 to-transparent blur-[40px] animate-[floatLeft_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/15 via-indigo-400/10 to-transparent blur-[50px] animate-[floatCenter_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-blue-500/10 via-indigo-400/5 to-transparent blur-[60px] animate-[floatBottom_10s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/20 via-indigo-400/10 to-transparent blur-[50px] animate-[floatRight_7s_ease-in-out_infinite]"></div>`);

  // Blob updates
  content = content.replace(/mix-blend-multiply/g, 'mix-blend-screen');
  content = content.replace(/bg-\[#182A4A\]\/10/g, 'bg-blue-600/20');
  content = content.replace(/bg-\[#2563EB\]\/10/g, 'bg-indigo-600/20');
  content = content.replace(/bg-teal-500\/10/g, 'bg-teal-600/20');
  content = content.replace(/bg-\[#182A4A\]\/5/g, 'bg-blue-500/15');
  content = content.replace(/bg-\[#2563EB\]\/5/g, 'bg-indigo-500/15');
  
  // Immersive hero from- to- backgrounds
  content = content.replace(/from-blue-50 via-slate-50 to-white/g, 'from-transparent via-blue-950/20 to-black/50');
  content = content.replace(/from-slate-100 via-blue-50\/30 to-white/g, 'from-transparent via-blue-950/20 to-black/50');
  content = content.replace(/from-teal-50\/50 via-slate-50 to-white/g, 'from-transparent via-teal-950/20 to-black/50');

  // Text/Colors replacements
  content = content.replace(/bg-white\/60 border border-gray-200 text-\[#182A4A\]/g, 'bg-white/10 border border-white/20 text-white backdrop-blur-md');
  content = content.replace(/text-gray-900/g, 'text-white');
  content = content.replace(/text-gray-700/g, 'text-gray-300');
  content = content.replace(/text-gray-600/g, 'text-gray-400');
  content = content.replace(/text-gray-800/g, 'text-gray-200');

  // Section backgrounds
  content = content.replace(/bg-zinc-50/g, 'bg-[#08101a]');
  
  // Only replace 'bg-white' if it's an exact class word, because 'bg-white/10' should remain
  content = content.replace(/(?<!\/|\-)bg-white(?!\/)/g, 'bg-[#0A0A0B]');
  
  // Cards styling
  content = content.replace(/bg-\[#0A0A0B\] border border-gray-100 shadow-\[0_4px_24px_rgba\(0,0,0,0\.03\)\]/g, 'bg-white/5 border border-white/10 backdrop-blur-md');
  content = content.replace(/bg-blue-50/g, 'bg-blue-900/30');
  content = content.replace(/bg-teal-50/g, 'bg-teal-900/30');
  content = content.replace(/hover:shadow-2xl/g, 'hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]');
  
  // Fonts and colors in story/prose
  content = content.replace(/hover:text-gray-900/g, 'hover:text-white');
  content = content.replace(/border-l-4 border-\[#2563EB\]/g, 'border-l-4 border-blue-500');

  // Bottom Line Section
  content = content.replace(/from-\[#0A0A0B\] via-blue-50\/50 to-blue-100\/50/g, 'from-[#08101a] via-[#050b14] to-[#01060e]');
  
  content = content.replace(/bg-\[#182A4A\] text-white/g, 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-white/10 hover:from-blue-500 hover:to-indigo-500');
  
  content = content.replace(/border-gray-200/g, 'border-white/10');
  content = content.replace(/border-gray-100/g, 'border-white/5');
  
  // Fix gradients
  content = content.replace(/from-\[#182A4A\] to-\[#2563EB\]/g, 'from-blue-400 to-cyan-400');
  content = content.replace(/from-\[#2563EB\] to-\[#182A4A\]/g, 'from-blue-500 to-cyan-500');
  content = content.replace(/text-\[#2563EB\]/g, 'text-blue-400');
  content = content.replace(/text-\[#182A4A\]/g, 'text-blue-300');
  content = content.replace(/hover:text-\[#182A4A\]/g, 'hover:text-blue-200');

  content = content.replace(/group-hover:text-gray-700/g, 'group-hover:text-gray-300');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
