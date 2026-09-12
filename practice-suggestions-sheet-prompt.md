# UI/UX Prompt: Practice Suggestions Sheet

## Overview
Create a full-screen bottom sheet modal that appears after learners complete the **vocabulary learning step** in a mission. The sheet presents **2-3 curated real-world practice suggestions** (places in Hamburg, actions to take) that directly connect to the vocabulary they just learned. For location-relevant suggestions, integrate an interactive map with a marker for the practice location.

---

## Context & Goals

### What Triggers the Sheet
- **When:** After learner completes vocab study in the mission prep flow
- **Where:** On the mission prep screen (after stepping through vocab → conversation → practice)
- **Goal:** Give learners a concrete next action — not "keep studying," but "go here, practice these words"

### Design Philosophy
- **Real-world connection:** Suggestions are actual Hamburg locations, not generic advice
- **Action-oriented:** Each suggestion has concrete steps ("Ask for coffee at...") 
- **Vocabulary integration:** Tips reference the words they just learned
- **Optional exploration:** Learners can tap to see maps; the sheet works fine without interaction

### Existing Infrastructure (Validated)
✅ **MapView component:** Fully featured (markers, user location, regions, zoom)
✅ **Mission data structure:** `where` field + `realLifeSteps` + vocab metadata
✅ **Design system:** Established palette (ink, cream, canvas, coral, magenta, sky)
✅ **Existing components:** ChunkyCard, ChunkyButton, ChunkyChip for styling patterns

---

## Visual Design Requirements

### Color Palette
Use the app's established palette:
- **Primary accent:** Coral (`#F4512B`) for action buttons + highlights
- **Secondary accent:** Magenta (`#E44B7C`) or Sky (`#C8E5FA`) for suggestion highlights
- **Background:** Canvas (`#F2F0E9`) for card backgrounds
- **Text:** Ink (`#10141A`) for body text, Muted (`#5E6B78`) for metadata
- **Paper:** White (`#FFFFFF`) for sheet background

### Typography
- **Sheet title:** Bold, 20px, Ink color
- **Subtitle:** Medium, 14px, Muted color
- **Suggestion title:** Semibold, 16px, Ink color
- **Suggestion description:** Regular, 14px, Muted color
- **Tip text:** Regular, 13px, Ink color
- **Difficulty badge:** Small, 12px, bold

### Icons & Visual Elements
- **Location icon:** MapPin (lucide-react-native, 16-18px)
- **Difficulty badge:** Visual indicator (A1/intermediate/advanced)
- **Suggestion icon/emoji:** Optional mission-specific icon
- **Map icon (for location suggestions):** "View on map" CTA button

---

## Component Specifications

### 1. Sheet Header
```
Layout:
┌────────────────────────────────────┐
│  × (close button, top-right)      │
│                                    │
│  Ready to practice?               │
│  Here are 3 places in Hamburg     │
│  where you can use these words    │
│                                    │
│  [2-3 seconds of scroll content]  │
└────────────────────────────────────┘

Design Details:
- Header padding: 16px (top), 20px (sides)
- Close button: 30x30, Ink color, top-right corner
- Title: 20px, bold, Ink
- Subtitle: 14px, medium, Muted
- Background: White
- Optional subtle divider line below header
```

### 2. Suggestion Card (Scrollable List Item)
```
Layout:
┌──────────────────────────────────────┐
│  📍 Café Steintor (or emoji/icon)  │
│  German coffee culture               │
│                                      │
│  Practice: ordering coffee, small    │
│  talk about the weather             │
│                                      │
│  Tips:                               │
│  • "Einen Espresso, bitte."        │
│  • "Wie geht es dir heute?"        │
│                                      │
│  Beginner • 5 min walk              │
│  [TAP TO SHOW ON MAP] ➜            │
└──────────────────────────────────────┘

Design Details:
- Background: Canvas (#F2F0E9) or white
- Padding: 16px
- Border-radius: 12px
- Shadow: Subtle (2px shadow, 8% opacity)
- Spacing between elements: 10-12px

Card Structure:
1. Header row:
   - Location icon (MapPin, 16px, Coral)
   - Place name (16px, bold, Ink)
   - Optional: Difficulty badge (A1/B1, background-muted, Ink)

2. Category/subtitle:
   - Small text, 13px, Muted
   - Example: "German coffee culture" or mission category

3. Description section:
   - Label: "Practice:" (12px, semibold, Muted)
   - Vocab hints: 2-3 words/phrases (14px, Ink)
   - Example: "ordering coffee, small talk"

4. Tips section:
   - Label: "Tips:" (12px, semibold, Muted)
   - 2 bullet points (13px, Ink)
   - Formatted as: "• Try saying: Einen Espresso, bitte."

5. Metadata row:
   - Left: Difficulty badge (A1 | Intermediate | Advanced, 11px, muted background)
   - Right: Distance/time hint (13px, Muted) — optional

6. CTA Button (if location-relevant):
   - Text: "View on map →" or map icon
   - Size: Full width or right-aligned button
   - Color: Coral background, white text
   - Padding: 10px horizontal, 8px vertical
   - Border-radius: 8px
```

