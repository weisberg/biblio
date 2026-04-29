import {
  buildStableDownloadRedirectPage,
  extractStableDownloadTargets,
  extractStableDownloadTargetsFromReleases,
  resolveStableDownloadTargets,
} from './releaseDownloadPage'

describe('extractStableDownloadTargets', () => {
  it('returns stable downloads for each supported desktop platform when present', () => {
    expect(
      extractStableDownloadTargets({
        platforms: {
          'darwin-aarch64': {
            download_url: 'https://example.com/Biblio-aarch64.dmg',
          },
          'darwin-x86_64': {
            download_url: 'https://example.com/Biblio-x64.dmg',
          },
          'linux-x86_64': {
            download_url: 'https://example.com/Biblio.AppImage',
          },
          'windows-x86_64': {
            url: 'https://example.com/Biblio-setup.exe',
          },
        },
      }),
    ).toMatchObject({
      'darwin-aarch64': {
        label: 'macOS Apple Silicon',
        url: 'https://example.com/Biblio-aarch64.dmg',
      },
      'darwin-x86_64': {
        label: 'macOS Intel',
        url: 'https://example.com/Biblio-x64.dmg',
      },
      'linux-x86_64': {
        label: 'Linux',
        url: 'https://example.com/Biblio.AppImage',
      },
      'windows-x86_64': {
        label: 'Windows',
        url: 'https://example.com/Biblio-setup.exe',
      },
    })
  })
})

describe('buildStableDownloadRedirectPage', () => {
  it('builds a redirect page with platform-specific download links', () => {
    const html = buildStableDownloadRedirectPage({
      'darwin-aarch64': {
        buttonLabel: 'Download Biblio for macOS Apple Silicon',
        label: 'macOS Apple Silicon',
        url: 'https://example.com/Biblio-aarch64.dmg',
      },
      'darwin-x86_64': {
        buttonLabel: 'Download Biblio for Intel Mac',
        label: 'macOS Intel',
        url: 'https://example.com/Biblio-x64.dmg',
      },
      'windows-x86_64': {
        buttonLabel: 'Download Biblio for Windows',
        label: 'Windows',
        url: 'https://example.com/Biblio-setup.exe',
      },
    })

    expect(html).toContain('Biblio Stable Download')
    expect(html).toContain('DOWNLOAD_TARGETS')
    expect(html).toContain('Download Biblio for Windows')
    expect(html).toContain('Download Biblio for macOS Apple Silicon')
    expect(html).toContain('Download Biblio for Intel Mac')
    expect(html).toContain('hasMultipleMacDownloads')
    expect(html).toContain('Choose the Apple Silicon or Intel Mac download below.')
    expect(html).toContain('window.location.replace')
    expect(html).toContain('color-scheme: light dark')
    expect(html).toContain('@media (prefers-color-scheme: dark)')
    expect(html).toContain('background: var(--download-surface-page)')
  })

  it('builds a fallback page when no stable downloads exist yet', () => {
    const html = buildStableDownloadRedirectPage({})

    expect(html).toContain('Biblio Stable Download Unavailable')
    expect(html).toContain('View release history')
    expect(html).toContain('https://refactoringhq.github.io/biblio/')
    expect(html).not.toContain('DOWNLOAD_TARGETS')
  })
})

describe('resolveStableDownloadTargets', () => {
  it('falls back to stable release assets when latest.json is incomplete', () => {
    const latestPayload = {
      platforms: {
        'darwin-aarch64': {
          download_url: 'https://example.com/Biblio-aarch64.dmg',
        },
      },
    }
    const releasesPayload = [
      {
        prerelease: false,
        assets: [
          {
            name: 'Biblio_x64.dmg',
            browser_download_url: 'https://example.com/Biblio-x64.dmg',
          },
          {
            name: 'Biblio-setup.exe',
            browser_download_url: 'https://example.com/Biblio-setup.exe',
          },
          {
            name: 'Biblio.AppImage',
            browser_download_url: 'https://example.com/Biblio.AppImage',
          },
        ],
      },
    ]

    expect(extractStableDownloadTargetsFromReleases(releasesPayload)).toMatchObject({
      'darwin-x86_64': {
        url: 'https://example.com/Biblio-x64.dmg',
      },
      'linux-x86_64': {
        url: 'https://example.com/Biblio.AppImage',
      },
      'windows-x86_64': {
        url: 'https://example.com/Biblio-setup.exe',
      },
    })
    expect(resolveStableDownloadTargets(latestPayload, releasesPayload)).toMatchObject({
      'darwin-aarch64': {
        url: 'https://example.com/Biblio-aarch64.dmg',
      },
      'darwin-x86_64': {
        url: 'https://example.com/Biblio-x64.dmg',
      },
      'linux-x86_64': {
        url: 'https://example.com/Biblio.AppImage',
      },
      'windows-x86_64': {
        url: 'https://example.com/Biblio-setup.exe',
      },
    })
  })
})
