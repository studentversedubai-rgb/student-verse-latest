# StudentVerse Design System
> NOTE: This document is a read-only reference guide. Do NOT modify any source files based on this document alone.
> This was created to help another AI replicate the StudentVerse visual identity in the Merchant Dashboard repo.

---

## 1. Colors

### Base Backgrounds
- **Primary background:** `#080C1F` (deep navy-black — used on body, hero, sections)
- **Pure black fallback:** `#000000` (used on cards, navbar, overlays)
- **Section background variant:** `rgba(8, 12, 31, 0.92)` (navbar glass)

### Brand Accent Colors
| Name    | Hex       | Usage |
|---------|-----------|-------|
| Azure   | `#2962FF` | Primary interactive, links, CTA glow, scrollbar |
| Cyan    | `#00F0FF` | Secondary accent, feature icons, radar, glow |
| Violet  | `#7B2CBF` | Tertiary accent, gradient fills, team cards |
| Gold    | `#FFB800` | Rewards, highlights, chip slots |
| Orange  | `#FF9100` | Gradient partner to Gold |

### Gradient Patterns
- **Hero title:** `linear-gradient(315deg, #999, #fff)` — silver-to-white
- **CTA accent text:** `linear-gradient(135deg, #00f0ff 0%, #2962ff 50%, #7b2cbf 100%)`
- **Rainbow border (RainbowCard):** `linear-gradient(90deg, #8B5CF6, #EC4899, #FB923C, #3B82F6, #06B6D4, #FB923C, #8B5CF6)` — animated at 300% backgroundSize
- **Gradient text (azure-cyan):** `linear-gradient(90deg, #2962FF 0%, #00F0FF 100%)`
- **Gradient text (gold):** `linear-gradient(90deg, #FFB800 0%, #FF9100 100%)`
- **Background ambient glow (bottom-right):** `radial-gradient(circle, #2962FF 0%, transparent 70%)` at 25% opacity, 100px blur
- **Background ambient glow (top-left):** `radial-gradient(circle, #7B2CBF 0%, transparent 70%)` at 15% opacity, 100px blur

### Opacity Usage
- Body text: `rgba(255, 255, 255, 0.65–0.8)`
- Muted text / subtitles: `rgba(255, 255, 255, 0.4–0.6)`
- Card borders: `rgba(255, 255, 255, 0.08–0.15)`
- Card backgrounds: `rgba(255, 255, 255, 0.02–0.05)`
- Overlay on video: `rgba(0, 0, 0, 0.5)`

### Glow Effects
- Azure glow: `box-shadow: 0 0 20px rgba(41, 98, 255, 0.5)`
- Cyan glow: `box-shadow: 0 0 20px rgba(0, 240, 255, 0.5)`
- Gold glow: `box-shadow: 0 0 20px rgba(255, 184, 0, 0.5)`
- Ambient page glow: fixed-position radial gradients behind content, blurred 100px

---

## 2. Typography

### Font Family
- **Primary font:** `"Geist"` (loaded as Outfit TTF — Regular, SemiBold, Bold)
- **Fallback stack:** `Helvetica, Arial, sans-serif`
- **Monospace (waitlist/badges):** `IBM Plex Mono` (referenced in design tokens)

### Font Weights
| Weight | Usage |
|--------|-------|
| 400    | Body text, paragraphs, descriptions |
| 600    | Buttons, nav links, subheadings, labels |
| 700    | Section headings, card titles |
| 900    | Hero headline (ultra-bold display) |

### Font Sizes
| Element | Size |
|---------|------|
| Hero H1 | `clamp(2.8rem, 7vw, 6.5rem)` |
| Section H1 | `clamp(3rem, 8vw, 5rem)` |
| Section H2 | `clamp(2.5rem, 5vw, 3.5rem)` |
| Card title | `1.1–1.5rem` |
| Body / paragraph | `clamp(1rem, 2vw, 1.2rem)` |
| Subtitle / muted | `1.1rem` |
| Small label / kicker | `0.75rem` |
| Badge / tag | `0.7rem` |
| Button text | `0.85rem–1.2rem` |

### Letter Spacing
- Headings: `-0.02em` to `-0.04em` (tight, modern)
- Body: `-0.01em`
- Uppercase labels / kickers: `0.15em–2.5px` (wide tracking)
- Buttons: `0.5px`

