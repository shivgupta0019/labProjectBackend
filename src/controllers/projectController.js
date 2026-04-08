const service = require("../services/projectService");

// CREATE
exports.create = async (req, res) => {
  try {
    const username = req.user.username; // 👈 from JWT
    console.log(username);
    const id = await service.createProject(req.body, username);

    res.json({ message: "Project created", id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await service.getAllProjects();
  res.json(data);
};

// GET BY ID
exports.getById = async (req, res) => {
  const data = await service.getProjectById(req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(data);
};

// UPDATE
exports.update = async (req, res) => {
  await service.updateProject(req.params.id, req.body);
  res.json({ message: "Project updated" });
};

// DELETE
exports.delete = async (req, res) => {
  await service.deleteProject(req.params.id);
  res.json({ message: "Project deleted" });
};