const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src/components/developerSpecs');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else if (f.endsWith('.tsx')) {
            callback(dirPath);
        }
    });
}

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
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already processed
    if (content.includes(EXIT_BTN_MARKER)) {
        return;
    }
    
    // Skip if not a React component file (heuristic: has 'export default')
    if (!content.includes('export default')) {
        return;
    }

    // Add useNavigate import if needed
    if (!content.includes("from 'react-router-dom'") && !content.includes('from "react-router-dom"')) {
        // Insert import after the last import statement
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

    // Add const navigate = useNavigate(); to the component body
    const componentRegex = /const (\w+) *: *React\.FC(<.*>)? *=( *.* *)?=> *\{/;
    const match = componentRegex.exec(content);
    if (match) {
        if (!content.includes('const navigate = useNavigate();')) {
            const insertPos = match.index + match[0].length;
            content = content.slice(0, insertPos) + "\n    const navigate = useNavigate();" + content.slice(insertPos);
        }
    }

    // Add the exit button right before the LAST closing div of the component
    // Finding the return statement's closing
    // We look for the last </div> before the final );
    
    // Reverse search for `);`
    const lastParenIdx = content.lastIndexOf(');');
    if (lastParenIdx !== -1) {
        // Reverse search for `</div>` from `);`
        const lastDivIdx = content.lastIndexOf('</div>', lastParenIdx);
        if (lastDivIdx !== -1) {
            content = content.slice(0, lastDivIdx) + EXIT_BTN_JSX + content.slice(lastDivIdx);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Processed:", filePath);
        }
    }
}

walkDir(targetDir, processFile);
console.log("Done");
