import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from "react-hot-toast"

import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <App />
    <Toaster/>
  </AuthProvider>

)
