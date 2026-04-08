const pool = require("../config/db");

// CREATE
exports.createProject = async (data, username) => {
  const { projectName, objective, startDate, endDate, status } = data;

  const [result] = await pool.query(
    `INSERT INTO project_master 
    (project_name, objective, start_date, end_date, status, created_by)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [projectName, objective, startDate, endDate, status, username]
  );

  return result.insertId;
};

// GET ALL
exports.getAllProjects = async () => {
  const [rows] = await pool.query("SELECT * FROM project_master");
  return rows;
};

// GET BY ID
exports.getProjectById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM project_master WHERE project_id = ?",
    [id]
  );
  return rows[0];
};

// UPDATE
exports.updateProject = async (id, data) => {
  const { projectName, objective, startDate, endDate, status } = data;

  await pool.query(
    `UPDATE project_master 
     SET project_name=?, objective=?, start_date=?, end_date=?, status=?
     WHERE project_id=?`,
    [projectName, objective, startDate, endDate, status, id]
  );

  return true;
};

// DELETE
exports.deleteProject = async (id) => {
  await pool.query(
    "DELETE FROM project_master WHERE project_id = ?",
    [id]
  );

  return true;
};