import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { applyThemeVariables } from './constants/applyTheme'
import { resetScrollPosition } from './components/animations/scroll'
import './index.css'
import App from './App.jsx'

applyThemeVariables()
resetScrollPosition()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
