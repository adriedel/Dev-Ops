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
};
