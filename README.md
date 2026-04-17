# JobPilot – Bewerbungstracker

JobPilot ist eine im Rahmen des DevOps-Projekts entwickelte Full-Stack-Webanwendung zur strukturierten Verwaltung und Nachverfolgung von Bewerbungsprozessen. Ziel des Systems ist es, Bewerbungen zentral zu erfassen, Bearbeitungsstände transparent abzubilden und eine übersichtliche Grundlage für die persönliche Organisation des Bewerbungsmanagements bereitzustellen.

<img width="1281" height="741" alt="JobPilot Screenshot" src="https://github.com/user-attachments/assets/8410d3c9-23c1-4af2-831c-264c41951100" />

---

## 📌 Projektstatus

- **Phase 1 umgesetzt**: Registrierung, Anmeldung, geschützte Routen, Dashboard, CRUD-Funktionalität und statistische Auswertung
- **Phase 2 derzeit noch nicht implementiert**
- **Docker- und CI/CD-Setup vorbereitet**, um das Projekt frühzeitig containerisiert demonstrieren und im weiteren Verlauf gezielt ausbauen zu können

---

## ✨ Funktionen

- **Login & Registrierung** mit JWT-basierter Authentifizierung
- **Geschütztes Dashboard** für persönliche Bewerbungsdaten
- **Status-Tracking** für verschiedene Phasen im Bewerbungsprozess
- **CRUD-Funktionen** zum Erstellen, Bearbeiten und Löschen von Bewerbungen
- **Suche & Filter** nach Firma, Position oder Standort
- **Statistiken** zur schnellen Übersicht
- **Dark Mode** mit Speicherung der Benutzereinstellung
- **Responsive UI** für Desktop und Mobile
- **Demo-Modus für Docker**, damit die Anwendung ohne Login präsentiert werden kann

---

## 🧰 Tech Stack

| Bereich   | Technologie                                  |
| --------- | -------------------------------------------- |
| Frontend  | `React 19`, `Vite 7`, `CSS3`                 |
| Backend   | `Node.js`, `Express.js 5`                    |
| Datenbank | `PostgreSQL`                                 |
| Auth      | `JWT`, `bcryptjs`                            |
| DevOps    | `Docker`, `Docker Compose`, `GitHub Actions` |
| API-Doku  | `Swagger`                                    |

---

## 📁 Projektstruktur

```text
Dev-Ops/
├── README.md
├── .github/
│   └── workflows/
│       └── jobpilot-ci.yml
└── JobPilot/
    ├── docker-compose.yml
    ├── backend/
    │   ├── Dockerfile
    │   ├── authController.js
    │   ├── authMiddleware.js
    │   ├── database.js
    │   ├── migrate.js
    │   ├── server.js
    │   ├── swagger.yaml
    │   └── package.json
    └── frontend/
        ├── Dockerfile
        ├── nginx.conf
        ├── package.json
        └── src/
            ├── App.jsx
            ├── main.jsx
            ├── components/
            ├── pages/
            ├── services/
            └── utils/
```

---

## 🚀 Anwendung starten

### Option A: Docker-Demo für Präsentation und Abgabe

Diese Variante ist insbesondere für die Vorführung im Rahmen der Lehrveranstaltung geeignet, da die Anwendung ohne zusätzliche lokale Konfigurationsschritte unmittelbar gestartet werden kann.

```bash
cd JobPilot
docker compose up --build
```

Danach ist die Anwendung erreichbar unter:

- **Frontend:** `http://localhost:8080`
- **Backend:** `http://localhost:3001`
- **Health-Check:** `http://localhost:3001/health`

### Einordnung des Demo-Modus im Docker-Setup

Für die **Präsentation und Bewertung** wurde bewusst ein **Demo-Modus** vorgesehen, damit die Anwendung unmittelbar eingesehen werden kann, **ohne zuvor einen Registrierungs- oder Loginprozess durchlaufen zu müssen**. Dies erleichtert die Vorführung der bereits implementierten Kernfunktionalitäten erheblich.

Gleichzeitig bleibt der **vollständige Login-/Register-Prozess** fester Bestandteil des Projekts, da die Anwendung **perspektivisch für die tatsächliche eigene Nutzung vorgesehen** ist. Die Authentifizierung wurde somit nicht entfernt, sondern durch einen optionalen Präsentationsmodus ergänzt.

#### Demo-Modus aktivieren (für Präsentation)

In `JobPilot/docker-compose.yml` den folgenden Wert setzen:

```yml
VITE_DEMO_MODE: "true"
```

Anschließend neu bauen und starten:

```bash
docker compose build frontend
docker compose up -d
```

> Die Anwendung öffnet sich dann direkt im Dashboard – ohne Registrierung oder Login.

