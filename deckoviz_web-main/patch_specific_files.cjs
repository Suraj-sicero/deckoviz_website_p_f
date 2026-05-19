const fs = require('fs');

const files = [
  'src/components/DataAsArt/index.tsx',
  'src/components/MemoryLandscapes/index.tsx',
  'src/components/CelestialCosmos/index.tsx',
  'src/components/MaterialSimulations/index.tsx',
  'src/components/OrganismSim/index.tsx',
  'src/components/AmbientRitual/index.tsx'
];

const EXIT_BTN_MARKER = "ALWAYS VISIBLE EXIT BUTTON";

const EXIT_BTN_JSX = `
      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-24 pointer-events-auto z-[9999]">
        <button 
          onClick={() => {
            if (typeof navigate !== 'undefined') {
              navigate('/experimental-art-modes');
            } else {
              window.location.href = '/experimental-art-modes';
            }
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
`;

function processFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(EXIT_BTN_MARKER)) {
        console.log("Already processed:", filePath);
        return;
    }
    
    if (!content.includes("from 'react-router-dom'") && !content.includes('from "react-router-dom"')) {
        const importRegex = /import .* from ['"].*['"];?\n/g;
        let lastImportIndex = 0;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            lastImportIndex = match.index + match[0].length;
        }
        if (lastImportIndex > 0) {
            content = content.slice(0, lastImportIndex) + "import { useNavigate } from 'react-router-dom';\n" + content.slice(lastImportIndex);
        } else {
            content = "import { useNavigate } from 'react-router-dom';\n" + content;
        }
    } else if (content.includes("from 'react-router-dom'") && !content.includes('useNavigate')) {
        content = content.replace(/import \{(.*?)\} from ['"]react-router-dom['"]/, "import { $1, useNavigate } from 'react-router-dom'");
    }

    const componentRegex = /const (\w+) *: *React\.FC(<.*>)? *=( *.* *)?=> *\{/;
    const match = componentRegex.exec(content);
    if (match) {
        if (!content.includes('const navigate = useNavigate();')) {
            const insertPos = match.index + match[0].length;
            content = content.slice(0, insertPos) + "\n    const navigate = useNavigate();" + content.slice(insertPos);
        }
    }

    const lastParenIdx = content.lastIndexOf(');');
    if (lastParenIdx !== -1) {
        const lastDivIdx = content.lastIndexOf('</div>', lastParenIdx);
        if (lastDivIdx !== -1) {
            content = content.slice(0, lastDivIdx) + EXIT_BTN_JSX + content.slice(lastDivIdx);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Processed:", filePath);
        }
    }
}

files.forEach(processFile);
