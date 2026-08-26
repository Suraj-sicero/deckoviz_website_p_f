# Feature Specification: Field Trip Without Leaving the Room

## 1. User Story
**As a teacher or student,** I want to experience an immersive, narrated visual journey to a location tied to our curriculum (e.g., ancient Rome, the Amazon, the moon), **so that** the classroom frame acts as a window to the world, making abstract or distant subjects tangible and memorable.

## 2. Feature / Dev Notes
**Core Mechanics:**
- **Immersive Visuals:** Vizzy takes over the entire frame with high-fidelity, generated panoramic scenes of the requested location.
- **Narrated Tour:** Vizzy provides a dynamic, engaging narration, acting as an expert tour guide.
- **Interactive "Looking Around":** The user can ask Vizzy to "look left," "zoom in on that building," or "show me what's inside," causing the visual generator to seamlessly update the scene.
- **Curriculum Hooks:** Vizzy actively connects the sights on the tour back to recent lessons (e.g., pointing out the use of arches in Rome if the class studied engineering).

**UX Flow:**
1. **Setup:** The teacher says, "Vizzy, take us to the surface of Mars."
2. **Transition:** The frame dims, plays a "whoosh" spatial audio effect, and fades up into a stunning, wide-angle shot of the Martian landscape.
3. **The Tour:** Vizzy begins narrating: "Welcome to Jezero Crater. The red dust you see..." The visuals slowly pan.
4. **Interaction:** A student asks, "What's that shiny thing in the distance?" Vizzy pauses the tour, generates a zoomed-in image of the Perseverance rover, and explains what it is.
5. **Return:** When the session ends, Vizzy summarizes the trip and the frame transitions back to the standard classroom view.

**Edge Cases:**
- *Off-Script Requests:* If a student asks to go somewhere inappropriate or dangerous, Vizzy stays in character as a tour guide and explains why that area is "off-limits today," smoothly redirecting back to the lesson.
- *Visual Continuity:* Generating cohesive panoramas on the fly can result in hallucinations. If a user asks to turn around 180 degrees, the generated scene must logically match the environment.

## 3. Build Notes
- **Architecture Considerations:** This mode relies heavily on the `Live streaming` API for instant display and requires a specialized image generation pipeline tuned for wide-aspect, cinematic landscapes rather than standard 1:1 images.
- **Data Model:** We can store "Trip Itineraries" in the database, allowing teachers to pre-build a sequence of 5 specific scenes/prompts that Vizzy will navigate through, rather than relying purely on live generation.
- **Integration Points:** Crucial reliance on ambient, spatial audio to sell the illusion. If we are on Mars, we need wind sounds; in the Amazon, jungle sounds.

## 4. Implementation Notes
- **Rollout Strategy:** Launch with 3 heavily curated, pre-tested "Featured Trips" (e.g., Ancient Rome, The Solar System, Deep Ocean) before opening up the prompt to allow travel to *anywhere*.
- **Testing Considerations:** Image aspect ratio and resolution are critical here. The frame is the "window," so any low-res artifacts break the immersion completely.
- **Open Technical Questions:** Can we stitch generated images to create a true panning effect, or do we rely on cross-fading between distinct scenes? *Assumption: Cross-fading is technically safer and easier to execute in V1.2.*

## 5. System Prompt
**Role & Scope:** 
You are Vizzy, acting as an expert, immersive tour guide in "Field Trip" mode. Your goal is to make the user feel like they have actually traveled to the requested location.

**Tone:** 
Theatrical, descriptive, enthusiastic, and highly knowledgeable. You should speak like a charismatic documentary narrator combined with a friendly park ranger.

**Guidelines:**
- Use rich, sensory language to describe the environment (what it looks like, sounds like, feels like, smells like).
- Acknowledge the frame as a literal window. Use phrases like, "Look out the window to your left..." or "Right in front of us..."
- Always explicitly command the visual generator to produce stunning, cinematic, wide-angle shots of the current scene.
- Connect the sights to educational concepts appropriately.
- If asked a question about a detail in the environment, adapt your tour seamlessly to explore that detail.
- **Safety Guardrail:** Refuse requests to visit active war zones, scenes of recent tragedies, or any restricted NSFW environments.

## 6. Other Relevant Details
- **Success Metrics:** Number of locations visited per week, duration of the field trips, and qualitative feedback on immersion.
- **Hardware Hook:** If the Deckoviz frame has ambient lighting (LEDs on the back), this mode should aggressively sync the ambient light to the primary color of the generated scene (e.g., deep orange for Mars).
