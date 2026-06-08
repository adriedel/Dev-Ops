import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header/header";
import StatCards from "./components/StatCards/StatCards";
import SearchBar from "./components/SearchBar/SearchBar";
import BewerbungsCard from "./components/BewerbungsCard/BewerbungsCard";
import BewerbungsModal from "./components/BewerbungsModal/BewerbungsModal";
import { STATUS } from "./utils/constants";

import {
  getAll,
  create,
  update,
  deleteBewerbung,
  getStats,
} from "./services/api";

function App() {
  const [bewerbungen, setBewerbungen] = useState([]);
  const [stats, setStats] = useState({
    beworben: 0,
    stufeWeiter: 0,
    angenommen: 0,
    abgelehnt: 0,
    keineAntwort: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingBewerbung, setEditingBewerbung] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const [formData, setFormData] = useState({
    position: "",
    firma: "",
    status: STATUS.BEWORBEN,
    datum: new Date().toISOString().split("T")[0],
    standort: "",
    ansprechpartner: "",
    notizen: "",
    bewerbungsart: "Initiativbewerbung",
    startdatum: "",
    link: "",
    gehalt: "",
    waehrung: "EUR",
  });

  // Dark Mode Effekt
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const loadBewerbungen = useCallback(async () => {
    try {
      const data = await getAll();
      setBewerbungen(data);
    } catch (error) {
      console.error("Fehler beim Laden der Bewerbungen:", error);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Fehler beim Laden der Statistiken:", error);
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [bewerbungenData, statsData] = await Promise.all([
          getAll(),
          getStats(),
        ]);
        setBewerbungen(bewerbungenData);
        setStats(statsData);
      } catch (error) {
        console.error("Fehler beim initialen Laden:", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingBewerbung) {
        await update(editingBewerbung.id, formData);
      } else {
        await create(formData);
      }
      loadBewerbungen();
      loadStats();
      closeModal();
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBewerbung(id);
      loadBewerbungen();
      loadStats();
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const bewerbung = bewerbungen.find((b) => b.id === id);
      if (bewerbung) {
        await update(id, { ...bewerbung, status: newStatus });
        loadBewerbungen();
        loadStats();
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Status:", error);
    }
  };

  const openModal = (bewerbung = null) => {
    if (bewerbung) {
      setEditingBewerbung(bewerbung);
      setFormData({
        ...bewerbung,
        gehalt: bewerbung.gehalt || "",
        waehrung: bewerbung.waehrung || "EUR",
      });
    } else {
      setEditingBewerbung(null);
      setFormData({
        position: "",
        firma: "",
        status: STATUS.BEWORBEN,
        datum: new Date().toISOString().split("T")[0],
        standort: "",
        ansprechpartner: "",
        notizen: "",
        bewerbungsart: "Initiativbewerbung",
        startdatum: "",
        link: "",
        gehalt: "",
        waehrung: "EUR",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBewerbung(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const getFilteredBewerbungen = () => {
    let filtered = bewerbungen;

    if (filterStatus !== "alle") {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.firma.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (b.standort &&
            b.standort.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    return filtered;
  };

  return (
    <>
      <section className="app">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onNewBewerbung={() => openModal()}
          user={user}
          onUserUpdate={handleUserUpdate}
        />
        <div className="stat-cards">
          <StatCards stats={stats} />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
        </div>

        <section className="bewerbungen-grid">
          {getFilteredBewerbungen().length === 0 ? (
            <div className="empty-state">
              <h3>Keine Bewerbungen gefunden</h3>
              <p>Erstellen Sie Ihre erste Bewerbung, um loszulegen!</p>
            </div>
          ) : (
            getFilteredBewerbungen().map((bewerbung) => (
              <BewerbungsCard
                key={bewerbung.id}
                bewerbung={bewerbung}
                onEdit={openModal}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </section>

        <BewerbungsModal
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleInputChange}
          isEditing={!!editingBewerbung}
        />
      </section>
    </>
  );
}

export default App;
