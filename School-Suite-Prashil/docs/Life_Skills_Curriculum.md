# Life Skills Curriculum

**Status:** Deployed (UI Frontend)
**Location:** `/curriculum`
**Primary Roles:** Teacher, Admin

## Overview
The Life Skills Curriculum is a dedicated hub offering 50+ structured, multi-session generative courses covering topics that traditional curriculums miss (e.g., Emotional Intelligence, Design Thinking, Financial Literacy). 

The core philosophy is to provide **AI as a co-teacher**. Vizzy tracks student progress continuously across sessions and years, ensuring deep continuity. 

## Technical Implementation (Frontend)

### User Workflow
1. **Accessing the Hub:** The user (Teacher or Admin) clicks "Life Skills" in the primary sidebar navigation.
2. **Filtering:** The user clicks the track filters at the top (e.g., *Emotional Intelligence*) to narrow down the available course list.
3. **Browsing:** The user browses the grid of premium course cards to find a topic that fits their classroom needs.
4. **Configuration:** The user clicks a course card, opening the detail modal.
5. **Delivery Selection:** Inside the modal, the user reads the course overview and selects their preferred *Involvement Mode* (Vizzy-Led, Co-Designed, or Teacher-Led). 
6. **Execution:** The user reviews the Progress Snapshot panel to confirm Vizzy is tracking the correct class, and clicks "Start Session" to begin.

### Component Architecture
- **Page Route:** `src/pages/Curriculum.tsx`
- **Stylesheet:** `src/pages/Curriculum.module.css`
- **Navigation:** Integrated into the global `Sidebar.tsx` under the "Life Skills" tab (accessible only to `teacher` and `admin` roles).

### Key UI Features

#### 1. Public-Facing Course Selector (Grid)
- **Filters:** Interactive track filters (All, Emotional Intelligence, Creativity, etc.) stored in local React state (`activeTrack`).
- **Course Cards:** High-fidelity cards featuring vibrant gradient covers, Lucide icons, and metadata (Track, Grade Level, Session Count).

#### 2. Detail Modal & Involvement Mode Configurator
Clicking a course opens a Framer Motion-animated modal overlay. This modal contains:
- **Header:** Inherits the course's unique gradient color.
- **Involvement Grid:** An interactive selector updating the `involvementMode` state.
  - *Vizzy-Led:* Vizzy runs the session independently.
  - *Co-Designed:* Vizzy and the teacher plan/deliver together.
  - *Teacher-Led:* The teacher runs the session, using Vizzy for on-demand generation.
- **Progress Snapshot:** A dedicated sidebar panel confirming the currently selected class (e.g., "Year 9 Homeroom") and reassuring the teacher that Vizzy will handle state persistence.

## Future Backend Requirements
- **Database Schema:** Needs a `Courses` table (id, title, track, metadata) and a `CourseSessions` table.
- **State Persistence:** Requires an endpoint to save the `involvementMode` preference per class/course.
- **Context Engine:** Vizzy must be able to read/write to a `StudentContext` vector store to achieve the required continuity between sessions and across academic years.
