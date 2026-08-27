# Feature Specification: Debate & Perspective-Taking Mode

## 1. User Story
**As a teacher or student,** I want to engage in a live, visually supported debate with Vizzy taking an opposing stance, **so that** the class can practice critical thinking, evidence-based argumentation, and gain comfort with respectful disagreement in a safe, dynamic environment.

*Secondary User Story (Teacher Facilitation):* 
**As a teacher,** I want to set the topic, define Vizzy's persona (e.g., "play devil's advocate" or "represent a historical figure's viewpoint"), and let Vizzy facilitate the debate, **so that** I can focus on guiding my students' reasoning rather than just supplying counterarguments myself.

## 2. Feature / Dev Notes
**Core Mechanics:**
- **Stance Selection:** When initiating the mode, the user (teacher/student) inputs a topic. They choose their stance, and Vizzy automatically adopts the strongest counter-stance.
- **Real-Time Visual Evidence:** As Vizzy presents its arguments, it generates supporting visual evidence on the frame (e.g., charts, historical photos, conceptual diagrams) to ground its points.
- **Counter-Argument Capture:** When students reply, Vizzy listens via the intent-capture layer, processes their argument, and responds with a counterpoint or a Socratic question to probe weaknesses in their logic.
- **Debate Wrap-up:** At the end of the session, Vizzy drops the "opponent" persona and generates a visual summary of the debate, highlighting the strongest points made by the students and areas where their logic could have been tighter.

**UX Flow:**
1. **Setup:** Teacher says, "Vizzy, let's debate renewable energy. We are arguing for solar, you argue for fossil fuels."
2. **Opening:** Vizzy visually transforms the frame to reflect the debate topic (e.g., a split screen showing solar panels vs. an oil rig) and delivers its opening argument.
3. **Volley:** Students make a point. Vizzy's avatar reacts (listening, thinking), then responds verbally while updating the frame with a new piece of visual evidence backing its counter-claim.
4. **Resolution:** Teacher says, "Let's wrap up." Vizzy summarizes the core clash, awards "points" for strong reasoning, and ends the session.

**Edge Cases:**
- *Inappropriate Topics:* If a student suggests a highly sensitive or inappropriate debate topic, Vizzy smoothly redirects to a safe, pre-approved curriculum topic.
- *Student Frustration:* If the debate becomes too heated or students get stuck, Vizzy should detect the stall/frustration and soften its tone, offering a hint or asking a clarifying question instead of a hard counter-argument.

## 3. Build Notes
- **Architecture Considerations:** This mode relies heavily on a rapid feedback loop between the LLM (for argument generation) and the image generation pipeline (for visual evidence). Latency is critical here to maintain the rhythm of a debate.
- **Data Model:** We need to log the "Debate Transcript" in the `CourseSessions` or a new `DebateLogs` table, capturing both the text of the arguments and references to the generated visual assets so the teacher can review them later.
- **Integration Points:** Needs to hook into the existing Voice/Live Assistant layer for real-time STT (Speech-to-Text) and TTS (Text-to-Speech), as well as the Deep Student Profile to adjust the vocabulary complexity based on the grade level.

## 4. Implementation Notes
- **Rollout Strategy:** Launch as a Beta feature within the "Creative Studio" or "Live Classroom" hub. Feature flag it initially for select teacher accounts to test latency and appropriateness of arguments.
- **Testing Considerations:** We must heavily red-team the LLM to ensure it doesn't accidentally generate offensive visual evidence when arguing controversial topics (e.g., historical debates).
- **Open Technical Questions:** How do we handle latency if the image generation takes longer than the verbal response? *Assumption: We will stream the verbal response first, while the visual evidence renders with a subtle "generating evidence..." loading state on the frame.*

## 5. System Prompt
**Role & Scope:** 
You are Vizzy, an advanced AI debate partner for students. Your goal is to foster critical thinking and help students practice argumentation. You will take the opposing side of whatever topic the user selects. 

**Tone:** 
Engaged, intellectual, challenging, but ultimately supportive. You are a respectful intellectual sparring partner, not an aggressive adversary. Never mock or belittle a student's argument.

**Guidelines:**
- Always acknowledge the student's point before countering it. 
- Base your counter-arguments on logic, historical precedent, or scientific fact.
- Describe the visual evidence you are "showing" on the screen (e.g., "As you can see in this chart I'm displaying...").
- Keep your responses concise (under 4 sentences) to keep the debate moving quickly.
- If the student makes a genuinely excellent, unassailable point, concede the point gracefully and pivot to a new angle of the debate.
- **Safety Guardrail:** If asked to debate hate speech, violence, or explicitly restricted topics, politely decline and suggest a related historical or scientific topic instead.

## 6. Other Relevant Details
- **Success Metrics:** Session length (are students staying engaged?), number of volleys per debate, and teacher feedback ratings post-session.
- **Naming:** "Debate & Perspective-Taking Mode" is a bit long for the UI. We might abbreviate it to **"Debate Vizzy"** or **"Sparring Mode"** in the student-facing dashboard.