### Text Hierarchy Rules
- H1 headings use gradient fills (silver-to-white or brand gradient)
- Subtitles are `rgba(255,255,255,0.6–0.8)` — never pure white
- Kicker labels are uppercase, small, widely tracked, very muted (`rgba(255,255,255,0.4)`)
- Accent words inside headings use inline gradient spans

---

## 3. Layout System

### Page Structure
```
[Navbar — fixed, full width]
[Hero — full viewport height, 2-column grid]
[Features / How it Works — centered, padded section]
[Trustbar — logo loop, overflow hidden]
[CTA — 2-column, left text + right visual]
[Footer — flex row, brand + links]
```

### Container Widths
- Standard container: `max-width: 1200px`, centered, `margin: 0 auto`
- Wide container: `max-width: 1400px` (hero)
- Trustbar inner: `min(1280px, 96vw)`
- Team/FAQ: `max-width: 900px–1100px`
- Padding: `clamp(20px, 5vw, 80px)` horizontal

### Section Spacing
- Section padding: `60px–120px` top/bottom
- Between sections: `0` margin (sections butt up against each other)
- Inner content gap: `clamp(1.5rem, 4vw, 2.5rem)`

### Grid System
- Hero: `grid-template-columns: 1fr 1fr`, gap `clamp(2rem, 5vw, 5rem)`
- Features: flex row, `auto-fit minmax`
- Footer: flex row, `justify-content: space-between`
- Cards: `repeat(auto-fit, minmax(220px–260px, 1fr))`

---

## 4. Components

### Buttons

#### Primary CTA Button (`.join-waitlist-button` / gradient)
- Background: `linear-gradient(90deg, #2962FF, #FFB800, #7B2CBF)` animated
- Color: `#ffffff`
- Font: 700 weight, uppercase, `letter-spacing: 0.5px`
- Padding: `0.65rem 1.5rem` (navbar) / `1rem 2.5rem` (hero/CTA)
- Border radius: `50px` (pill)
- Hover: `translateY(-1px)`, glow `box-shadow: 0 4px 15px rgba(41,98,255,0.3)`

#### Store Buttons (App Store / Google Play)
- Style: transparent background, colored border matching brand color
- Border: `1px solid [color]`
- Border radius: `25px`
- Hover: fills background with brand color via `box-shadow: inset 0 0 0 10em [color]`
- Text color transitions from brand color to white on hover
- Duration: `0.3s 0.1s ease-out`

#### Coming Soon / Disabled Button
- Background: `#333333` or `rgba(255,255,255,0.05)`
- Color: `#888888` or `rgba(255,255,255,0.6)`
- Border: `1px solid #444444` or `rgba(255,255,255,0.1)`
- `cursor: not-allowed` or `cursor: default`
- `pointer-events: none`

#### Social Buttons (Footer)
- Transparent background, brand-colored border + text
- Pill shape `border-radius: 25px`
- Hover: inset fill animation (same as store buttons)

### Cards

#### RainbowCard (Pricing / Featured)
- Outer wrapper: `rounded-3xl`, `overflow: visible`
- Animated gradient border: 2px, `linear-gradient` cycling through purple → pink → orange → blue → cyan
- Animation: `backgroundPosition 0%→300%`, 4s linear infinite
- Soft glow layer: `blur-lg` behind the border
- Inner card: `bg-black`, `rounded-3xl`, `border-2 border-transparent`, `z-10`

#### FAQ Cards
- Background: `rgba(0, 0, 0, 0.95)`
- Backdrop filter: `blur(20px)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border radius: `16px`
- Padding: `1.5rem 2rem`
- Hover: scale `1.02`, background darkens slightly
- Open state: radial gradient glow at top from accent color at 15% opacity
- Question text animates color to accent color when open

#### Trustbar Logo Cards
- Background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06))`
- Border: `1px solid rgba(255,255,255,0.03)`
- Box shadow: `inset 0 10px 30px rgba(0,0,0,0.4)`
- Border radius: `14px`
- Fixed size: `220px × 100px`
- Logo filter: `grayscale(100%) brightness(220%)` (white-washed)

#### Bento Cards (`.sv-bento-card`)
- Background: `rgba(255, 255, 255, 0.03)`
- Backdrop filter: `blur(10px)`
- Border radius: `1.5rem`
- Padding: `2.5rem`
- Animated traveling light border via `::before` pseudo-element
- Light travels along border: `linear-gradient(90deg, transparent → #00F0FF → transparent)`
- Animation: 3s linear infinite

