# Deckoviz Master Notes & Context

## Documentation & Feature Development System
*   **Documentation Template**: Use the standard "Feature Idea -> Documentation Prompt" template to expand brief feature ideas into full specifications (User Story, Feature/Dev Notes, Build Notes, Implementation Notes, System Prompt, Other Details).
*   **Feature Naming**: Use `[CORE FEATURE]` for core features. Use `#FD[number]` (e.g., `#FD36`) for Feature IDs.
*   **Deciding What to Add**: Focus on adding features rapidly (aiming for one per day). Expand scope to specific verticals (like schools) but maintain mostly general-purpose features.
*   **Hardware Expansion**: Future scope includes hardware peripherals like a fragrance diffuser and sound-based experiences.

## Core APIs for Demo Testing (v1.2)
*   **User Profile**: Basic profile (deep profile comes later).
*   **Vizzy Generative Chat**: All VGC endpoints, new/old chats, all generated media, list of prompts/library.
*   **Create Collection**: Title, description, display duration per artwork, adding artworks.
*   **Current Collection**: The collection actively displayed on the frame.
*   **Collection Queue**: Up to 20 collections queued sequentially for the frame.
*   **Live Streaming**: Instantly add artwork to the frame display.
*   **Curations**:
    *   *Vizzy (Personal)*: Sent by team or Vizzy.
    *   *Deckoviz Global*: Daily curations for all users.
    *   *Deckoviz Music*: Curated music.
*   **User Library**:
    *   Upload API (images, music, video).
    *   See all generated media, uploaded media, favourite/starred collections and artworks.

## Memory Layer & System Cards
*   **Sources**: Onboarding, deep user profile (app, social, art), and distilled interactions from features over time.
*   **Distillation**: The memory layer is distilled monthly to stay within context windows.
*   **System Cards**: Distilled and modular. Agents (like a personal painter) only retrieve the sections of the system card relevant to their specific task rather than the entire document.

## Positioning & Web App
*   **Positioning**: "Vizzy is not merely an AI on your wall... It is the AI for your life, for your home, for your business — that happens to live on your wall."
*   **Web App Features**: Some features may be purely web-based (e.g., managing users, personas, frequent guests, household members, onboarding docs for enterprise).
