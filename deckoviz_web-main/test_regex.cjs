const fs = require('fs');
let content = fs.readFileSync('src/components/developerSpecs/ParticleGalaxy/index.tsx', 'utf8');

const regex = /<button\b[^>]*onClick=\{[^}]*history\.back[^}]*\}[\s\S]*?<\/button>/gi;
const matches = content.match(regex);
console.log("Matches found:", matches ? matches.length : 0);
if (matches) {
    matches.forEach(m => console.log("MATCH:\n", m));
}
