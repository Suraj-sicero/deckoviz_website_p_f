# My Collections

**Status:** Deployed (UI Frontend)
**Location:** `/collections`
**Primary Roles:** Student, Teacher

## Overview
The "My Collections" feature acts as a universal media library and gallery for users. It is designed to be the central hub where students and teachers can organize, view, and share all the artworks, stories, and audio tracks they generate via the Creative Studio.

## Technical Implementation (Frontend)

### User Workflow
1. **Accessing the Hub:** The user (Student or Teacher) clicks "My Collections" in the primary sidebar navigation.
2. **Browsing:** The user sees a high-level grid of all their saved "folders" (collections), showing the title, description, and item count.
3. **Deep Dive:** The user clicks a specific collection card.
4. **Gallery Viewing:** A glassmorphic modal overlay slides into view, presenting a masonry grid of all individual artworks, text snippets, or audio tracks saved within that collection.
5. **Interaction:** The user can hover over any artwork in the grid to see its title and media type. They can click the "X" button or outside the modal to return to the main collections grid.

### Component Architecture
- **Page Route:** `src/pages/Collections.tsx`
- **Stylesheet:** `src/pages/Collections.module.css`
- **Navigation:** Integrated into the global `Sidebar.tsx` under the "My Collections" tab.

### Key UI Features

#### 1. Collections Grid
- **Responsive Layout:** CSS Grid (`auto-fill`) ensures cards scale dynamically.
- **Card Design:** Cards are built with Flexbox (column layout) allowing the container to stretch and push metadata (item counts, last updated) strictly to the bottom, regardless of how long the description text is.
- **Visuals:** Uses abstract gradient blocks and Lucide icons to represent the visual theme of the collection folder.

#### 2. Deep Detail View (Modal)
When a user clicks on a collection folder, a Framer Motion overlay slides in to reveal the contents:
- **Header:** Displays the collection name and description.
- **Masonry-style Gallery:** A CSS Grid layout (`grid-auto-rows`) showcasing the individual generated items (images, text snippets, audio tracks). 
- **Hover Effects:** Hovering over an item reveals a sleek bottom-up gradient overlay displaying the artwork's title and file type.

## Future Backend Requirements
- **Data Relationships:** A `Collection` entity needs a one-to-many relationship with an `Artwork/Media` entity.
- **Routing:** Consider changing the modal overlay to a dedicated dynamic route (e.g., `/collections/:id`) if collections grow very large and require direct deep-linking or sharing.
