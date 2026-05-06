import os
import re

src_dir = '/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src'

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'purple' in content:
                    new_content = content.replace('to-purple', 'to-indigo')
                    new_content = new_content.replace('purple', 'violet')
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {path}")
            except Exception as e:
                print(f"Skipping {path}: {e}")
