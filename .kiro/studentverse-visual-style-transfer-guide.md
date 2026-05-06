# StudentVerse Visual Style Transfer Guide
> NOTE: Read-only reference. Do NOT modify source files.
> Use this to replicate the StudentVerse visual identity in the Merchant Dashboard repo.

---

# StudentVerse Visual Style Transfer Guide
> NOTE: Read-only reference. Do NOT modify source files.
> Use this to replicate the StudentVerse visual identity in the Merchant Dashboard repo.

---

## 1. Exact Global Styles

### CSS Load Order (from `client/src/main.jsx`)
```js
import './styles/design-tokens.css'  // CSS variables, body bg, glass classes, glow classes, animations
import './styles/page.css'           // Webflow base reset + component classes
import './styles/about.css'          // About page Webflow export
import './styles/contact.css'        // Contact page Webflow export
import './styles/home.css'           // Font-face declarations + global typography
import './styles/navbar.css'         // Navbar glass, drawer, responsive utilities
import './styles/react-fixes.css'    // Waitlist card, FAQ accordion, float animation
import './styles/overrides.css'      // All visual overrides, CTA border, contact form
```
**Order matters.** `overrides.css` is last so it wins all specificity battles.

### body / html (from `design-tokens.css` + `home.css`)
```css
html, body {
  font-family: "Geist", Helvetica, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  background: #080C1F;
  color: #ffffff;
  margin: 0;
  min-height: 100vh;
  padding-top: 120px; /* accounts for fixed navbar height */
}

html {
  scroll-behavior: smooth;
}
```

### Default border color (from `design-tokens.css`)
```css
* {
  border-color: rgba(255, 255, 255, 0.1);
}
```

