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

  return (
    <>
      <Header />
      <StatCards />
      <SearchBar />
    </>
  );
}

export default App;
