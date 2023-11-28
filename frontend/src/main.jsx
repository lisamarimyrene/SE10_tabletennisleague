import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
// Providers
import { TechnologyProvider } from "./providers/TechnologyProvider";

// Wrapped App in BrowserRouter to limit access.
// Wrapped App and BrowserRouter in a TechnologyProvider check if user is logged in or not. 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TechnologyProvider> {/* The API context */}
      <BrowserRouter> {/* Provides client-side routing functionality to a React application.*/}
        <App />
      </BrowserRouter>
    </TechnologyProvider>
  </React.StrictMode>,
)
