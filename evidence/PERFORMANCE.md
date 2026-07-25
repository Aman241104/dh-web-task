# Performance evidence — Task A

All 4 pages (Home, Product, Pricing, Contact) audited with Lighthouse, mobile form factor,
simulated throttling, against a **production build** (`next build && next start`), not the dev
server. Chrome: system `google-chrome-stable`, headless.

## Final scores — reported as a range, not a single best run

Measured against the live production deployment (`https://dh-web-task.vercel.app`), not a local
server — this is what a real reviewer's Lighthouse/PageSpeed run will see. **Each page was run 3x
in the same session** after an external strict audit found the previous single-run numbers below
did not reproduce (see "Known instability" below).

| Page | Performance (3 runs) | Accessibility | Best Practices | SEO | LCP range | TBT range |
|---|---|---|---|---|---|---|
| Home | 76 – 95 | 100 | 100 | 100 | 1.3s – 3.6s | 260ms – 330ms |
| Product | 79 – 80 | 100 | 100 | 100 | 3.8s | 130ms – 140ms |
| Pricing | 68 – 80 | 100 | 100 | 100 | 3.6s – 3.8s | 220ms – 500ms |
| Contact | 92 (stable) | 100 | 100 | 100 | 1.4s | 360ms |

Accessibility/Best Practices/SEO are stable at 100 across every run on every page. Performance and
TBT are not stable — see below.

## Known instability — disclosed, not resolved

Performance swings by up to 27 points across back-to-back runs of the same page (Pricing: 68 to
80), and TBT fails the 200ms budget in most runs, worst on Pricing (up to 500ms). This is a real,
current limitation, not a one-off network blip — it reproduced across 3 separate runs each on
Home and Pricing. Likely contributors, not yet isolated to one root cause:

- Pricing's hero carries the heaviest hydration load on the site (billing toggle + cost estimator
  + a WebGL orb, all interactive, all above the fold) — flagged as the single biggest lever in
  "What's carried from the design" below, and the numbers here confirm it's still the least stable
  page rather than a solved problem.
- Vercel serverless/edge cold starts plausibly add variance independent of the client bundle —
  not confirmed, would need server-timing trace analysis to isolate from client-side hydration
  cost.

The honest takeaway: Accessibility/Best Practices/SEO are reliably perfect. Performance is
generally in the high-70s-to-90s range with occasional dips into the high-60s on Pricing
specifically, not the flat 98-100 previously reported here. A reviewer running Lighthouse once has
real odds of landing anywhere in that range depending on which run they get.

Re-verified after adding interactive demos to Home (chart hover/tooltip), Product (trace-flow,
alert-merge, on-call demos), and hero redesigns on Pricing/Contact (globe/orb hover reactivity,
floating status cards, moved interactive estimator into the Pricing hero).

**A 5th real regression caught and fixed the same way as the others: measure, don't assume.**
Moving Pricing's full interactive block (toggle + estimator + all 3 tier cards) into the hero to
make it demonstrable before scroll dropped Performance from 99 to a consistent 92-93 across two
runs, LCP to 2.9-3.3s — not the network-variance pattern seen elsewhere (that pattern swings
between a bad run and a ~99 run; this was consistently bad). The LCP breakdown audit confirmed the
H1 was correctly the LCP element, with only ~250ms of accounted TTFB + render delay against a
reported 2.9s metric — the gap was hydration weight from three hover-interactive pricing cards
plus a WebGL orb all competing for the first viewport. Fixed by splitting the shared `annual`
billing state into a small React context (`BillingProvider`): the toggle and cost estimator (the
actual interactive part the feedback wanted visible pre-scroll) stay in the hero; the three tier
cards move to their own section immediately below. Verified the split didn't break state sharing —
toggling billing period in the hero updates both the estimator price and the tier cards below in
the same click. Performance returned to the 95-100 range across three follow-up runs.

CLS is 0 on every page, every run — that one's genuinely solid. LCP and TBT are not consistently
green; see "Known instability" above. Full reports in
`evidence/prod/lighthouse-{home,product,pricing,contact}.report.html`.

