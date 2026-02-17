# Laputa App Redesign — Implementation Plan

> Generated from `ui-design.pen` (V2) vs current implementation. **Analysis only — do not implement yet.**

---

## Summary of Changes

The V2 design introduces: a **Status Bar**, **Tab Bar** in the editor, an **Info Bar** (breadcrumb + actions), restructured **Sidebar** with Phosphor icons and collapsible groups with count badges, **IBM Plex Mono** for type pills, updated **color palette** (new primary `#155DFF`, new accent colors), and several layout/spacing refinements throughout.

---

## Design Specs Reference (from .pen file)

### Colors Changed
| Variable | Old (Light) | New (Light) | Old (Dark) | New (Dark) |
|---|---|---|---|---|
| `--primary` | `#2383E2` | `#155DFF` | `#4a9eff` | `#155DFF` |
| `--accent-green` | `#0F7B6C` | `#00B38B` | `#4caf50` | `#00B38B` |
| `--accent-purple` | `#9065B0` | `#A932FF` | `#9c72ff` | `#A932FF` |
| `--accent-blue` | `#2383E2` | `#155DFF` | `#4a9eff` | `#155DFF` |

### New Color Variables (not in current CSS)
| Variable | Light | Dark |
|---|---|---|
| `--accent-yellow` | `#F0B100` | `#F0B100` |
| `--accent-blue-light` | `#155DFF14` | `#155DFF20` |
| `--accent-green-light` | `#00B38B14` | `#00B38B20` |
| `--accent-purple-light` | `#A932FF14` | `#A932FF20` |
| `--accent-red-light` | `#E03E3E14` | `#f4433620` |
| `--accent-yellow-light` | `#F0B10014` | `#F0B10020` |

### Typography
- **Font**: Inter (primary), IBM Plex Mono (labels/pills) — **IBM Plex Mono not currently loaded**
- App title: 17px / Bold / letter-spacing -0.3
- Sidebar items: 13px / Medium (font-weight 500)
- Sidebar section headers: 13px / Semibold (600) — currently 11px
- Type pills: 11px / IBM Plex Mono / normal weight / ALL CAPS
- Editor H1: 32px / Bold / lh 1.2
- Editor H2: 24px / Semibold / lh 1.3
- Editor body: 16px / Regular / lh 1.6
- Info bar / breadcrumb: 12px
- Status bar: 11px

### Panel Widths
| Panel | Design | Current |
|---|---|---|
| Sidebar | 250px | 250px ✅ |
| NoteList | 300px | 300px ✅ |
| Editor | flexible | flexible ✅ |
| Inspector | 260px (design) / 280px (spec) | 280px ✅ |

### Border Radius Scale
- 4px (sm) — chips
- 6px (md) — buttons, inputs
- 8px (lg) — cards, dialogs
- 9999px — pills, badges (full-round)
- 16px — larger badges

---

## Difference Map

### 1. NEW: Status Bar (bottom of app)
**Files**: New component `StatusBar.tsx`, `App.tsx`, `App.css`
- 30px height, `bg: --sidebar`, `border-top: 1px --border`
- **Left**: box icon + "v0.4.2" | git-branch + "main" | refresh-cw (green) + "Synced 2m ago"
- **Right**: sparkles (purple) + "Claude Sonnet 4" | file-text + "1,247 notes" | bell icon | settings icon
- Padding: 0 8px, items aligned center, gap 12px between items
- Font: Inter 11px, text color `--muted-foreground`
- Separators: "|" in `--border` color
- **All icons**: Lucide, 13-14px

### 2. NEW: Tab Bar (top of editor panel)
**Files**: `Editor.tsx`
- 45px height, `bg: --sidebar`, `border-bottom: 1px --sidebar-border`
- **Active tab**: `bg: --background`, border-right 1px `--border`, text 12px/500 `--foreground`, X close icon (14px lucide)
- **Inactive tab**: no fill, border-right + border-bottom 1px `--sidebar-border`, text 12px/normal `--muted-foreground`, X icon opacity 0 (show on hover)
- **Spacer**: fills remaining width, border-bottom 1px `--border`
- **Controls area** (right): border-left + border-bottom 1px `--border`, gap 12px, padding 0 12px
  - Plus icon (Phosphor, 16px)
  - Columns/split icon (Phosphor, 16px) — **disabled placeholder**
  - Arrows-out-simple/expand icon (Phosphor, 16px) — **disabled placeholder**

