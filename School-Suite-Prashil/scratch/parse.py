import re
import json

def parse():
    with open('raw_text.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    lines = text.split('\n')
    courses = []
    current_track = ""
    current_icon = "Sparkles"
    
    # Map tracks to colors and icons
    track_mapping = {
        "Emotional Intelligence": ("linear-gradient(135deg, #ff006e, #ff6b6b)", "HeartPulse"),
        "Creativity & Expression": ("linear-gradient(135deg, #9d4edd, #c77dff)", "Palette"),
        "Thinking & Decision-Making": ("linear-gradient(135deg, #ffbe0b, #fb5607)", "Lightbulb"),
        "Communication & Relationships": ("linear-gradient(135deg, #00b4d8, #0077b6)", "MessageCircle"),
        "Practical Life Skills": ("linear-gradient(135deg, #06d6a0, #2dc653)", "HandCoins"),
        "World, Culture & Ideas": ("linear-gradient(135deg, #3a86ff, #023e8a)", "Globe"),
        "Design, Invention & Creative Production": ("linear-gradient(135deg, #8338ec, #3a0ca3)", "PenTool"),
        "Experiences Only Deckoviz Can Offer": ("linear-gradient(135deg, #ff006e, #8338ec)", "Star")
    }
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("### Track"):
            # e.g. ### Track 1: Emotional Intelligence
            match = re.match(r'### Track \d+:\s*(.*)', line)
            if match:
                current_track = match.group(1).strip()
        elif line.startswith("**"):
            # e.g. **1. Understanding My Emotions** Length: 5 classes...
            match = re.match(r'\*\*(\d+)\.\s+(.*?)\*\*\s+Length:\s*(.*?)\.(.*)', line)
            if match:
                num = match.group(1)
                title = match.group(2).strip()
                length_str = match.group(3).strip()
                description = match.group(4).strip()
                
                # Extract session number roughly
                sessions = 1
                sess_match = re.search(r'(\d+)', length_str)
                if sess_match:
                    sessions = int(sess_match.group(1))
                elif "Ongoing" in length_str or "Ongoing" in line:
                    sessions = 40 # arbitrary high number for ongoing
                
                # Extract grade level roughly from description/length
                grade_level = "All Grades"
                if "primary" in length_str.lower() or "primary" in description.lower():
                    grade_level = "Primary"
                elif "secondary" in length_str.lower() or "secondary" in description.lower():
                    grade_level = "Secondary"
                    
                color, icon = track_mapping.get(current_track, ("linear-gradient(135deg, #3a86ff, #00b4d8)", "Sparkles"))
                
                courses.append({
                    "id": f"c{num}",
                    "title": title,
                    "track": current_track,
                    "sessions": sessions,
                    "description": f"Length: {length_str}. {description}",
                    "gradeLevel": grade_level,
                    "color": color,
                    "icon": icon
                })
                
    # Generate TypeScript code
    ts_code = "import { HeartPulse, Palette, Lightbulb, MessageCircle, HandCoins, Globe, PenTool, Star, Sparkles } from 'lucide-react';\n\n"
    ts_code += "export interface Course {\n"
    ts_code += "  id: string;\n"
    ts_code += "  title: string;\n"
    ts_code += "  track: string;\n"
    ts_code += "  sessions: number;\n"
    ts_code += "  description: string;\n"
    ts_code += "  gradeLevel: string;\n"
    ts_code += "  color: string;\n"
    ts_code += "  icon: any;\n"
    ts_code += "}\n\n"
    ts_code += "export const COURSES: Course[] = [\n"
    for c in courses:
        desc = c['description'].replace("'", "\\'")
        title = c['title'].replace("'", "\\'")
        ts_code += f"  {{\n"
        ts_code += f"    id: '{c['id']}',\n"
        ts_code += f"    title: '{title}',\n"
        ts_code += f"    track: '{c['track']}',\n"
        ts_code += f"    sessions: {c['sessions']},\n"
        ts_code += f"    description: '{desc}',\n"
        ts_code += f"    gradeLevel: '{c['gradeLevel']}',\n"
        ts_code += f"    color: '{c['color']}',\n"
        ts_code += f"    icon: {c['icon']}\n"
        ts_code += f"  }},\n"
    ts_code += "];\n"
    
    with open('courses.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)

if __name__ == '__main__':
    parse()
