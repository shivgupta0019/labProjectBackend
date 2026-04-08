const service = require("../services/instrumentService");

// CREATE
exports.create = async (req, res) => {
  try {
    const id = await service.createInstrument(req.body);
    res.json({ message: "Instrument created", id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  const data = await service.getAllInstruments();
  res.json(data);
};

// GET BY ID
exports.getById = async (req, res) => {
  const data = await service.getInstrumentById(req.params.id);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(data);
};

// UPDATE
exports.update = async (req, res) => {
  await service.updateInstrument(req.params.id, req.body);
  res.json({ message: "Updated successfully" });
};

// DELETE
exports.delete = async (req, res) => {
  await service.deleteInstrument(req.params.id);
  res.json({ message: "Deleted successfully" });
};