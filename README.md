# MediBook — Doctor Appointment App

A full-stack appointment booking app for patients: register, log in, manage your profile,
book appointments with a department/date/time, browse services, and review past appointments.

Built with:
- **Frontend:** React (Vite, JavaScript/JSX, ES modules), Redux Toolkit, React Router,
  Tailwind CSS, react-icons, react-hot-toast, axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, Multer file uploads
- **Testing:** Vitest + React Testing Library

## Project structure

```
doctor-appointment-app/
├── client/          Vite React frontend
│   └── src/
│       ├── api/            axios instance
│       ├── components/     Header, Sidebar, AppLayout, Carousel, Accordion, cards, ProtectedRoute
│       ├── pages/           Login, Signup, PatientDashboard, BookAppointment, MyAppointments, Services
│       ├── redux/           Redux Toolkit store + slices (auth, appointments, services)
│       ├── test/            test-utils + vitest setup
│       └── __tests__/       unit tests (RTL + Vitest)
└── server/          Express + MongoDB backend
    ├── config/       database connection
    ├── controllers/  route handlers
    ├── middleware/   JWT auth guard, file uploads
    ├── models/       User, Appointment, Service (Mongoose schemas)
    ├── routes/       /api/auth, /api/appointments, /api/services
    └── seed.js       seeds the six default hospital services
```

## Prerequisites

- Node.js 18+
- A MongoDB instance (local or a hosted cluster like MongoDB Atlas)

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
# edit .env — set MONGO_URI to your MongoDB connection string and a real JWT_SECRET
npm run seed   # populates the six default services
npm run dev    # starts the API on http://localhost:5000
```

Environment variables (`server/.env`):

| Variable         | Description                                  |
|------------------|-----------------------------------------------|
| `PORT`           | API port (default `5000`)                     |
| `MONGO_URI`      | MongoDB connection string                      |
| `JWT_SECRET`     | Secret used to sign auth tokens — set a real one |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`)                  |
| `CLIENT_ORIGIN`  | Frontend origin allowed by CORS (default `http://localhost:5173`) |

## 2. Frontend setup

```bash
cd client
npm install
cp .env.example .env   # only needed if your API isn't on http://localhost:5000/api
npm run dev             # starts the app on http://localhost:5173
```

## 3. Run the tests

```bash
cd client
npm test          # runs the full Vitest + React Testing Library suite once
npm run test:watch  # watch mode while developing
```

35 tests currently cover: the FAQ accordion, the carousel, the appointment/service cards,
Login and Signup form validation, route protection, and the auth Redux slice.

## 4. Build for production

```bash
cd client
npm run build     # outputs static files to client/dist
```

Serve `client/dist` with any static host, and deploy `server/` (with a production `MONGO_URI`
and `JWT_SECRET`) to your Node hosting of choice.

## Features

- **Login / Signup** — validated forms, success/error toasts, JWT-based auth.
- **Patient Dashboard** — default landing page after login; edit profile details and upload a
  profile picture.
- **Book an Appointment** — pick a date, time, and department, attach a report, and submit.
- **My Appointments** — appointments rendered as cards, filterable by year.
- **Services** — a rotating highlights carousel, a service grid with hover states, and an FAQ
  accordion.
- **Responsive layout** — the header collapses to a mobile menu and the sidebar adapts on small
  screens.

## Design notes

The UI uses a teal (`primary`) + warm amber (`accent`) palette rather than the pink/purple used
in the original mockups, chosen for a calmer, more approachable healthcare feel while keeping the
same page structure (header, sidebar, cards) from the brief.
