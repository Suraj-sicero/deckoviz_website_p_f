const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Kishore M\\.gemini\\antigravity\\brain\\6e4d5672-a1e2-4503-bda4-08281213f833\\.system_generated\\logs\\overview.txt';
const logContent = fs.readFileSync(logPath, 'utf8');

const startIndex = logContent.lastIndexOf('The 100 Greatest Films of All Time\nA Deckoviz Reference Guide');
const endIndexStr = 'Use your frame as your cinema.';
let endIndex = logContent.lastIndexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
    let content = logContent.substring(startIndex, endIndex + endIndexStr.length);
    
    // Format into Markdown!
    content = content.replace('The 100 Greatest Films of All Time\nA Deckoviz Reference Guide', '# The 100 Greatest Films of All Time\n## A Deckoviz Reference Guide');
    
    content = content.replace(/(?:\r?\n)(Introduction)(?:\r?\n)/g, '\n## $1\n\n');
    content = content.replace(/(?:\r?\n)(The 100 Films)(?:\r?\n)/g, '\n## $1\n\n');
    content = content.replace(/(?:\r?\n)(Outro)(?:\r?\n)/g, '\n## $1\n\n');
    
    // Format numbers
    content = content.replace(/(?:\r?\n)(\d+)\. (.*? \(\d{4}\)) (Director: .*?)(?:\r?\n)/g, '\n### $1. $2\n**$3**\n\n');
    
    // Format Visual world / Deckoviz poster art
    content = content.replace(/Visual world: /g, '\n* **Visual world:** ');
    content = content.replace(/Deckoviz poster art: /g, '\n* **Deckoviz poster art:** ');
    
    // Add front matter
    const frontMatter = `---
id: 101
title: "The 100 Greatest Films of All Time: A Deckoviz Reference Guide"
description: "A definitive guide to the 100 greatest films ever made, curated specifically as a source for breathtaking generative poster art and visual exploration on your Deckoviz DASPort."
tag: "Guides"
tagColor: "bg-blue-100 text-blue-700"
date: "June 16, 2026"
readTime: "25 min read"
pinned: false
image: "/images/100_films_cover.png"
size: "large"
---\n\n`;

    fs.writeFileSync('d:/deckoviz-demo/deckoviz_web-main/src/content/blogs/the-100-greatest-films-of-all-time.md', frontMatter + content);
    console.log('Successfully formatted and wrote all 100 films to markdown!');
} else {
    console.log('Could not find start or end tags.');
}
