// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { ClerkProvider } from "@clerk/clerk-react";
// import { Provider } from "react-redux";

// import "./index.css";
// import { store } from "./app/store.js";

// // Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// createRoot(document.getElementById("root")).render(
//   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//     <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//     </BrowserRouter>
//   </ClerkProvider>
// );
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";
import "./index.css";

// Import your Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key! Add VITE_CLERK_PUBLISHABLE_KEY in .env");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Wrap everything in ClerkProvider */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* ✅ Redux and Router inside Clerk */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);

