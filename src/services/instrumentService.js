const pool = require("../config/db");

// CREATE
exports.createInstrument = async (data) => {
  const { instrumentName, labId, model, calibrationDate, status } = data;

  const [result] = await pool.query(
    `INSERT INTO instruments 
    (instrument_name, lab_id, model, calibration_date, status)
    VALUES (?, ?, ?, ?, ?)`,
    [instrumentName, labId, model, calibrationDate, status]
  );

  return result.insertId;
};

// GET ALL
exports.getAllInstruments = async () => {
  const [rows] = await pool.query("SELECT * FROM instruments");
  return rows;
};

// GET BY ID
exports.getInstrumentById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM instruments WHERE instrument_id = ?",
    [id]
  );
  return rows[0];
};

// UPDATE
exports.updateInstrument = async (id, data) => {
  const { instrumentName, labId, model, calibrationDate, status } = data;

  await pool.query(
    `UPDATE instruments 
     SET instrument_name=?, lab_id=?, model=?, calibration_date=?, status=?
     WHERE instrument_id=?`,
    [instrumentName, labId, model, calibrationDate, status, id]
  );

  return true;
};

// DELETE
exports.deleteInstrument = async (id) => {
  await pool.query(
    "DELETE FROM instruments WHERE instrument_id = ?",
    [id]
  );

  return true;
};