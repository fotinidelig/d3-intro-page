import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTypographyTheme } from './theme/typography.js'
import './index.css'
import App from './App.jsx'

applyTypographyTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
