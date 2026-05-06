import os
import re

def clean_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return False

    # The mess: ${import.meta.env.VITE_API_URL || "${import.meta.env.VITE_API_URL || "http://localhost:5000"}"}
    # We want to flatten it back to: ${import.meta.env.VITE_API_URL || "http://localhost:5000"}
    
    # Simple way: search for the whole messed up pattern and replace with clean one
    # But since it might vary, let's look for the nested import.meta.env
    
    pattern = r'\${import\.meta\.env\.VITE_API_URL \|\| \"\${import\.meta\.env\.VITE_API_URL \|\| \"http://localhost:5000\"}\"}'
    clean = '${import.meta.env.VITE_API_URL || "http://localhost:5000"}'
    
    new_content = re.sub(pattern, clean, content)
    
    # Also handle the one I did manually in AuthContext earlier which might have been caught
    # const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";
    # If that was double replaced...
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

src_dir = '/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src'
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            clean_file(os.path.join(root, file))
print("Cleanup done.")