### 3. Bottom Sheet Container
```
Behavior:
- Appears as full-screen bottom sheet
- Covers ~75-90% of screen height on mobile
- Non-dismissible on scroll (sticky header)
- Close button (×) top-right always visible
- Swipe to dismiss (optional, mobile UX)

Layout Structure:
┌─────────────────────────────────────┐
│ × Ready to practice?                │
│   Here are 3 places in Hamburg     │
├─────────────────────────────────────┤
│ [SCROLLABLE AREA]                   │
│                                     │
│ Suggestion Card 1                   │
│ ┌────────────────────────────────┐  │
│ │ 📍 Café Steintor               │  │
│ │ Practice: ordering, small talk │  │
│ │ [View on map →]                │  │
│ └────────────────────────────────┘  │
│                                     │
│ Suggestion Card 2                   │
│ ┌────────────────────────────────┐  │
│ │ 📍 REWE Supermarket             │  │
│ │ Practice: shopping, prices      │  │
│ │ [View on map →]                │  │
│ └────────────────────────────────┘  │
│                                     │
│ Suggestion Card 3                   │
│ ┌────────────────────────────────┐  │
│ │ 📞 Order by phone (no map)     │  │
│ │ Practice: phone etiquette       │  │
│ │ [How to call →]                │  │
│ └────────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ [GO BACK TO PREP] [START MISSION]  │
└─────────────────────────────────────┘

Sheet Padding:
- Horizontal: 16px (mobile) / 20px (tablet)
- Vertical: 16px between sections
- Card gap: 12px between suggestion cards
```

### 4. Map Modal (Triggered by "View on Map")
When user taps "View on map" on a location-relevant suggestion:

```
Layout:
┌────────────────────────────────┐
│ ← [BACK] Café Steintor       │
├────────────────────────────────┤
│                                │
│         [INTERACTIVE MAP]      │
│                                │
│     Marker: Suggested place    │
│     Optional: User location    │
│     Optional: Walking route    │
│                                │
├────────────────────────────────┤
│ 📍 Café Steintor               │
│ Jungfernstieg 12, Hamburg     │
│                                │
│ Practice tips:                 │
│ • Order coffee in German       │
│ • Ask about the WiFi          │
│                                │
│ Distance: ~400m walk          │
│ [CLOSE] [OPEN IN MAPS APP]   │
└────────────────────────────────┘

Map Details:
- Initial region: Centered on suggestion location
- Marker: Single marker for suggested place
  - Color: Coral (#F4512B)
  - Title: Place name
  - Description: "Practice suggestion"
- User location: Optional, only if permitted
  - Show blue dot at current location
  - Draw walking route (optional, light blue polyline)
- Zoom level: 14-16 (street level, can see neighborhood)
- Controls: Standard zoom +/- buttons, "center on user" button

Info Card (below map):
- Place name (16px, bold)
- Address (13px, muted)
- Practice tips (2 bullets, 13px)
- Distance/time (13px, muted) — e.g., "~400m walk"
- Actions: [OPEN IN MAPS] or [BACK]
```

---

## Layout Options

