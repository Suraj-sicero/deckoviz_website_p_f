const fs = require('fs');
const path = require('path');
const dir = './src/pages/LiveArt/modes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // 1. Ensure isMouseIdle and isTVMode are extracted from useLiveArt()
  content = content.replace(/const \{([^}]+)\} = useLiveArt\(\);/g, (match, props) => {
    let p = props.trim();
    if (!p.includes('isTVMode')) p += ', isTVMode';
    if (!p.includes('isMouseIdle')) p += ', isMouseIdle';
    return `const { ${p} } = useLiveArt();`;
  });
  
  // 2. Replace the old isMouseActive logic
  content = content.replace(/const isMouseActive = [^\n;]+;/g, (match) => {
    if (match.includes('pointer.x')) {
      return 'const isMouseActive = !isTVMode && !isMouseIdle;';
    }
    return match;
  });
  
  fs.writeFileSync(filepath, content);
  console.log('Updated ' + file);
});
