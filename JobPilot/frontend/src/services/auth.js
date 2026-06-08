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

async function parseJSON(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Server nicht erreichbar oder antwortet nicht korrekt");
  }
}

// Update profile name
export async function updateProfile(name) {
  const token = getToken();
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  const data = await parseJSON(response);
  if (!response.ok) throw new Error(data.error || "Fehler beim Speichern");
  return data.user;
}

// Upload profile image
export async function uploadProfileImage(file) {
  const token = getToken();
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`${API_URL}/auth/profile/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await parseJSON(response);
  if (!response.ok) throw new Error(data.error || "Fehler beim Upload");
  return data.user;
}

// Change email
export async function changeEmail(email) {
  const token = getToken();
  const response = await fetch(`${API_URL}/auth/profile/email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  const data = await parseJSON(response);
  if (!response.ok) throw new Error(data.error || "Fehler beim Ändern der E-Mail");
  return data.user;
}

// Change password
export async function changePassword(currentPassword, newPassword) {
  const token = getToken();
  const response = await fetch(`${API_URL}/auth/profile/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const data = await parseJSON(response);
  if (!response.ok) throw new Error(data.error || "Fehler beim Ändern des Passworts");
  return data;
}

// Delete profile image
export async function deleteProfileImage() {
  const token = getToken();
  const response = await fetch(`${API_URL}/auth/profile/image`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJSON(response);
  if (!response.ok) throw new Error(data.error || "Fehler beim Löschen");
  return data;
}