### 3. NEW: Breadcrumb Bar (below tab bar, above editor content)
**Files**: `Editor.tsx`
- 45px height, `bg: --background`, `border-bottom: 1px --border`
- Padding: 6px 16px
- **Left (breadcrumb)**: "Project" (12px, muted) › "Laputa App" (12px/500, foreground) · "1,284 words" (12px, muted) · "M" (12px/600, `--accent-yellow`) — M only when file modified
- **Right (actions)**: gap 12px, each 16px Phosphor icon in `--muted-foreground`
  - magnifying-glass (search in file)
  - git-branch (version history) — **disabled placeholder**
  - cursor-text (focus mode) — **disabled placeholder**
  - sparkle (AI assist) — **disabled placeholder**
  - dots-three (more options) — **disabled placeholder**

### 4. Sidebar Restructure
**Files**: `Sidebar.tsx`

#### Header changes:
- Current: "Laputa" title + theme toggle button
- New: "Laputa" title (17px/700, -0.3 ls) + search icon (16px Phosphor magnifying-glass) + settings/gear icon (16px)
- Theme toggle moved elsewhere (or removed from header)
- Padding: 12px 16px, height 45px, border-bottom 1px

#### Search bar added:
- Below header, padding 6px 12px, border-bottom 1px
- Input with magnifying-glass icon prefix, 13px text, placeholder "Search notes..."
- Height ~32px, border-radius 6px, bg `--secondary`

#### Navigation section restructured:
**Current**: flat list of filters (All Notes, People, Events, Changes, Favorites, Trash)
**New**: Two items in top nav:
- "All Notes" — file-text icon (Phosphor 16px) + label 13px/500 + count badge (pill, bg `--secondary`, 10px text)
- "Favorites" — star icon (Phosphor 16px) + same style

#### Section groups restructured:
**Current**: PROJECTS, EXPERIMENTS, RESPONSIBILITIES, PROCEDURES as expandable sections with items listed under each
**New**: Collapsible groups with consistent pattern:
- Each group: chevron-right (12px Lucide) + icon (18px Phosphor, bold) + label (13px/600) + count badge (pill)
- **Projects** — folder-open icon (Phosphor)
- **Experiments** — flask icon (Phosphor)
- **Responsibilities** — target icon (Phosphor) — **currently not in sidebar**
- **Procedures** — arrows-clockwise icon (Phosphor)
- **People** — users icon (Phosphor) — **moved from filter to section group**
- **Events** — calendar-blank icon (Phosphor) — **moved from filter to section group**
- **Topics** — tag icon (Phosphor) — **currently at bottom, now integrated as a group**

Each group has:
- Container: padding 4px 6px, border-bottom 1px (disabled in some), vertical layout, gap 2px
- Header row: padding 6px 16px, corner-radius 4px, gap 8px, justify space-between
- Badge: height 20px, bg `--secondary`, corner-radius 9999px, padding 0 6px

#### Removed from sidebar:
- "Untagged" filter — not in new design
- "Changes" filter — not in new design (modified files shown elsewhere)
- "Trash" filter — not in new design
- "People" as top-level filter — now a collapsible section group
- "Events" as top-level filter — now a collapsible section group

#### Commit button:
- Same concept but refined: padding 12px, border-top 1px
- Button: fill `--primary`, corner-radius 6px, gap 6px, padding 8px 16px
- Icon: git-commit-horizontal (Lucide 14px) in `--primary-foreground`
- Text: "Commit & Push" (13px/500)
- Badge: bg `#ffffff40`, corner-radius 9px, text `--white` 10px/600

