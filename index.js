import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import session from "express-session";
import ModulesRoutes from './Kambaz/Modules/routes.js';
import AssignmentsRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
import mongoose from 'mongoose';

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();

// 🔹 CORS: allow local + Vercel
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL, // e.g. https://kambas-next-js-git-a6-...vercel.app
  })
);

const isProd = process.env.SERVER_ENV !== "development";

// 🔹 Behind Render's proxy when in prod
if (isProd) {
  app.set("trust proxy", 1);
}

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // In dev: regular cookie
    // In prod: cross-site cookie for Vercel <-> Render
    sameSite: isProd ? "none" : "lax",
    secure: isProd, // must be true on Render (HTTPS)
    // ❌ DON'T set domain here with a URL string
    // If you really want a domain, use just the hostname:
    // domain: "kambaz-node-server-app.onrender.com",
  },
};

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);
