import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import i18next from 'i18next'
import './i18n'
import ScrollToTop from './utils/hooks/ScrollToTop'



const root = ReactDOM.createRoot(document.getElementById('root'))
i18next.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng)
})
root.render(
  //tloadi lpage martinn
// <React.StrictMode> 

      <Router>
        <ScrollToTop />
        <Layout />
      </Router>

//  </React.StrictMode> 
)
