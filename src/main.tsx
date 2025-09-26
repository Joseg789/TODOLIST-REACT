import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; //archivo principal de css donde importamos tailwind
import { TasksAppWithReducer } from "./TaskApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksAppWithReducer />
  </StrictMode>
);
