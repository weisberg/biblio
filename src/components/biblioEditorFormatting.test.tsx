import { describe, expect, it } from 'vitest'
import { getFormattingToolbarItems } from '@blocknote/react'
import {
  filterBiblioFormattingToolbarItems,
  filterBiblioSlashMenuItems,
  getBiblioBlockTypeSelectItems,
} from './biblioEditorFormattingConfig'

describe('biblioEditorFormatting', () => {
  it('keeps the markdown-safe toolbar controls and block type select', () => {
    const itemKeys = filterBiblioFormattingToolbarItems(
      getFormattingToolbarItems(getBiblioBlockTypeSelectItems()),
    ).map((item) => String(item.key))

    expect(itemKeys).toContain('blockTypeSelect')
    expect(itemKeys).toContain('boldStyleButton')
    expect(itemKeys).toContain('italicStyleButton')
    expect(itemKeys).toContain('strikeStyleButton')
    expect(itemKeys).toContain('createLinkButton')
    expect(itemKeys).toContain('nestBlockButton')
    expect(itemKeys).toContain('unnestBlockButton')

    expect(itemKeys).not.toContain('underlineStyleButton')
    expect(itemKeys).not.toContain('colorStyleButton')
    expect(itemKeys).not.toContain('textAlignLeftButton')
    expect(itemKeys).not.toContain('textAlignCenterButton')
    expect(itemKeys).not.toContain('textAlignRightButton')
  })

  it('returns the audited markdown-safe block types for the toolbar select', () => {
    expect(getBiblioBlockTypeSelectItems()).toEqual([
      expect.objectContaining({ name: 'Paragraph', type: 'paragraph' }),
      expect.objectContaining({ name: 'Heading 1', type: 'heading', props: { level: 1 } }),
      expect.objectContaining({ name: 'Heading 2', type: 'heading', props: { level: 2 } }),
      expect.objectContaining({ name: 'Heading 3', type: 'heading', props: { level: 3 } }),
      expect.objectContaining({ name: 'Heading 4', type: 'heading', props: { level: 4 } }),
      expect.objectContaining({ name: 'Heading 5', type: 'heading', props: { level: 5 } }),
      expect.objectContaining({ name: 'Heading 6', type: 'heading', props: { level: 6 } }),
      expect.objectContaining({ name: 'Quote', type: 'quote' }),
      expect.objectContaining({ name: 'Bullet List', type: 'bulletListItem' }),
      expect.objectContaining({ name: 'Numbered List', type: 'numberedListItem' }),
      expect.objectContaining({ name: 'Checklist', type: 'checkListItem' }),
      expect.objectContaining({ name: 'Code Block', type: 'codeBlock' }),
    ])
  })

  it('filters unsupported toggle slash-menu variants and annotates supported markdown commands', () => {
    type BiblioSlashMenuTestItem = {
      key: string
      title: string
      onItemClick: () => void
      subtext?: string
    }

    const items = filterBiblioSlashMenuItems([
      { key: 'toggle_heading', title: 'Toggle heading', onItemClick: () => {} },
      { key: 'toggle_list', title: 'Toggle list', onItemClick: () => {} },
      { key: 'heading', title: 'Heading', onItemClick: () => {} },
      { key: 'bullet_list', title: 'Bullet List', onItemClick: () => {} },
      { key: 'code_block', title: 'Code Block', onItemClick: () => {} },
    ] satisfies BiblioSlashMenuTestItem[])

    expect(items.map((item) => item.key)).toEqual([
      'heading',
      'bullet_list',
      'code_block',
    ])
    expect(items.find((item) => item.key === 'heading')?.subtext).toContain(
      'Markdown-safe heading',
    )
    expect(items.find((item) => item.key === 'bullet_list')?.subtext).toContain(
      'Markdown-safe bullet list',
    )
    expect(items.find((item) => item.key === 'code_block')?.subtext).toContain(
      'Markdown-safe fenced code block',
    )
  })
})
