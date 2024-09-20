import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SearchContext from "./Contexts/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchContext>
      <App />
    </SearchContext>
  </StrictMode>
);
