import { theme, cssVarNames } from './theme'

export function applyThemeVariables() {
  const root = document.documentElement
  const { colors, effects } = theme

  root.style.setProperty(cssVarNames.background, colors.background)
  root.style.setProperty(cssVarNames.surface, colors.surface)
  root.style.setProperty(cssVarNames.deep, colors.deep)
  root.style.setProperty(cssVarNames.accent, colors.accent)
  root.style.setProperty(cssVarNames.accentMuted, colors.accentMuted)
  root.style.setProperty(cssVarNames.textPrimary, colors.textPrimary)
  root.style.setProperty(cssVarNames.textSecondary, colors.textSecondary)
  root.style.setProperty(cssVarNames.border, colors.border)
  root.style.setProperty(cssVarNames.overlay, colors.overlay)
  root.style.setProperty(cssVarNames.glow, effects.glow)
  root.style.setProperty(cssVarNames.shadow, effects.shadow)

  const themeColorMeta = document.querySelector('meta[name="theme-color"]')
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', colors.background)
  }
}
