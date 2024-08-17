import React from 'react'
import ReactDOM from 'react-dom/client'
import "modern-normalize"
import App from './components/App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