### Option A: Full Scrollable List (Recommended for 2-3 Cards)
```
Sheet appears covering 75% of screen:

Ready to practice?
Here are 3 places in Hamburg...

[Scrollable cards]
┌─────────────────────┐
│ 📍 Café Steintor    │
│ Practice: ordering  │
│ [View on map →]     │
└─────────────────────┘

┌─────────────────────┐
│ 📍 REWE Market      │
│ Practice: shopping  │
│ [View on map →]     │
└─────────────────────┘

┌─────────────────────┐
│ 📍 U-Bahn Stop      │
│ Practice: asking    │
│ [View on map →]     │
└─────────────────────┘

[Footer buttons]
[BACK] [START MISSION]

Benefits:
✅ Clean, simple
✅ All suggestions visible with scroll
✅ Works on all screen sizes
✅ Consistent with mission cards
```

### Option B: Tab/Segmented View (If Mixed Location & Non-Location)
For future when you have both types:
```
Ready to practice?

[PLACES NEARBY] [ONLINE PRACTICE]

Places Nearby tab:
┌────────────┐
│ Café       │
│ Market     │
│ Park       │
└────────────┘

Online tab:
┌────────────┐
│ Phone call │
│ Video chat │
│ Reading    │
└────────────┘

Benefits:
✅ Separates location vs. non-location
✅ Scalable for future expansion
❌ More complex interaction
```

**Recommendation: Option A** — Simple, scrollable list. Clean, discoverable.

---

## Styling Guidelines

### Colors
- **Card background:** Canvas (`#F2F0E9`) or white
- **Card border:** Optional 1px Muted/Canvas border
- **Header background:** White
- **Button (CTA):** Coral background (`#F4512B`), white text
- **Icon colors:** Coral for map icons, Muted for metadata
- **Shadow:** `0 2px 8px rgba(0,0,0,0.08)` (subtle)

### Spacing (in rem / px equivalents)
- **Sheet padding:** 16px horizontal, 16px vertical
- **Card padding:** 16px
- **Element spacing:** 10-12px between text elements
- **Button padding:** 10px horizontal, 8px vertical
- **Icon size:** 16-18px (consistent with lucide defaults)

### Animations
- **Sheet slide-up:** 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Card appear:** Staggered fade-in (50-100ms per card)
- **Button press:** Scale 0.96, haptic feedback (mobile)
- **Map load:** Subtle fade-in for map overlay

### Responsive Breakpoints
```
Mobile (< 768px):
- Sheet height: 75-80vh
- Card width: Full width - 32px padding
- Font sizes: As specified above
- Button: Full width

Tablet (768px - 1024px):
- Sheet height: 80vh
- Card width: Full width (max-width: 500px, centered)
- Font sizes: Slightly larger (+1-2px)
- Button: Full width or 50% if multiple

Desktop (> 1024px):
- Sheet width: 600px max-width
- Sheet centered on screen
- Cards: Full width within sheet
- Same font sizes as tablet
```

---

## Interactive Behavior

### Sheet Lifecycle
1. **Appears:** After user completes vocab step in prep flow
2. **Display:** Shows 2-3 suggestions (auto-selected based on mission)
3. **Interaction:**
   - User can scroll through suggestions
   - User can tap "View on map" for location-based ones
   - User can close sheet with × button or [BACK]
4. **Next action:** User taps [START MISSION] to begin the real errand

### Button Actions
```
[BACK] button:
- Closes sheet, returns to prep screen
- Stays on current prep step (vocab)
- Optional: Save state to show this sheet again next time

[START MISSION] button:
- Marks mission as "in_progress"
- Navigates to mission do screen
- Opens full mission instructions

[View on map] (per card):
- Opens map modal for that specific place
- Shows marker + map controls
- Distance/address info below

[OPEN IN MAPS APP] (on map modal):
- Opens native Maps app (or Google Maps web)
- Pre-fills the place name
- User can get turn-by-turn directions

× (close button):
- Closes sheet
- Returns to prep screen
- Does not advance mission
```

### Focus & Keyboard Navigation
```
Tab order (Desktop):
1. × (close button)
2. Card 1 → "View on map" button
3. Card 2 → "View on map" button
4. Card 3 → "View on map" button
5. [BACK] button
6. [START MISSION] button

Arrow keys:
- Down/Up: Scroll card list

Enter/Space:
- Activate focused button
```

---

## Accessibility Requirements

