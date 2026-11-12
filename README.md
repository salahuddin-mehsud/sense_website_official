# SENSE IIUI Web Application
### Software Engineering Society for Excellence — International Islamic University Islamabad
> *"Where Innovation meets Integrity"*

Official web application and Content Management System for **SENSE IIUI**, the official society of the Department of Software Engineering, Faculty of Computing & Basic Sciences at International Islamic University Islamabad.

---

## 🚀 Key Features

1. **IEEE Computer Society-Inspired UI/UX Design System**:
   - Styled to match the authority of prestigious computing societies (such as [computer.org](https://www.computer.org/)).
   - Top utility bar with university affiliation (*IIUI Dept of Software Engineering*), session switcher, quick links, and admin portal.
   - Comprehensive **Mega-Menu Dropdowns** across `ABOUT`, `EVENTS & HACKATHONS`, `PEOPLE & TEAMS`, and `GET INVOLVED` with 4-column structured categories and spotlights.
   - Branded in accordance with the official circular circuit SENSE emblem (*Deep Tech Slate, Circuit Cyan, and Amber Gold*).
   - Global interactive search modal (`Ctrl+K` or search button).

2. **Session System (Requirement 4)**:
   - Dynamic session filtering across the entire application (e.g. `Session 2026–2027` Current, `Session 2025–2026` Founding Session).
   - When a session is switched, all associated **Cabinet leaders, Teams, Events, and Photo Galleries** automatically update.
   - Past sessions remain archived and accessible; current session is displayed by default.

3. **Event Management with Mandatory Business Rules (Requirement 3)**:
   - **Upcoming Events**: Automatically displays the **"Register Now"** button with direct registration links and countdown details.
   - **Completed Events**: Automatically displays the **"View Drive Folder / Recap"** button linking to Google Drive folders for slides, photos, and materials.

4. **Executive Cabinet & 5 Specialized Teams**:
   - **Executive Cabinet**: President (*Ahmed Khursheed*), Vice President (*Muhammad Zain ul abdin*), General Secretary (*Ameer Hamza Afridi*).
   - **Teams** categorized as requested:
     - 🛡️ **Operations Team** (*Ali Haidar, Malik Taha, Abdul Manan Abbasi*)
     - 💻 **Web Team** (*Salah ud Din, Zoraiz Ahmed, Muhammad Mudassar*)
     - ✨ **Media & Decor Team** (*Maryam Amir*)
     - 🧠 **Research & Development (R&D) Team** (*Abdullah Iqbal, Asif Ali*)
     - 🎨 **Graphics Team** (*Zain Abid*)
   - Direct LinkedIn profile connections, bios, and technical skill tags.

5. **Student & Corporate Interactive Portals**:
   - **Membership Application (`/membership`)**: Registration with Student Roll No, semester, domain interest, and ethical pledge.
   - **Volunteer Application (`/volunteer`)**: Recruitment for event management, stage decor, and technical proctoring.
   - **Corporate Collaboration Proposal (`/collaboration`)**: Sponsorship tiers for DevSprint Hackathon and campus drives.

6. **Full-Featured Admin Dashboard (`/admin`)**:
   - Role-based security (`SUPER_ADMIN` and `EDITOR`).
   - Demo Credentials:
     - **Super Admin**: `admin@senseiiui.org` / `admin123`
     - **Content Editor**: `editor@senseiiui.org` / `editor123`
   - Complete CRUD management for **Sessions, Events, Photo Gallery, Cabinet & Team Members, Master Site Content, and Submissions Tracking**.
   - Immediate LocalStorage persistence with factory reset capability.

7. **Production-Ready MERN Backend (`server/`)**:
   - Express REST API with security middleware (Helmet, CORS, Cookie-Parser).
   - Mongoose schemas (`AdminUser`, `Session`, `Event`, `GalleryItem`, `CabinetMember`, `TeamMember`, `SiteContent`, `FormSubmission`).
   - JWT authentication in secure HTTP-only cookies + bcrypt password hashing.
   - Seed script (`npm run seed`) for instant database bootstrapping.

---

## 📂 Directory Layout

```
├── client/                     # Vite + React + Tailwind CSS Frontend
│   ├── public/
│   │   └── sense-logo.jpg      # Official SENSE circular emblem
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Navbar (Mega Menus), Footer, SearchModal
│   │   │   └── ui/             # Lightbox, Badges, Modals
│   │   ├── context/            # AppContext (Session system, Auth, CRUD state)
│   │   ├── data/               # initialData.js (LinkedIn roster, events, sessions)
│   │   ├── pages/              # Home, About, Events, Gallery, Cabinet, Team,
│   │   │                       # Collaboration, Membership, Volunteer, MissionVision
│   │   │   └── admin/          # AdminLogin, Dashboard
│   │   ├── App.jsx             # React Router routing configuration
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js + Express REST API Backend
│   ├── src/
│   │   ├── config/             # MongoDB connection, Cloudinary config
│   │   ├── models/             # Mongoose schemas (Session, Event, People, etc.)
│   │   ├── routes/             # REST endpoints (/api/v1/...)
│   │   ├── middleware/         # requireAuth, requireRole, errorHandler
│   │   ├── utils/              # seed.js (Database seeder)
│   │   ├── app.js              # Express app setup
│   │   └── server.js           # Server listen entrypoint
│   ├── .env.example
│   └── package.json
│
└── package.json                # Root scripts to orchestrate client & server
```

---

## ⚡ Quick Start Guide

### 1. Launch the Frontend Application
In the project root:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Access the Admin Dashboard
1. Click **"Admin Sign In"** in the top navigation bar or navigate to **`/admin/login`**.
2. Click the quick autofill button or enter:
   - **Email:** `admin@senseiiui.org`
   - **Password:** `admin123`
3. Manage events, switch sessions, review applications, and edit site content live!

### 3. (Optional) Run the Backend Server
```bash
cd server
npm install
npm run seed     # Seeds sample MongoDB database
npm run dev      # Runs Express API on http://localhost:5000
```

