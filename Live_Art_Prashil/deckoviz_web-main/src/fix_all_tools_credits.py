import os
import glob
import re

tools_dir = "/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src/components/tools"
tool_files = glob.glob(f"{tools_dir}/*Tool.tsx")

for file_path in tool_files:
    if "DailyInspirationTool" in file_path or "ToolLayout" in file_path:
        continue
    
    with open(file_path, "r") as f:
        content = f.read()
    
    # 1. Add useAuth import if not present
    if "import { useAuth }" not in content:
        content = content.replace('import ToolLayout from "./ToolLayout";', 'import ToolLayout from "./ToolLayout";\nimport { useAuth } from "../../context/AuthContext";')
    
    # 2. Add deductCredits to component body
    # Find the component definition
    component_match = re.search(r'const ([A-Za-z]+Tool): React\.FC.*?= \(\) => {', content)
    if component_match:
        component_def = component_match.group(0)
        if "const { deductCredits } = useAuth();" not in content:
            content = content.replace(component_def, f"{component_def}\n  const {{ deductCredits }} = useAuth();")
    
    # 3. Find the generate function
    # Example: const generate = async () => {
    # Replace it and inject the check
    
    generate_match = re.search(r'(const (?:handle)?(?:[Gg]enerate|[Ss]ubmit) = async \(.*?\) => {)', content)
    if generate_match:
        gen_def = generate_match.group(1)
        if "const hasCredits = await deductCredits(" not in content:
            # Inject credit deduction logic
            injection = f"""{gen_def}
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;"""
            content = content.replace(gen_def, injection)

    with open(file_path, "w") as f:
        f.write(content)
        
print("Updated all tool files")
