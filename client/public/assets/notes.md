# StudentVerse Website — Development Notes
**Project:** StudentVerse Client (React + Vite)
**Last Updated:** May 11, 2026 — Final cleanup & reorganization complete

---

## 1. Contact Page — Toggle Redesign

**File changed:** `client/src/components/sections/ContactHero.jsx`

The `/contact` page previously had a two-tab toggle: **Business** and **Info**.

### Info tab → renamed to Support
- Renamed from "Info" to **"Support"**
- Old Info tab showed Partnership Plans pricing cards (1 Month / 3 Months)
- Support tab now renders the full support ticket form **inline** — no separate page or redirect
- Form fields: Name, Email, Priority (Low/Medium/High), Category (Account/Payments/Partnerships/App Bug/Other), Message
- On submit: opens a pre-filled mailto to `support@studentverse.ae`
- Shows a success confirmation screen with option to submit another ticket

### Business tab
- Partner inquiry form unchanged
- "Why Businesses Choose StudentVerse" section (4 cards) remains below the form
- Partnership Plans pricing cards (1 Month / 3 Months) moved here from the old Info tab, now appear below the Why section
- Pricing card animations changed from `whileInView` → `animate` to fix a visibility bug caused by `overflow: hidden` on ancestor elements

---

## 2. Support Page — Removed

- Deleted `client/src/pages/Support.jsx` — functionality moved inline into Contact page Support tab
- Removed `import Support` and `/support` route from `client/src/App.jsx`
- Visiting `/support` now redirects to `/` via the catch-all route

---

## 3. Waitlist — Access Disabled (Code Kept)

- `/waitlist` route in `App.jsx` changed to redirect to `/` — users cannot access it
- `Waitlist.tsx` and all components under `components/waitlist/` are fully intact
- **To re-enable:** in `App.jsx`, change:
  ```
  <Route path="/waitlist" element={<Navigate to="/" replace />} />
  ```
  back to:
  ```
  <Route path="/waitlist" element={<Waitlist />} />
  ```

---

## 4. Dead Code Cleanup — Pass 1

### Deleted files (5 files)
| File | Reason |
|------|--------|
| `components/ElectricBorder.jsx` | Never imported anywhere — only referenced inside FAQ.jsx which was also unused |
| `components/FAQ.jsx` | Never imported — About.jsx has its own inline FAQSection |
| `components/TeamSection.jsx` | Never imported — About.jsx has its own inline TeamSection |
| `components/maintenance.jsx` | Never imported anywhere |
| `components/MaintenanceStyle.css` | Only used by the deleted maintenance.jsx |

### Removed unused imports — `Home.jsx`
Removed 9 dead imports: `TrustedBy`, `Partners`, `Stats`, `PricingPlans`, `CTA`, `GhostCursor`, `initPageInteractions`, `normalizeHtml`, `ghost-cursor.css`

Also removed:
- Hidden raw HTML injection block — `fetch('/raw/home.html')` + invisible `dangerouslySetInnerHTML` div (was fetching Webflow HTML and injecting it with `display: none`, serving no purpose)
- Commented-out JSX: `{/* <Partners /> */}` and `{/* <Stats /> */}`
- Unused React hooks: `useState`, `useRef` (were only used for the raw HTML pattern)

### Removed unused import — `CTA.jsx`
- Removed `useAuth` / `isAuthenticated` — imported and destructured but never used in JSX or logic

### Removed commented-out code — `About.jsx`
- Removed `{/* <HowItStartedSection /> */}` comment line

---

## 5. Dead Code Cleanup — Pass 2

### Deleted files (4 more files)
| File | Reason |
|------|--------|
| `lib/utils.ts` | Exact duplicate of `utils/cn.ts` — same `cn()` function, never imported anywhere |
| `utils/normalizeHtml.js` | Only used for invisible Webflow HTML injection in Home.jsx and Contact.jsx — both usages removed |
| `utils/initInteractions.js` | Only used for the same invisible HTML pattern — orphaned after Home.jsx cleanup |
| `styles/ghost-cursor.css` | No longer imported anywhere after GhostCursor was removed from Home.jsx |

