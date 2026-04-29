import { filterSuggestionItems } from '@blocknote/core/extensions'
import {
  getDefaultReactSlashMenuItems,
  type DefaultReactSuggestionItem,
} from '@blocknote/react'
import type { ReactElement } from 'react'
import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListChecks,
  ListOrdered,
  Pilcrow,
  Quote,
  type LucideIcon,
} from 'lucide-react'

type BiblioSlashMenuItem = DefaultReactSuggestionItem & { key: string }
type BiblioBlockTypeSelectItem = {
  name: string
  type: string
  props?: Record<string, boolean | number | string>
  icon: LucideIcon
}

const UNSUPPORTED_FORMATTING_TOOLBAR_KEYS = new Set([
  'underlineStyleButton',
  'textAlignLeftButton',
  'textAlignCenterButton',
  'textAlignRightButton',
  'colorStyleButton',
])

const UNSUPPORTED_SLASH_MENU_KEYS = new Set([
  'toggle_heading',
  'toggle_heading_2',
  'toggle_heading_3',
  'toggle_list',
])

const BIBLIO_BLOCK_TYPE_SELECT_ITEMS: BiblioBlockTypeSelectItem[] = [
  { name: 'Paragraph', type: 'paragraph', icon: Pilcrow },
  { name: 'Heading 1', type: 'heading', props: { level: 1 }, icon: Heading1 },
  { name: 'Heading 2', type: 'heading', props: { level: 2 }, icon: Heading2 },
  { name: 'Heading 3', type: 'heading', props: { level: 3 }, icon: Heading3 },
  { name: 'Heading 4', type: 'heading', props: { level: 4 }, icon: Heading4 },
  { name: 'Heading 5', type: 'heading', props: { level: 5 }, icon: Heading5 },
  { name: 'Heading 6', type: 'heading', props: { level: 6 }, icon: Heading6 },
  { name: 'Quote', type: 'quote', icon: Quote },
  { name: 'Bullet List', type: 'bulletListItem', icon: List },
  { name: 'Numbered List', type: 'numberedListItem', icon: ListOrdered },
  { name: 'Checklist', type: 'checkListItem', icon: ListChecks },
  { name: 'Code Block', type: 'codeBlock', icon: Code2 },
]

const BIBLIO_SLASH_MENU_SUPPORT_SUBTEXT: Partial<Record<string, string>> = {
  heading: 'Markdown-safe heading (`#`). Persists after save and note switches.',
  heading_2: 'Markdown-safe heading (`##`). Persists after save and note switches.',
  heading_3: 'Markdown-safe heading (`###`). Persists after save and note switches.',
  heading_4: 'Markdown-safe heading (`####`). Persists after save and note switches.',
  heading_5: 'Markdown-safe heading (`#####`). Persists after save and note switches.',
  heading_6: 'Markdown-safe heading (`######`). Persists after save and note switches.',
  quote: 'Markdown-safe block quote (`>`). Persists after save and note switches.',
  bullet_list: 'Markdown-safe bullet list (`-`). Persists after save and note switches.',
  numbered_list: 'Markdown-safe numbered list (`1.`). Persists after save and note switches.',
  check_list: 'Markdown-safe checklist (`- [ ]`). Persists after save and note switches.',
  paragraph: 'Plain markdown paragraph text. Persists after save and note switches.',
  code_block: 'Markdown-safe fenced code block (```...```). Persists after save and note switches.',
}

export function getBiblioBlockTypeSelectItems() {
  return BIBLIO_BLOCK_TYPE_SELECT_ITEMS
}

export function filterBiblioFormattingToolbarItems<T extends ReactElement>(
  items: T[],
): T[] {
  return items.filter(
    (item) => !UNSUPPORTED_FORMATTING_TOOLBAR_KEYS.has(String(item.key)),
  )
}

export function filterBiblioSlashMenuItems<T extends BiblioSlashMenuItem>(
  items: T[],
): T[] {
  return items
    .filter((item) => !UNSUPPORTED_SLASH_MENU_KEYS.has(item.key))
    .map((item) => {
      const biblioSubtext = BIBLIO_SLASH_MENU_SUPPORT_SUBTEXT[item.key]
      if (!biblioSubtext) return item
      return {
        ...item,
        subtext: biblioSubtext,
      }
    }) as T[]
}

export function getBiblioSlashMenuItems(
  editor: Parameters<typeof getDefaultReactSlashMenuItems>[0],
  query: string,
) {
  return filterSuggestionItems(
    filterBiblioSlashMenuItems(
      getDefaultReactSlashMenuItems(editor) as BiblioSlashMenuItem[],
    ),
    query,
  )
}
