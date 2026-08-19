# mi-goTo Visual Design Enrichment — Stage 1 Audit

Date: 2026-08-19  
Outcome: `design_system_proposal_needs_human_review`  
Application implementation changed: `no`

## Audit scope and evidence

The audit covered Demo Shell, Sidebar, Topbar, Pages 13–18, Product components,
theme/tokens, responsive rules, fixture mode, API mode, and Figma frames
`359:2`, `360:2`, `360:2116`, `360:2226`, `360:2385`, and `361:2`.

Current-frontend evidence was captured at a 1440 × 900 CSS viewport in both
fixture and API modes. API evidence used backend-provided accounts and nullable
states. Visual review does not independently prove keyboard, screen-reader, or
full WCAG compliance.

## Current visual identity

The frontend already has a coherent dark enterprise identity, strong geometry,
high information density, restrained radius, mono intelligence labels, and a
recognizable purple brand accent. The primary opportunity is semantic use of
the existing palette, not a new aesthetic.

Purple currently carries navigation, selection, links, many borders, score
rings, recommendations, tags, and derived evidence. This weakens hierarchy.
Amber, green, and red already exist and appear effectively in isolated places,
but are not consistently assigned to timing, verification, and risk.

## Concrete visual audit

| Area | Current state | Problem | Existing token opportunity | Recommendation | Priority |
| --- | --- | --- | --- | --- | --- |
| Demo Sidebar | Clear selected navigation and stable dark shell | Selected item and ordinary Product accents rely on the same purple | Brand, neutral surface/border | Keep purple for current location; keep inactive groups neutral and use type weight for hierarchy | High |
| Demo Topbar | Quiet and consistent | Breadcrumb/context sometimes competes weakly with page content | Primary/secondary text, subtle border | Keep Topbar neutral; reserve accent for status or actionable context only | Medium |
| Page backgrounds | Spacious Level 0 dark canvas | Long dark areas can feel visually flat | Surface default/elevated | Use consistent Level 1/2 section surfaces rather than more page-level color | Medium |
| Page 13 metrics | Brand and warning variants already exist | Default cards and important cards still have similar value hierarchy | Brand, amber, success, neutral borders | Keep one primary brand metric; use amber only for watchlist/timing and success only for explicit active/verified or positive-evidence states | High |
| Page 13 table header | Clear geometry | Header and rows have weak tonal separation | Surface default/elevated, subtle/default border | Establish a slightly distinct neutral header surface and stronger hover without changing grid | High |
| Page 13 tier badges | Focus and Tier 1 differ | Unanalyzed/Below ICP/Tier 2 need clearer neutral/incomplete distinctions | Brand, amber, neutral, error only for actual failure | Define badge-role matrix; do not use red for generic unavailable state | High |
| Page 13 scores | Bars and rings scan well | Same green/purple relationship may imply meanings not consistently documented | Success, amber, error, neutral track | Use score bands only when Product semantics define them; otherwise keep one neutral/brand visualization | Medium |
| Page 13 Signals | Numeric truth plus decorative dots | Dots could be mistaken for history/count if colored semantically | Neutral border; numeric primary/secondary text | Keep dots decorative and `aria-hidden`; numeric `N active` is the only semantic value | High |
| Page 13 Next Best Action | Present in each row | Purple action copy blends with all other purple links | Primary text, brand only for arrow/action affordance | Use primary text for recommendation and brand for affordance/hover | High |
| Page 14 identity | Strong heading and account context | Identity and insight stack lack a single dominant narrative | Primary text, neutral surface | Keep identity neutral and prominent; let insight roles carry accents | High |
| Page 14 Why This Account | Strong bordered card | Similar weight to Why Now despite different meaning | Brand border/tint | Use brand as strategic-fit/primary-insight role | High |
| Page 14 Why Now | Existing Figma uses amber effectively | Current API state can visually converge with other cards | Amber border/glow sparingly | Use amber header/edge for time-sensitive intelligence | Critical |
| Page 14 Next Best Action | Large and readable | Strong purple border plus purple action can compete with Why Now | Brand fill/edge, primary text | Make it the single action-oriented Level 3 surface; keep recommendation text primary | Critical |
| Page 14 Buying Signals | Dense, source-rich list | Evidence status, timing, category, and source can compete | Success, amber, brand, neutral | Success-family treatment may indicate positive source evidence; explicit `verified` remains independent, amber is for timing, brand for navigable source, neutral for metadata | High |
| Page 15 hero | Strong brand-framed identity | Large brand border can compete with every derived badge below | Brand border/glow | Keep hero as one primary brand region; reduce repeated strong brand framing lower down | Medium |
| Page 15 evidence cards | Consistent card family | Tone, proof, framing, CTA, vocabulary all look equally important | Surface hierarchy plus status colors | Group categories by scan pattern; use category structure, not random card colors | High |
| Page 15 status badges | Source/derived/incomplete already differentiated | Small brand text can approach contrast limits; incomplete reads as error | Success, brand, amber/neutral incomplete | Retain source/derived split; review incomplete treatment and small-text contrast | Critical |
| Page 15 Do / Don't | Semantically distinct in Figma | Current generic cards may understate behavioral polarity | Success subtle/error subtle with labels | Reserve paired green/red treatment for this explicit semantic pair | High |
| Page 16 portfolio metrics | Good prototype color separation | Current implementation exposes only part of the semantic spectrum consistently | Brand, amber, error, success, neutral unavailable | Active=brand, new/timing=amber, hot=brand/attention, cold=error; Market Patterns may retain the approved fixture/prototype treatment, but API mode must be neutral unavailable because no backend Market Pattern capability exists | Critical |
| Page 16 tabs | Selected state is recognizable | Purple pill selection can resemble primary CTA | Brand tint/border, neutral surface | Keep selected tab brand-tinted and secondary to page CTA/action | Medium |
| Page 16 urgency cards | Strong accent edge in prototype | Content-heavy cards can still blend across urgency categories | Amber, brand, neutral/error as authorized by backend urgency | Map only backend urgency to edge color and preserve text label | Critical |
| Page 17 filters | Clear local selection | Many selected pills can create a purple-heavy band | Brand for current filters, neutral for choices | Limit filled purple to active choices; keep other filters neutral | Medium |
| Page 17 portfolio cards | Stable three-column system | Selected card differs mainly by purple border | Brand border/tint, check state, elevated surface | Strengthen selected surface subtly while keeping checkbox/text cue | High |
| Page 17 comparison | Semantically rich result | Shared, unique, Do, Don't, proof, CTA may become visually uniform | Brand, success, error, amber | Assign roles by meaning; use green/red only for explicit Do/Don't or positive/negative result | High |
| Page 18 context controls | Well grouped | Context panel, editor, preview, and guidance often share similar dark surface weight | Surface Level 1/2/3 | Context=Level 1, editor/preview=Level 2, current generation focus=Level 3 | Critical |
| Page 18 tabs | Clear active underline | Active tab and primary generation actions share brand weight | Brand underline/tint | Keep tab selection compact; reserve filled brand for generation | Medium |
| Page 18 editor vs preview | Functional two-region layout | Regions need stronger identity at a glance | Neutral/elevated surfaces, border hierarchy | Use consistent editor/preview headers and complementary neutral surfaces | High |
| Page 18 guidance | Amber is already effective | Guidance can dominate when always strongly framed | Amber border/tint | Use amber for open, relevant guidance; reduce when collapsed | Medium |
| Page 18 traceability | Present but visually secondary | Evidence can be overlooked or confused with errors | Success/brand status plus neutral disclosure | Make trace availability clear without competing with generation | High |
| Disabled states | Consistent opacity token | Disabled controls can be over-prominent in large empty API states | Disabled token, neutral surface | Keep visible but subordinate; pair with explanatory text | Medium |
| Focus states | Token-backed focus exists | Persistent brand borders can visually resemble focus | Focus ring vs brand selection tokens | Keep focus ring visually distinct and transient | Critical |

