const fs = require('fs');

const files = [
  'src/components/deckovizForBusinesses/DeckovizForSchools.tsx',
  'src/components/deckovizForBusinesses/DeckovizForOffices.tsx',
  'src/components/deckovizForBusinesses/DeckovizForWellness.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Enhance the section wrapper
  content = content.replace(
    /<section className="py-24 bg-\[\#08101a\] border-y border-white\/10 overflow-hidden">/g,
    `<section className="relative py-32 bg-[#050b14] overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>`
  );

  content = content.replace(/hover:text-teal-800/g, 'hover:text-teal-300');

  // Let's create a beautiful glassmorphic pill css for all of them
  const newSchoolOfficePill = 'relative group px-6 py-3.5 bg-white/5 border border-white/10 rounded-full text-gray-300 font-medium hover:bg-white/10 hover:border-blue-500/50 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300 text-sm md:text-base cursor-default backdrop-blur-md overflow-hidden';
  
  const newWellnessFitnessPill = 'relative group px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-gray-300 font-medium hover:bg-white/10 hover:border-blue-500/50 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300 text-sm cursor-default backdrop-blur-md overflow-hidden';
  
  const newWellnessWellnessPill = 'relative group px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-gray-300 font-medium hover:bg-white/10 hover:border-teal-400/50 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 text-sm cursor-default backdrop-blur-md overflow-hidden';

  // Replace Schools & Offices
  content = content.replace(
    /className="px-6 py-3 bg-\[\#0A0A0B\] border border-white\/10 rounded-full shadow-\[0_2px_10px_rgba\(0,0,0,0\.02\)\] text-gray-300 font-medium hover:bg-blue-900\/30 hover:border-blue-500\/40 hover:text-blue-300 hover:-translate-y-1 transition-all duration-300 text-sm md:text-base cursor-default"/g,
    `className="${newSchoolOfficePill}"`
  );

  // Replace Wellness Fitness
  content = content.replace(
    /className="px-5 py-3 bg-\[\#0A0A0B\] border border-white\/10 rounded-2xl shadow-\[0_2px_10px_rgba\(0,0,0,0\.02\)\] text-gray-300 font-medium hover:bg-blue-900\/30 hover:border-blue-500\/40 hover:text-blue-300 hover:-translate-y-0\.5 transition-all duration-300 text-sm cursor-default"/g,
    `className="${newWellnessFitnessPill}"`
  );

  // Replace Wellness Wellness
  content = content.replace(
    /className="px-5 py-3 bg-\[\#0A0A0B\] border border-white\/10 rounded-2xl shadow-\[0_2px_10px_rgba\(0,0,0,0\.02\)\] text-gray-300 font-medium hover:bg-teal-900\/30 hover:border-teal-300\/60 hover:text-teal-300 hover:-translate-y-0\.5 transition-all duration-300 text-sm cursor-default"/g,
    `className="${newWellnessWellnessPill}"`
  );

  // Inject a subtle light sweep effect into the pill's content.
  content = content.replace(
    />\s*✨\s*\{fit\}\s*<\/motion.div>/g,
    `>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-yellow-400 group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">✨</span> 
                <span className="group-hover:text-white transition-colors duration-300">{fit}</span>
              </div>
            </motion.div>`
  );
  
  content = content.replace(
    />\s*⚡\s*\{fit\}\s*<\/motion.div>/g,
    `>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-blue-400 group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">⚡</span> 
                <span className="group-hover:text-white transition-colors duration-300">{fit}</span>
              </div>
            </motion.div>`
  );
  
  content = content.replace(
    />\s*🌿\s*\{fit\}\s*<\/motion.div>/g,
    `>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-teal-400 group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">🌿</span> 
                <span className="group-hover:text-white transition-colors duration-300">{fit}</span>
              </div>
            </motion.div>`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed ' + file);
});
