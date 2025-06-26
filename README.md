# 📊 Live Manufacturing Scoreboard & Throughput Dashboard of TV

A real-time React-based dashboard for monitoring line throughput, unit performance, and production scoreboards of TV. Built with WebSockets (Socket.io) for live updates and modular components for scalability. Python Flask acting as a live server for transmitting live data!

---

## 🚀 Features

- 📈 Real-time throughput and unit charts (via `socket.io` and `React ChartJs-2`)
- 🧠 Modular React components for cells (`StartCell`, `HelmetPointsCell`, etc.)
- 📊 Tabbed layout: Scoreboard and Units view
- 🧪 Test coverage with `jest` + `@testing-library/react`
- 🎨 Tailwind CSS styling
- ✅ Mocked socket data for robust frontend testing
- 🔴 Live Python Flask Server to transmit the real time data
- 📄 Swagger Documentation at http://localhost:5000/swagger

---

## 📦 Installation

Clone the repo and run:

```bash
git clone https://github.com/JaySanghavi-GlobalLogic/gamescoreboard.git
cd gamescoreboard
.\run.bat
