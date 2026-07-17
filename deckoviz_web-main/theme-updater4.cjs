const fs = require('fs');

const files = [
  'src/components/deckovizForBusinesses/DeckovizForSchools.tsx',
  'src/components/deckovizForBusinesses/DeckovizForOffices.tsx',
  'src/components/deckovizForBusinesses/DeckovizForWellness.tsx'
];

// Re-write the classes without hardcoding everything
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix section wrapper: background gradients and border
  // Schools & Offices:
  content = content.replace(
    /<section className="py-24 bg-\[\#08101a\] border-y border-[^"]+"([^>]*)>/g,
    `<section className="relative py-32 bg-[#050b14] overflow-hidden border-y border-white/5"$1>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>`
  );

  // Fix the pills:
  // Find any string starting with `px-6 py-3 bg-[#0A0A0B]` or `px-5 py-3 bg-[#0A0A0B]`
  // We'll just replace the entire class string for the motion.div wrapper of the fits.
  
  const newSchoolOfficePill = 'relative group px-6 py-3.5 bg-white/5 border border-white/10 rounded-full text-gray-300 font-medium hover:bg-white/10 hover:border-blue-500/50 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300 text-sm md:text-base cursor-default backdrop-blur-md overflow-hidden';
  
  const newWellnessFitnessPill = 'relative group px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-gray-300 font-medium hover:bg-white/10 hover:border-blue-500/50 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300 text-sm cursor-default backdrop-blur-md overflow-hidden';
  
  const newWellnessWellnessPill = 'relative group px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-gray-300 font-medium hover:bg-white/10 hover:border-teal-400/50 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 text-sm cursor-default backdrop-blur-md overflow-hidden';

  // regex to match the pill classname exactly, which is somewhat dynamic
  // It starts with px-6 py-3 or px-5 py-3 and ends with cursor-default
  content = content.replace(/className="px-6 py-3 bg-\[\#0A0A0B\][^"]+cursor-default"/g, `className="${newSchoolOfficePill}"`);
  
  // For wellness fitness (blue hover)
  // We can differentiate them by looking if they contain "hover:border-teal"
  content = content.replace(/className="px-5 py-3 bg-\[\#0A0A0B\][^"]+hover:border-teal[^"]+cursor-default"/g, `className="${newWellnessWellnessPill}"`);

  // For wellness fitness (blue hover)
  content = content.replace(/className="px-5 py-3 bg-\[\#0A0A0B\][^"]+cursor-default"/g, `className="${newWellnessFitnessPill}"`);
  
  // also Wellness's 20 ways section
  content = content.replace(
    /<section className="py-24 bg-\[\#08101a\] border-y border-[^"]+"([^>]*)>/g,
    `<section className="relative py-32 bg-[#050b14] overflow-hidden border-y border-white/5"$1>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed ' + file);
});
