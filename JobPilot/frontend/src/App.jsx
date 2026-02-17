import Header from "./components/Header/header";
import StatCards from "./components/StatCards/statcards";
import SearchBar from "./components/SearchBar/SearchBar";

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

  useEffect(() => {
    loadBewerbungen();
    loadStats();
  }, []);

  const loadBewerbungen = async () => {
    try {
      const data = await bewerbungenApi.getAll();
      setBewerbungen(data);
    } catch (error) {
      console.error("Fehler beim Laden der Bewerbungen:", error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await bewerbungenApi.getStats();
      setStats(data);
    } catch (error) {
      console.error("Fehler beim Laden der Statistiken:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingBewerbung) {
        await bewerbungenApi.update(editingBewerbung.id, formData);
      } else {
        await bewerbungenApi.create(formData);
      }
      loadBewerbungen();
      loadStats();
      closeModal();
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bewerbung wirklich löschen?")) {
      try {
        await bewerbungenApi.delete(id);
        loadBewerbungen();
        loadStats();
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const bewerbung = bewerbungen.find((b) => b.id === id);
      if (bewerbung) {
        await bewerbungenApi.update(id, { ...bewerbung, status: newStatus });
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
      setFormData(bewerbung);
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
      <Header />
      <StatCards />
      <SearchBar />
    </>
  );
}

export default App;