### Semantic Structure
```
<BottomSheet role="dialog" aria-label="Practice suggestions">
  <Header>
    <CloseButton aria-label="Close practice suggestions" />
    <Title>Ready to practice?</Title>
    <Subtitle>Here are 3 places in Hamburg...</Subtitle>
  </Header>

  <ScrollableContent>
    <SuggestionCard>
      <Header role="heading" aria-level="3">
        Café Steintor
      </Header>
      <Description>Practice: ordering coffee, small talk</Description>
      <Button aria-label="View Café Steintor on map">
        View on map
      </Button>
    </SuggestionCard>
    ...
  </ScrollableContent>

  <Footer>
    <Button aria-label="Back to mission prep">Back</Button>
    <Button aria-label="Start mission">Start Mission</Button>
  </Footer>
</BottomSheet>
```

### Screen Reader Announcements
```
Sheet appears:
"Practice suggestions dialog. Ready to practice? Here are 3 places in Hamburg where you can use these words. Café Steintor. Practice: ordering coffee, small talk. Button: View on map."

Card navigation:
"1 of 3. Café Steintor. Beginner level. Practice: ordering coffee, small talk. Button: View on map. Use up/down arrows to navigate suggestions."

Button focus:
"Start Mission button. Activates full mission instructions."
```

### Color Contrast
- **Text on canvas:** 4.5:1+ (WCAG AA)
- **Text on coral button:** 4.5:1+ (WCAG AA)
- **Icon + background:** 3:1+ (WCAG AA)
- **Muted text:** 3:1+ minimum (for secondary info)

### Touch Targets
- **All buttons/tappable areas:** Minimum 44x44px (iOS accessibility standard)
- **Cards:** Entire card tappable (or explicit button within)
- **Close button:** 30x30px (comfortable for all users)

### Mobile Accessibility
- **Swipe to dismiss:** Card-based swipe gesture to close sheet (optional)
- **Haptic feedback:** Button press triggers light haptic
- **Text sizing:** Respects system font size settings
- **Dark mode:** Sheet adapts to system preference (if implemented)

---

## Suggested Data Structure

### PracticeSuggestion Type (in lib/types.ts)
```typescript
export interface PracticeSuggestion {
  id: string;
  title: string;              // "Café Steintor"
  category: string;           // "German coffee culture"
  vocabConnection: string[]; // ["coffee", "please", "small talk"]
  description: string;        // "Practice: ordering coffee..."
  tips: string[];             // ["Einen Espresso, bitte", "Wie geht es dir?"]
  difficulty: Level;          // A1 | intermediate | advanced
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    walkingDistanceMeters?: number;
  };
}
```

### Where Suggestions Come From
- **Initial:** Hardcoded in `lib/practiceSuggestions.ts`
- **Lookup:** Query by mission ID → get 2-3 suggestions
- **Display:** Auto-select top suggestions, sorted by:
  1. Location relevance (location-based > non-location)
  2. Vocabulary match (how many mission vocab words apply)
  3. Distance (closer suggestions first, if user permits location access)

---

## Testing Checklist

- [ ] Sheet slides up smoothly on mobile/tablet/desktop
- [ ] Sheet closes with × button
- [ ] Sheet scrolls if more than 2-3 cards
- [ ] "View on map" button opens map modal
- [ ] Map shows marker at correct Hamburg location
- [ ] Map shows user location (if permitted)
- [ ] Distance/address displays correctly on map
- [ ] "Back" button returns to prep screen without advancing
- [ ] "Start Mission" button navigates to mission do screen
- [ ] All text is readable (color contrast checked, WCAG AA)
- [ ] Sheet is responsive on mobile (375px), tablet (768px), desktop (1024px+)
- [ ] Keyboard navigation works (Tab, arrow keys, Enter)
- [ ] Screen reader announces title, suggestions, buttons
- [ ] Touch targets are at least 44x44px
- [ ] Animations are smooth (60fps)
- [ ] Close button is always visible (sticky header)
- [ ] Button press provides haptic feedback (mobile)
- [ ] Map modal closes correctly, returns to suggestions
- [ ] Sheet state persists across rotations (mobile)

---

## Code Structure Recommendation

