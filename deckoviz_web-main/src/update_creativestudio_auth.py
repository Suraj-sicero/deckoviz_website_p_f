import re

file_path = "/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src/components/tools/CreativeStudio.tsx"
with open(file_path, "r") as f:
    content = f.read()

if 'import { useAuth }' not in content:
    content = content.replace('import { CreditSystemModal } from "./CreditSystem";', 'import { CreditSystemModal } from "./CreditSystem";\nimport { useAuth } from "../../context/AuthContext";')

if 'const [credits, setCredits] = useState(120);' in content:
    content = content.replace('const [credits, setCredits] = useState(120);', 'const { user, openAuthModal } = useAuth();\n  const credits = user ? user.credits : 0;')

if 'onClick={() => setIsCreditModalOpen(true)}' in content:
    content = content.replace('onClick={() => setIsCreditModalOpen(true)}', 'onClick={() => user ? setIsCreditModalOpen(true) : openAuthModal()}')

if 'onRecharge={(amount) => {\n          setCredits(prev => prev + amount);\n        }}' in content:
    content = content.replace('onRecharge={(amount) => {\n          setCredits(prev => prev + amount);\n        }}', '')

with open(file_path, "w") as f:
    f.write(content)
