# SF Symbols Migration Plan

> Current state: All icons use either **Phosphor Icons** (`@phosphor-icons/react`) or **Lucide React** (`lucide-react`). This document maps every icon to its SF Symbol equivalent for future migration.

---

## Icon Audit Summary (Phase 6 — 2026-02-17)

| Category | Count | Files | Status |
|---|---|---|---|
| Phosphor icons | 22 | `Sidebar.tsx`, `Editor.tsx`, `NoteList.tsx`, `Inspector.tsx` | All used, migrate to SF Symbols |
| Phosphor types | 1 (`IconProps`) | `Sidebar.tsx` | Type only — replace when migrating |
| Lucide (app components) | 4 | `Sidebar.tsx`, `Editor.tsx` | Evaluate per-icon |
| Lucide (StatusBar) | 7 | `StatusBar.tsx` | Keep Lucide per design |
| Lucide (shadcn/ui) | 7 | `ui/select.tsx`, `ui/dropdown-menu.tsx`, `ui/dialog.tsx` | Keep Lucide — library internals |
| **Total icon imports** | **41** | **8 files** | **0 unused** |

**Unused imports found**: None. All icon imports are actively used in JSX.

---

## Phosphor Icons — Current Usage

These are the primary UI icons introduced during the redesign. All should migrate to SF Symbols.

| Phosphor Icon | SF Symbol Equivalent | File(s) | Usage |
|---|---|---|---|
| `MagnifyingGlass` | `magnifyingglass` | `Sidebar.tsx`, `NoteList.tsx`, `Editor.tsx` | Search icon in sidebar header, note list header, editor info bar |
| `Gear` | `gearshape` | `Sidebar.tsx` | Settings icon in sidebar header (disabled placeholder) |
| `FileText` | `doc.text` | `Sidebar.tsx` | "All Notes" nav item icon |
| `Star` | `star.fill` | `Sidebar.tsx` | "Favorites" nav item icon |
| `FolderOpen` | `folder` | `Sidebar.tsx` | "Projects" section group icon |
| `Flask` | `flask` | `Sidebar.tsx` | "Experiments" section group icon |
| `Target` | `target` | `Sidebar.tsx` | "Responsibilities" section group icon |
| `ArrowsClockwise` | `arrow.clockwise` | `Sidebar.tsx` | "Procedures" section group icon |
| `Users` | `person.2` | `Sidebar.tsx` | "People" section group icon |
| `CalendarBlank` | `calendar` | `Sidebar.tsx` | "Events" section group icon |
| `Tag` | `tag` | `Sidebar.tsx` | "Topics" section group icon |
| `TagSimple` | `tag` | `Sidebar.tsx` | "Untagged" nav item icon |
| `Trash` | `trash` | `Sidebar.tsx` | "Trash" nav item icon |
| `Plus` | `plus` | `NoteList.tsx`, `Editor.tsx` | Create note button, new tab button |
| `Columns` | `rectangle.split.2x1` | `Editor.tsx` | Split view button (disabled placeholder) |
| `ArrowsOutSimple` | `arrow.up.left.and.arrow.down.right` | `Editor.tsx` | Expand/focus button (disabled placeholder) |
| `GitBranch` | `arrow.triangle.branch` | `Editor.tsx` | Version history button (disabled placeholder) |
| `CursorText` | `character.cursor.ibeam` | `Editor.tsx` | Focus mode button (disabled placeholder) |
| `Sparkle` | `sparkles` | `Editor.tsx` | AI assist button (disabled placeholder) |
| `DotsThree` | `ellipsis` | `Editor.tsx` | More options button (disabled placeholder) |
| `SlidersHorizontal` | `slider.horizontal.3` | `Inspector.tsx` | Inspector header icon |
| `X` (Phosphor) | `xmark` | `Inspector.tsx` | Inspector close button |
| `IconProps` (type) | n/a | `Sidebar.tsx` | TypeScript type for icon component props |

---

## Lucide React — Current Usage

### App Components

These Lucide icons are used in custom app components. Some may migrate to SF Symbols; others are kept for specific reasons.

