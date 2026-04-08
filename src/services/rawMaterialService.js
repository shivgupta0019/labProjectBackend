const pool = require("../config/db");

// CREATE
exports.createMaterial = async (data, username) => {
  const { materialCode, materialName, category, supplier, storage } = data;

  await pool.query(
    `INSERT INTO raw_material_master 
    (material_code, material_name, category, supplier, storage, created_by)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [materialCode, materialName, category, supplier, storage, username]
  );

  return true;
};

// GET ALL
exports.getAllMaterials = async () => {
  const [rows] = await pool.query("SELECT * FROM raw_material_master");
  return rows;
};

// GET BY CODE
exports.getMaterialByCode = async (code) => {
  const [rows] = await pool.query(
    "SELECT * FROM raw_material_master WHERE material_code = ?",
    [code]
  );
  return rows[0];
};

// UPDATE
exports.updateMaterial = async (code, data) => {
  const { materialName, category, supplier, storage } = data;

  await pool.query(
    `UPDATE raw_material_master 
     SET material_name=?, category=?, supplier=?, storage=?
     WHERE material_code=?`,
    [materialName, category, supplier, storage, code]
  );

  return true;
};

// DELETE
exports.deleteMaterial = async (code) => {
  await pool.query(
    "DELETE FROM raw_material_master WHERE material_code = ?",
    [code]
  );

  return true;
};