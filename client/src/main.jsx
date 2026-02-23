import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles
import './index.css'
import './App.css'
// Page-specific styles
import './styles/landing.css'
import './styles/auth.css'
import './styles/dashboard.css'
import './styles/components.css'
import './styles/admin.css'
import './styles/resources.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
