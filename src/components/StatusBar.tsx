import { Package, GitBranch, RefreshCw, Sparkles, FileText, Bell, Settings } from 'lucide-react'

export function StatusBar() {
  return (
    <footer
      style={{
        height: 30,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--sidebar)',
        borderTop: '1px solid var(--border)',
        padding: '0 8px',
        fontSize: 11,
        color: 'var(--muted-foreground)',
      }}
    >
      {/* Left section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Package size={13} />
          v0.4.2
        </span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <GitBranch size={13} />
          main
        </span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <RefreshCw size={13} style={{ color: 'var(--accent-green)' }} />
          Synced 2m ago
        </span>
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Sparkles size={13} style={{ color: 'var(--accent-purple)' }} />
          Claude Sonnet 4
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <FileText size={13} />
          1,247 notes
        </span>
        <span
          style={{ display: 'flex', alignItems: 'center', opacity: 0.4, cursor: 'not-allowed' }}
          title="Coming soon"
        >
          <Bell size={14} />
        </span>
        <span
          style={{ display: 'flex', alignItems: 'center', opacity: 0.4, cursor: 'not-allowed' }}
          title="Coming soon"
        >
          <Settings size={14} />
        </span>
      </div>
    </footer>
  )
}
