# Runs-and-Bunce (Marathon Companion App)

A futuristic dashboard to prepare for the **Kuala Lumpur Standard Chartered (KLSC) Marathon 2026**. Built to track runs, plan training, and manage trip & gear budgets - all in one neon-styled app.

---

## Features

- **Strava integration**: Sync runs and track weekly mileage & pace.
- **Training Plan**: Assign run types (long, tempo, easy, rest) to days and save your schedule.
- **Budget planner**: Plan trip & gear expenses.
- **Neon UI**: Dark mode with neon accents, interactive charts, and futuristic style.

---

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) via [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Strava API](https://developers.strava.com/)

---

## Setup

Clone the repo and install dependencies:

```bash
npm install
npm run dev
```

Create a .env file in th eproject root:

- VITE_STRAVA_CLIENT_ID=your_client_id
- VITE_STRAVA_CLIENT_SECRET=your_client_secret
- VITE_STRAVA_REDIRECT_URI=http://localhost:5173/callback
- VITE_STRAVA_SCOPE=activity:read

---

## ScreenShots

### Countdown & Today's Stats

![Countdown & TodayStats](/public/screenshots/Countdown%20&%20TodayStats.png)

### Charts & Training Plan

![Charts & TrainingPlan](/public/screenshots/Charts%20&%20TrainingPlan.png)

### Budget Planner

![BudgetPlanner](/public/screenshots/BudgetPlanner.png)

---

## Roadmap

- Auto-mark TrainingPlan days as completed when Strava run detected.
- Pie chart visualization for budget categories.
- Countdown widget to race day.