#### Regulärer Betrieb mit Authentifizierung (Standard)

In `JobPilot/docker-compose.yml` ist standardmäßig der reguläre Betrieb aktiv:

```yml
VITE_DEMO_MODE: "false"
```

In diesem Modus wird bei Aufruf der Anwendung zunächst die Landing Page angezeigt. Ohne gültige Anmeldung wird der Zugriff auf das Dashboard durch einen geschützten Route-Guard verhindert. Eine Registrierung oder ein Login ist erforderlich.

> **Hinweis:** Da `VITE_DEMO_MODE` eine Build-Time-Variable ist, die beim `npm run build` fest in den JavaScript-Bundle eingeschrieben wird, muss nach jeder Änderung des Wertes zwingend `docker compose build frontend` ausgeführt werden, bevor die Änderung wirksam wird. Anschließend kann es erforderlich sein, im Browser einen Hard Refresh durchzuführen (**Cmd + Shift + R** auf macOS), um sicherzustellen, dass nicht eine ältere Version aus dem Browser-Cache geladen wird.

---

### Option B: Lokale Entwicklung ohne Docker

#### Voraussetzungen

- `Node.js` ab Version 18
- `npm`
- `Docker Desktop` oder eine laufende PostgreSQL-Instanz

#### 1. Backend starten

```bash
cd JobPilot/backend
npm install
npm start
```

Das Backend läuft danach auf `http://localhost:3001`.

#### 2. Frontend starten

```bash
cd JobPilot/frontend
npm install
npm run dev
```

Das Frontend läuft danach auf `http://localhost:5173`.

#### 3. Optional: lokales Backend im Frontend verwenden

Falls du lokal gegen dein eigenes Backend testen möchtest, kannst du in der Datei `JobPilot/frontend/.env.local` setzen:

```env
VITE_API_URL=http://localhost:3001/api
```

---

## 🔐 Demo-Modus vs. echter Login

| Einsatz                          | Einstellung              | Verhalten                                                         |
| -------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| **Präsentation / Bewertung**     | `VITE_DEMO_MODE="true"`  | App öffnet direkt das Dashboard, kein Login erforderlich          |
| **Regulärer Betrieb (Standard)** | `VITE_DEMO_MODE="false"` | Landing Page → Registrierung oder Anmeldung → Dashboard (mit JWT) |

> Da es sich um eine **Build-Time-Variable** handelt, muss nach jeder Änderung ein Rebuild des Frontend-Images erfolgen: `docker compose build frontend`. Ein anschließender Hard Refresh im Browser (Cmd + Shift + R) stellt sicher, dass keine veraltete Version aus dem Browser-Cache geladen wird.

---

## 🧪 End-to-End-Tests (Playwright)

