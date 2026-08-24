# Feature Specification: Career Exploration Session

## 1. User Story
**As a student,** I want to have a guided conversation with Vizzy to explore potential career paths that match my unique interests and strengths, **so that** I can visualize what my future might look like and understand the steps needed to get there.

## 2. Feature / Dev Notes
**Core Mechanics:**
- **Profile Ingestion:** Vizzy reads the student's Deep Profile (strengths, favorite subjects, hobbies) to tailor the conversation before it even begins.
- **"Day in the Life" Generation:** As a career is discussed, Vizzy generates first-person, relatable visuals on the frame depicting what doing that job actually looks like (e.g., a bustling robotics lab, a quiet coding setup, an active construction site).
- **Interactive Q&A:** The student can ask practical questions: "How much money do they make?", "Do I need to go to college for this?", "Is it boring?".
- **Skill Mapping:** Vizzy connects the student's current school subjects to the skills required for the career, providing immediate relevance to their daily homework.

**UX Flow:**
1. **Setup:** Student says, "I don't know what I want to be when I grow up."
2. **Discovery:** Vizzy pulls up a visually engaging "Interest Map" on the frame and asks a few probing, non-standard questions (e.g., "Do you prefer solving puzzles alone or building things with a team?").
3. **Exploration:** Vizzy suggests 3 diverse paths. The student picks one (e.g., "Aerospace Engineer").
4. **Visualization:** The frame transitions to a "Day in the Life" montage. Vizzy narrates the typical day, showing the workspace, the tools used, and the challenges faced.
5. **Action Plan:** Vizzy ends the session by saving a "Career Snapshot" to the student's library, detailing 3 things they can do *this week* to explore the field further (e.g., "Watch this video on rocket propulsion").

**Edge Cases:**
- *Unrealistic Aspirations:* If a student wants to be a "professional video game player" or "TikTok star," Vizzy shouldn't crush their dreams, but should gently introduce the underlying skills (video editing, marketing, community management, game design) to broaden the scope into stable career paths.
- *Total Apathy:* If the student responds with "I don't care" or "I don't like anything," Vizzy needs a fallback set of highly visual, "cool factor" jobs to spark initial engagement (e.g., underwater welder, ethical hacker).

## 3. Build Notes
- **Architecture Considerations:** Relies on the `User Profile` API and the `User library` API to save the final Career Snapshot.
- **Data Model:** We need a robust, updated dataset of careers, salary ranges, and educational requirements to prevent the LLM from hallucinating outdated career advice.
- **Integration Points:** Connects to the Curriculum; Vizzy should be able to say, "The algebra you're learning with Mr. Smith right now is exactly what you need to calculate drone flight paths."

## 4. Implementation Notes
- **Rollout Strategy:** Highly relevant for middle and high school tiers. Can be pitched to schools as a direct enhancement to their existing guidance counselor programs.
- **Testing Considerations:** Ensure the generated visuals of professionals are highly diverse in terms of race, gender, and ability, breaking traditional stereotypes (e.g., showing female engineers, male nurses).
- **Open Technical Questions:** How do we handle regional variations in career requirements and salaries? *Assumption: Vizzy relies on the LLM's general knowledge but includes a disclaimer that specific requirements vary.*

## 5. System Prompt
**Role & Scope:** 
You are Vizzy, acting as an empathetic, inspiring, and realistic Career Counselor for a student. Your goal is to help them discover and visualize exciting futures based on their actual interests.

**Tone:** 
Encouraging, curious, practical, and inspiring. You are an older mentor who sees the student's potential. Avoid dry, corporate jargon; speak about careers in terms of impact, daily activities, and passion.

**Guidelines:**
- Always reference the student's known strengths or past projects if you have access to their profile.
- When describing a job, focus on the "Day in the Life" experience. Generate visual prompts that show dynamic workspaces, not just people in suits shaking hands.
- Connect the career back to what they are learning in school today.
- If a student suggests a highly specific or unconventional dream, validate it, but gently unpack the core skills involved to show them related, broader opportunities.
- **Safety Guardrail:** Do not make guarantees about future wealth, job placement, or tell a student they are "not smart enough" for a specific path. 

## 6. Other Relevant Details
- **Success Metrics:** Number of Career Snapshots saved to the User Library, return rates to the mode (exploring multiple careers over time).
- **Naming:** "Career Exploration Session" is clear, but "Future Vision" or "Pathfinder Mode" might be more engaging for students.
