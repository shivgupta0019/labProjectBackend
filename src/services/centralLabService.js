const pool = require("../config/db");

// CREATE
exports.createLab = async (data) => {
  const { labCode, labName, location, labType } = data;

  await pool.query(
    `INSERT INTO central_lab (lab_code, lab_name, location, lab_type)
     VALUES (?, ?, ?, ?)`,
    [labCode, labName, location, labType]
  );

  return true;
};

// GET ALL
exports.getAllLabs = async () => {
  const [rows] = await pool.query("SELECT * FROM central_lab");
  return rows;
};

// GET BY CODE
exports.getLabByCode = async (labCode) => {
  const [rows] = await pool.query(
    "SELECT * FROM central_lab WHERE lab_code = ?",
    [labCode]
  );
  return rows[0];
};

// UPDATE
exports.updateLab = async (labCode, data) => {
  const { labName, location, labType } = data;

  await pool.query(
    `UPDATE central_lab 
     SET lab_name=?, location=?, lab_type=?
     WHERE lab_code=?`,
    [labName, location, labType, labCode]
  );

  return true;
};

// DELETE
exports.deleteLab = async (labCode) => {
  await pool.query(
    "DELETE FROM central_lab WHERE lab_code = ?",
    [labCode]
  );

  return true;
};

exports.getLabDropdown = async () => {
  const [rows] = await pool.query(`
    SELECT 
      lab_code,
      CONCAT(lab_code, ' - ', location, ' - ', lab_type) AS display_name
    FROM central_lab
  `);
  return rows;
};