| Lucide Icon | SF Symbol Equivalent | File | Usage | Migration Notes |
|---|---|---|---|---|
| `ChevronRight` | `chevron.right` | `Sidebar.tsx` | Section group expand chevron | Keep Lucide or migrate — small utility icon |
| `ChevronDown` | `chevron.down` | `Sidebar.tsx` | Section group collapse chevron | Keep Lucide or migrate — small utility icon |
| `GitCommitHorizontal` | `circle.dotted` | `Sidebar.tsx` | Commit & Push button icon | Keep Lucide or migrate |
| `X` (Lucide) | `xmark` | `Editor.tsx` | Tab close button | Keep Lucide or migrate |
| `Package` | `shippingbox` | `StatusBar.tsx` | App version indicator | Keep Lucide — status bar uses Lucide per design |
| `GitBranch` (Lucide) | `arrow.triangle.branch` | `StatusBar.tsx` | Git branch indicator | Keep Lucide — status bar uses Lucide per design |
| `RefreshCw` | `arrow.clockwise` | `StatusBar.tsx` | Sync status indicator | Keep Lucide — status bar uses Lucide per design |
| `Sparkles` (Lucide) | `sparkles` | `StatusBar.tsx` | AI model indicator | Keep Lucide — status bar uses Lucide per design |
| `FileText` (Lucide) | `doc.text` | `StatusBar.tsx` | Notes count indicator | Keep Lucide — status bar uses Lucide per design |
| `Bell` | `bell` | `StatusBar.tsx` | Notifications (disabled placeholder) | Keep Lucide — status bar uses Lucide per design |
| `Settings` | `gearshape` | `StatusBar.tsx` | Settings (disabled placeholder) | Keep Lucide — status bar uses Lucide per design |

### shadcn/ui Components (Keep Lucide)

These are standard shadcn/ui library components that use Lucide as their built-in icon system. These should **not** be migrated — they are part of the component library's internal implementation.

| Lucide Icon | File | Usage |
|---|---|---|
| `CheckIcon` | `ui/select.tsx` | Selected item indicator |
| `ChevronDownIcon` | `ui/select.tsx` | Select trigger arrow, scroll-down button |
| `ChevronUpIcon` | `ui/select.tsx` | Scroll-up button |
| `CheckIcon` | `ui/dropdown-menu.tsx` | Checkbox item indicator |
| `ChevronRightIcon` | `ui/dropdown-menu.tsx` | Sub-menu trigger arrow |
| `CircleIcon` | `ui/dropdown-menu.tsx` | Radio item indicator |
| `XIcon` | `ui/dialog.tsx` | Dialog close button |

---

## Approach Options for SF Symbols in React/Tauri

### Option 1: `sf-symbols-react` npm package
- **Pros**: Drop-in React components, familiar API (`<SFSymbol name="magnifyingglass" />`)
- **Cons**: Third-party package, may lag behind Apple's symbol updates, limited weight/rendering options
- **Status**: Check npm for current maintenance state before adopting

### Option 2: SVG extraction from SF Symbols app
- **Pros**: Exact Apple-quality vectors, no runtime dependency, full control over styling
- **Cons**: Manual export process per icon, potential licensing concerns (SF Symbols license restricts use to Apple platforms), need to manage SVG sprite or individual files
- **How**: Export SVGs from the SF Symbols macOS app, create a `src/icons/` directory with individual SVG components or a sprite sheet

### Option 3: Apple's SF Symbols font (native approach via Tauri)
- **Pros**: Pixel-perfect on macOS, automatic weight matching, system-native feel
- **Cons**: Only works on macOS (not cross-platform), requires Tauri native font access, won't render in browser dev mode
- **How**: Use CSS `font-family: "SF Pro"` with Unicode code points, or invoke native APIs from Tauri's Rust backend

### Option 4: Hybrid — SVG in browser, native in Tauri
- **Pros**: Best of both worlds — browser dev mode uses SVGs, production Tauri build uses native SF Symbols
- **Cons**: More complex build setup, need to maintain two icon systems
- **How**: Build an `<Icon>` wrapper component that checks `window.__TAURI__` and renders native or SVG accordingly

### Recommendation
**Option 2 (SVG extraction)** is the most practical starting point:
- Laputa is a macOS-only Tauri app, so SF Symbols licensing applies (Apple platform)
- SVGs work in both browser dev mode and Tauri production
- No third-party dependency to maintain
- Can later upgrade to Option 4 (hybrid native) for perfect macOS integration

---

## Migration Steps (Future)

1. Export all needed SF Symbol SVGs from the SF Symbols macOS app
2. Create `src/icons/sf-symbols/` with a React component per icon (or a single sprite)
3. Build a thin `<SFIcon name="..." size={} />` wrapper for consistent API
4. Replace Phosphor imports file-by-file (Sidebar → NoteList → Editor → Inspector)
5. Decide whether to also replace Lucide in StatusBar and utility icons (chevrons, X)
6. Keep Lucide in shadcn/ui components — do not modify those
7. Once all Phosphor icons are replaced, remove `@phosphor-icons/react` from dependencies
8. Run `pnpm build` and visually verify all icons render correctly
