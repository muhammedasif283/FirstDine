# FirstDine React Application

## Overview

FirstDine is a premium, Kerala-based food-tech web application designed to eliminate dining wait times by enabling users to seamlessly discover restaurants, pre-book tables, pre-order food, and scan table QR codes. 

This project has been fully migrated from a Vanilla HTML/JS prototype to a modern, component-based **React + Vite** architecture to provide a production-ready user experience, scalable state management, and Firebase support.

---

## Key Features

- **Premium Responsive UI/UX:** A stunning modern design system with a cohesive brand theme, dark/light mode toggle, smooth transitions, and skeleton loader screens.
- **Dynamic Routing:** Multi-page experience powered by `react-router-dom` (Home, Restaurant Details, Checkout, Reservations, Login/Signup, Admin panel, KDS Dashboard, and QR Scan).
- **Flexible Real-Time Database:**
  - **Firebase Firestore Integration:** Ready for live deployment with automatic seeding on first run.
  - **Mock Local Database Fallback:** Instant real-time order synchronization across browser tabs utilizing the `BroadcastChannel` API and LocalStorage (requires zero configuration/installation).
- **Interactive QR Table Ordering:** Simulated camera scanning flow for table QR codes, enabling diners to scan and view digital menus immediately.
- **Wait-Time Predictor:** Client-side prediction tool helping users see expected food preparation and queue times before booking.
- **Informational Pages:** Dedicated pages for About Us, Careers, Press, and Blog integrated into the app navigation.

---

## Project Structure (`firstdine-react`)

- `src/main.jsx`: Application entry point initializing React and loading core styles.
- `src/App.jsx`: Top-level application layout, navigation bar, footer, and React Router routes.
- `src/assets/css/`: Main design styles (`style.css` and `style-components.css`).
- `src/components/`: Reusable components (e.g., `Navbar`, `Footer`, `LiveMap`, `Skeleton`, `WaitTimePredictor`, `TableQR`).
- `src/context/AppContext.jsx`: React Context provider managing authentication state, shopping cart, reservations, and active selections.
- `src/pages/`: Page-level route views (e.g., `Home`, `Restaurant`, `Checkout`, `Reservations`, `Login`, `Dashboard` (KDS), `Admin`, `Scan`, `About`, `Careers`, `Press`, `Blog`).
- `src/services/`:
  - `firebase.js`: Service layer managing connections to Firebase Firestore / fallback database.
  - `mockData.js`: Centralized mock data containing detailed Keralite restaurants, menu items, reviews, and categories.
  - `auth.js`: Simulated authentication functions.

---

## Setup & Running the Application

### Prerequisites

Make sure you have **Node.js** (v16+) and **npm** installed on your system.

### Running Locally

1. Open your terminal and navigate to the project directory:
   ```bash
   cd firstdine-react
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open the local address shown in your terminal (typically `http://localhost:5173`) in your browser.

---

## Seeding & Configuring Firebase (Optional)

To connect the application to a live Google Firebase database:
1. Open `src/services/firebase.js`.
2. Locate the `firebaseConfig` object (around line 8).
3. Replace the placeholder values (`YOUR_API_KEY`, `YOUR_PROJECT_ID`, etc.) with your actual Firebase project settings.
4. When you save and run the application, it will automatically connect to your Firestore database and seed the restaurant database on the first run.
