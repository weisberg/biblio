import type React from 'react'
import { useMemo, useRef } from 'react'
import type { useCreateBlockNote } from '@blocknote/react'
import type { NoteLayout, NoteStatus, VaultEntry } from '../../types'
import { useEditorTheme } from '../../hooks/useTheme'
import { deriveEditorContentState } from './editorContentState'

export interface Tab {
  entry: VaultEntry
  content: string
}

export interface EditorContentProps {
  activeTab: Tab | null
  isLoadingNewTab: boolean
  entries: VaultEntry[]
  editor: ReturnType<typeof useCreateBlockNote>
  diffMode: boolean
  diffContent: string | null
  diffLoading: boolean
  onToggleDiff: () => void
  rawMode: boolean
  onToggleRaw: () => void
  onRawContentChange?: (path: string, content: string) => void
  onSave?: () => void
  activeStatus: NoteStatus
  showDiffToggle: boolean
  showAIChat?: boolean
  onToggleAIChat?: () => void
  wideTextArea?: boolean
  onToggleWideTextArea?: () => void
  inspectorCollapsed: boolean
  onToggleInspector: () => void
  onNavigateWikilink: (target: string) => void
  onEditorChange?: () => void
  onToggleFavorite?: (path: string) => void
  onToggleOrganized?: (path: string) => void
  onDeleteNote?: (path: string) => void
  onArchiveNote?: (path: string) => void
  onUnarchiveNote?: (path: string) => void
  vaultPath?: string
  rawModeContent?: string | null
  rawLatestContentRef?: React.MutableRefObject<string | null>
  onRenameFilename?: (path: string, newFilenameStem: string) => void
  noteLayout?: NoteLayout
  onToggleNoteLayout?: () => void
  isConflicted?: boolean
  onKeepMine?: (path: string) => void
  onKeepTheirs?: (path: string) => void
}

export function useEditorContentModel(props: EditorContentProps) {
  const {
    activeTab,
    entries,
    rawMode,
    diffMode,
  } = props

  const { cssVars } = useEditorTheme()
  const effectiveCssVars = useMemo(() => {
    if (!props.wideTextArea) return cssVars
    return {
      ...cssVars,
      '--editor-max-width': '95vw',
      '--editor-padding-horizontal': '0px',
    }
  }, [cssVars, props.wideTextArea])
  const {
    isArchived,
    isDeletedPreview,
    isNonMarkdownText,
    effectiveRawMode,
    showEditor: showContentEditor,
    path,
    wordCount,
  } = deriveEditorContentState({
    activeTab,
    entries,
    rawMode,
    activeStatus: props.activeStatus,
  })
  const showEditor = !diffMode && showContentEditor

  const breadcrumbBarRef = useRef<HTMLDivElement | null>(null)

  return {
    ...props,
    cssVars: effectiveCssVars,
    isArchived,
    isDeletedPreview,
    effectiveRawMode,
    forceRawMode: isNonMarkdownText || isDeletedPreview,
    showEditor,
    path,
    breadcrumbBarRef,
    wordCount,
  }
}
