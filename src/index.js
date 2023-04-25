import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import FavoritesContextProvider from "./context/FavoritesContext";
import "./dark.css"
import "./light.css"
import ThemeContextProvider from "./context/themeContext";
import {AuthenticateContext} from "./authcontext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <ThemeContextProvider>
              <FavoritesContextProvider>
                  <AuthenticateContext.Provider>
                     <App />
                  </AuthenticateContext.Provider>
              </FavoritesContextProvider>
          </ThemeContextProvider>
      </Router>
  </React.StrictMode>
);