### Navbar
- Position: `fixed`, `top: 0`, `z-index: 1000`
- Background: `rgba(8, 12, 31, 0.92)` with `backdrop-filter: blur(20px)`
- Scrolled state: `rgba(8, 12, 31, 0.98)`, `blur(24px)`, `box-shadow: 0 8px 32px rgba(0,0,0,0.4)`
- Border bottom: `1px solid rgba(255,255,255,0.1)`
- Height: `110px` desktop
- Nav links: centered pill container with animated RGB gradient border
- Pill: `background: #000000`, `border-radius: 50px`, `padding: 0.5rem 1.5rem`
- Link color: `rgba(255,255,255,0.8)`, active: `#ffffff` with text-shadow glow
- Mobile: slide-out drawer from right, `280px` wide, glass morphism

### Mobile Drawer
- Background: `rgba(8, 12, 31, 0.85)`, `backdrop-filter: blur(24px)`
- Border left: `1px solid rgba(255,255,255,0.15)`
- Border radius left side: `20px`
- Box shadow: `-20px 0 60px rgba(0,0,0,0.8)`
- Gradient left border accent: `linear-gradient(180deg, #00b8cc, #cc8800, #9a1f5a)`
- Animation: spring slide from right

### Status Badges (`.sv-status-*`)
- Shape: `border-radius: 6px`, `padding: 0.25rem 0.75rem`
- Font: monospace, `0.7rem`, uppercase, `letter-spacing: 1px`, weight 600
- Variants:
  - Loading: yellow `#fbbf24`, `rgba(251,191,36,0.2)` bg
  - Encrypted: red `#ef4444`, pulsing animation
  - Active: cyan `#00F0FF`
  - Success: green `#22c55e`

### Inputs & Forms
- Font: Geist, weight 400
- No custom input styles defined in main site (minimal form usage)
- Email inputs in waitlist: dark background, white text, border `rgba(255,255,255,0.2)`

### Footer
- Background: transparent (inherits page black)
- Ambient glow blobs: azure top-left, violet bottom-right, `filter: blur(80px)`, `opacity: 0.15`
- Layout: flex row, `justify-content: space-between`
- Border top of bottom bar: `1px solid rgba(255,255,255,0.1)`
- Link hover: color changes to brand accent + `translateX(5px)`
- Copyright: `rgba(255,255,255,0.4)`, `0.85rem`

---

## 5. Visual Style

### Overall Aesthetic
**Glassmorphic Dark Futurism** — premium, space-tech, student-forward.
Not flat. Not neumorphic. Layered depth through:
- Translucent glass panels over deep dark backgrounds
- Ambient radial glows (not harsh shadows)
- Animated gradient borders (traveling light, rainbow orbit)
- Subtle texture via cyber grid and wave patterns

### Border Radius Standards
| Element | Radius |
|---------|--------|
| Pill buttons | `50px` |
| Cards (large) | `24px–32px` (`rounded-3xl`) |
| Cards (medium) | `16px–20px` |
| Cards (small/badge) | `6px–12px` |
| Logo containers | `14px` |
| Mobile drawer | `20px` (left side only) |

### Shadow Intensity
- Cards: `0 8px 32px rgba(0,0,0,0.4)` — medium depth
- Navbar scrolled: `0 8px 32px rgba(0,0,0,0.4)`
- Trustbar: `0 20px 50px rgba(0,0,0,0.4)`
- Glow shadows: `0 0 20px [color]` — soft, colored
- No harsh drop shadows — always soft and diffused

### Blur Usage
- Navbar: `blur(20px–24px)`
- Glass cards: `blur(10px–20px)`
- Mobile drawer: `blur(24px)`
- Ambient background glows: `blur(80px–100px)`
- Overlay backdrop: `blur(12px)`

### Image Treatment
- Partner logos: `grayscale(100%) brightness(220%)` — white-washed
- Hero: full-bleed video background with `rgba(0,0,0,0.5)` overlay
- App mockup: bottom fade via `mask-image: linear-gradient(to bottom, black 45%, transparent 65%)`
- Orbit items: floating labels with colored icons around phone mockup

### Glow & Gradient Usage
- Headings: gradient text fills (silver, brand colors)
- Borders: animated gradient (rainbow, traveling light)
- Backgrounds: fixed radial ambient glows (azure + violet)
- Interactive elements: colored box-shadow glow on hover/active

