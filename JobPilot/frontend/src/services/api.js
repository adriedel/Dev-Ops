import { API_URL } from "../utils/constants";
import { getToken } from "./auth";

// Helper: Headers mit Authorization
function getHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// GET alle Bewerbungen
export async function getAll(status = null) {
  const url = status
    ? `${API_URL}/bewerbungen?status=${status}`
    : `${API_URL}/bewerbungen`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Fehler beim Laden");
  }

  return response.json();
}

// GET einzelne Bewerbung
export async function getById(id) {
  const response = await fetch(`${API_URL}/bewerbungen/${id}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Bewerbung nicht gefunden");
  }

  return response.json();
}

// POST neue Bewerbung
export async function create(bewerbung) {
  const response = await fetch(`${API_URL}/bewerbungen`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(bewerbung),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Fehler beim Erstellen");
  }

  return response.json();
}

// PUT Bewerbung aktualisieren
export async function update(id, bewerbung) {
  const response = await fetch(`${API_URL}/bewerbungen/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(bewerbung),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Fehler beim Aktualisieren");
  }

  return response.json();
}

// DELETE Bewerbung
export async function deleteBewerbung(id) {
  const response = await fetch(`${API_URL}/bewerbungen/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Fehler beim Löschen");
  }

  return response.json();
}

// GET Statistiken
export async function getStats() {
  const response = await fetch(`${API_URL}/statistiken`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Fehler beim Laden der Statistiken");
  }

  return response.json();
}
