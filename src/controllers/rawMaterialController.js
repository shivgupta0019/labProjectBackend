const service = require("../services/rawMaterialService");

// CREATE
exports.create = async (req, res) => {
  try {
    const username = req.user.username;

    await service.createMaterial(req.body, username);

    res.json({ message: "Material created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await service.getAllMaterials();
  res.json(data);
};

// GET BY CODE
exports.getByCode = async (req, res) => {
  const data = await service.getMaterialByCode(req.params.code);

  if (!data) {
    return res.status(404).json({ message: "Material not found" });
  }

  res.json(data);
};

// UPDATE
exports.update = async (req, res) => {
  await service.updateMaterial(req.params.code, req.body);
  res.json({ message: "Material updated successfully" });
};

// DELETE
exports.delete = async (req, res) => {
  await service.deleteMaterial(req.params.code);
  res.json({ message: "Material deleted successfully" });
};