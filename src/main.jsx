import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className='w-full md:w-11/12 mx-2 md:mx-auto my-4'>
      <App />
    </main>
  </React.StrictMode>,
)
