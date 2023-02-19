import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Panel from './Panel/Panel'
import app from 'App'
import './index.css'

app.setTranslations({})
app.setLocale({ key: 'en', isRtl: false })
document.dir = 'ltr'
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <StrictMode>
    <BrowserRouter>
      <Panel />
    </BrowserRouter>
  </StrictMode>
)