---

## 6. Interactions & UX

### Hover Effects
- Buttons: `translateY(-1px)` + colored glow shadow
- Store buttons: inset fill animation (0.5s ease-out)
- Cards: `scale(1.02)` + background darkens
- Nav links: color brightens + subtle text-shadow glow
- Footer links: color change + `translateX(5px)`
- Logo cards: opacity/filter transition `0.18s ease`

### Transitions
- Standard: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- Spring animations (drawer): `stiffness: 300, damping: 30`
- Framer Motion entrance: `duration: 0.6–0.9s`, `ease: [0.25, 0.46, 0.45, 0.94]`
- Stagger children: `0.08–0.15s` between items
- FAQ expand: `0.4s [0.25, 0.46, 0.45, 0.94]`

### Scroll Behavior
- Smooth scroll: `scroll-behavior: smooth`
- Intersection Observer triggers: `threshold: 0.1`, `rootMargin: -50px` to `-100px`
- Animations fire once (`once: true`) — no repeat on scroll back
- Lenis smooth scroll library used for page-level smoothing

### Entrance Animations
- Fade + slide up: `opacity: 0, y: 20–30 → opacity: 1, y: 0`
- Fade + slide left: `opacity: 0, x: -40–50 → opacity: 1, x: 0`
- Fade + slide right: `opacity: 0, x: 40–100 → opacity: 1, x: 0`
- Scale in: `scale: 0.95 → scale: 1`
- Staggered grid: children appear sequentially with `staggerChildren`

### Focus States
- Outline: `2px solid #2962FF`, `outline-offset: 2px`

---

## 7. Spacing System

### Padding Scale
| Context | Value |
|---------|-------|
| Section vertical | `60px–120px` |
| Card inner | `1.5rem–2.5rem` |
| Button (small) | `0.65rem 1.5rem` |
| Button (large) | `1rem 2.5rem` |
| Nav pill | `0.5rem 1.5rem` |
| Footer | `80px 20px 40px` |
| Container horizontal | `clamp(20px, 5vw, 80px)` |

### Gap Scale
| Context | Value |
|---------|-------|
| Hero grid | `clamp(2rem, 5vw, 5rem)` |
| Card grid | `20px–32px` |
| Nav links | `1.5rem–2.5rem` |
| Footer columns | `80px` |
| Footer social | `16px` |
| FAQ items | `1.5rem` |

### Alignment Rules
- All section content: horizontally centered via `margin: 0 auto`
- Text in sections: `text-align: center`
- Hero text: `text-align: left` (two-column layout)
- Cards: `justify-items: center` in grid
- Footer: `justify-content: space-between` (brand left, links right)

---

## 8. Brand Feel

StudentVerse feels **premium, futuristic, and student-native**. It is:

- **Dark and immersive** — deep navy/black backgrounds create focus
- **Energetic but controlled** — animated gradients and glows add life without chaos
- **Trustworthy** — glassmorphism and clean typography signal professionalism
- **Youthful** — bold typography, vibrant accent colors, orbital animations
- **Tech-forward** — cyber grid textures, radar visuals, traveling light borders
- **Accessible** — high contrast text, clear hierarchy, readable sizes

---

## 9. Design Principles

1. **Always use `#080C1F` or `#000000` as the base background** — never white or light grey
2. **Use `#2962FF` (Azure) as the primary interactive color** — links, CTAs, focus rings, scrollbar
3. **Cards must never have harsh shadows** — use soft `rgba` glows and subtle borders instead
4. **All borders are semi-transparent white** — `rgba(255,255,255,0.08–0.15)`, never solid
5. **Gradient text is reserved for headings and key accent words** — not body text
6. **Buttons are always pill-shaped** — `border-radius: 50px` for primary actions
7. **Glassmorphism requires both `background: rgba(...)` AND `backdrop-filter: blur(...)`** — never one without the other
8. **Ambient glows are fixed-position, blurred 80–100px, opacity 0.15–0.25** — they set mood, not highlight elements
9. **Typography is always tight** — headings use negative letter-spacing (`-0.02em` to `-0.04em`)
10. **Animations use Framer Motion with easing `[0.25, 0.46, 0.45, 0.94]`** — never linear or abrupt
11. **Stagger all list/grid entrances** — `staggerChildren: 0.08–0.15s` for polished feel
12. **The rainbow gradient border is a signature pattern** — use it on featured/hero cards only
13. **Muted text is never pure grey** — always `rgba(255,255,255,0.4–0.7)` for warmth
14. **Section spacing is generous** — minimum `60px` vertical padding per section

