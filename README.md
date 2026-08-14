# Zaitoon Roots Academy - Official Academic Web Portal

[![React 19](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, high-performance academic web portal for **Zaitoon Roots Academy**, featuring **All The World's Degrees & Professional Diplomas**, interactive online admissions with automatic scholarship calculation, student LMS portal, global distance learning classroom, and comprehensive institutional directories across 20 specialized pages.

---

## 🌟 Key Features

- 🎓 **All The World's Degrees Directory (Page 2)**: Complete A–Z catalog of undergraduate (BS), postgraduate (MS/MPhil), and clinical doctoral degrees with international accreditation tags.
- 📜 **All The World's Professional Diplomas (Page 3)**: Vocational, technological, AI, executive, and healthcare diplomas with real-world tool stacks and career outcomes.
- 🌐 **100% Online Distance Learning Portal (Page 15)**: Live bidirectional HD virtual classes, cloud sandbox labs, recorded archives, and worldwide DHL degree parchment delivery.
- 📝 **Admissions & Digital Challan Generator (Page 4)**: Interactive application flow with real-time scholarship discount computation and downloadable/printable fee challan.
- 💻 **Student LMS Portal (Page 13)**: Student dashboard featuring interactive lecture player, attendance telemetry, GPA calculator, and course downloads.
- 🔍 **Global Instant Search (`Cmd/Ctrl + K`)**: Lightning-fast modal search across all degrees, diplomas, faculty members, and institutional pages.
- 🏛️ **20 Comprehensive Institutional Pages**: Campus tour, research centers, faculty directory, career counselor, affiliations, alumni network, and more.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite`)
- **Icons**: Lucide React
- **Hosting / Deploy Ready**: Vercel, GitHub Pages, Netlify, Cloud Run, Docker

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/zaitoon-roots-academy.git
cd zaitoon-roots-academy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or `http://localhost:5173`).

### 4. Build for Production
```bash
npm run build
```
The compiled static assets will be located in the `dist/` directory, ready for production deployment.

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)
This repository contains a pre-configured `vercel.json` for single-page routing:
1. Import the repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Click **Deploy**.

### Deploy to GitHub Pages
To deploy using GitHub Actions:
1. Go to repository **Settings > Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
