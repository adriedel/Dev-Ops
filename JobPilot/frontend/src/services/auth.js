import { API_URL, DEMO_MODE } from "../utils/constants";

const DEMO_USER = {
  id: "demo-user",
  email: "demo@jobpilot.local",
  name: "Demo-Zugang",
};

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
  if (DEMO_MODE) {
    return DEMO_USER;
  }

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
  window.location.href = DEMO_MODE ? "/dashboard" : "/";
}

// Check if logged in
export function isAuthenticated() {
  return DEMO_MODE || !!localStorage.getItem("token");
}

// Get token
export function getToken() {
  if (DEMO_MODE) {
    return localStorage.getItem("token") || "demo-token";
  }

  return localStorage.getItem("token");
}
