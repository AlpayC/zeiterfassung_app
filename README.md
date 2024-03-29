# HomeOffice Management System

Dieses Projekt implementiert ein HomeOffice Management System, das es Mitarbeitern ermöglicht, sich im HomeOffice anzumelden und die Arbeitszeiten automatisch an das Personalbüro zu übermitteln.

## Inhaltsverzeichnis

- [Beschreibung](#beschreibung)
- [User Stories](#user-stories)
- [API Routen](#api-routen)
- [Technologien](#technologien)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Installation](#installation)
- [Import Rohdaten](#import-rohdaten)
- [Flow-Charts](#flow-charts)

## Beschreibung

Das HomeOffice Management System bietet eine Plattform für Mitarbeiter, um ihre HomeOffice-Zeiten zu verwalten. Durch An- und Abmeldungen werden automatisch die Arbeitszeiten erfasst und an das Personalbüro übermittelt. Die Anwendung erleichtert die Organisation und Überwachung von HomeOffice-Aktivitäten.

## User Stories

### Anmeldung

Als Mitarbeiter möchte ich mich in der Anwendung anmelden können, um meine HomeOffice-Zeiten zu verwalten.

### HomeOffice-Zeit starten

Als Mitarbeiter möchte ich die Möglichkeit haben, meine HomeOffice-Zeit zu starten, um dem System mitzuteilen, dass ich im HomeOffice arbeite.

### HomeOffice-Zeit stoppen

Als Mitarbeiter möchte ich die Möglichkeit haben, meine HomeOffice-Zeit zu stoppen, um dem System mitzuteilen, dass ich wieder im Büro oder offline bin.

### Übersicht über Zeiten

Als Mitarbeiter möchte ich eine Übersicht über meine HomeOffice-Zeiten für verschiedene Tage haben.

### Automatische Benachrichtigung

Als Mitarbeiter möchte ich beim Stoppen meiner HomeOffice-Tätigkeit automatisch eine Mail an das Personalbüro verschicken, um meine Anwesenheit zu bestätigen.

## API Routen

Die Anwendung stellt folgende API-Routen zur Verfügung:

User Routen

- `/api/user/secure`: Authentifizierung und Anmeldungdes Authentifizierungstoken
- `/api/user/resetPassword`: Passwort Reset des Logins
- `/api/user/resetPassword-confirm`: Abgleich des Reset-Tokens und Verifizierung
- `/api/user/signup`: Registrierung als User
- `/api/user/login`: Login als User
- `/api/user/logout`: Login als User
- `/api/homeoffice/stop`: Stoppt die HomeOffice-Zeiterfassung
- `/api/homeoffice/times`: Liefert eine Übersicht über die HomeOffice-Zeiten

Timetracking Routen

- `/api/timeTracking/getTimes`: Abruf der Zeiten des jeweiligen Mitarbeiters
- `/api/timeTracking/addStartTime`: Übermittlung der Start-Zeit
- `/api/timeTracking/addEndTime`: Übermittlung der End-Zeit
- `/api/timeTracking/sendEmailToHR`: Übermittlung der Zeiten an das Personalbüro

## Technologien

Das Projekt wurde unter Verwendung der folgenden Technologien entwickelt:

- **MERN Stack:**

  - MongoDB: Datenbank
  - Express.js: Server-Framework
  - React.js: Benutzeroberfläche
  - Node.js: Laufzeitumgebung

- **Frontend-Styling:**
  - Tailwind CSS: CSS-Framework für schnelles und effizientes Styling

## Dependencies

### Frontend

- "axios": "^1.6.5"
- "react": "^18.2.0"
- "react-calendar": "^4.8.0"
- "react-dom": "^18.2.0"
- "react-icons": "^5.0.1"
- "react-router-dom": "^6.21.2"

### Backend

- "cookie-parser": "^1.4.6"
- "date-fns": "^3.2.0"
- "dotenv": "^16.1.4"
- "express": "^4.18.2"
- "form-data": "^4.0.0"
- "jsonwebtoken": "^9.0.1"
- "mailgun.js": "^9.2.0"
- "mongoose": "^7.4.1"
- "multer": "^1.4.5-lts.1"
- "nodemailer": "^6.9.8"
- "nodemailer-mailgun-transport": "^2.1.5"
- "npm": "^10.3.0"

## Deployment

Die Anwendung wurde auf einem Server von render.com deployed.
[Link](https://timetracking-3hh4.onrender.com)

## Installation

1. **Projekt herunterladen:**

   - Klone das Repository auf deinen lokalen Computer:
     ```bash
     git clone https://github.com/AlpayC/zeiterfassung_app.git
     ```

2. **Abhängigkeiten installieren:**

   - Navigiere in das Projektverzeichnis:
     ```bash
     cd zeiterfassung_app
     ```
   - Installiere die erforderlichen Abhängigkeiten mit npm:
     ```bash
     npm postinstall
     ```

3. **Konfiguration:**

   - Passe die Konfigurationsdateien an, falls erforderlich.

4. **Starte die Anwendung:**

   - Starte die Anwendung lokal:
     ```bash
     npm start
     ```

5. **Öffne die Anwendung im Browser:**
   - Öffne deinen Webbrowser und gehe zu [http://localhost:3000](http://localhost:3000).

## Import Rohdaten

Die Applikation erlaubt es zudem Rohdaten im JSON Format an den Server zu übermitteln. Dabei sind neben den erfassten Zeiten entweder die User ID oder die User Email-Adresse notwendig.

1. **Daten ablegen:**

   - Die Rohdaten werden als <code> mockData.json</code> abgelegt:
     ```bash
     -backend
        --lib
            ---mockData.json
     ```

2. **Import starten:**

   - Mit dem Befehl node importData.js im backend Ordner wird der Import gestartet
     ```bash
     cd backend
     node importData.js
     ```

## Flow Charts

### Passwort-Reset Flow Chart

```mermaid
sequenceDiagram
    participant frontend
    participant backend
    participant db
    participant mail
    frontend ->> frontend: /resetPassword form ausfüllen
    frontend ->> backend: Submit Form: (reset password für email)
    backend ->> db: Erstelle reset token in db
    backend ->> mail: Sende token zu user mail (link)
    mail ->> frontend: /reset?token=123&user=123 bringt Geheimniss ins Frontend
    frontend ->> backend: Ändere Password für user=123 wenn token=123
    backend ->> db: new hash and salt für das passwort
```

### SignUp Flow Chart

```mermaid
sequenceDiagram
    participant frontend
    participant backend
    participant db
    frontend ->> frontend: /signup form ausfüllen
    frontend ->> backend: SignUp Form: (user, name , passwort)
    backend ->> db: erstelle userin db
    backend ->> db: new hash and salt für das passwort
```

### Login Flow Chart

```mermaid
sequenceDiagram
    participant frontend
    participant backend
    participant db
    frontend ->> frontend: /login form ausfüllen
    frontend ->> backend: login Form: (email, passwort)
    backend ->> db: abgleich user passwort und secret
    backend ->> backend: überprüfung der login daten
    backend ->> frontend: sende auth token
    frontend ->> backend: fortlaufender abgleich token mit backend
```

### Datenbank Flow Chart

```mermaid
classDiagram
  class User {
    + _id: ObjectId
    + name: String
    + lastname: String
    + email: String
    + salt: String
    + hash: String
  }

  class TimeTracking {
    + _id: ObjectId
    + employee: ObjectId, ref:User
    + date: Date
    + startTimes: [Date]
    + endTimes: [Date]
    + createdAt: Date
  }

  User "1" --> "N" TimeTracking : has

```

### API Flow Chart: Zeiterfassung

```mermaid
sequenceDiagram
    participant frontend
    participant backend
    participant db
    frontend ->> frontend: start button wird angeklickt
    frontend ->> backend: übermittlung der email und starttime mit date
    backend ->> backend: abgleich user daten
    backend ->> db: nach erfolg wird startzeit angelegt
    frontend ->> frontend: end button wird angeklickt
    frontend ->> backend: übermittlung der email und enttime mit date
    backend ->> backend: abgleich user daten
    backend ->> db: prüfung nach einem eintrag ohne endtime
    backend ->> db: eintrag wird vervollständigt
    db ->> backend: eintrag wird and den server zurückgegeben
    backend ->> frontend: response der vollständigen zeiterfassung aus db
    frontend ->> backend: responsedaten werden an die sendToHrEmail-Route übermittelt
    backend ->> backend: email wird vorbereitet und versendet
```

### API Flow Chart: Abholung der Zeiten

```mermaid
sequenceDiagram
    participant frontend
    participant backend
    participant db
    frontend ->> frontend: Datum wird eingegrenzt
    frontend ->> backend: übermittlung der email mit beiden Daten
    backend ->> backend: abgleich user daten
    backend ->> db: nach erfolg werden die Zeiten abgeholt
    db ->> backend: zeiten werden ans backend gegeben
    backend ->> frontend: Zeiten werden per response zurückgegeben
    frontend ->> frontend: response wird bereinigt um relevante daten
    frontend ->> frontend: Zeiten werden dargestellt
```
