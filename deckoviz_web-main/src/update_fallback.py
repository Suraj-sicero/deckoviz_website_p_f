import os
import re

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return False

    # Replace the fallback http://localhost:5000 with the production URL
    # This matches the pattern I inserted earlier: ${import.meta.env.VITE_API_URL || "http://localhost:5000"}
    
    new_content = content.replace('"http://localhost:5000"', '"https://deckoviz-demo.onrender.com"')
    new_content = new_content.replace("'http://localhost:5000'", "'https://deckoviz-demo.onrender.com'")
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

src_dir = '/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src'
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            fix_file(os.path.join(root, file))
print("Fallback update done.")