### Cleaned up — `Contact.jsx`
Removed the same hidden raw HTML injection pattern as Home.jsx:
- Removed `useEffect`, `useState` imports
- Removed `normalizeHtml` import
- Removed `fetch('/raw/contact.html')` call
- Removed invisible `dangerouslySetInnerHTML` div

### Cleaned up — `utils/validation.ts`
- Removed `detectSuspiciousActivity()` function — exported but never called anywhere
- Removed `ActivityLog` interface — only used by the deleted function

### Cleaned up — `About.jsx`
- Removed the entire `HowItStartedSection` function body — was defined but never rendered anywhere
- Fixed formatting glitch: `}, []);  return (` was on one line, split correctly

### Cleaned up — `services/backendApi.ts`
- Removed debug `console.log` statements with emoji prefixes (🔄, 📥, ✅, ❌) from `getCurrentUserData()`

---

## 6. Dead Code Cleanup — Pass 3 (Verification fixes)

### Cleaned up — `services/verificationApi.ts`
- Removed hardcoded test `generateOTP()` function that always returned `"111111"` — testing artifact
- Removed unused internal helpers: `getVerificationState`, `setVerificationState`, `clearVerificationState`, `VERIFICATION_STORAGE_KEY` — defined but never called externally
- Removed `VerificationState` interface — only used by the deleted helpers
- Removed remaining debug `console.log('✅ Backend OTP verification response:...')` that was missed in Pass 2
- Removed inline comments explaining backend data structure (development notes, not needed in production code)
- Fixed `getVerificationStatus()` and `resetVerification()` — they were still calling the deleted helper functions, which would have caused a **runtime error**. Both simplified to work without the removed helpers

---

## 7. Remaining Items (Flagged, Not Removed)

### Components that exist but are not rendered on any page
Kept intentionally in case they are needed later:
| Component | Description |
|-----------|-------------|
| `components/sections/Partners.jsx` | Animated partner logo grid |
| `components/sections/Stats.jsx` | Animated stats counters (3,000+ students, 50+ brands, etc.) |
| `components/sections/CTA.jsx` | "Ready to Start Saving?" section |
| `components/sections/PricingPlans.jsx` | Student pricing plans (Free / PRO) with billing toggle |
| `components/ui/GhostCursor.jsx` | Three.js WebGL cursor trail effect |
| `components/sections/TrustedBy.jsx` | Scrolling brand logo strip |

### Naming confusion — resolved in section 10
- `components/layout/Footer.jsx` — the real site footer (nav links, social icons, legal links)
- `components/layout/PartnerBanner.jsx` — TeachMeCode partnership banner (renamed from `pages/Footer.jsx`)

### `services/api.ts` — legacy mock, kept for types
- Entire file is a mock WaitlistAPI class never called at runtime
- `DashboardStyled.tsx` and `BentoDashboard.tsx` import TypeScript types (`User`, `QueueStats`, `ReferralStats`) from it
- Safe to delete only after moving those type imports to `backendApi.ts`

### Console logs intentionally kept
These are error-handling logs in catch blocks — appropriate to keep:
- `services/verificationApi.ts` — `console.error` in catch blocks
- `services/backendApi.ts` — `console.error` in catch blocks
- `context/AuthContext.tsx` — `console.error` in catch blocks
- `utils/storage.ts` — `console.warn` / `console.error` for storage failures

