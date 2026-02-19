# JobPilot - Bewerbungstracker

Ein moderner Full-Stack Bewerbungstracker zum Verwalten und Tracken von Bewerbungen mit Statusverfolgung, Statistiken und Dark Mode.

![JobPilot Screenshot](https://via.placeholder.com/800x400/4a6bc5/ffffff?text=JobPilot+Screenshot)

<!-- Ersetze mit echtem Screenshot -->

## ✨ Features

- **Dashboard mit Statistiken** - Behalte den Überblick über alle Bewerbungsstatus
- **Status-Tracking** - 5 Bewerbungsstatus: Beworben, Stufe weiter, Angenommen, Abgelehnt, Keine Antwort
- **Suche & Filter** - Finde schnell Bewerbungen nach Firma, Position oder Standort
- **CRUD-Operationen** - Erstellen, Bearbeiten, Löschen von Bewerbungen
- **Dark Mode** - Hell/Dunkel-Umschaltung mit lokalem Speicher & Systemerkennung
- **Schneller Status-Wechsel** - Dropdown-Menü direkt auf der Karte
- **Link zur Stellenanzeige** - Direkter Link zur Ausschreibung pro Bewerbung
- **Responsive Design** - Funktioniert auf Desktop und Mobile

## Tech Stack

### Frontend

- **React 19** - UI Library
- **Vite 7** - Build Tool & Dev Server
- **CSS3** - Styling (kein Framework, komponentenbasierte CSS-Dateien)
- **Fetch API** - HTTP Requests

### Backend

- **Node.js** - Runtime
- **Express.js 5** - Web Framework
- **SQLite3** - Datenbank (lokale Entwicklung)
- **CORS** - Cross-Origin Resource Sharing

## Projektstruktur

```
JobPilot/
├── backend/
│   ├── database.js          # SQLite Datenbankverbindung & Schema
│   ├── server.js            # Express Server mit REST API
│   ├── bewerbungen.db       # SQLite Datenbankdatei
│   └── package.json         # Backend Dependencies
│
└── frontend/
    ├── index.html           # HTML Entry Point
    ├── vite.config.js       # Vite Konfiguration
    ├── package.json         # Frontend Dependencies
    └── src/
        ├── main.jsx         # React Entry Point
        ├── App.jsx          # Hauptkomponente (State & Logik)
        ├── App.css          # App-weite Styles
        ├── index.css        # Globale Styles
        ├── components/
        │   ├── Header/
        │   │   ├── header.jsx
        │   │   └── header.css
        │   ├── StatCards/
        │   │   ├── StatCards.jsx
        │   │   └── StatCards.css
        │   ├── SearchBar/
        │   │   ├── SearchBar.jsx
        │   │   └── SearchBar.css
        │   ├── BewerbungsCard/
        │   │   ├── BewerbungsCard.jsx
        │   │   └── BewerbungsCard.css
        │   └── BewerbungsModal/
        │       ├── BewerbungsModal.jsx
        │       └── BewerbungsModal.css
        ├── services/
        │   └── api.js       # API Service Layer (Fetch-Wrapper)
        └── utils/
            └── constants.js # Status-Konstanten, Labels & Icons
```

## Installation & Lokale Entwicklung

### Voraussetzungen

- Node.js (v18 oder höher)
- npm

### 1. Repository klonen

```bash
git clone https://github.com/DEIN-USERNAME/jobpilot.git
cd jobpilot
```

### 2. Backend starten

```bash
cd JobPilot/backend
npm install
npm start
```

Backend läuft auf `http://localhost:3001`

### 3. Frontend starten

```bash
cd JobPilot/frontend
npm install
npm run dev
```

Frontend läuft auf `http://localhost:5173`

### 4. App öffnen

```
http://localhost:5173
```

## API Dokumentation

### Endpoints

#### Bewerbungen

| Methode  | Endpoint                           | Beschreibung               |
| -------- | ---------------------------------- | -------------------------- |
| `GET`    | `/api/bewerbungen`                 | Alle Bewerbungen abrufen   |
| `GET`    | `/api/bewerbungen?status=beworben` | Nach Status filtern        |
| `GET`    | `/api/bewerbungen/:id`             | Einzelne Bewerbung abrufen |
| `POST`   | `/api/bewerbungen`                 | Neue Bewerbung erstellen   |
| `PUT`    | `/api/bewerbungen/:id`             | Bewerbung aktualisieren    |
| `DELETE` | `/api/bewerbungen/:id`             | Bewerbung löschen          |

#### Statistiken

| Methode | Endpoint           | Beschreibung                |
| ------- | ------------------ | --------------------------- |
| `GET`   | `/api/statistiken` | Zähler nach Status & Gesamt |

### Beispiel Request

```javascript
// Neue Bewerbung erstellen
POST /api/bewerbungen
Content-Type: application/json

{
  "position": "Frontend Developer",   // Pflichtfeld
  "firma": "Example GmbH",           // Pflichtfeld
  "status": "beworben",              // Pflichtfeld
  "datum": "2026-02-18",             // Pflichtfeld
  "standort": "München",
  "ansprechpartner": "Max Mustermann",
  "notizen": "Erstes Gespräch am 25.02.",
  "bewerbungsart": "Stellenausschreibung",
  "startdatum": "",
  "link": "https://jobs.example.com/123"
}
```

### Datenbankschema

Tabelle `bewerbungen`:

| Spalte            | Typ      | Pflicht | Beschreibung                |
| ----------------- | -------- | ------- | --------------------------- |
| `id`              | INTEGER  | -       | Primary Key, Auto-increment |
| `position`        | TEXT     | Ja      | Stellenbezeichnung          |
| `firma`           | TEXT     | Ja      | Unternehmen                 |
| `status`          | TEXT     | Ja      | Bewerbungsstatus            |
| `datum`           | TEXT     | Ja      | Bewerbungsdatum             |
| `standort`        | TEXT     | Nein    | Arbeitsort                  |
| `ansprechpartner` | TEXT     | Nein    | Kontaktperson               |
| `notizen`         | TEXT     | Nein    | Freitext-Notizen            |
| `bewerbungsart`   | TEXT     | Nein    | z.B. Initiativbewerbung     |
| `startdatum`      | TEXT     | Nein    | Startdatum (bei Annahme)    |
| `link`            | TEXT     | Nein    | URL zur Stellenanzeige      |
| `created_at`      | DATETIME | -       | Automatisch gesetzt         |
| `updated_at`      | DATETIME | -       | Automatisch aktualisiert    |

### Status-Werte

| Wert            | Anzeige       | Icon |
| --------------- | ------------- | ---- |
| `beworben`      | Beworben      | ✈️   |
| `stufe_weiter`  | Stufe weiter  | ➡️   |
| `angenommen`    | Angenommen    | ✅   |
| `abgelehnt`     | Abgelehnt     | ❌   |
| `keine_antwort` | Keine Antwort | 🕐   |

## Komponenten-Übersicht

### Header

Logo, Titel, Hell/Dunkel-Umschalter und "Neue Bewerbung"-Button.

### StatCards

6 Statistik-Karten mit Zählern: Beworben, Stufe weiter, Angenommen, Abgelehnt, Keine Antwort, Gesamt.

### SearchBar

Texteingabe für die Suche (Firma, Position, Standort) und Status-Filter-Dropdown.

### BewerbungsCard

Karte für eine einzelne Bewerbung mit:

- Position & Firma
- Status-Badge mit Icon
- Datum, Standort, Ansprechpartner, Link zur Stellenanzeige
- Notizen
- Startdatum (nur bei Status "Angenommen")
- Drei-Punkte-Menü: Bearbeiten, Status direkt wechseln, Löschen

### BewerbungsModal

Formular zum Erstellen/Bearbeiten mit Feldern für Firma, Position, Datum, Status, Standort, Gehalt, Link, Ansprechpartner, Startdatum (bei Annahme) und Notizen.

## Entwicklung

### Scripts

**Backend:**

```bash
npm start        # Server starten (node server.js)
npm run dev      # Server mit Nodemon (Auto-Reload)
```

**Frontend:**

```bash
npm run dev      # Development Server (http://localhost:5173)
npm run build    # Production Build
npm run preview  # Preview Production Build
npm run lint     # ESLint Code-Qualität prüfen
```
