import { API_URL } from "../utils/constants";

// Register
export async function register(email, password, name) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registrierung fehlgeschlagen");
  }

  return data;
}

// Login
export async function login(email, password, rememberMe = false) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, rememberMe }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login fehlgeschlagen");
  }

  return data;
}

// Get current user
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Nicht eingeloggt");
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Fehler beim Laden des Users");
  }

  return data.user;
}

// Logout
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/"; // Redirect zur Landing Page
}

// Check if logged in
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// Get token
export function getToken() {
  return localStorage.getItem("token");
}