### Waitlist components — not audited
All files under `components/waitlist/` were not touched (waitlist flow is disabled but preserved):
`DashboardStyled.tsx`, `EmailVerificationStyled.tsx`, `LoadingScreen.tsx`, `OTPModal.tsx`, `QueueVisualization.tsx`, `ReferralProgress.tsx`, `Logo.tsx`, and the `design/` subfolder (`BentoDashboard.tsx`, `BootSequence.tsx`, `ChipSlots.tsx`, `CountdownDisplay.tsx`, `HolographicPlanet.tsx`, `Navbar.tsx`, `RadarVisual.tsx`)

---

## 8. CSS Dead Declaration Cleanup

**Files changed:** `styles/navbar.css`, `styles/overrides.css`

### navbar.css — fixes
| Selector | Property | Dead value | Winning value |
|----------|----------|-----------|---------------|
| `.navbar.w-nav` | `position` | `relative` | `fixed !important` — removed the dead line |
| `.mobile-nav-link:hover` | `background`, `transform` | `rgba(255,255,255,0.08)`, `translateX(8px)` | `rgba(255,255,255,0.05)`, `translateX(4px)` — removed first duplicate block |
| `.mobile-cta-primary:hover` | `transform` | `scale(1.02)` | `translateY(-1px)` — removed first duplicate block |
| `.mobile-cta-secondary:hover` | `background`, `transform` | `rgba(255,255,255,0.15)`, `scale(1.02)` | `rgba(255,255,255,0.1)`, no transform — removed first duplicate block |
| `body` | `padding-top` | `120px` (no !important) | `80px !important` in ≤640px media query — removed the dead bare declaration |
| `.mobile-drawer-overlay` | `z-index` | `1009 !important` (duplicate) | `1009 !important` — removed second identical declaration |
| `.mobile-drawer` | `z-index` | `1010 !important` (duplicate) | `1010 !important` — removed second identical declaration |
| `.navbar.w-nav` | `z-index` | `1000 !important` (duplicate) | `1000 !important` — removed second identical declaration |

### overrides.css — fixes
| Selector | Property | Dead value | Winning value |
|----------|----------|-----------|---------------|
| `.how-it-works-v3-icon-holder .feature-icon` | `width`, `height` | `48px !important` | `88px !important` — removed the first 48px declaration |
| `.brand-image` | `max-height` | `40px !important` | `48px !important` — removed the dead 40px block |
| `.footer-brand-image` | `max-height` | `40px !important` | `48px !important` — removed the dead 40px block |
| `#faq-about .section` | `padding-top`, `margin-top` | `0px !important` (duplicate) | `0px !important` — removed the second identical rule block |
| `.navbar-container` (inside `@media max-width:991px`) | `justify-content` | `space-between !important` (duplicate) | `space-between !important` — removed second identical declaration |
| `.nav-menu.w-nav-menu` | `position`, `display`, `justify-content`, `align-items` | `absolute !important`, then each property declared twice | `static !important` — removed `position: absolute`, `left: 50%`, and all duplicate property declarations in the same block |

---

## 9. Dead Code Cleanup — Final Pass

### Cleaned up — `pages/Navbar.jsx`
- Removed `import { useAuth }` — imported but `isAuthenticated` was destructured and never used in JSX or logic (same pattern as CTA.jsx in Pass 1)

### Cleaned up — `hooks/useLenisScroll.js`
- Removed the entire `#ghost-section` IntersectionObserver snap logic — was looking for `document.querySelector('#ghost-section')` which doesn't exist anywhere in the codebase. The `if (ghostSection)` block was always false, making the entire snap feature and its cleanup handler dead code
- Simplified the cleanup to a single return path instead of two conditional ones

### Cleaned up — `context/AuthContext.tsx`
- Removed all debug `console.log` statements with emoji prefixes from `login()` and `refreshData()` functions: 🔐, 📦, ✅, ❌, ⚠️, 🔄, 📊
- Kept `console.error` in catch blocks (appropriate for production error tracking)

### Empty directory
- `src/lib/` directory is now empty (after `lib/utils.ts` was deleted in Pass 2) — can be removed from the repo if desired

