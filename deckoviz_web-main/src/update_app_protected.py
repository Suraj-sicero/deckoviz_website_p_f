import re

file_path = "/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src/App.tsx"
with open(file_path, "r") as f:
    content = f.read()

# 1. Import ProtectedRoute
if 'import { ProtectedRoute }' not in content:
    content = content.replace('import CreateWorld from "./pages/CreateWorld";', 'import CreateWorld from "./pages/CreateWorld";\nimport { ProtectedRoute } from "./components/auth/ProtectedRoute";\nimport AuthModal from "./components/auth/AuthModal";')

# 2. Add AuthModal to AppContent (so it can be triggered from anywhere e.g. navbar or credit page)
if '<AuthModal />' not in content:
    content = content.replace('<ScrollToTop />', '<ScrollToTop />\n      <AuthModal />')

# 3. We will selectively replace `<Route path="/tools/...` with `<Route path="/tools/..." element={<ProtectedRoute><...</ProtectedRoute>}`
# Let's use regex to wrap the elements.
tools_routes = [
    "/creative-studio", "/tools/audiobook", "/tools/visual-audiobook", "/tools/storybook",
    "/tools/short-story", "/tools/comic", "/tools/life-book", "/tools/visual-journal",
    "/tools/greeting-card", "/tools/song", "/tools/learning-book", "/tools/learning-portal",
    "/tools/visual-book", "/tools/storybook-studio", "/tools/daily", "/tools/music",
    "/tools/postcard", "/wizzy", "/experimental-art-modes", "/create-world"
]

for route in tools_routes:
    # Find something like: <Route path="/wizzy" element={<WizzyPage />} />
    pattern = rf'(<Route path="{route}" element={{)(<[^>]+>)(}} />)'
    # Use re.sub to replace it
    content = re.sub(pattern, r'\1<ProtectedRoute>\2</ProtectedRoute>\3', content)

# Also for /developer-specs/*
developer_specs_pattern = r'(<Route path="/developer-specs/[^"]+" element={{)(<[^>]+>)(}} />)'
content = re.sub(developer_specs_pattern, r'\1<ProtectedRoute>\2</ProtectedRoute>\3', content)

with open(file_path, "w") as f:
    f.write(content)

