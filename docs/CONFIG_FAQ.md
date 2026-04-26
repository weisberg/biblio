# Config FAQ

## Q: How do I run live preview and edit quickly in VS Code?

1. Run pnpm dev.
2. Open the local URL printed by Vite.
3. Keep the app open while editing files.
4. Save changes and confirm hot reload behavior immediately.

## Q: Where were most visual note-list tweaks made?

Most of this session's typography and spacing changes were made in:

- src/components/NoteItem.tsx

Main touchpoints in that file:

- NoteTitleRow: title font weight
- NoteSnippet: snippet text color
- NoteDateRow: date size, weight, and color
- NoteTypeIndicator: type icon dimensions
- note-content-stack wrapper: vertical spacing

## Q: How do I make note title text more or less bold?

In NoteTitleRow (in src/components/NoteItem.tsx), change the Tailwind weight class in the title container.

Common options:

- font-medium
- font-semibold
- font-bold

## Q: How do I make note snippet text pure black?

In NoteSnippet (in src/components/NoteItem.tsx), set the text class to text-black.

Example style intent:

- from muted text to pure black for higher contrast

## Q: How do I make date labels bold, black, and smaller?

In NoteDateRow (in src/components/NoteItem.tsx):

1. Update both spans, not just one:

Modified label span and created label span should both be updated.

1. Use matching classes on both so they stay visually consistent.

Current session pattern:

- text-[9px] font-bold text-black

## Q: How do I reduce spacing below the title by half?

In StandardNoteContent (in src/components/NoteItem.tsx), reduce the vertical stack spacing.

Example:

- from space-y-1
- to space-y-0.5

## Q: How do I change the type icon size in the note list?

In NoteTypeIndicator (in src/components/NoteItem.tsx), update SVG width and height.

Current setting after this session:

- width 16
- height 16

If you increase icon size, double-check vertical alignment with top and right position classes.

## Q: How do I reduce horizontal padding in wide editor mode?

Wide mode CSS variables are computed in:

- src/components/editor-content/useEditorContentModel.ts

To minimize horizontal padding in wide mode:

1. In the wideTextArea branch, set --editor-padding-horizontal to 0px.
2. Keep --editor-max-width aligned with intended wide behavior.

Also update tests in:

- src/components/editor-content/useEditorContentModel.test.tsx

## Q: How do I set the color for a type?

Human path in app:

1. Open type customization popover.
2. Pick a preset color.
3. Confirm notes with that type reflect the new accent color.

Developer path:

- UI for the popover is in src/components/TypeCustomizePopover.tsx
- Color mapping logic is in src/utils/typeColors.ts

## Q: How do I add or use custom hex colors for type customization?

This session added custom hex support.

Files involved:

- src/components/TypeCustomizePopover.tsx
- src/utils/typeColors.ts
- src/utils/typeColors.test.ts
- src/components/TypeCustomizePopover.test.tsx

Behavior to keep:

1. Accept hex with or without leading #.
2. Normalize short hex (example: #abc to #aabbcc).
3. Reject invalid color text.
4. Preserve preset palette behavior for known color keys.
5. Generate a light background variant from custom colors.

Implementation notes:

- Use toHexColor and color validation utilities instead of custom regex-only parsing.
- Keep both UI tests and color utility tests updated when behavior changes.

## Q: What tests should I update when making similar changes?

For editor wide mode behavior:

- src/components/editor-content/useEditorContentModel.test.tsx

For type color logic:

- src/utils/typeColors.test.ts

For type customization UI:

- src/components/TypeCustomizePopover.test.tsx

For pure visual tweaks in NoteItem, quick manual verification in live preview is usually enough unless behavior changed.

## Q: Quick verification checklist for humans and developers

1. Start live preview with pnpm dev.
2. Open a note list with multiple entries.
3. Verify title weight, snippet color, and both date labels.
4. Confirm type icon size and alignment.
5. Toggle wide mode and confirm reduced horizontal padding.
6. Open type customization, apply preset and custom hex colors, and verify results in note list and related UI.
