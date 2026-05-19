const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'src/components/developerSpecs'),
  path.join(__dirname, 'src/components')
];

const regex = /<button\b[^>]*onClick=\{[^}]*history\.back[^}]*\}[\s\S]*?<\/button>/gi;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.tsx')) {
            results.push(filePath);
        }
    });
    return results;
}

const allFiles = [];
targetDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        allFiles.push(...walk(dir));
    }
});

// Remove duplicates in case directories overlap
const files = [...new Set(allFiles)];

let count = 0;
files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has our injected exit button first to ensure it's one of the processed tools
    if (content.includes("ALWAYS VISIBLE EXIT BUTTON")) {
        if (regex.test(content)) {
            content = content.replace(regex, '');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Removed duplicate button from:", filePath);
            count++;
        }
    }
});

console.log(`Finished processing. Removed duplicate buttons from ${count} files.`);
