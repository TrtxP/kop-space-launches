import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import ThemeProvider from './context/ThemeProvider'
import LaunchFiltersProvider from './context/LaunchFiltersProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LaunchFiltersProvider>
          <App />
        </LaunchFiltersProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
