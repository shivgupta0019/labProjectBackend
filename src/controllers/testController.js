const service = require("../services/testService");

// CREATE
exports.create = async (req, res) => {
  try {
     const username = req.user.username;
    const id = await service.createTest(req.body, username);
    res.json({ message: "Test created", id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await service.getAllTests();
  res.json(data);
};

// GET BY ID
exports.getById = async (req, res) => {
  const data = await service.getTestById(req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(data);
};

// UPDATE
exports.update = async (req, res) => {
  await service.updateTest(req.params.id, req.body);
  res.json({ message: "Updated successfully" });
};

// DELETE
exports.delete = async (req, res) => {
  await service.deleteTest(req.params.id);
  res.json({ message: "Deleted successfully" });
};