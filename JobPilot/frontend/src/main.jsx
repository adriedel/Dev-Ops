import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./App.jsx";
import Profile from "./components/Profile/Profile";
import QuickAdd from "./pages/QuickAdd";
import BookmarkletInstall from "./pages/BookmarkletInstall";
import ProtectedRoute from "./components/ProtectedRoute";
import { DEMO_MODE } from "./utils/constants";
import "./index.css";

// Root Component mit Routing
export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            DEMO_MODE ? <Navigate to="/dashboard" replace /> : <LandingPage />
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Bookmarklet Routes */}
        <Route path="/quick-add" element={<QuickAdd />} />
        <Route path="/bookmarklet" element={<BookmarkletInstall />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
