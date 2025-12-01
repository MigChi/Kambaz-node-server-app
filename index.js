import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import session from "express-session";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

// ================== CORS ==================
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

console.log("CLIENT_URL:", CLIENT_URL);

const isLocalClient = CLIENT_URL.includes("localhost");

// Allow both localhost (for dev) and your deployed Vercel URL.
const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow REST tools / curl / server-to-server (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked CORS origin:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

// ================== SESSION ==================
const isProd = !isLocalClient;

// Needed so https cookies work correctly behind Render's proxy
if (isProd) {
  app.set("trust proxy", 1);
}

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {},
};

if (isProd) {
  // Cross-site cookie for Vercel ↔ Render
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
} else {
  // Local dev: plain http://localhost:3000 ↔ http://localhost:4000
  sessionOptions.cookie = {
    sameSite: "lax",
    secure: false,
  };
}

app.use(session(sessionOptions));

// ================== JSON + ROUTES ==================
app.use(express.json());

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

// ================== START SERVER ==================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