### 5. NoteList Changes
**Files**: `NoteList.tsx`

#### Header:
- Current: title + count badge + create button
- New: "Notes" title (14px/600) + search icon (16px Phosphor) + plus icon (16px Phosphor) — gap 12px
- No separate count badge in header

#### Search:
- Current: always-visible search input below header
- New: search icon in header (search may toggle inline or use command palette)
- **Remove the always-visible search input** or keep it hidden until search icon clicked

#### Type pills:
- Current: rounded-full, border, `text-[11px]`, system font, "Projects 4" format
- New: `IBM Plex Mono` font, 11px, ALL CAPS format "ALL 24" / "PROJECTS 4" / "NOTES 12" / "EVENTS 5"
- Active pill: `bg: #4a9eff18` (blue tint), `border: 1px --primary`, text `--primary`
- Inactive pill: `border: 1px --border`, text `--muted-foreground`
- Pill padding: 2px 10px, corner-radius 9999px
- Height: ~18px (compact)
- Layout: absolute positioned at x offsets (12, 76, 166, 243) within 45px height container — effectively a horizontal scrollable row

#### Note items:
- Selected: `bg: #2383E212` (very light blue), left accent bar 3px `#2383E2`, title 13px/600
- Normal: border-bottom 1px `#E9E9E7`, title 13px/500, time 11px, snippet 12px/lh1.5
- Padding: 10px 16px
- **No type badge** on individual items (simplified)
- **No status text** on items

### 6. Editor Content Area
**⚠️ SKIP — Keep editor as-is. Editor changes in the design are NOT intentional.**

### 7. Inspector Refinements
**Files**: `Inspector.tsx`

#### Header:
- Current: collapsed toggle + title
- New: sliders-horizontal icon (16px Phosphor) + "Properties" (13px/600, `--muted-foreground`) + X close button (16px Phosphor)
- Height 45px, border-bottom 1px, padding 0 12px, gap 8px

#### Properties section:
- Key-value rows: label (12px, muted) — value (12px, foreground), space-between
- Status badge: colored bg (e.g., `--accent-green-light`) with colored text (e.g., `--accent-green`), rounded, padding 1px 6px, 10px font
- "+ Add property" button: full-width, border 1px `--border`, corner-radius 6px, padding 6px 12px, centered text (12px, muted)

#### Relationships section:
- Group title: 12px/600 foreground
- Link buttons: full-width, bg `--accent-blue-light`, corner-radius 6px, padding 6px 10px, text `--primary` 12px/500, icon (tag/flask, Phosphor 14px, 0.5 opacity)
- "+ Link existing" button: border 1px `--border`, corner-radius 6px, same padding

#### Backlinks:
- Title: "Backlinks" 12px/600 + count 11px/500 muted
- Items: text `--primary` 12px

#### History:
- Title: "History" 12px/600
- Items: left border 2px `--border`, padding-left 10px
- Hash line: 11px foreground
- Date line: 10px muted

