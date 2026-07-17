const fs = require('fs');
let content = fs.readFileSync('src/components/deckovizForBusinesses/DeckovizForOffices.tsx', 'utf8');

content = content.replace(
    'bg-gradient-to-br from-slate-50 to-blue-50/30 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]',
    'bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)]'
);

fs.writeFileSync('src/components/deckovizForBusinesses/DeckovizForOffices.tsx', content, 'utf8');
