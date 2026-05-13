import os
import glob
import shutil

src_components = "/home/shashank/Downloads/vizzy-chat-ai-main (6)/vizzy-chat-ai-main/components"
src_lib = "/home/shashank/Downloads/vizzy-chat-ai-main (6)/vizzy-chat-ai-main/lib"
dest_dir = "/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src/components/vizzyCanvas"

os.makedirs(dest_dir, exist_ok=True)
os.makedirs(os.path.join(dest_dir, "ui"), exist_ok=True)
os.makedirs(os.path.join(dest_dir, "lib"), exist_ok=True)

files_to_copy = [
    "vizzy-chat.tsx",
    "chat-input.tsx",
    "chat-message.tsx",
    "welcome-screen.tsx",
    "image-lightbox.tsx",
    "ui/button.tsx",
    "ui/tooltip.tsx"
]

for f in files_to_copy:
    src = os.path.join(src_components, f)
    dest = os.path.join(dest_dir, f)
    if os.path.exists(src):
        with open(src, "r") as fin:
            content = fin.read()
        
        # Replacements
        content = content.replace('"use client"', '')
        content = content.replace("from \"next/navigation\"", "from 'react-router-dom'")
        content = content.replace("useRouter()", "useNavigate()")
        content = content.replace("import Link from \"next/link\"", "import { Link } from 'react-router-dom'")
        content = content.replace("import Image from \"next/image\"", "")
        content = content.replace("<Image", "<img")
        content = content.replace("from \"next-themes\"", "from '../../context/ThemeContext'") # Or remove theme logic
        content = content.replace("@/components/ui/button", "./ui/button")
        content = content.replace("@/components/ui/tooltip", "./ui/tooltip")
        content = content.replace("@/components/", "./")
        content = content.replace("@/lib/image-cache", "./lib/image-cache")
        content = content.replace("@/lib/types", "./lib/types")
        content = content.replace("@/lib/neon-auth-context", "./lib/auth")
        
        with open(dest, "w") as fout:
            fout.write(content)
        print(f"Copied {f}")

# Copy lib files
lib_files = ["image-cache.ts", "types.ts"]
for f in lib_files:
    src = os.path.join(src_lib, f)
    dest = os.path.join(dest_dir, "lib", f)
    if os.path.exists(src):
        shutil.copy2(src, dest)
        print(f"Copied lib/{f}")

