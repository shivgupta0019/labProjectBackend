    const pool = require("../config/db");

// CREATE
exports.createTest = async (data, username) => {
  const { testName, labCode, method, unit } = data;

  const [result] = await pool.query(
    `INSERT INTO test_master (test_name, lab_code, method, unit, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [testName, labCode, method, unit, username]
  );

  return result.insertId;
};

// GET ALL
exports.getAllTests = async () => {
  const [rows] = await pool.query(`
    SELECT t.*, c.lab_name 
    FROM test_master t
    LEFT JOIN central_lab c ON t.lab_code = c.lab_code
  `);
  return rows;
};

// GET BY ID
exports.getTestById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM test_master WHERE test_id = ?",
    [id]
  );
  return rows[0];
};

// UPDATE
exports.updateTest = async (id, data) => {
  const { testName, labCode, method, unit } = data;

  await pool.query(
    `UPDATE test_master 
     SET test_name=?, lab_code=?, method=?, unit=?
     WHERE test_id=?`,
    [testName, labCode, method, unit, id]
  );

  return true;
};

// DELETE
exports.deleteTest = async (id) => {
  await pool.query(
    "DELETE FROM test_master WHERE test_id = ?",
    [id]
  );

  return true;
};