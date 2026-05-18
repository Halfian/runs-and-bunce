import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { createRoot } from 'react-dom/client'
import Dashboard from './pages/Dashboard.jsx'
import Settings from './pages/Settings.jsx'
import Callback from './utils/Callback.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  </BrowserRouter>
)