### Confirmed clean (no action needed)
- `News.jsx` — `svNews` array IS used when the "SV" platform tab is selected (`platform === 'sv'`)
- `useLenisScroll.js` — `lenisRef.current` return value is unused at call sites but the hook's side effects (smooth scroll) are the actual purpose — fine

---

## 10. File Structure Reorganization

**All imports updated and verified — zero diagnostic errors across all files.**

### Before
```
components/          ← flat dump of 20+ unrelated files
pages/               ← contained Navbar.jsx and Footer.jsx (not pages)
```

### After
```
components/
├── layout/          ← global pieces used on every page
│   ├── Navbar.jsx         (moved from pages/)
│   ├── Footer.jsx         (main site footer)
│   ├── PartnerBanner.jsx  (renamed from pages/Footer.jsx — TeachMeCode banner)
│   └── AnimatedBackground.jsx + .css
├── sections/        ← page-specific sections
│   ├── Hero.jsx, BusinessHero.jsx, ContactHero.jsx
│   ├── Features.jsx, News.jsx, DownloadCTA.jsx
│   ├── Trustbar.jsx, TrustedBy.jsx, Stats.jsx
│   ├── CTA.jsx, Partners.jsx, PricingPlans.jsx
└── ui/              ← reusable primitives
│   ├── RainbowCard.jsx, SubmitButton.jsx
│   ├── LogoLoop.jsx + .css
│   ├── OrbitImages.jsx + .css
│   ├── InstagramButton.jsx, LinkedInButton.jsx
│   └── GhostCursor.jsx
└── waitlist/        ← unchanged

pages/               ← only actual route pages now
├── Home.jsx, About.jsx, Contact.jsx, Business.jsx
├── Waitlist.tsx, Terms.jsx, Privacy.jsx, Cookies.jsx
```

### Key renames
- `pages/Footer.jsx` → `components/layout/PartnerBanner.jsx` (was confusingly named)
- All page imports updated to use new paths

---

## 11. Backend Status Check

**Real backend:** `https://website-backend-production-fda7.up.railway.app` (Railway deployment)
**Local server/:** Scaffold template only — no real routes implemented locally

### Endpoint test results

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `POST /api/contact/submit` | POST | ✅ **Working** | Returns `{ ok: true, message: "Message submitted successfully" }` with `inquiryType: "merchant_business"` |
| `POST /api/contact/submit` | POST | ⚠️ **Partial** | Returns `400 {"error":"Invalid inquiry type"}` when `inquiryType: "general"` — backend only accepts specific types |
| `POST /api/waitlist/join` | POST | ❌ **404 Not Found** | Route does not exist on the Railway backend |
| `POST /api/auth/verify-otp` | POST | ❌ **404 Not Found** | Route does not exist on the Railway backend |
| `GET /api/user/data` | GET | ❌ **404 Not Found** | Route does not exist on the Railway backend |

### Issues found

**1. Waitlist flow is completely broken on the backend**
- `/api/waitlist/join`, `/api/auth/verify-otp`, and `/api/user/data` all return 404
- The waitlist frontend code (`verificationApi.ts`, `backendApi.ts`, `AuthContext.tsx`) is built around these endpoints
- This is consistent with the decision to disable the `/waitlist` route — the backend isn't ready
- **Action needed:** These routes need to be implemented on the Railway backend before the waitlist can go live

**2. Contact form `inquiryType: "general"` was rejected — FIXED**
- `ContactHero.jsx` was sending `inquiryType: "general"` for the business contact form
- The backend returned `400 Invalid inquiry type` for this value
- **Fixed:** Changed to `inquiryType: "merchant_business"` in `components/sections/ContactHero.jsx` — now returns `{ ok: true }` ✅

**3. What IS working**
- Contact form submissions with `inquiryType: "merchant_business"` (Business page form) ✅
- The Railway backend is live and responding ✅