### Custom Scrollbar (from `design-tokens.css`)
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #080C1F; }
::-webkit-scrollbar-thumb { background: rgba(41, 98, 255, 0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(41, 98, 255, 0.5); }
```

### Font Import (from `home.css` â€” `@font-face` declarations)
```css
@font-face {
  font-family: "Geist";
  src: url("/fonts/OutfitRegular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Geist";
  src: url("/fonts/OutfitSemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Geist";
  src: url("/fonts/OutfitBold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```
**Font files live at:** `client/public/fonts/OutfitRegular.ttf`, `OutfitSemiBold.ttf`, `OutfitBold.ttf`
**Copy these 3 files into the merchant dashboard's public/fonts/ folder.**

### CSS Custom Properties / Design Tokens (from `design-tokens.css` `@theme inline`)
```css
--color-azure:  #2962FF;
--color-cyan:   #00F0FF;
--color-violet: #7B2CBF;
--color-gold:   #FFB800;
--color-orange: #FF9100;
```

---

## 2. Background System

### Primary Page Background
```css
/* Source: design-tokens.css */
body { background: #080C1F; }

/* Source: page.css (Webflow base) */
body { background: #000; }

/* The design-tokens.css wins â€” use #080C1F */
```
**Use `#080C1F` as the definitive page background.**

### Ambient Glow Blobs (from `design-tokens.css`)
These are `position: fixed` elements placed behind all content at `z-index: 0`.

```css
/* Azure glow â€” bottom-right corner */
.sv-gradient-glow {
  position: fixed;
  bottom: -20%;
  right: -10%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #2962FF 0%, transparent 70%);
  opacity: 0.25;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}

/* Violet glow â€” top-left corner */
.sv-gradient-glow-alt {
  position: fixed;
  top: -20%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #7B2CBF 0%, transparent 70%);
  opacity: 0.15;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}
```
**Add both of these as empty divs in the root layout of the dashboard.**

### Footer Glow Blobs (from `Footer.jsx` inline `<style>`)
```css
.footer-glow-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #2962ff 0%, transparent 70%);
  top: 0; left: -100px;
  filter: blur(80px); opacity: 0.15;
  position: absolute; border-radius: 50%; pointer-events: none;
}
.footer-glow-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, #7b2cbf 0%, transparent 70%);
  bottom: 0; right: -100px;
  filter: blur(80px); opacity: 0.15;
  position: absolute; border-radius: 50%; pointer-events: none;
}
```

### Cyber Grid Background (from `design-tokens.css`)
Used on the waitlist/dashboard pages for a tech feel:
```css
.sv-velocity-weave {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  perspective: 1000px; overflow: hidden;
  z-index: 0; pointer-events: none;
}
.sv-cyber-grid {
  position: absolute; width: 200%; height: 200%;
  background-image:
    linear-gradient(0deg, transparent 24%, rgba(41,98,255,0.1) 25%, rgba(41,98,255,0.1) 26%, transparent 27%,
      transparent 74%, rgba(41,98,255,0.1) 75%, rgba(41,98,255,0.1) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(41,98,255,0.1) 25%, rgba(41,98,255,0.1) 26%, transparent 27%,
      transparent 74%, rgba(41,98,255,0.1) 75%, rgba(41,98,255,0.1) 76%, transparent 77%, transparent);
  background-size: 80px 80px;
  transform: rotateX(60deg) translateZ(-200px);
  animation: sv-gridMove 20s linear infinite;
}
@keyframes sv-gridMove {
  0%   { transform: rotateX(60deg) translateZ(-200px) translateY(0); }
  100% { transform: rotateX(60deg) translateZ(-200px) translateY(80px); }
}
```

### Velocity Weave Texture (from `design-tokens.css`)
Subtle diagonal line pattern used as a section texture:
```css
.velocity-weave {
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300F0FF' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
```

### Wave Texture (from `design-tokens.css` `@layer utilities`)
```css
.wave-texture::before {
  content: "";
  position: absolute; top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: repeating-linear-gradient(45deg,
    transparent, transparent 10px,
    rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px);
  animation: wave-subtle 15s ease-in-out infinite;
  pointer-events: none;
}
@keyframes wave-subtle {
  0%,100% { transform: translateX(0) translateY(0); }
  25%      { transform: translateX(-2%) translateY(-1%); }
  50%      { transform: translateX(-4%) translateY(-2%); }
  75%      { transform: translateX(-2%) translateY(-1%); }
}
```

### Hero Video Background (from `Hero.jsx`)
```jsx
<video autoPlay muted loop playsInline style={{
  position: 'absolute', inset: 0,
  width: '100%', height: '100%',
  objectFit: 'cover', zIndex: 0,
  pointerEvents: 'none',
  transform: 'rotate(180deg)'
}}>
  <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
</video>
/* Dark overlay on top of video: */
<div style={{
  position: 'absolute', inset: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1, pointerEvents: 'none'
}} />
```

### Waitlist Page Background (from `react-fixes.css`)
```css
.sv-wl {
  background: radial-gradient(900px 360px at 50% 0%, rgba(123,70,255,.25), transparent 60%), #080C1F;
}
.sv-wl::before {
  content: "";
  position: absolute; inset: -200px;
  background:
    radial-gradient(circle at 20% 30%, rgba(0,240,255,.12), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(123,70,255,.18), transparent 50%),
    radial-gradient(circle at 50% 90%, rgba(255,184,0,.10), transparent 55%);
  filter: blur(30px);
  pointer-events: none;
}
```

### Z-Index Layering System
```
z-index: 0     â€” ambient glow blobs, cyber grid (fixed, behind everything)
z-index: 1     â€” section content, video overlays
z-index: 3     â€” hero content
z-index: 5     â€” sections (position: relative)
z-index: 10    â€” hero text, card content
z-index: 1000  â€” navbar (.navbar.w-nav)
z-index: 1009  â€” mobile drawer overlay
z-index: 1010  â€” mobile drawer panel
z-index: 9999  â€” mobile navbar on small screens
z-index: 10000 â€” logo in mobile nav
z-index: 10001 â€” hamburger button
```

---

## 3. Typography System

### Font Stack
```css
font-family: "Geist", Helvetica, Arial, sans-serif;
```
"Geist" is loaded as Outfit TTF files (see Section 1).

### Global Typography Rules (from `home.css`)
```css
html, body {
  font-weight: 400;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Geist", Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
}

p, span, a, li, button, input, textarea {
  font-family: "Geist", Helvetica, Arial, sans-serif;
  font-weight: 400;
}

button, .btn, a.button {
  font-weight: 600;
  letter-spacing: -0.01em;
}
```

### Heading Sizes (from component inline styles)
```css
/* Hero H1 */
font-size: clamp(2.8rem, 7vw, 6.5rem);
font-weight: 900;
line-height: 0.92;
letter-spacing: -0.04em;

/* Section H1 (FAQ, Contributors, Meet the Team) */
font-size: clamp(3rem, 8vw, 5rem);
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.02em (via gradient-title class: -0.03em)

/* Section H2 */
font-size: clamp(2.5rem, 5vw, 3.5rem);
font-weight: 700;

/* Card title / feature heading */
font-size: 1.1rem â€“ 1.5rem;
font-weight: 600â€“700;

/* Body paragraph */
font-size: clamp(1rem, 2vw, 1.2rem);
font-weight: 400;
line-height: 1.6â€“1.7;
color: rgba(255,255,255,0.65);

/* Subtitle / muted text */
font-size: 1.1rem;
color: rgba(255,255,255,0.6â€“0.8);

/* Kicker / label (uppercase small) */
font-size: 0.75rem â€“ 12px;
font-weight: 600;
letter-spacing: 0.15em â€“ 2.5px;
text-transform: uppercase;
color: rgba(255,255,255,0.4â€“0.6);

/* Button text */
font-size: 0.85rem (navbar) / 1rem (mobile) / 1.2rem (hero/CTA);
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.5px;
```

### Gradient Text Styles (from `design-tokens.css` + component inline styles)
```css
/* Azure-to-Cyan gradient text */
.gradient-text {
  background: linear-gradient(90deg, #2962FF 0%, #00F0FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gold-to-Orange gradient text */
.gradient-text-gold {
  background: linear-gradient(90deg, #FFB800 0%, #FF9100 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Silver-to-White (hero/section headings) â€” inline style */
background: linear-gradient(315deg, #999, #fff);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* CTA accent span */
background: linear-gradient(135deg, #00f0ff 0%, #2962ff 50%, #7b2cbf 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* Hero tagline inline spans */
color: #007AFF  /* "Verify." */
color: #ff9800  /* "Discover." */
color: #7b2cbf  /* "Redeem." */
```

### Gradient Title Class (from `home.css` + `overrides.css`)
```css
.gradient-title {
  font-family: "Geist", Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-align: center !important;
  margin: 0 auto !important;
  position: relative !important;
  z-index: 10 !important;
}
```


---

## 4. Layout Rules

### Container Widths
```css
/* Standard section container */
.container {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding-left: clamp(20px, 5vw, 80px);
  padding-right: clamp(20px, 5vw, 80px);
  position: relative;
  z-index: 1;
}

/* Hero */
max-width: 1400px; margin: 0 auto;

/* Features / CTA / FAQ */
max-width: 1200px; margin: 0 auto;

/* Team / Contributors */
max-width: 900px â€“ 1100px; margin: 0 auto;

/* Trustbar inner */
width: min(1280px, 96vw); margin: 0 auto;

/* Webflow .w-container */
max-width: 940px; margin-left: auto; margin-right: auto;
```

### Section Padding
```css
/* Standard section */
padding: 60px 20px;

/* Hero */
padding: clamp(0rem, 5vh, 4rem) clamp(1.5rem, 5vw, 4rem) 10rem;
min-height: 89vh;

/* Contributors / TeamSection */
padding: 100px 20px;
min-height: 80vh;

/* Footer */
padding: 80px 20px 40px;

/* Trustbar */
padding: 60px 0;

/* Navbar body offset */
body { padding-top: 120px; }
/* Mobile: padding-top: 80px */
```

### Grid / Flex Rules
```css
/* Hero â€” 2 column */
display: grid;
grid-template-columns: 1fr 1fr;
gap: clamp(2rem, 5vw, 5rem);
align-items: center;

/* Features â€” flex row */
display: flex;
gap: clamp(1.5rem, 4vw, 2.5rem);

/* Footer â€” flex row */
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: 60px;

/* Footer links grid */
display: flex;
gap: 80px;

/* Card grids */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
gap: 20px;

/* Pricing cards */
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 32px;
max-width: 800px;
margin: 0 auto;
```

### Vertical Positioning
- Content starts below the fixed navbar: `body { padding-top: 120px }`
- Sections stack with `gap: 0` between them (no margin between sections)
- `position: relative; z-index: 5` on all `.section` elements
- Hero text: `position: relative; z-index: 10`

### Page Alignment
- Landing pages: content centered with `margin: 0 auto`, `text-align: center` for headings
- Hero: left-aligned text in left column, visual in right column
- CTA: left-aligned text, right-aligned visual
- Dashboard (see Section 8): top-aligned, NOT vertically centered

---

## 5. Components â€” Exact Styling

### Navbar (from `navbar.css` + `Navbar.jsx`)

#### Outer wrapper `.navbar.w-nav` / `.navbar-glass-effect`
```css
position: fixed !important;
top: 0; left: 0; right: 0;
width: 100%;
z-index: 1000;
min-height: 110px;
max-height: 110px;
background: rgba(8, 12, 31, 0.92) !important;
backdrop-filter: blur(20px) !important;
-webkit-backdrop-filter: blur(20px) !important;
border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Scrolled state `.navbar-glass-effect.scrolled`
```css
background: rgba(8, 12, 31, 0.98) !important;
backdrop-filter: blur(24px) !important;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
```

#### Starfield pseudo-element `.navbar.w-nav::before`
40 radial-gradient dots at 2px size, opacity 0.55â€“0.9, scattered across 100% width/height.
See `navbar.css` lines 5â€“55 for the full list.

#### Nav links pill (inline style in `Navbar.jsx`)
```css
background: #000000;
backdrop-filter: blur(20px);
border-radius: 50px;
padding: 0.5rem 1.5rem;
box-shadow: 0 8px 32px rgba(0,0,0,0.4);
border: 2px solid transparent;
min-width: 300px; max-width: 450px;
/* Animated RGB border wraps the pill: */
background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%);
background-size: 300% 300%;
animation: rgbBorder 4s linear infinite;
```

#### Nav link states
```css
/* Default */
color: rgba(255,255,255,0.8);
font-weight: 600;
font-size: 0.85rem â€“ 1rem;

/* Active */
color: #ffffff;
font-weight: 700;
text-shadow: 0 0 20px rgba(255,255,255,0.5);

/* Hover */
color: #ffffff;
text-shadow: 0 0 15px rgba(255,255,255,0.3);
```

#### CTA button `.nav-cta-button` (from `overrides.css`)
```css
display: inline-block;
background: linear-gradient(90deg, #2962FF, #7B2CBF, #FFB800);
background-size: 200% 200%;
color: #fff;
font-size: 16px;
font-weight: bold;
text-transform: uppercase;
padding: 12px 28px;
border-radius: 100px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
transition: all 0.3s ease;
animation: pulse-blend 4s infinite ease-in-out;
border: none;
```

#### Mobile drawer `.mobile-drawer`
```css
position: fixed;
top: 0; right: 0;
height: 100vh; height: 100dvh;
width: 280px; max-width: 320px;
background: rgba(8, 12, 31, 0.85);
backdrop-filter: blur(24px) saturate(180%);
border-left: 1px solid rgba(255,255,255,0.15);
border-top-left-radius: 20px;
border-bottom-left-radius: 20px;
box-shadow: -20px 0 60px rgba(0,0,0,0.8), inset 1px 0 0 rgba(255,255,255,0.1);
z-index: 1010;
```

#### Mobile drawer gradient left border accent (inline style)
```css
position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
background: linear-gradient(180deg, #00b8cc 0%, #cc8800 50%, #9a1f5a 100%);
border-top-left-radius: 20px;
border-bottom-left-radius: 20px;
```

#### Mobile drawer overlay `.mobile-drawer-overlay`
```css
position: fixed; inset: 0;
background: rgba(0,0,0,0.8);
backdrop-filter: blur(12px) saturate(120%);
z-index: 1009;
```

---

### Buttons

#### Primary CTA `.join-waitlist-button` / `.nav-cta-button`
```css
background: linear-gradient(90deg, #2962FF, #7B2CBF, #FFB800);
background-size: 200% 200%;
color: #ffffff;
font-weight: 700;
font-size: 0.85rem â€“ 1.2rem;
text-transform: uppercase;
letter-spacing: 0.5px;
padding: 0.65rem 1.5rem (navbar) / 1rem 2.5rem (hero);
border-radius: 50px;
border: none;
text-decoration: none;
display: inline-block;
white-space: nowrap;
transition: all 0.3s ease;
```
Hover: `translateY(-1px)`, `box-shadow: 0 4px 15px rgba(41,98,255,0.3)`

#### Store Buttons (App Store / Google Play) â€” `StoreBtn` styled-component
```css
background: transparent;
border: 1px solid [brand-color];
border-radius: 25px;
color: [brand-color];
padding: 12px 24px;
font-size: 15px; font-weight: 600;
transition: color 0.3s 0.1s ease-out;
/* Hover: inset fill via box-shadow */
&:hover { color: #fff; }
&:hover::before { box-shadow: inset 0 0 0 10em [brand-color]; }
/* App Store color: #007AFF */
/* Google Play (disabled): border: 1px solid #808080; color: #808080; cursor: default; */
```

#### Secondary / Ghost Button
```css
background: rgba(255,255,255,0.08);
color: #ffffff;
font-weight: 600;
padding: 0.75rem 1.5rem;
border: 1px solid rgba(255,255,255,0.2);
border-radius: 50px;
transition: all 0.3s ease;
/* Hover: background: rgba(255,255,255,0.15); border-color: #ffffff; */
```

#### Coming Soon / Disabled Button
```css
background: #333333;
color: #888888;
border: 1px solid #444444;
cursor: not-allowed;
pointer-events: none;
border-radius: 50px;
font-weight: 700;
text-transform: uppercase;
```

#### Focus state (all buttons)
```css
outline: 2px solid #2962ff;
outline-offset: 2px;
```

---

### Cards

#### Glass Card `.glass` (from `design-tokens.css`)
```css
background: rgba(8, 12, 31, 0.6);
backdrop-filter: blur(24px) saturate(180%);
-webkit-backdrop-filter: blur(24px) saturate(180%);
border: 1px solid rgba(255,255,255,0.1);
box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15),
            inset 0 1px 1px 0 rgba(255,255,255,0.1);
```

#### Strong Glass `.glass-strong`
```css
background: rgba(8, 12, 31, 0.8);
backdrop-filter: blur(40px) saturate(200%);
border: 1px solid rgba(255,255,255,0.15);
box-shadow: 0 8px 32px 0 rgba(31,38,135,0.25),
            inset 0 1px 2px 0 rgba(255,255,255,0.15),
            0 0 0 1px rgba(255,255,255,0.05);
```

#### Glass Card `.glass-card` (from `design-tokens.css` `@layer utilities`)
```css
background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255,255,255,0.2);
box-shadow: 0 12px 40px 0 rgba(31,38,135,0.2),
            inset 0 1px 0 0 rgba(255,255,255,0.15);
```

#### RainbowCard (from `RainbowCard.jsx`)
Outer wrapper: `rounded-3xl`, `overflow: visible`
Animated border layer:
```css
/* Outer glow div: absolute -inset-[2px] rounded-3xl opacity-80 */
background: linear-gradient(90deg,
  #8B5CF6 0%, #EC4899 18%, #FB923C 35%,
  #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%);
background-size: 300% 300%;
animation: backgroundPosition ["0% 50%", "300% 50%"] 4s linear infinite;
/* Blur glow layer behind: blur-lg */
background: linear-gradient(90deg,
  rgba(139,92,246,0.4) 0%, rgba(236,72,153,0.4) 20%,
  rgba(251,146,60,0.35) 40%, rgba(59,130,246,0.4) 60%,
  rgba(251,146,60,0.35) 80%, rgba(139,92,246,0.4) 100%);
```
Inner card: `bg-black rounded-3xl border-2 border-transparent z-10`

#### Bento Card `.sv-bento-card` (from `design-tokens.css`)
```css
background: rgba(255,255,255,0.03);
backdrop-filter: blur(10px);
border-radius: 1.5rem;
padding: 2.5rem;
position: relative;
overflow: hidden;
/* Traveling light border via ::before */
```
Traveling light `::before`:
```css
content: '';
position: absolute; inset: 0;
border-radius: 1.5rem; padding: 1px;
background: linear-gradient(90deg, transparent 0%, transparent 45%, #00F0FF 50%, transparent 55%, transparent 100%);
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
animation: sv-travelingLight 3s linear infinite;
```
Variants: `.sv-bento-card-azure::before` uses `#2962FF`, `.sv-bento-card-gold::before` uses `#FFB800`

#### FAQ Card (from `FAQ.jsx` inline styles)
```css
background: rgba(0,0,0,0.95);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-radius: 16px;
padding: 1.5rem 2rem;
border: 1px solid rgba(255,255,255,0.1);
min-height: 80px;
/* Hover: background: rgba(0,0,0,1); scale(1.02) */
/* Open state: radial-gradient glow at top from accent color at 15% opacity */
```

#### Trustbar Logo Card `.trustbar-logo` (from `overrides.css`)
```css
flex: 0 0 220px; height: 100px;
display: flex; align-items: center; justify-content: center;
padding: 18px;
border-radius: 14px;
background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
border: 1px solid rgba(255,255,255,0.03);
box-shadow: inset 0 10px 30px rgba(0,0,0,0.4);
transition: all 0.18s ease;
/* Logo img: filter: grayscale(100%) brightness(220%); max-height: 52px; */
/* Hover: translateY(-3px); border-color: rgba(255,255,255,0.15); filter: grayscale(0%); */
```

#### Waitlist Card `.sv-wl-card` (from `react-fixes.css`)
```css
width: min(720px, 96vw);
border-radius: 22px;
background: rgba(8,12,31,0.70);
border: 1px solid rgba(255,255,255,0.10);
box-shadow: 0 20px 60px rgba(0,0,0,0.45);
padding: 28px;
position: relative; z-index: 1;
```

#### CTA Container (from `overrides.css` + `page.css`)
```css
border: 5px solid transparent;
border-radius: 20px;
background-image: linear-gradient(black, black),
  linear-gradient(90deg, rgb(139,92,246), rgb(236,72,153), rgb(251,146,60), rgb(59,130,246), rgb(6,182,212));
background-origin: border-box;
background-clip: padding-box, border-box;
box-shadow:
  0 0 20px rgba(139,92,246,0.4),
  0 0 40px rgba(236,72,153,0.3),
  0 0 60px rgba(251,146,60,0.2),
  0 0 80px rgba(59,130,246,0.2),
  0 0 100px rgba(6,182,212,0.1);
```

#### Contact Form `.contact-form-holder` (from `overrides.css`)
```css
border-radius: 24px;
padding: 40px;
background: #000000;
border: 3px solid transparent;
background-image: linear-gradient(#000000, #000000), linear-gradient(45deg, #2962FF, #FFB800, #7B2CBF);
background-origin: border-box;
background-clip: padding-box, border-box;
box-shadow:
  0 0 30px rgba(41,98,255,0.3),
  0 0 50px rgba(255,184,0,0.25),
  0 0 70px rgba(123,44,191,0.2),
  0 15px 40px rgba(0,0,0,0.5);
```

---

### Status Badges `.sv-status-*` (from `design-tokens.css`)
```css
.sv-status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
.sv-status-loading  { background: rgba(251,191,36,0.2); color: #fbbf24; border: 1px solid #fbbf24; }
.sv-status-encrypted{ background: rgba(239,68,68,0.2);  color: #ef4444; border: 1px solid #ef4444; animation: sv-statusPulse 2s ease-in-out infinite; }
.sv-status-active   { background: rgba(0,240,255,0.2);  color: #00F0FF; border: 1px solid #00F0FF; }
.sv-status-success  { background: rgba(34,197,94,0.2);  color: #22c55e; border: 1px solid #22c55e; }
```

### Glow Utility Classes (from `design-tokens.css`)
```css
.glow-azure { box-shadow: 0 0 20px rgba(41,98,255,0.5); }
.glow-cyan  { box-shadow: 0 0 20px rgba(0,240,255,0.5); }
.glow-gold  { box-shadow: 0 0 20px rgba(255,184,0,0.5); }
```

### Inputs (from `react-fixes.css` `.sv-wl-input`)
```css
height: 48px;
border-radius: 14px;
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.10);
color: #fff;
padding: 0 14px;
outline: none;
font-family: "Geist", Helvetica, Arial, sans-serif;
/* Focus: */
border-color: rgba(0,240,255,0.40);
box-shadow: 0 0 0 4px rgba(0,240,255,0.08);
```

### Footer (from `Footer.jsx` inline `<style>`)
```css
.footer-section {
  position: relative;
  padding: 80px 20px 40px;
  overflow: hidden;
  margin-top: -1px;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.footer-heading {
  color: #ffffff;
  font-size: 1rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 1px;
  margin: 0 0 20px;
}
.footer-link {
  color: rgba(255,255,255,0.6);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-block;
}
.footer-link:hover { color: #007AFF; transform: translateX(5px); }
.copyright { color: rgba(255,255,255,0.4); font-size: 0.85rem; }
```


---

## 6. Effects and Animations

### Glassmorphism Recipe
Three tiers used across the site:

**Light glass (cards, sections):**
```css
background: rgba(255,255,255,0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.1);
```

**Medium glass (navbar, drawer header):**
```css
background: rgba(8,12,31,0.6);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid rgba(255,255,255,0.1);
box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15), inset 0 1px 1px 0 rgba(255,255,255,0.1);
```

**Strong glass (mobile drawer, modals):**
```css
background: rgba(8,12,31,0.85);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid rgba(255,255,255,0.15);
box-shadow: -20px 0 60px rgba(0,0,0,0.8), inset 1px 0 0 rgba(255,255,255,0.1);
```

### Shadows
```css
/* Standard card depth */
box-shadow: 0 8px 32px rgba(0,0,0,0.4);

/* Trustbar container */
box-shadow: 0 20px 50px rgba(0,0,0,0.4);

/* CTA container glow */
box-shadow: 0 0 20px rgba(139,92,246,0.4), 0 0 40px rgba(236,72,153,0.3),
            0 0 60px rgba(251,146,60,0.2), 0 0 80px rgba(59,130,246,0.2);

/* Card hover lift */
box-shadow: 0 20px 60px rgba(0,0,0,0.45);

/* Navbar scrolled */
box-shadow: 0 8px 32px rgba(0,0,0,0.4);
```

### Borders
```css
/* Default card border */
border: 1px solid rgba(255,255,255,0.08 – 0.15);

/* Active/featured border */
border: 2px solid transparent; /* used with gradient background-clip trick */

/* Gradient border trick */
background-image: linear-gradient(#000, #000), linear-gradient(45deg, #2962FF, #FFB800, #7B2CBF);
background-origin: border-box;
background-clip: padding-box, border-box;

/* Rainbow animated border (RainbowCard) */
/* See Section 5 RainbowCard */
```

### Hover Effects
```css
/* Cards */
transform: scale(1.02) or translateY(-4px) or translateY(-8px);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Buttons */
transform: translateY(-1px) or translateY(-2px);
box-shadow: 0 4px 15px rgba(41,98,255,0.3);

/* Footer links */
color: [accent-color];
transform: translateX(5px);

/* Logo cards */
transform: translateY(-3px);
border-color: rgba(255,255,255,0.15);
filter: grayscale(0%);

/* Nav links */
color: #ffffff;
text-shadow: 0 0 15px rgba(255,255,255,0.3);

/* Store buttons */
color: #fff;
/* ::before box-shadow: inset 0 0 0 10em [color]; — 0.5s ease-out */
```

### Transitions
```css
/* Standard */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Fast */
transition: all 0.2s ease;

/* Slow / entrance */
transition: all 0.6s – 0.9s ease-out;

/* Card hover */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Store button fill */
transition: box-shadow 0.5s ease-out;
transition: color 0.3s 0.1s ease-out; /* delayed color change */

/* FAQ expand */
transition: max-height 0.4s [0.25, 0.46, 0.45, 0.94],
            opacity 0.3s ease;

/* Navbar bg */
transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Framer Motion Patterns (from components)
```jsx
// Standard entrance — fade + slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}

// Hero entrance — fade + slide from left
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}

// Staggered grid children
variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}}

// Individual card
variants={{
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}}

// Scroll trigger
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}

// Card hover lift
whileHover={{ y: -8, transition: { duration: 0.2 } }}

// Mobile drawer spring
transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}

// FAQ toggle icon rotate
animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.1 : 1 }}
transition={{ duration: 0.3, ease: "easeInOut" }}

// Rainbow border animation (Framer Motion)
animate={{ backgroundPosition: ["0% 50%", "300% 50%"] }}
transition={{ duration: 4, ease: "linear", repeat: Infinity }}
```

### CSS Keyframe Animations (from `design-tokens.css` + `overrides.css`)
```css
@keyframes rgbBorder {
  0%   { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

@keyframes sv-travelingLight {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes sv-statusPulse {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

@keyframes sv-pulseGold {
  0%,100% { box-shadow: 0 0 20px #FFB800; }
  50%      { box-shadow: 0 0 40px #FFB800, 0 0 60px #FFB800; }
}

@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%,100% { opacity: 0.5; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.05); }
}

@keyframes wave-flow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes sv-gridMove {
  0%   { transform: rotateX(60deg) translateZ(-200px) translateY(0); }
  100% { transform: rotateX(60deg) translateZ(-200px) translateY(80px); }
}

@keyframes sv-radarScan {
  0%   { transform: translate(-50%,-100%) rotate(0deg); }
  100% { transform: translate(-50%,-100%) rotate(360deg); }
}

@keyframes sv-float {
  0%,100% { transform: translateY(0px) rotate(-1deg); }
  50%      { transform: translateY(-10px) rotate(1deg); }
}
```

---

## 7. Assets Required

### Fonts (copy to `public/fonts/`)
| File | Weight | Usage |
|------|--------|-------|
| `client/public/fonts/OutfitRegular.ttf` | 400 | Body text, paragraphs |
| `client/public/fonts/OutfitSemiBold.ttf` | 600 | Buttons, labels, nav links |
| `client/public/fonts/OutfitBold.ttf` | 700 | Headings, card titles |

### Logo & Brand (copy to `public/assets/`)
| File | Usage | CSS |
|------|-------|-----|
| `client/public/assets/svlogo.png` | Navbar logo, footer logo | `height: 50px; width: auto; object-fit: contain` |
| `client/public/assets/logo.png` | Favicon (`<link rel="icon">`) | 32x32 |

### Partner / University Logos (copy to `public/assets/`)
| File | Usage | Filter |
|------|-------|--------|
| `client/public/assets/uowd.webp` | Trustbar | `filter: none; opacity: 1` (exception — color logo) |
| `client/public/assets/aud.png` | Trustbar | `grayscale(100%) brightness(220%)` |
| `client/public/assets/heriottwatt.png` | Trustbar | `grayscale(100%) brightness(220%)` |
| `client/public/assets/amity.png` | Trustbar | `grayscale(100%) brightness(220%)` |
| `client/public/assets/AUSLOGO.png` | Trustbar | `grayscale(100%) brightness(220%)` |
| `client/public/assets/teachmecode.png` | Partnership banner | Full color |
| `client/public/assets/teachmecode-logo.jpg` | Partnership banner | Full color |

### Brand Partner Logos (copy to `public/assets/`)
| File | Usage |
|------|-------|
| `client/public/assets/centrepoint.png` | Partner logos |
| `client/public/assets/centrepoint.svg` | Partner logos |
| `client/public/assets/filli.png` | Partner logos |
| `client/public/assets/bikanervala.avif` | Partner logos |
| `client/public/assets/coffeeplannet.png` | Partner logos |
| `client/public/assets/max.webp` | Partner logos |
| `client/public/assets/westzone.png` | Partner logos |
| `client/public/assets/sls.png` | Partner logos |
| `client/public/assets/B60.png` | Partner logos |
| `client/public/assets/puranmal.png` | Partner logos |
| `client/public/assets/raynatourslogo.png` | Partner logos |

### UI Assets
| File | Usage | CSS |
|------|-------|-----|
| `client/public/assets/card.png` | Credit card mockup in CTA | `border-radius: 28px; box-shadow: 0 14px 44px rgba(0,0,0,0.45)` |
| `client/public/assets/credit.png` | Credit card visual | Same as above |
| `client/public/assets/UI.jpeg` | App UI screenshot | `object-fit: contain` |
| `client/public/assets/Uis.jpeg` | App UI screenshot | `object-fit: contain` |

### Video Background
| Source | Usage | CSS |
|--------|-------|-----|
| `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4` | Hero background video | `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transform: rotate(180deg)` |

### Opengraph
| File | Usage |
|------|-------|
| `client/public/opengraph.jpg` | `<meta property="og:image">` |

---

## 8. Dashboard Application Rules

### Core Principle
A dashboard is NOT a landing page. Do not vertically center content. Do not use `min-height: 100vh` with `display: flex; align-items: center` on dashboard pages.

### Page Structure for Dashboard
```
[Sidebar — fixed left, full height]
[Topbar — fixed top, full width minus sidebar]
[Main content area — top-aligned, scrollable]
  [Page header — title + actions]
  [Stats row — metric cards]
  [Data section — tables, charts, lists]
  [Footer — minimal, copyright only]
```

### Dashboard Layout CSS
```css
/* Root layout */
.dashboard-root {
  display: flex;
  min-height: 100vh;
  background: #080C1F;
  color: #ffffff;
  font-family: "Geist", Helvetica, Arial, sans-serif;
}

/* Sidebar */
.dashboard-sidebar {
  width: 260px;
  min-height: 100vh;
  position: fixed;
  top: 0; left: 0;
  background: rgba(8,12,31,0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255,255,255,0.08);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
}

/* Main content */
.dashboard-main {
  margin-left: 260px;
  padding: 24px 32px;
  min-height: 100vh;
  /* TOP-ALIGNED — no flex centering */
}

/* Topbar */
.dashboard-topbar {
  position: sticky;
  top: 0;
  background: rgba(8,12,31,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 16px 32px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Page header */
.dashboard-page-header {
  margin-bottom: 32px;
  padding-top: 8px;
}

/* Section spacing */
.dashboard-section {
  margin-bottom: 32px;
}
```

### Metric / Stat Cards
```css
.stat-card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.stat-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.stat-value {
  font-size: 2rem; font-weight: 700; color: #ffffff;
  letter-spacing: -0.02em;
}
.stat-label {
  font-size: 0.75rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.15em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 8px;
}
.stat-change-positive { color: #22c55e; font-size: 0.85rem; }
.stat-change-negative { color: #ef4444; font-size: 0.85rem; }
```

### Tables
```css
.sv-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
}
.sv-table th {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.5);
  font-size: 0.75rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.sv-table td {
  padding: 14px 16px;
  color: rgba(255,255,255,0.85);
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.sv-table tr:hover td {
  background: rgba(255,255,255,0.03);
}
.sv-table tr:last-child td { border-bottom: none; }
```

### Sidebar Nav Items
```css
.sidebar-nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 20px;
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem; font-weight: 500;
  border-radius: 8px;
  margin: 2px 12px;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
}
.sidebar-nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: #ffffff;
}
.sidebar-nav-item.active {
  background: rgba(41,98,255,0.15);
  color: #2962FF;
  border: 1px solid rgba(41,98,255,0.3);
}
```

---

## 9. Do / Don't Rules

### DO
- `background: #080C1F` on body and all page backgrounds
- `color: #ffffff` as default text color
- `font-family: "Geist", Helvetica, Arial, sans-serif` everywhere
- `-webkit-font-smoothing: antialiased` on body
- `letter-spacing: -0.025em` on all headings
- `border: 1px solid rgba(255,255,255,0.08–0.15)` on all cards
- `backdrop-filter: blur(10px–24px)` on all glass panels
- `border-radius: 50px` on all pill buttons
- `border-radius: 12px–24px` on cards
- `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` on all interactive elements
- Use `rgba(255,255,255,0.4–0.7)` for muted/secondary text — never pure grey
- Use `#2962FF` for primary interactive elements (links, active states, focus rings)
- Use `#00F0FF` for secondary accents and highlights
- Use `#FFB800` for rewards, warnings, gold highlights
- Use `#7B2CBF` for tertiary accents and gradients
- Add ambient glow blobs (`sv-gradient-glow` + `sv-gradient-glow-alt`) to every page
- Use `outline: 2px solid #2962ff; outline-offset: 2px` for focus states
- Use `pointer-events: none` on all decorative background elements
- Use `z-index: 0` for background decorations, `z-index: 1–10` for content

### DON'T
- Never use white or light backgrounds (`#fff`, `#f5f5f5`, etc.)
- Never use solid grey borders (`border: 1px solid #ccc`)
- Never use harsh drop shadows — always use soft `rgba` shadows
- Never use `display: flex; align-items: center; justify-content: center; min-height: 100vh` on dashboard pages (that's for landing pages only)
- Never use `font-family: Arial` or `sans-serif` alone — always include "Geist" first
- Never use `letter-spacing: 0` or positive letter-spacing on headings
- Never use `color: #000` or `color: #333` for text
- Never use `background: white` on cards or panels
- Never use `box-shadow` with solid colors — always use `rgba`
- Never use `border-radius: 0` on interactive elements
- Never skip `backdrop-filter` when using semi-transparent backgrounds
- Never use `animation: none` on the rainbow border — it must animate
- Never place content with `position: absolute; top: 50%; transform: translateY(-50%)` in dashboard pages
- Never use `overflow: hidden` on containers that have glow effects bleeding out

---

## 10. CSS Files to Copy Into Merchant Dashboard

Copy these files verbatim from the StudentVerse repo:

| Source File | Destination | Notes |
|-------------|-------------|-------|
| `client/src/styles/design-tokens.css` | `src/styles/design-tokens.css` | Core — colors, glass, glows, animations |
| `client/src/styles/home.css` | `src/styles/home.css` | Font-face + global typography |
| `client/src/styles/react-fixes.css` | `src/styles/react-fixes.css` | Waitlist card, FAQ, float animation |
| `client/public/fonts/OutfitRegular.ttf` | `public/fonts/OutfitRegular.ttf` | Required for font loading |
| `client/public/fonts/OutfitSemiBold.ttf` | `public/fonts/OutfitSemiBold.ttf` | Required for font loading |
| `client/public/fonts/OutfitBold.ttf` | `public/fonts/OutfitBold.ttf` | Required for font loading |
| `client/public/assets/svlogo.png` | `public/assets/svlogo.png` | Brand logo |

**Do NOT copy** `page.css`, `about.css`, `contact.css` — those are Webflow exports with conflicting base styles.
**Do NOT copy** `navbar.css` or `overrides.css` directly — adapt their patterns instead.

Import order in your dashboard entry file:
```js
import './styles/design-tokens.css'  // FIRST — sets body bg, colors, glass
import './styles/home.css'           // SECOND — font-face + typography
import './styles/react-fixes.css'    // THIRD — utility animations
import './styles/dashboard.css'      // YOUR dashboard-specific styles
```

