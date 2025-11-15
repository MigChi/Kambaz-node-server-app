import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const assignments = dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  });

  app.get("/api/assignments/:assignmentId", (req, res) => {
    const assignment = dao.findAssignmentById(req.params.assignmentId);
    res.json(assignment);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const assignment = dao.createAssignment(req.params.courseId, req.body);
    res.json(assignment);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const updated = dao.updateAssignment(req.params.assignmentId, req.body);
    res.json(updated);
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const result = dao.deleteAssignment(req.params.assignmentId);
    res.json(result);
  });
}
