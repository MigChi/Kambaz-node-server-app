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

console.log("Using CLIENT_URL:", CLIENT_URL);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// ================== SESSION ==================
const isProd = process.env.SERVER_ENV === "production";

if (isProd) {
  // Needed so 'secure' cookies work behind Render's proxy
  app.set("trust proxy", 1);
}

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {},
};

if (isProd) {
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // IMPORTANT: no domain here – let the browser default
  };
} else {
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