### 8. Icon Library Change
**Current**: Lucide React throughout
**New**: **SF Symbols** (Apple's native icon set) for all new/redesigned icons. Use `sf-symbols-react` or inline SVGs extracted from SF Symbols app.

**Note**: The Pencil design used Phosphor as a placeholder — Luca's intent is SF Symbols throughout. Map Phosphor names to SF Symbol equivalents:
- `magnifying-glass` → `magnifyingglass`
- `star` → `star.fill`
- `folder-open` → `folder`
- `flask` → `flask`
- `target` → `target`
- `arrows-clockwise` → `arrow.clockwise`
- `users` → `person.2`
- `calendar-blank` → `calendar`
- `tag` → `tag`
- `plus` → `plus`
- `columns` → `rectangle.split.2x1`
- `arrows-out-simple` → `arrow.up.left.and.arrow.down.right`
- `sliders-horizontal` → `slider.horizontal.3`
- `cursor-text` → `character.cursor.ibeam`
- `sparkle` → `sparkles`
- `dots-three` → `ellipsis`
- `git-branch` → `arrow.triangle.branch`
- `gear` → `gearshape`

**Action**: Find the best approach for SF Symbols in React/Tauri (e.g., `sf-symbols-react`, SVG extraction, or native font)

---

## Implementation Phases

### Phase 1: Theme & Typography Updates
**Scope**: CSS variables, fonts, colors — no structural changes
**Files**: `src/index.css`, `index.html` (or font import)
**Estimated effort**: 1 Claude Code session

1. **Add IBM Plex Mono font** — add Google Fonts import or npm package
2. **Update color variables in `index.css`**:
   - `:root` (light): `--primary: #155DFF`, `--accent-green: #00B38B`, `--accent-purple: #A932FF`, `--accent-blue: #155DFF`
   - `.dark`: same primary `#155DFF`, accent-green `#00B38B`, accent-purple `#A932FF`
   - Add new variables: `--accent-yellow`, `--accent-blue-light`, `--accent-green-light`, `--accent-purple-light`, `--accent-red-light`, `--accent-yellow-light` (both modes)
   - Update all `--ring`, `--sidebar-primary`, `--sidebar-ring` to match new primary
   - Update app-specific vars: `--accent-blue`, `--accent-green`, `--accent-purple`, `--accent-blue-bg` etc.
3. **Update `theme.json`**:
   - `headings.h2.fontSize`: 27 → 24
   - `editor.paddingHorizontal`: 40 → 64
   - `editor.paddingVertical`: 20 → 32
4. **Install Phosphor Icons**: `pnpm add @phosphor-icons/react`

### Phase 2: Sidebar Restructure
**Scope**: Sidebar layout, navigation, icons
**Files**: `src/components/Sidebar.tsx`
**Estimated effort**: 1 Claude Code session

1. **Header**: Replace theme toggle with search icon (Phosphor `MagnifyingGlass`) + gear icon. Move theme toggle to status bar settings or a menu.
2. **Add search input** below header: Phosphor magnifying-glass prefix, 13px, bg `--secondary`, border-radius 6px
3. **Top nav**: Reduce to "All Notes" (Phosphor `FileText` 16px) and "Favorites" (Phosphor `Star` 16px), each with count badge pill
4. **Section groups**: Restructure to new pattern with:
   - Consistent chevron + Phosphor icon (18px, bold) + label (13px/600) + count badge
   - Icons: `FolderOpen` (Projects), `Flask` (Experiments), `Target` (Responsibilities), `ArrowsClockwise` (Procedures), `Users` (People), `CalendarBlank` (Events), `Tag` (Topics)
   - Move People and Events from filters to section groups
   - Remove "Untagged", "Changes", "Trash" from nav
5. **Commit button**: Update styling to match design (padding, badge style)
6. **Remove** People/Events/Changes/Trash/Untagged filter items

### Phase 3: NoteList Updates
**Scope**: Header, type pills, note item styling
**Files**: `src/components/NoteList.tsx`
**Estimated effort**: 1 Claude Code session

1. **Header**: Replace badge + create button with search icon (Phosphor `MagnifyingGlass`) + plus icon (Phosphor `Plus`), gap 12px
2. **Remove or hide** the always-visible search input — add toggle behavior on search icon click
3. **Type pills**: Switch to IBM Plex Mono, ALL CAPS format ("ALL 24", "PROJECTS 4"), update active/inactive styles per design
4. **Selected note**: Update to `bg: #2383E212`, left accent 3px `#2383E2` (update to new primary), remove type badge and status text from items
5. **Note items**: Adjust padding to 10px 16px, snippet line-height 1.5, remove type/status badges from individual items

### Phase 4: Editor — Tab Bar & Info Bar
**Scope**: New sub-components within Editor
**Files**: `src/components/Editor.tsx`, `src/components/Editor.css`
**Estimated effort**: 1 Claude Code session

1. **Tab Bar** (top of editor):
   - 45px, bg `--sidebar`, border-bottom
   - Active tab: bg `--background`, border-right, 12px/500 text, X close button
   - Inactive tab: muted text, hidden X (show on hover)
   - Right controls: Plus + Split (disabled) + Expand (disabled) — Phosphor icons
2. **Info Bar** (below tab bar):
   - 45px, bg `--background`, border-bottom
   - Left: breadcrumb `Type › Title · N words · M` (M in accent-yellow when modified)
   - Right: icon buttons (magnifying-glass functional, git-branch/cursor-text/sparkle/dots-three as **disabled placeholders** with `opacity: 0.4, cursor: not-allowed`)
3. **Adjust editor content padding** to 32px 64px per design

### Phase 5: Status Bar + Inspector Polish
**Scope**: New StatusBar component, Inspector refinements
**Files**: New `src/components/StatusBar.tsx`, `App.tsx`, `App.css`, `src/components/Inspector.tsx`
**Estimated effort**: 1 Claude Code session

1. **StatusBar.tsx** (new component):
   - 30px fixed at bottom, bg `--sidebar`, border-top 1px
   - Left: version + branch + sync status
   - Right: AI model + notes count + bell (disabled placeholder) + settings (disabled placeholder)
   - All Lucide icons 13-14px
2. **App.tsx / App.css**: Add StatusBar below main content, wrap layout in vertical flex (main panels + status bar)
3. **Inspector refinements**:
   - Header: Phosphor `SlidersHorizontal` icon + "Properties" label + Phosphor `X` close
   - Status badge: use `--accent-*-light` bg colors with `--accent-*` text
   - "+ Add property" and "+ Link existing" buttons: match border/radius/padding from design
   - History items: left-border 2px timeline style, 10px date text

### Phase 6: Icon Migration & Cleanup
**Scope**: Replace Lucide icons with Phosphor where specified
**Files**: All components
**Estimated effort**: 1 Claude Code session

1. **Audit all icon usage** across components
2. **Replace with Phosphor** where the design specifies (sidebar nav, section icons, NoteList header, editor toolbar icons, inspector)
3. **Keep Lucide** for: chevrons, X/close, tab close, status bar icons, git-commit-horizontal
4. **Remove unused Lucide imports**
5. **Visual verification**: Run `pnpm dev` and compare with `ui-design-screenshot.png`

---

## New Features as Disabled Placeholders

These buttons/icons appear in the design but don't have backend functionality yet. Add them as disabled UI elements:

| Element | Location | Icon | Notes |
|---|---|---|---|
| Split view | Tab bar controls | Phosphor `Columns` | `opacity: 0.4, cursor: not-allowed, title="Coming soon"` |
| Expand/focus | Tab bar controls | Phosphor `ArrowsOutSimple` | Same |
| Git branch viewer | Info bar right | Phosphor `GitBranch` | Same |
| Focus mode | Info bar right | Phosphor `CursorText` | Same |
| AI assist | Info bar right | Phosphor `Sparkle` | Same |
| More options | Info bar right | Phosphor `DotsThree` | Same |
| Bell/notifications | Status bar right | Lucide `Bell` | Same |
| Settings | Status bar right | Lucide `Settings` | Same |
| Gear/settings | Sidebar header | Phosphor `Gear` | Same |

---

## Files Inventory

| File | Changes |
|---|---|
| `src/index.css` | Color variables, font import |
| `src/theme.json` | H2 size, editor padding |
| `index.html` | IBM Plex Mono font link (if using CDN) |
| `package.json` | Add `@phosphor-icons/react` |
| `src/App.tsx` | Add StatusBar, adjust layout |
| `src/App.css` | Vertical flex for status bar |
| `src/components/Sidebar.tsx` | Major restructure |
| `src/components/NoteList.tsx` | Header, pills, item styling |
| `src/components/Editor.tsx` | Add TabBar, InfoBar sections |
| `src/components/Editor.css` | Tab/info bar styles |
| `src/components/Inspector.tsx` | Header, badges, history styling |
| `src/components/StatusBar.tsx` | **NEW** |
