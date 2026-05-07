import os

src_dir = '/home/shashank/Documents/work2/deckoviz-demo'

for root, dirs, files in os.walk(src_dir):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.ejs')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content.replace('to-purple', 'to-indigo')
                new_content = new_content.replace('to-Purple', 'to-Indigo')
                new_content = new_content.replace('purple', 'violet')
                new_content = new_content.replace('Purple', 'Violet')
                new_content = new_content.replace('PURPLE', 'VIOLET')
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {path}")
            except Exception as e:
                pass
