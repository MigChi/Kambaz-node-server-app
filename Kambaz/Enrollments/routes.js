import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.get("/api/enrollments", (req, res) => {
    res.json(dao.findAllEnrollments());
  });

  app.post("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  app.delete("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
    const { userId, courseId } = req.params;
    const success = dao.unenrollUserFromCourse(userId, courseId);
    res.json({ success });
  });
}
