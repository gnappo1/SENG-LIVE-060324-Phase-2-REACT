// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ClipLoader from "react-spinners/ClipLoader";

// import App from "./App";
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

console.log("🚀 ~ router:", router)
root.render(
  // <StrictMode>
  <RouterProvider router={router} fallbackElement={<ClipLoader />}/>
  // </StrictMode>
);