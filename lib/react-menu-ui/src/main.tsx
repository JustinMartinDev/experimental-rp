import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Menu from "./components/Menu.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Menu />
  </StrictMode>
);