## Prototype lessons

### A. Worth preserving as design principles

- Page 13 uses green, amber, red, and purple as distinct semantic cues while
  preserving a mostly neutral table.
- Page 14 clearly separates Why This Account (brand), Why Now (amber), and Next
  Best Action (action hierarchy).
- Page 15 uses status badges and the explicit Do/Don't pair to make evidence
  categories scannable.
- Page 16 maps metric and urgency roles across the existing palette.
- Page 16 Market Patterns treatment is valid for the approved fixture/demo
  state only. API mode has no backend Market Pattern capability and must use a
  neutral unavailable treatment; success styling must not imply live backend
  intelligence.
- Page 17 keeps most cards neutral and spends brand emphasis on selection.
- Page 18 distinguishes context, workflow, editor/preview, and guidance regions.

### B. Prototype-specific and unnecessary

- Fixed demo cardinalities, placeholder account names, and static score bands.
- Pixel-locked widths outside the accepted formal desktop frames.
- Any accent that depends on fixture-only content rather than a Product state.
- Decorative presentation that implies unavailable backend history.

### C. Incompatible with real-data robustness or accessibility

- Truncation that hides long industries, names, sources, or recommendations.
- Color-only status or urgency.
- Small purple text on dark purple surfaces without contrast verification.
- Fixed-height content that clips API-derived text.
- Treating unknown or absent data as error by visual convention alone.

