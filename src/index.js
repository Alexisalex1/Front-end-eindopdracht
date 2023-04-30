import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import {BrowserRouter as Router} from "react-router-dom";
import FavoritesContextProvider from "./context/favoritesContext";
import "./dark.css"
import "./light.css"
import ThemeContextProvider from "./context/themeContext";
import AuthProvider from "./context/authProvider";

{/*all the contextProviders are here, plus the browserRouter*/}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <ThemeContextProvider>
          <FavoritesContextProvider>
              <Router>
                  <AuthProvider>
                      <App/>
                  </AuthProvider>
              </Router>
          </FavoritesContextProvider>
          </ThemeContextProvider>
  </React.StrictMode>
);