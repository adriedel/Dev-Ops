function BewerbungsCard() {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(bewerbung.id, newStatus);
    setShowMenu(false);
  };

  return (
    <div className="bewerbungs-card">
      <h2>BewerbungsCard</h2>
    </div>
  );
}

export default BewerbungsCard;
