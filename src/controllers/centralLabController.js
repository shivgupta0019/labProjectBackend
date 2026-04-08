const service = require("../services/centralLabService");

// CREATE
exports.create = async (req, res) => {
  try {
    await service.createLab(req.body);
    res.json({ message: "Lab created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await service.getAllLabs();
  res.json(data);
};

// GET BY CODE
exports.getByCode = async (req, res) => {
  console.log("iamhere");
  const data = await service.getLabByCode(req.params.code);

  if (!data) {
    return res.status(404).json({ message: "Lab not found" });
  }

  res.json(data);
};

// UPDATE
exports.update = async (req, res) => {
  await service.updateLab(req.params.code, req.body);
  res.json({ message: "Lab updated successfully" });
};

// DELETE
exports.delete = async (req, res) => {
  await service.deleteLab(req.params.code);
  res.json({ message: "Lab deleted successfully" });
};

exports.getDropdown = async (req, res) => {
  console.log("getDropdown called");
  const data = await service.getLabDropdown();
  res.json(data);
};