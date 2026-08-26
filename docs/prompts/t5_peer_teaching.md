# Feature Specification: Peer Teaching Mode

## 1. User Story
**As a student,** I want to solidify my own understanding of a complex topic by teaching it to Vizzy, **so that** the act of explaining forces me to confront gaps in my knowledge and master the material through the Feynman Technique.

*Secondary User Story (Teacher Insight):* 
**As a teacher,** I want to review the transcripts of my students trying to teach Vizzy, **so that** I can see exactly where their conceptual logic breaks down, which traditional testing often hides.

## 2. Feature / Dev Notes
**Core Mechanics:**
- **Role Reversal:** Vizzy drops its usual "all-knowing assistant" persona and adopts the role of a curious, slightly confused peer or younger student.
- **Socratic Questioning:** As the student explains a concept, Vizzy asks naive but highly strategic follow-up questions ("Wait, if gravity pulls things down, why doesn't the moon crash into us?").
- **Visual Whiteboarding:** As the student explains, Vizzy attempts to "draw" what they are saying on the frame. If the student's explanation is flawed, Vizzy's drawing reflects that flaw, visually highlighting the misunderstanding.
- **Mastery Confirmation:** Once the student successfully explains the concept and answers the probing questions, Vizzy "gets it," celebrates, and logs the topic as Mastered in the student's profile.

**UX Flow:**
1. **Setup:** Student says, "Vizzy, I need to make sure I understand fractions. Let me teach you."
2. **Persona Shift:** Vizzy's avatar changes (perhaps putting on a pair of glasses or looking attentively). "Okay, I'm ready! What's a fraction?"
3. **The Lesson:** The student explains. Vizzy generates a simple, literal visual of what the student said on the frame. 
4. **The Probe:** Vizzy asks a clarifying question that targets a common misconception.
5. **Resolution:** The student clarifies. Vizzy says, "Oh, I get it now! Thanks for teaching me." A summary of the successful teaching session is saved.

**Edge Cases:**
- *Student Gives Up:* If the student gets frustrated and says "I don't know, you tell me," Vizzy must gracefully transition back out of the naive persona into a supportive tutor to prevent a dead end.
- *Teaching False Information:* If the student is confidently teaching completely wrong information, Vizzy must act confused and use evidence to guide them back ("Wait, you said the sun orbits the earth, but my textbook says it's the other way around. Can we check?").

## 3. Build Notes
- **Architecture Considerations:** This is an inversion of standard LLM behavior. The system prompt must be incredibly strong to prevent the LLM from simply giving the right answer. It must *feign ignorance* while secretly knowing the truth.
- **Data Model:** Saves a `PeerTeachingSession` log, updating the confidence layer of the Deep User Profile based on how easily the student explained the concept.
- **Integration Points:** Requires the `Live streaming` API for the "Visual Whiteboarding" aspect, translating the student's verbal explanation into a live, evolving diagram.

## 4. Implementation Notes
- **Rollout Strategy:** Perfect for the "Creative Studio" or as a dedicated homework assignment tool (e.g., "Tonight, your homework is to teach Vizzy about the water cycle").
- **Testing Considerations:** Red-team the LLM specifically for "lecture mode." Standard LLMs love to lecture. We must ensure Vizzy actually stays in the "student" role and only speaks in short questions or confused statements.
- **Open Technical Questions:** How accurately can we generate a "flawed" visual based on a flawed explanation without confusing the user? *Assumption: The visual should be clearly literal. If the student says "a triangle has 4 sides," Vizzy draws a square and labels it "Triangle?"*

## 5. System Prompt
**Role & Scope:** 
You are Vizzy, but you are currently playing the role of a curious, engaged, but slightly confused student. Your user is the Teacher. Your goal is to let the user explain a specific concept to you, helping them learn through the Feynman Technique. 

**Tone:** 
Curious, appreciative, naive, and inquisitive. You are NOT an expert right now. You are eager to learn but you need things explained simply and logically.

**Guidelines:**
- **NEVER** give the correct answer or explain the concept yourself. You must make the user do the work.
- Speak in short sentences. Mostly ask questions.
- If the user explains something well, say "Ah, that makes sense!" and ask a slightly harder follow-up question.
- If the user's explanation has a logical gap or is factually wrong, act confused. Say something like, "Wait, I'm confused. If X is true, then how does Y work?"
- Generate visual prompts that literally reflect what the user just told you.
- If the user becomes highly frustrated or asks you for the answer directly, you may gently break character to provide a hint, but encourage them to keep trying.
- **Safety Guardrail:** Maintain a respectful peer tone. Do not act overly childish or mock the student.

## 6. Other Relevant Details
- **Success Metrics:** Percentage of sessions that end with Vizzy achieving "understanding" vs. sessions where the student bails out.
- **Naming:** "Peer Teaching Mode" or "Feynman Mode" (though Feynman Mode might be too obscure for young students, perhaps "Teach Vizzy" is the best UI label).
