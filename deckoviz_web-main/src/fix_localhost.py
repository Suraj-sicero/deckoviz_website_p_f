import os
import re

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        print(f"Skipping {filepath} due to encoding issue.")
        return False
    
    # Replace hardcoded localhost:5000 with a more flexible environment variable check
    # This regex looks for the string http://localhost:5000 and replaces it with the env var logic
    # We use a placeholder that works both in template literals and normal strings if possible,
    # but it's cleaner to just replace the whole string or the prefix.
    
    # Pattern: "http://localhost:5000/..." or 'http://localhost:5000/...' or `http://localhost:5000/...`
    
    # We want to replace the http://localhost:5000 part with the env var logic
    # Example: "http://localhost:5000/api" -> `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`
    
    # Handle double quotes
    new_content = re.sub(r'"http://localhost:5000([^"]*)"', r'`${import.meta.env.VITE_API_URL || "http://localhost:5000"}\1`', content)
    
    # Handle single quotes
    new_content = re.sub(r"\'http://localhost:5000([^']*)\'", r'`${import.meta.env.VITE_API_URL || "http://localhost:5000"}\1`', new_content)
    
    # Handle backticks (template literals)
    new_content = re.sub(r'http://localhost:5000', r'${import.meta.env.VITE_API_URL || "http://localhost:5000"}', new_content)
    
    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False

src_dir = '/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src'
fixed_files = []

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            if fix_file(os.path.join(root, file)):
                fixed_files.append(os.path.join(root, file))

print(f"Fixed {len(fixed_files)} files.")
for f in fixed_files:
    print(f"- {f}")