---

## How to Apply This to Another Project

### Instructions for Another AI

You are being given this document to restyle an existing dashboard (StudentVerse Merchant Dashboard) to match the StudentVerse main website design. Follow these steps carefully:

#### Step 1 — Establish the Base
- Set `body` background to `#080C1F`
- Set `color` to `#ffffff`
- Import or replicate the Geist/Outfit font (Regular 400, SemiBold 600, Bold 700)
- Set `letter-spacing: -0.01em` globally on body
- Add `-webkit-font-smoothing: antialiased`

#### Step 2 — Apply the Color System
- Replace any light/white backgrounds with `#080C1F` or `#000000`
- Replace primary brand colors with `#2962FF` (Azure)
- Replace secondary accents with `#00F0FF` (Cyan) and `#7B2CBF` (Violet)
- Replace warning/highlight colors with `#FFB800` (Gold)
- Convert all solid borders to `rgba(255,255,255,0.1)`

#### Step 3 — Restyle Cards & Containers
- Apply `background: rgba(255,255,255,0.03)` to all cards
- Add `backdrop-filter: blur(10px–20px)` to all panels
- Add `border: 1px solid rgba(255,255,255,0.1)` to all cards
- Set `border-radius: 16px–24px` on cards
- Remove all harsh box-shadows — replace with `0 8px 32px rgba(0,0,0,0.4)`

#### Step 4 — Restyle the Navbar/Sidebar
- Apply `background: rgba(8,12,31,0.92)` with `backdrop-filter: blur(20px)`
- Add `border-bottom: 1px solid rgba(255,255,255,0.1)`
- Active nav items: `color: #ffffff`, inactive: `rgba(255,255,255,0.7)`
- Active indicator: `#2962FF` accent color

#### Step 5 — Restyle Buttons
- Primary buttons: gradient `linear-gradient(90deg, #2962FF, #7B2CBF)`, pill shape `border-radius: 50px`
- Secondary buttons: transparent bg, `border: 1px solid rgba(255,255,255,0.2)`, white text
- Hover: `translateY(-2px)` + colored glow shadow
- Disabled: `background: #333`, `color: #888`, `cursor: not-allowed`

#### Step 6 — Add Ambient Atmosphere
- Add two fixed radial glow blobs to the page background:
  - Bottom-right: `#2962FF`, `blur(100px)`, `opacity: 0.25`
  - Top-left: `#7B2CBF`, `blur(100px)`, `opacity: 0.15`
- These are `position: fixed`, `pointer-events: none`, `z-index: 0`

#### Step 7 — Apply Typography Scale
- Dashboard headings: `clamp(1.5rem, 3vw, 2.5rem)`, weight 700, gradient fill or white
- Section labels: `0.75rem`, uppercase, `letter-spacing: 0.15em`, `rgba(255,255,255,0.4)`
- Body text: `0.95rem–1rem`, weight 400, `rgba(255,255,255,0.7)`
- Metric numbers: `1.5rem–2rem`, weight 700, white or accent color

#### Step 8 — Add Motion
- Use Framer Motion (or CSS transitions) for all entrance animations
- Fade + slide up on scroll: `opacity: 0, y: 20 → opacity: 1, y: 0`, `duration: 0.6s`
- Stagger dashboard cards: `staggerChildren: 0.08s`
- All hover transitions: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

#### Step 9 — Do NOT Break
- Do not change any API calls, data fetching, or business logic
- Do not rename component files or restructure folders
- Do not remove existing className/id attributes used by JS
- Only add/modify CSS properties and visual wrapper elements
- Test each section after restyling before moving to the next

#### Step 10 — Validate Against These Rules
Before finishing, check:
- [ ] Background is dark (`#080C1F` or `#000000`)
- [ ] All text is readable (minimum `rgba(255,255,255,0.6)` for body)
- [ ] No solid white borders anywhere
- [ ] All interactive elements have hover states
- [ ] Cards have glass effect (bg + blur + border)
- [ ] Primary buttons are pill-shaped with gradient
- [ ] Fonts are tight (negative letter-spacing on headings)
- [ ] Ambient glow blobs are present on the page