### Component Hierarchy
```
<MissionPrepScreen>
  <StepPager currentStep="vocab" />
  
  {vocabStepComplete && (
    <PracticeSuggestionsSheet
      missionId={mission.id}
      suggestions={suggestions}  // 2-3 items
      onMapPress={(suggestion) => openMapModal(suggestion)}
      onStartMission={() => beginMission()}
      onClose={() => closeSuggestions()}
    >
      <SuggestionCard 
        suggestion={suggestions[0]}
        onMapPress={() => ...}
      />
      <SuggestionCard 
        suggestion={suggestions[1]}
        onMapPress={() => ...}
      />
      <SuggestionCard 
        suggestion={suggestions[2]}
        onMapPress={() => ...}
      />
      
      <MapModal 
        isOpen={mapModalOpen}
        suggestion={selectedSuggestion}
        onClose={() => closeMapModal()}
      />
    </PracticeSuggestionsSheet>
  )}
</MissionPrepScreen>
```

### File Organization
```
components/
  practice/
    PracticeSuggestionsSheet.tsx       (main modal container)
    SuggestionCard.tsx                (individual suggestion card)
    PracticeSuggestionMapModal.tsx    (map view)

lib/
  practiceSuggestions.ts  (data: suggestion lookup by mission)
  types.ts                (add PracticeSuggestion interface)

app/mission/[id]/
  prep.tsx               (integrate sheet trigger after vocab step)
```

---

## Summary

**Experience:**
- User completes vocab learning
- Sheet slides up with "Ready to practice?"
- Shows 2-3 real Hamburg places/actions to practice
- Each card has vocab hints + tips
- Tap "View on map" to see location
- Start the mission when ready

**Design Principles:**
✅ **Action-oriented** — concrete next steps, not more study
✅ **Vocabulary-integrated** — tips reference words just learned
✅ **Location-aware** — shows real Hamburg places when relevant
✅ **Accessible** — keyboard, screen reader, touch-friendly
✅ **Consistent** — matches existing design system + component patterns

**Key Technical Details:**
- Appears after vocab step (trigger: `toggleVocabStudied()`)
- Uses existing MapView component for locations
- Closes on ×, [BACK], or [START MISSION]
- Non-dismissible on scroll (sticky header)
- 2-3 suggestions per mission (scrollable list)
- Optional map modal for location-based suggestions

---

## Appendix: Mock Data Example

```typescript
// For "Find your way" mission (directions/U-Bahn vocab)
const suggestions: PracticeSuggestion[] = [
  {
    id: "fyw-cafe-steintor",
    title: "Café Steintor",
    category: "German coffee culture",
    vocabConnection: ["directions", "asking", "small talk"],
    description: "Practice asking for directions to the café, ordering, small talk",
    tips: [
      "Try saying: Wie komme ich zum Café Steintor?",
      "Ask: Gibt es einen Fensterplatz?",
    ],
    difficulty: "beginner",
    location: {
      latitude: 53.5511,
      longitude: 10.0046,
      address: "Jungfernstieg 12, 20354 Hamburg",
      walkingDistanceMeters: 400,
    },
  },
  {
    id: "fyw-ubahn-stop",
    title: "U-Bahn Jungfernstieg Stop",
    category: "Hamburg public transport",
    vocabConnection: ["directions", "transit", "questions"],
    description: "Practice asking strangers for directions to the U-Bahn",
    tips: [
      "Try saying: Entschuldigung, wie komme ich zur nächsten Haltestelle?",
      "Ask: Ist es weit?",
    ],
    difficulty: "beginner",
    location: {
      latitude: 53.5527,
      longitude: 10.0049,
      address: "Jungfernstieg / Möhlendamm, 20354 Hamburg",
      walkingDistanceMeters: 150,
    },
  },
  {
    id: "fyw-park",
    title: "Planten un Blomen Park",
    category: "Hamburg outdoor spaces",
    vocabConnection: ["directions", "locations", "small talk"],
    description: "Practice asking locals about the park, its features",
    tips: [
      "Try saying: Was gibt es hier zu sehen?",
      "Ask: Wann öffnet der Park?",
    ],
    difficulty: "beginner",
    location: {
      latitude: 53.5669,
      longitude: 9.9914,
      address: "Stephansplatz 4, 20354 Hamburg",
      walkingDistanceMeters: 1200,
    },
  },
];
```