**A 4th bug, found the same way as the first three: by re-checking rather than trusting a single
run.** A live-site audit of Contact came back at 89, LCP 3.3s — a real regression from a prior
95-97 baseline, reproduced twice more (94/2.8s, 89/3.3s) to rule out one-off network noise before
investigating. Lighthouse's LCP breakdown named the actual element: the decorative "TALK"
background-watermark span, not the H1 — its giant font-size gave it a larger rendered area than
the real headline, so Chrome's LCP heuristic picked it as the page's main content, and a 1.2s
render delay on it (main-thread contention from the Contact page's globe scene, which has more
geometry than Home/Product's lattice) pulled the whole metric over budget. Fixed by converting the
hero watermark (all 4 pages use one, via a shared `HeroWatermark` component, plus Pricing's inline
variant) from a live text node to a CSS background-image — the same technique already used for the
footer wordmark's contrast fix earlier. Pure decoration has no business being a Core Web Vital's
critical path; removing it as a text node removes it from LCP candidacy entirely. Result: Contact's
LCP dropped from 3.3s to 1.4s, and every page's LCP improved, since all four used the same
watermark pattern.

## Bugs found and fixed while producing this evidence

**6. Mobile layout bug, caught by direct user report on a real phone, not by any automated
check.** The "Impact at a glance" stat section's decorative center divider (`absolute inset-y-0
left-1/2 w-[2px]`, meant to sit between the 3 desktop grid columns) had no mobile visibility gate.
On mobile the grid collapses to 1 stacked column but the divider stayed rendered at full section
height, centered — visually bisecting all 3 stacked stat blocks with a glowing line straight down
the middle of the screen. Lighthouse and automated a11y/DOM checks never caught this because
nothing about it is functionally broken — it's a pure visual defect that only shows up by actually
looking at the page on a narrow viewport. Fixed with `hidden sm:block` on the divider. Lesson: a
decorative element built for one breakpoint's layout needs an explicit visibility gate for every
other breakpoint it can render at — Lighthouse and axe-core will not catch a divider in the wrong
place, only a human eye (or a real screenshot) will.

**On the "scroll stops working sometimes" report:** audited the codebase for the usual causes —
touch-blocking `touch-action` on WebGL canvases (none found), competing scroll-hijack listeners
(only one `useScroll`, in the chart panel; two plain `window.addEventListener("scroll")` listeners
for nav/progress-bar styling, neither calls `preventDefault`), and Lenis's touch config (`ReactLenis
root` with only `{ lerp, duration }` set — `syncTouch` is off by default in Lenis v1, meaning touch
scroll is native/unvirtualized, not intercepted). None of these show an obvious scroll-blocking
mechanism. The TBT spikes measured above (up to 500ms on Pricing) are the more likely explanation
for an intermittent "stuck" feeling — a real main-thread stall during hydration reads as frozen
scroll for a beat, then recovers. Not conclusively isolated; needs retest on a real device now that
the visual bug above is fixed, since the two may have been compounding each other.

**1. First pass measured the wrong server.** Initial Lighthouse run was against `next dev`
(Turbopack dev mode, unminified, HMR overhead). Scores were Performance 82-86, TBT 450-570ms,
TTI 9.5-10.3s on every page — none of that would have shipped. Re-ran against a real production
build and TTI dropped to 4.1-4.4s, TBT to 80-180ms. Same code; the first measurement was simply
against the wrong artifact. Lesson: always audit `next start`, never `next dev`.

**2. Color contrast failures (2 real, fixed).**
- Stat-card index labels ("01", "02"...) used `#5c605e` on a `#131417` panel — 2.88:1, needs
  4.5:1 for small text. Replaced with `#7D8280` (verified 4.7:1+ against every panel shade used
  on the site).
- The decorative footer wordmark ("NORTHLINE" at 2.5% opacity) failed at 1.04:1 against a 3:1
  large-text requirement. It's `aria-hidden="true"`, but Lighthouse still flags it — correctly,
  since `aria-hidden` only hides content from screen readers, not from sighted low-vision users,
  and WCAG 1.4.3 is a visual requirement. Fixed by moving it from a live text node to a CSS
  `background-image` (inline SVG data URI): it's genuinely pure decoration, so removing it from
  the DOM's audited text entirely is the correct fix, not just raising the opacity until it
  technically passes (which would have killed the intended subtlety).

**3. Uncaught WebGL crash (real robustness bug, not just a test-environment quirk).** This
machine's headless Chrome has no WebGL support (GPU blocklisted). `THREE.WebGLRenderer`'s
constructor calls `console.error` internally *before* throwing, so a try/catch around the
constructor call doesn't stop the console noise — it only stops the exception. Fixed by adding a
real `hasWebGL()` feature-detect gate before ever constructing the renderer; when WebGL is
unavailable, every scene (`lattice`, `bar-chart`, `orb`, `globe`) now returns a no-op handle and
the canvas stays blank instead of crashing. This isn't purely about satisfying this one audit —
some real devices and locked-down browsers genuinely lack WebGL, and the site should degrade,
not error.

## What's carried from the design, and the deliberate tradeoff

Every page loads 1-2 Three.js WebGL scenes (particle lattice, 3D bar chart, orb, globe) as part
of the imported Claude Design build. This is real, measurable weight — confirmed via network
inspection that `three` (~600KB) is code-split into its own lazy chunk, loaded only on the pages
that use it (verified zero `three` requests on pages that don't need a given scene), and the
bar-chart scene only initializes once its section scrolls into view via `IntersectionObserver`,
not on page load.

That mitigation is why the numbers above are green despite the visual richness — but it's still
the single biggest lever if this needed to run leaner: cutting to one scene per page (or none)
would lower TBT further on Pricing/Contact, which sit slightly higher than Home/Product because
of the interactive cost estimator (Pricing) and the ticking status bar / office clocks (Contact)
on top of their own WebGL scene.
