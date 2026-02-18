# 💼 JobPilot - Bewerbungstracker

Ein moderner Full-Stack Bewerbungstracker zum Verwalten und Tracken von Bewerbungen mit Statusverfolgung, Statistiken und Dark Mode.

![JobPilot Screenshot](https://via.placeholder.com/800x400/4a6bc5/ffffff?text=JobPilot+Screenshot)

<!-- Ersetze mit echtem Screenshot -->

## ✨ Features

- 📊 **Dashboard mit Statistiken** - Behalte den Überblick über alle Bewerbungsstatus
- 🎯 **Status-Tracking** - 5 Bewerbungsstatus (Beworben, Stufe weiter, Angenommen, Abgelehnt, Keine Antwort)
- 🔍 **Suche & Filter** - Finde schnell bestimmte Bewerbungen
- 📝 **CRUD-Operationen** - Erstellen, Bearbeiten, Löschen von Bewerbungen
- 🎨 **Dark Mode** - Augenschonendes Arbeiten auch nachts
- 📱 **Responsive Design** - Funktioniert auf Desktop und Mobile
- ⚡ **Schneller Status-Wechsel** - Dropdown-Menü für direktes Ändern des Status
- 💾 **Persistente Speicherung** - PostgreSQL-Datenbank

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **CSS3** - Styling (kein Framework)
- **Fetch API** - HTTP Requests

### Backend

- **Node.js** - Runtime
- **Express.js** - Web Framework
- **PostgreSQL** - Datenbank (Production)
- **SQLite** - Datenbank (Local Development)
- **CORS** - Cross-Origin Resource Sharing

## 📁 Projektstruktur

```
JobPilot/
├── backend/
│   ├── database.js          # PostgreSQL/SQLite Connection
│   ├── server.js            # Express Server mit REST API
│   ├── package.json         # Backend Dependencies
│   └── .env.example         # Environment Variables Template
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React Komponenten
│   │   │   ├── Header.jsx
│   │   │   ├── StatCards.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── BewerbungCard.jsx
│   │   │   └── BewerbungModal.jsx
│   │   ├── services/        # API Service Layer
│   │   │   └── api.js
│   │   ├── utils/           # Konstanten & Helpers
│   │   │   └── constants.js
│   │   ├── App.jsx          # Hauptkomponente
│   │   ├── App.css          # Styles
│   │   └── main.jsx         # Entry Point
│   ├── public/
│   │   └── index.html
│   └── package.json         # Frontend Dependencies
│
├── DEPLOYMENT.md            # Deployment Anleitung
├── README.md                # Diese Datei
└── .gitignore
```

## 🚀 Installation & Lokale Entwicklung

### Voraussetzungen

- Node.js (v14 oder höher)
- npm oder yarn
- Optional: PostgreSQL (für lokale Entwicklung, sonst SQLite)

### 1. Repository klonen

```bash
git clone https://github.com/DEIN-USERNAME/jobpilot.git
cd jobpilot
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Backend läuft auf `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend läuft auf `http://localhost:5173`

### 4. App öffnen

Öffne deinen Browser und gehe zu:

```
http://localhost:5173
```

## 🌐 Live Demo

- **Frontend:** [https://jobpilot.vercel.app](https://jobpilot.vercel.app)
- **Backend API:** [https://jobpilot-backend.onrender.com/api](https://jobpilot-backend.onrender.com/api)

<!-- Ersetze mit deinen echten URLs nach dem Deployment -->

## 📚 API Dokumentation

### Endpoints

#### Bewerbungen

- `GET /api/bewerbungen` - Alle Bewerbungen abrufen
- `GET /api/bewerbungen?status=beworben` - Nach Status filtern
- `GET /api/bewerbungen/:id` - Einzelne Bewerbung abrufen
- `POST /api/bewerbungen` - Neue Bewerbung erstellen
- `PUT /api/bewerbungen/:id` - Bewerbung aktualisieren
- `DELETE /api/bewerbungen/:id` - Bewerbung löschen

#### Statistiken

- `GET /api/statistiken` - Statistiken über alle Bewerbungen

### Beispiel Request

```javascript
// Neue Bewerbung erstellen
POST /api/bewerbungen
Content-Type: application/json

{
  "position": "Frontend Developer",
  "firma": "Example GmbH",
  "status": "beworben",
  "datum": "2026-02-18",
  "standort": "München",
  "ansprechpartner": "Max Mustermann",
  "notizen": "Erstes Gespräch am 25.02.",
  "bewerbungsart": "Initiativbewerbung"
}
```

## 🎨 Komponenten-Übersicht

### Header

Header mit Logo, Theme Toggle und "Neue Bewerbung" Button

### StatCards

Dashboard mit 6 Statistik-Karten:

- Beworben
- Stufe weiter
- Angenommen
- Abgelehnt
- Keine Antwort
- Gesamt

### SearchBar

Suche nach Firma/Position und Status-Filter

### BewerbungCard

Karte für einzelne Bewerbung mit:

- Position & Firma
- Status-Badge
- Datum, Standort, Ansprechpartner
- Dropdown-Menü (Bearbeiten, Status ändern, Löschen)

### BewerbungModal

Formular zum Erstellen/Bearbeiten von Bewerbungen

## 🔧 Entwicklung

### Scripts

**Backend:**

```bash
npm start        # Server starten
npm run dev      # Server mit Nodemon (Auto-Reload)
```

**Frontend:**

```bash
npm run dev      # Development Server
npm run build    # Production Build
npm run preview  # Preview Production Build
```

### Environment Variables

**Backend (.env):**

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/jobpilot
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:3001/api
```

**Empfohlener Stack:**

- Frontend: Vercel
- Backend: Render
- Datenbank: Render PostgreSQL (kostenlos)