Für das Projekt wurden **automatisierte End-to-End-Tests** mit [Playwright](https://playwright.dev/) implementiert. Die Tests befinden sich im Verzeichnis `JobPilot/e2e/` und decken die gesamte Benutzeroberfläche ab – von der Landing Page über Authentifizierung bis hin zur vollständigen CRUD-Funktionalität.

### Teststruktur

| Testprojekt     | Browser           | Modus      | Beschreibung                                       |
| --------------- | ----------------- | ---------- | -------------------------------------------------- |
| `demo-chromium` | Chromium          | Demo-Modus | Alle CRUD-, Filter- und Statistik-Tests            |
| `demo-firefox`  | Firefox           | Demo-Modus | Cross-Browser-Abdeckung der Kernfunktionalitäten   |
| `demo-mobile`   | Chromium (Mobile) | Demo-Modus | Responsive-Verhalten auf mobilen Viewports         |
| `auth-chromium` | Chromium          | Auth-Modus | Login, Registrierung und geschützte Routen         |
| `visual`        | Chromium          | Demo-Modus | Visuelle Regressionstests mit Screenshot-Vergleich |

### Tests ausführen

Voraussetzung: Dependencies und Browser einmalig installieren.

```bash
cd JobPilot/e2e
npm install
npm run install:browsers   # Lädt Chromium und Firefox herunter
```

Danach:

```bash
npm test                   # Alle 80 funktionalen Tests (4 Projekte)
npm run test:visual        # Visuelle Regressionstests (7 Tests)
npm run test:update-snapshots  # Baseline-Screenshots neu generieren
```

> Die Tests starten automatisch einen lokalen Vite-Entwicklungsserver. Es muss kein Frontend vorab manuell gestartet werden.

### Testabdeckung (80 Tests)

- **Navigation & Routing**: Landing Page, Login, Registrierung, geschützte Routen, 404-Handling
- **CRUD-Operationen**: Erstellen, Bearbeiten, Löschen von Bewerbungen inkl. Formularvalidierung
- **Suche & Filter**: Freitextsuche, Statusfilter, Kombinationsfilter
- **Statistiken**: Korrekte Darstellung der Status-Zähler nach Datenänderungen
- **Dark Mode**: Umschaltung und Persistenz über `localStorage`
- **Authentifizierung**: Login, Logout, Registrierung, Route-Guards
- **Cross-Browser / Mobile**: Firefox und Chromium Mobile

---

## 🔄 CI/CD-Pipeline

Für das Projekt wurde eine GitHub-Actions-Pipeline in `.github/workflows/jobpilot-ci.yml` eingerichtet.

### Die Pipeline führt automatisch aus:

1. **Checkout des Repositories**
2. **Node.js Setup**
3. **Installation der Frontend-Dependencies**
4. **Linting des Frontends** (ESLint)
5. **Production Build des Frontends**
6. **Syntax-Check des Backends**
7. **Build der Docker-Images**
8. Optional: **Push der Container-Images nach GHCR** bei Push auf `main`

Damit werden zentrale DevOps-Schritte wie **Build, Qualitätssicherung und Bereitstellung der Laufzeitumgebung** in strukturierter Form automatisiert abgedeckt.

---

## 🌐 API-Übersicht

### Auth

| Methode | Endpoint             | Beschreibung               |
| ------- | -------------------- | -------------------------- |
| `POST`  | `/api/auth/register` | Benutzer registrieren      |
| `POST`  | `/api/auth/login`    | Benutzer anmelden          |
| `GET`   | `/api/auth/me`       | Aktuellen Benutzer abrufen |

### Bewerbungen

| Methode  | Endpoint               | Beschreibung               |
| -------- | ---------------------- | -------------------------- |
| `GET`    | `/api/bewerbungen`     | Alle Bewerbungen abrufen   |
| `GET`    | `/api/bewerbungen/:id` | Einzelne Bewerbung abrufen |
| `POST`   | `/api/bewerbungen`     | Neue Bewerbung erstellen   |
| `PUT`    | `/api/bewerbungen/:id` | Bewerbung aktualisieren    |
| `DELETE` | `/api/bewerbungen/:id` | Bewerbung löschen          |

### Statistiken

| Methode | Endpoint           | Beschreibung                      |
| ------- | ------------------ | --------------------------------- |
| `GET`   | `/api/statistiken` | Status-Zähler und Gesamtübersicht |

Zusätzlich steht die Swagger-Dokumentation bereit unter:

```text
http://localhost:3001/api-docs
```

---

## 🗃️ Datenmodell

Die zentrale Tabelle `bewerbungen` enthält unter anderem folgende Felder:

- `position`
- `firma`
- `status`
- `datum`
- `standort`
- `ansprechpartner`
- `notizen`
- `bewerbungsart`
- `startdatum`
- `link`
- `gehalt`
- `waehrung`
- `user_id`

Dadurch können Bewerbungen **benutzerbezogen getrennt gespeichert** und im regulären Anwendungsbetrieb authentifiziert verwaltet werden.

---

## 🛠️ Nützliche Skripte

### Backend

```bash
npm start        # Startet den Express-Server
npm run dev      # Startet den Server mit Nodemon
npm run migrate  # Führt die Datenbankmigration aus
```

### Frontend

```bash
npm run dev      # Startet den Vite-Dev-Server
npm run build    # Erstellt den Production-Build
npm run lint     # Prüft den Code mit ESLint
npm run preview  # Zeigt den Production-Build lokal an
```

---

## ✅ Fazit

JobPilot verbindet die in **Phase 1 entwickelte Webanwendung** mit einem **strukturierten Docker-Setup**, einer **vorbereiteten CI/CD-Pipeline** sowie einer **umfassenden automatisierten Testabdeckung**. Dadurch ist das Projekt nicht nur lokal lauffähig, sondern kann reproduzierbar demonstriert und in weiteren Entwicklungsphasen zielgerichtet erweitert werden.

Für die Abgabe ist insbesondere hervorzuheben:

- Die Anwendung ist **containerisiert** und damit reproduzierbar ausführbar
- Sie lässt sich mittels **Docker Compose** mit geringem Aufwand starten
- Eine **CI/CD-Pipeline** für Build- und Prüfprozesse ist vorbereitet
- **80 automatisierte End-to-End-Tests** mit Playwright sichern Funktionalität, Authentifizierung, Cross-Browser-Verhalten und visuelle Korrektheit ab
- Der **Login-Prozess bleibt für die spätere reale Nutzung erhalten**, während der **Demo-Modus** die Präsentation ohne vorherige Registrierung ermöglicht
