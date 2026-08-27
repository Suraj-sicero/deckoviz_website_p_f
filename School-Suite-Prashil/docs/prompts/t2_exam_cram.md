# Feature Specification: Exam Cram Companion

## 1. User Story
**As a student,** I want a focused, high-intensity study session powered by adaptive flashcards and rapid-fire recall questions, **so that** I can effectively review material in the days before a test and clearly see which topics I need to focus on.

*Secondary User Story (Teacher Monitoring):* 
**As a teacher,** I want to see an aggregated confidence-tracking report of my class's Exam Cram sessions, **so that** I can dedicate the final review class to the specific topics my students are struggling with.

## 2. Feature / Dev Notes
**Core Mechanics:**
- **Source Ingestion:** The session is seeded by a specific test scope (e.g., "Chapter 4: Cell Biology" or a teacher-uploaded syllabus/study guide).
- **Rapid-Fire Testing:** Vizzy fires off quick, targeted questions. The student answers verbally. Vizzy assesses correctness immediately.
- **Visual Flashcards:** If a student gets a question wrong, Vizzy instantly generates and displays a rich visual flashcard on the frame (e.g., a diagram of a mitochondrion) to reinforce the concept.
- **Confidence Tracking Layer:** Vizzy maps correctness to an underlying knowledge graph. It flags concepts as "Mastered," "Review Needed," or "Critical Gap."
- **Adaptive Pacing:** The session speeds up for mastered topics and slows down to re-drill gaps.

**UX Flow:**
1. **Setup:** Student says, "Vizzy, I have a biology test on Friday, let's cram." Vizzy pulls the upcoming test scope from the curriculum calendar.
2. **The Drill:** Vizzy asks a question ("What is the primary function of the ribosome?"). A timer graphic appears on the frame.
3. **Response & Feedback:** Student answers ("It makes proteins"). Vizzy reacts instantly ("Spot on! Next..."). If wrong, a buzzer sound plays softly, and a visual flashcard blooms on screen while Vizzy explains the correct answer.
4. **Wrap-up Dashboard:** After the 15-minute session, Vizzy displays a "Cram Results" dashboard showing a heat map of strong/weak areas and a recommended study plan for tomorrow.

**Edge Cases:**
- *Panic/Frustration:* If the student gets 5 questions wrong in a row and sounds distressed, Vizzy pauses the "rapid-fire" timer and switches to a gentle, explanatory tutoring mode to rebuild confidence.
- *Ambiguous Answers:* If a student's verbal answer is partially correct but poorly phrased, Vizzy should ask a quick clarifying follow-up rather than marking it outright wrong.

## 3. Build Notes
- **Architecture Considerations:** Requires tight integration with the Student Knowledge Graph (part of the Deep Profile). The system must be able to instantly pull the curriculum context and generate Q&A pairs dynamically rather than relying on a static bank.
- **Data Model:** Needs a `ConfidenceScore` table linking `StudentID`, `TopicID`, and a value (0-100), which updates in real-time during the session.
- **Integration Points:** TTS (Text-to-Speech) needs to have a fast, energetic tone to match the "cram" vibe. STT (Speech-to-Text) must be highly accurate to catch rapid, single-word answers.

## 4. Implementation Notes
- **Rollout Strategy:** Roll out during midterm or finals season to maximize initial adoption and usefulness.
- **Testing Considerations:** Test the latency of the Q&A loop. If there's a 3-second delay between the student answering and Vizzy confirming, the "rapid-fire" illusion breaks. We may need to use speculative execution or lighter LLM models for the validation step.
- **Open Technical Questions:** Should we cache the visual flashcards for common curriculum topics, or generate them all on the fly? *Assumption: Cache standard curriculum visuals (mitochondria, water cycle) to guarantee zero-latency flashcards, only generating dynamically for highly specific questions.*

## 5. System Prompt
**Role & Scope:** 
You are Vizzy, acting in "Exam Cram" mode. You are a high-energy, encouraging, fast-paced study coach helping a student prepare for an imminent exam.

**Tone:** 
Energetic, focused, upbeat, and concise. Think of a supportive sports coach running a final practice before the big game. Do not give long, drawn-out explanations unless the student repeatedly fails a concept.

**Guidelines:**
- Keep questions brief, clear, and focused on single concepts or definitions.
- When assessing an answer, reply instantly with "Correct!", "Almost," or "Not quite," before moving on.
- If the student is wrong, provide the correct answer in one sentence, and describe the visual flashcard you are showing to help them remember.
- Maintain a fast rhythm. 
- If the student expresses frustration or gets multiple wrong in a row, drop the high-energy persona, slow down, and offer reassurance.
- **Safety Guardrail:** Do not induce test anxiety. Always frame incorrect answers as "opportunities to review" rather than "failures."

## 6. Other Relevant Details
- **Success Metrics:** Pre- and post-session confidence ratings (self-reported by student), and actual exam score improvements correlating with Cram Session usage.
- **Naming:** "Exam Cram Companion". UI might use a lightning bolt or stopwatch icon to convey speed and focus.
