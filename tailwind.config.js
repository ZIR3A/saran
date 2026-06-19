import { theme as appTheme } from './src/constants/theme.js'

const { colors } = appTheme

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        deep: colors.deep,
        accent: colors.accent,
        'accent-muted': colors.accentMuted,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        borderTheme: colors.border,
        overlay: colors.overlay,
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
    },
  },
}
