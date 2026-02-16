import { API_URL } from "../utils/constants";

export const bewerbungenApi = {
  // Alle Bewerbungen abrufen
  getAll: async () => {
    const response = await fetch(`${API_URL}/bewerbungen`);
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Bewerbungen");
    }
    return response.json();
  },

  // Einzelne Bewerbung abrufen
  getById: async (id) => {
    const response = await fetch(`${API_URL}/bewerbungen/${id}`);
    if (!response.ok) throw new Error("Bewerbung nicht gefunden");
    return response.json();
  },

  // Neue Bewerbung erstellen
  create: async (data) => {
    const response = await fetch(`${API_URL}/bewerbungen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Fehler beim Erstellen der Bewerbung");
    return response.json();
  },

  // Bewerbung aktualisieren
  update: async (id, data) => {
    const response = await fetch(`${API_URL}/bewerbungen/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok)
      throw new Error("Fehler beim Aktualisieren der Bewerbung");
    return response.json();
  },

  // Bewerbung löschen
  delete: async (id) => {
    const response = await fetch(`${API_URL}/bewerbungen/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Fehler beim Löschen der Bewerbung");
    return response.json();
  },

  // Statistiken abrufen
  getStats: async () => {
    const response = await fetch(`${API_URL}/statistiken`);
    if (!response.ok) throw new Error("Fehler beim Laden der Statistiken");
    return response.json();
  },
};