### D. Current frontend already better

- API/fixture isolation and nullable states preserve truthfulness.
- Responsive reflow and Drawer behavior support non-Figma viewport states.
- Accessible names, focus behavior, live/loading states, and safe source links
  extend beyond the static prototype.
- Long real-data wrapping and fluid Product canvas rules are more robust than
  fixed specimen geometry.

## Pages 13–18 visual hierarchy

| Page | Primary attention | Secondary attention | Tertiary attention |
| --- | --- | --- | --- |
| 13 Account Discovery | Account priority and selected/filtered result set | Portfolio metrics and score/tier state | Search controls, metadata, decorative Signal dots |
| 14 Account Overview | Why This Account → Why Now → Next Best Action narrative | Core fit/signal/resonance metrics and Buying Signals | Account metadata, timing, source links, secondary actions |
| 15 Communication DNA | Account DNA identity and dominant communication traits | Evidence category cards and status | Sources, frequency, supporting metadata, export/demo controls |
| 16 Signal Pulse | Urgency and the account/action needing attention now | Portfolio metrics and selected persona tab | Signal evidence, dates, filters, secondary actions |
| 17 DNA Portfolio | Current selection and compare readiness/result | Account DNA cards and shared/unique findings | Filters, signal counts, source details, secondary dimensions |
| 18 Content Studio | Current asset task and generate/edit action | Editor/preview relationship and target-account context | Guidance, traceability, supporting controls, disabled export-like actions |

## Proposed Stage 2 sequence

1. **Minimal shared foundations:** approve only the semantic color-role aliases,
   border/surface hierarchy, status/score rules, contrast checks, and
   color-budget tests needed for the pilot.
2. **Page 14 Account Overview pilot:** apply the proposal first to the
   `Why This Account → Why Now → Next Best Action` hierarchy, including the
   independent `SOURCE_BACKED` versus `verified` distinction.
3. **Tom human visual checkpoint:** pause for explicit visual review of the
   Page 14 pilot before broadening the language.
4. **Shared Product components:** only after the pilot is accepted, enrich
   metrics, badges, score indicators, evidence badges, selected cards,
   tables/rows, action hierarchy, and focus separation.
5. **Demo Shell:** Sidebar, Topbar, Drawer, and page-level surface rhythm.
6. **Pages 13 and 15–18:** apply the approved hierarchy page by page, with
   Page 16 Market Patterns remaining neutral unavailable in API mode.
7. **Integrated QA:** fixture/API modes, 1440/1024/768/390, keyboard/focus,
   contrast, reduced motion, Product regressions, and human visual review.

Each page checkpoint requires Tom's visual review before the next page begins.
Stage 2 must not change Product semantics, contracts, routes, data isolation, or
generation behavior.

## Current governance

- Phase 6 functional semantics: `PASS / FROZEN`
- Product lifecycle: `HUMAN TESTING / STABILIZATION`
- Visual enrichment: `PROPOSED / PENDING HUMAN REVIEW`
- Human review: `PENDING`
- Release: `NOT AUTHORIZED`
