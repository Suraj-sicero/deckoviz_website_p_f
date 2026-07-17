const fs = require('fs');

const files = [
  'src/components/deckovizForBusinesses/DeckovizForSchools.tsx',
  'src/components/deckovizForBusinesses/DeckovizForOffices.tsx',
  'src/components/deckovizForBusinesses/DeckovizForWellness.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix messed up classes from greedy regex
  content = content.replace(/bg-blue-900\/300\/15/g, 'bg-blue-500/15');
  content = content.replace(/bg-teal-900\/300\/10/g, 'bg-teal-500/10');
  content = content.replace(/bg-teal-900\/300\/20/g, 'bg-teal-600/20');
  content = content.replace(/bg-blue-900\/300/g, 'bg-blue-500'); // just in case
  
  // also fixing backdrop-blur repetition: "backdrop-blur-md font-semibold text-sm tracking-wide mb-6 shadow-sm backdrop-blur-sm"
  content = content.replace(/backdrop-blur-md font-semibold text-sm tracking-wide mb-6 shadow-sm backdrop-blur-sm/g, 'font-semibold text-sm tracking-wide mb-6 shadow-sm backdrop-blur-md');

  // Also one minor issue: some text-gray-900 might still remain if they were part of a different string but node replaced them all.
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed ' + file);
});
