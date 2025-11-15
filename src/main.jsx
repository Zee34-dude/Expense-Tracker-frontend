import React from 'react'
import ReactDom from 'react-dom/client'
import UserProvider from './context/UserContext.jsx'

import App from './App.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
