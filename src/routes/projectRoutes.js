const express = require("express");
const router = express.Router();

const controller = require("../controllers/projectController");
const auth = require("../middlewares/authMiddleware");
const permit = require("../middlewares/permissionMiddleware");

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management APIs
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             projectName: "AI System"
 *             objective: "Build AI based system"
 *             startDate: "2026-03-20"
 *             endDate: "2026-06-20"
 *             status: "in_progress"
 *     responses:
 *       200:
 *         description: Project created successfully
 */
router.post("/", auth, permit("project", "create"), controller.create);

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", auth, permit("project", "read"), controller.getAll);

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project details
 *       404:
 *         description: Project not found
 */
router.get("/:id", auth, permit("project", "read"), controller.getById);

/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             projectName: "Updated Project"
 *             objective: "Updated objective"
 *             startDate: "2026-04-01"
 *             endDate: "2026-07-01"
 *             status: "completed"
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put("/:id", auth, permit("project", "update"), controller.update);

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete("/:id", auth, permit("project", "delete"), controller.delete);

module.exports = router;