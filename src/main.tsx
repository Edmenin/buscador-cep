import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buscador from "./pages/buscador";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Buscador />
  </StrictMode>
);