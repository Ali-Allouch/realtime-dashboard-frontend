# 📊 RealTimeDash - Real-time Monitoring Interface

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4fc08d?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss)

## 📖 Overview

The frontend of the **RealTimeDash** project, a high-performance, responsive dashboard built with **Vue.js 3** and **Vite**. It provides a sleek, modern interface to visualize server metrics in real-time using WebSockets.

---

## 🛠️ Tech Stack
*   **Framework:** Vue.js 3
*   **Build Tool:** Vite
*   **State Management:** Pinia
*   **Styling:** Tailwind CSS
*   **Data Visualization:** Chart.js & Vue-chartjs
*   **Communication:** Socket.io-client & Axios
*   **Routing:** Vue Router

---

## ✨ Key Features
*   **Dynamic Dashboard:** Real-time visualization of CPU and RAM metrics with auto-scaling charts.
*   **Smart Toast Alerts:** Modular notification system that triggers visual warnings during server load spikes.
*   **Modular Architecture:** Clean separation of concerns with reusable components like.
*   **Secure Authentication:** Integrated JWT-based auth flow with protected routes and persistent sessions.
*   **Account Management:** Full profile settings page allowing users to update personal info and securely change passwords.
*   **Responsive Design:** Fully optimized for all screen sizes using a "Mobile-first" approach with Tailwind CSS.

---

## 📈 Component Highlight: Live Scaling

The dashboard utilizes an advanced implementation of **Chart.js** that handles high-frequency data updates (every 2s) without memory leaks, ensuring a smooth 60FPS experience for monitoring critical infrastructure.

---

## 🚀 Getting Started

**Prerequisites:**
- Node.js (v18+)
- Package Manager (NPM or Yarn)

**Installation**
1. **Clone the repository:**
    ```bash
   git clone https://github.com/Ali-Allouch/realtime-dashboard-frontend.git
   cd realtime-dashboard-frontend
   ``` 
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch the Development Server:**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Layout, Charts, Alerts)
├── views/          # Page components (Dashboard, Profile, Login)
├── stores/         # Pinia stores for Auth and Global State
├── services/       # Socket.io and API communication logic
├── router/         # Navigation guards and route definitions
└── models/         # TypeScript interfaces and data structures
```

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Developed with focus on scalability and clean code by [**Ali Allouche**](https://aliallouche.me/).*