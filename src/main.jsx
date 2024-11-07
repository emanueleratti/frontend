import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { BooksContextProvider } from "./context/BooksContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
