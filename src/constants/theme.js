export const theme = {
  colors: {
    background: '#0D1117',
    surface: '#161B22',
    deep: '#10151C',
    accent: '#FEEF4C',
    accentMuted: 'rgba(254, 239, 76, 0.45)',
    textPrimary: '#F0F6FC',
    textSecondary: '#8B95A8',
    border: 'rgba(254, 239, 76, 0.12)',
    overlay: '#0D1117',
  },
  effects: {
    glow: '0 0 16px var(--color-accent-muted)',
    shadow: '0 0 16px var(--color-accent-muted)',
  },
}

export const cssVarNames = {
  background: '--color-background',
  surface: '--color-surface',
  deep: '--color-deep',
  accent: '--color-accent',
  accentMuted: '--color-accent-muted',
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  border: '--color-border',
  overlay: '--color-overlay',
  glow: '--effect-glow',
  shadow: '--effect-shadow',
}
