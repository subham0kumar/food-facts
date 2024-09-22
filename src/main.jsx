import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import SearchContext from "./Contexts/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContext>
        <App />
      </SearchContext>
    </BrowserRouter>
  </React.StrictMode>
);
