import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { inject } from '@vercel/analytics';


inject();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
      <App />
    
      {/* <RouterProvider  /> */}
    </BrowserRouter>
  // </StrictMode>,
)
