import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { CRMProvider } from './context/CRMContext'
import { ModalProvider } from './context/ModalContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <CRMProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </CRMProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
