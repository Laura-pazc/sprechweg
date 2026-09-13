# UI/UX Prompt: Autumn Special Edition on Mission Tab

## Overview
Create a visually distinct "Autumn Special Edition" section on the Mission Tab that highlights the three C1-level seasonal missions. This section should:
- Feel premium and seasonal (autumn theme)
- Differentiate from regular missions
- Encourage exploration and completion
- Maintain visual consistency with existing design system
- Work seamlessly on mobile, tablet, and responsive layouts

---

## Visual Design Requirements

### Color Palette (Autumn Themed)
- **Primary accent:** Rich burnt orange / terracotta (#D97706 or #EA580C)
- **Secondary accent:** Deep gold / amber (#FBBF24)
- **Background gradient:** Warm gradient from light cream to soft rust (subtle)
- **Text:** Dark ink on autumn palette backgrounds
- **Borders:** Optional subtle leaf/nature patterns or solid warm borders

### Typography
- **Section title:** Bold, large (18-20px), warm color (burnt orange or gold)
- **Subtitle:** Medium, secondary text color (muted), 13-14px
- **Card titles:** Strong/semibold, 15-16px
- **Metadata:** Small, muted (13px) — level badge, duration

### Icons & Visual Elements
- **Section icon:** 🍂 (autumn leaf emoji) OR custom leaf/harvest illustration
- **Mission icons:** Keep existing icons (leaf, utensils, etc.)
- **Visual separator:** Optional divider line (warm accent color) above/below section
- **Visual cue:** Optional subtle autumn-themed background pattern or watermark (very subtle, 5-10% opacity)

---

## UI Layout Structure

### Option A: Featured Carousel (Recommended for Premium Feel)
```
┌─────────────────────────────────────────┐
│  🍂 AUTUMN SPECIAL EDITION              │
│  Seasonal missions for C1 learners      │
├─────────────────────────────────────────┤
│ ┌────────────────────────────────────┐  │
│ │  [FEATURED CARD - Card 1]          │◀─┤ Swipeable carousel
│ │  ┌──────────────────────────────┐  │  │
│ │  │  Mushroom Foraging           │  │  │
│ │  │  🍄                          │  │  │
│ │  │  Forage safely in German     │  │  │
│ │  │  forests...                  │  │  │
│ │  │                              │  │  │
│ │  │  Advanced • 30 min           │  │  │
│ │  │  [TAP TO START] ➜            │  │  │
│ │  └──────────────────────────────┘  │  │
│ └────────────────────────────────────┘  │
│  [●  ○  ○]  — Dot indicators            │
├─────────────────────────────────────────┤
│  OR SEE ALL AUTUMN MISSIONS ➜           │
└─────────────────────────────────────────┘
```

**Advantages:**
- Premium, engaging feel
- Encourages swiping/discovery
- One mission featured at a time
- Shows progress with dot indicators
- High visual impact

---

### Option B: Stacked Card Grid (Standard for Consistency)
```
┌─────────────────────────────────────────┐
│  🍂 AUTUMN SPECIAL EDITION              │
│  Seasonal missions for C1 learners      │
├─────────────────────────────────────────┤
│ ┌────────────────────────────────────┐  │
│ │  🍄 Mushroom Foraging              │  │
│ │  Forage safely & discuss with...   │  │
│ │  Advanced • 30 min • Started ✓     │  │
│ └────────────────────────────────────┘  │
│ ┌────────────────────────────────────┐  │
│ │  🍎 Apple Cider Culture            │  │
│ │  Discover local orchards & ...     │  │
│ │  Advanced • 30 min                 │  │
│ └────────────────────────────────────┘  │
│ ┌────────────────────────────────────┐  │
│ │  🌾 Farmers' Market Mastery        │  │
│ │  Navigate markets, negotiate...    │  │
│ │  Advanced • 30 min                 │  │
│ └────────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Advantages:**
- Clean, consistent with existing missions
- Easy to scan all three at once
- No interaction needed to see all
- Familiar pattern for existing users

---

### Option C: Hero Banner + Grid (Hybrid)
```
┌─────────────────────────────────────────┐
│  ┌─────────────────────────────────┐   │
│  │  🍂 AUTUMN SPECIAL EDITION      │   │
│  │  Three C1 missions, one theme   │   │
│  │  [EXPLORE ALL] ➜              │   │
│  └─────────────────────────────────┘   │
│  [Warm autumn gradient background]     │
├─────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐     │
│  │ 🍄 Mushroom  │ │ 🍎 Cider     │     │
│  │ Foraging     │ │ Culture      │     │
│  │ Adv • 30min  │ │ Adv • 30min  │     │
│  └──────────────┘ └──────────────┘     │
│  ┌──────────────┐                      │
│  │ 🌾 Market    │                      │
│  │ Mastery      │                      │
│  │ Adv • 30min  │                      │
│  └──────────────┘                      │
└─────────────────────────────────────────┘
```

**Advantages:**
- Premium banner draws attention
- Grid shows all three compactly
- Hybrid of visual impact + space efficiency

---

## Recommended Implementation: **Option A (Carousel)**

Provides:
- Premium, app-store-like experience
- Clear focus on one mission at a time
- Engaging swipe gesture
- Perfect for "featured" seasonal content
- Dot indicators show progress/count

---

## Component Specifications

### Autumn Section Header
```
Layout:
- Left side: 🍂 Icon (24-28px)
- Center: Title + Subtitle
- Optional right: Seasonal badge ("Sept-Nov")

Title: "🍂 Autumn Special Edition"
Subtitle: "Three C1 missions, one seasonal theme"
Background: Optional subtle warm gradient or solid warm background
Padding: 16px vertical, 20px horizontal
Border-radius: 12px
Shadow: Subtle (1-2px, low opacity)
```

### Autumn Mission Card (Carousel Item)
```
Card Layout:
┌──────────────────────────────┐
│ [Icon 32px]                  │
│ Title (18px, strong)         │
│ Tagline (14px, muted)        │
│                              │
│ Accent color bar             │
│                              │
│ Level • Duration             │
│ [TAP TO START / IN PROGRESS] │
└──────────────────────────────┘

Design Details:
- Background: Light cream/white with subtle autumn pattern or gradient
- Icon: Mission-specific (🍄, 🍎, 🌾) or SVG
- Accent bar: Mission's color (magenta, coral, sky)
- Progress indicator: If started, show completion % or check mark
- CTA button: Primary button, warm accent color
- Spacing: 16px padding, 12px gap between elements
- Border-radius: 16px
- Shadow: Medium (3-4px shadow, 12% opacity)
- Hover state: Slight scale up (1.02x) + shadow increase
```

### Carousel Controls
```
Dot Indicators:
- Count: 3 dots (one per mission)
- Active dot: Filled, warm accent color
- Inactive dots: Outline, light gray
- Position: Below carousel, center-aligned
- Spacing: 8px between dots

Swipe Gesture:
- Left/right swipe: Next/prev mission
- Snap-to-center: Auto-center after swipe
- Velocity-based: Flick to advance multiple missions
- Animation: Smooth spring animation (0.3-0.4s duration)
```

### Progress Indicators (Optional Enhancement)
If user has started a mission:
- Show green checkmark ✓
- Or progress ring (e.g., "2/3 sections complete")
- Encourage completion with "1 more step" hint

---

## Placement on Mission Tab

### Recommended Hierarchy
1. **Top:** Search bar + filter button (existing)
2. **Below:** Autumn Special Edition section (NEW) — carousel or hero
3. **Below:** Divider line (optional)
4. **Below:** "All Missions" section heading (existing)
5. **Below:** Regular missions grid/list (existing)

### Mobile Layout
```
For mobile (< 768px width):
- Autumn section takes full width
- Carousel cards: Full width, horizontal scroll
- Below: Divider
- Below: All Missions (existing, unchanged)

For tablet (768-1024px):
- Autumn section: Full width
- Carousel cards: Larger, still swipeable
- Below: All Missions in 2-column grid

For desktop (> 1024px):
- Autumn section: Full width or 80% centered
- Carousel cards: Larger, optional pause-on-hover
- Below: All Missions in 3-column grid
```

---

## Styling Guidelines

### Colors
- **Section background:** `rgba(217, 119, 6, 0.08)` (very light burnt orange)
- **Card background:** White with subtle autumn texture
- **Title text:** `#92400e` (dark brown)
- **Subtitle text:** `#b45309` (medium brown)
- **Accent bars:** 
  - Mushroom: `#d946ef` (magenta)
  - Cider: `#f97316` (coral)
  - Market: `#0ea5e9` (sky)
- **Button:** Warm accent color with dark text, rounded
- **Shadow:** `0 3px 8px rgba(0,0,0,0.12)`

### Typography
- **Section title:** 20px, font-strong, color: #92400e
- **Card title:** 18px, font-strong, color: #1f2937
- **Card tagline:** 14px, font-body, color: #6b7280
- **Metadata:** 13px, font-body, color: #9ca3af

### Spacing
- **Section padding:** 16px (vertical), 20px (horizontal)
- **Card padding:** 16px
- **Card gap (carousel):** 12px between slides
- **Element spacing:** 12px between title, tagline, stats

### Animations
- **Carousel transition:** 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Dot indicator fade:** 0.2s ease-in-out
- **Card hover:** Scale 1.02, shadow increase on desktop
- **Button press:** Scale 0.98, haptic feedback (mobile)

---

## Interactive Behavior

### Swipe/Navigation
```
- Swipe left: Next mission (cycle to first after last)
- Swipe right: Previous mission (cycle to last after first)
- Dot tap: Jump to that mission directly
- Smooth snap: Auto-center after swipe completes
- Auto-scroll: Optional auto-advance every 5-7 seconds (with pause on interaction)
```

### Tap Actions
```
- Card tap: Open mission detail/prep screen
- Button tap: Start mission (nav to missionPrep)
- Dot tap: Jump to that mission
- Share icon: Share mission badge (if exists)
```

### State Indicators
```
If not started:
- Button text: "START MISSION"
- Button color: Warm accent

If in progress:
- Badge: "In Progress" or completion % (e.g., "2/3")
- Button text: "CONTINUE" or "REVIEW"
- Button color: Slightly muted

If completed:
- Badge: "✓ Completed" 
- Confetti animation on completion
- Button text: "REVIEW" or "EXPLORE AGAIN"
- Button color: Success green
```

---

## Accessibility Requirements

### Semantic HTML
```
- Use semantic sections: <Section> wrapper
- Heading hierarchy: h2 for "Autumn Special Edition"
- Button roles: aria-label for icon buttons
- Alt text: All icons/images need descriptions
```

### Keyboard Navigation
```
- Tab through: Section header → Carousel cards → Buttons → Dots
- Carousel: Arrow keys (left/right) to navigate
- Enter/Space: Activate buttons, dot selection
- Focus indicators: Clear 2-3px outline (warm accent color)
```

### Screen Readers
```
- Section: "Autumn Special Edition: Three C1 missions, one seasonal theme"
- Card: "Mushroom Foraging mission. Advanced level, 30 minutes. Swipe or use arrow keys to navigate. Tap to start."
- Button: "Start Mushroom Foraging mission"
- Dots: "Mission 1 of 3. Current mission. Use arrow keys to navigate between missions."
```

### Color Contrast
- All text: WCAG AA minimum (4.5:1 for body text)
- Buttons: WCAG AA on accent background
- Icons: Sufficient contrast against background

---

## Optional Enhancements

### 1. Seasonal Visual Cues
- **Background pattern:** Subtle falling leaves (animated, very light)
- **Watermark:** Autumn harvest illustration (5% opacity, background layer)
- **Emoji variety:** Swap 🍂 for regional variations based on locale

### 2. Gamification
- **Progress ring:** Show completion % for each mission
- **Badge preview:** Show expected badge emoji before starting
- **Time estimate:** Highlight "30 minutes" with a small timer icon
- **Streak tracker:** "Complete all 3 for a bonus badge" (optional)

### 3. Social Features
- **Completion sharing:** "I mastered autumn! 🍂" with badge
- **User photos:** Show other learners' Autumn Edition completions
- **Progress comparison:** "500 people started today"

### 4. Navigation Tips
- **First-time hint:** "Swipe to explore autumn missions"
- **Animated hand gesture:** Subtle swipe indicator on first view
- **Tooltip on dots:** "Tap to jump to that mission"

### 5. Seasonal Messaging
- **Time-sensitive:** Show "Only available until Nov 30"
- **Limited slots:** "Join 200+ learners this autumn"
- **Exclusive feel:** "C1 Learners Only" badge

---

## Code Structure Recommendation

### React/TypeScript Component Hierarchy
```
<MissionsScreen>
  <SearchBar />
  <FiltersButton />
  
  <AutumnSpecialSection>  // NEW
    <SectionHeader 
      icon="🍂"
      title="Autumn Special Edition"
      subtitle="Seasonal missions for C1 learners"
    />
    
    <MissionCarousel>  // NEW - Option A
      <CarouselItem mission={autumnMissions[0]} />
      <CarouselItem mission={autumnMissions[1]} />
      <CarouselItem mission={autumnMissions[2]} />
      <DotIndicators count={3} current={activeIndex} />
    </MissionCarousel>
    
    // OR
    
    <MissionGrid>  // Option B/C
      {autumnMissions.map(mission => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </MissionGrid>
  </AutumnSpecialSection>
  
  <Divider />
  
  <AllMissionsSection>  // EXISTING
    <SectionHeader title="All Missions" />
    <SearchableMissionsList missions={nonAutumnMissions} />
  </AllMissionsSection>
</MissionsScreen>
```

### Styling Approach
```
// Use existing design tokens + autumn overrides
const autumnColors = {
  primary: '#d97706',      // Burnt orange
  secondary: '#fbbf24',    // Gold
  accent1: '#d946ef',      // Magenta (mushroom)
  accent2: '#f97316',      // Coral (cider)
  accent3: '#0ea5e9',      // Sky (market)
  background: 'rgba(217, 119, 6, 0.08)',
};

const autumnSpacing = {
  section: '16px vertical, 20px horizontal',
  cardGap: '12px',
  cardPadding: '16px',
};

// Apply via Tailwind or styled-components
className="bg-autumn-light border-2 border-autumn-primary rounded-16"
```

---

## Testing Checklist

- [ ] Carousel swipes smoothly on mobile/touch devices
- [ ] Dot indicators update correctly on swipe
- [ ] Cards display full content without overflow
- [ ] Button tap navigates to mission detail screen
- [ ] Progress state displays correctly (not started/in progress/completed)
- [ ] Autumn section appears above regular missions
- [ ] Section is visible on mobile (375px+), tablet (768px+), desktop
- [ ] All text is readable (color contrast checked)
- [ ] Keyboard navigation works (tab, arrow keys)
- [ ] Screen reader announces section and cards correctly
- [ ] Auto-scroll (if enabled) pauses on user interaction
- [ ] Responsive: Cards scale appropriately on all breakpoints
- [ ] Animation is smooth (60fps on mobile)
- [ ] Touch targets are at least 44x44px (accessibility)

---

## Summary

**Recommended Approach: Carousel with Hero Header**

```
🍂 AUTUMN SPECIAL EDITION
Seasonal missions for C1 learners

┌─────────────────────────────┐
│   🍄 Mushroom Foraging      │
│   Forage safely & discuss   │
│   Advanced • 30 min         │
│   [START MISSION] ➜        │
└─────────────────────────────┘
      [● ○ ○]
      
[SWIPE FOR MORE AUTUMN MISSIONS]
```

This creates a premium, engaging experience that:
✅ Draws attention to seasonal content
✅ Feels special and limited-time
✅ Encourages exploration
✅ Works great on mobile
✅ Maintains design consistency
✅ Accessible and keyboard-friendly
