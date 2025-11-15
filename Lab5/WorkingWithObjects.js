const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
const moduleObj = {
  id: "m101",
  name: "Intro to Web Dev",
  description: "Basics of HTML, CSS, JS, and React",
  course: "CS4550"
};

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
   const { newTitle } = req.params;
   assignment.title = newTitle;
   res.json(assignment);
  };
  const getModule = (req, res) => {
   res.json(moduleObj);
  };
  const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };
  const updateModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };
  const updateModuleDescription = (req, res) => {
    const { newDesc } = req.params;
    moduleObj.description = newDesc;
    res.json(moduleObj);
  };
  const updateAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = Number(newScore);
    res.json(assignment);
  };
  const updateAssignmentCompleted = (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = newCompleted === "true";
    res.json(assignment);
  };
  // MODULE ROUTES
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", updateModuleName);
  app.get("/lab5/module/description/:newDesc", updateModuleDescription);

  // ASSIGNMENT ROUTES
  app.get("/lab5/assignment/score/:newScore", updateAssignmentScore);
  app.get("/lab5/assignment/completed/:newCompleted", updateAssignmentCompleted);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
};
