const express = require("express");
const router = express.Router();

const controller = require("../controllers/centralLabController");
const auth = require("../middlewares/authMiddleware");
const permit = require("../middlewares/permissionMiddleware");

/**
 * @swagger
 * tags:
 *   name: Central Lab
 *   description: Central Lab management APIs
 */

/**
 * @swagger
 * /api/central-lab:
 *   post:
 *     summary: Create a new lab
 *     tags: [Central Lab]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             labCode: "LAB001"
 *             labName: "Main Lab"
 *             location: "Ahmedabad"
 *             labType: "Chemical"
 *     responses:
 *       200:
 *         description: Lab created successfully
 */
router.post("/", auth, permit("lab", "create"), controller.create);

/**
 * @swagger
 * /api/central-lab/dropdown:
 *   get:
 *     summary: Get lab dropdown (code + location + type)
 *     tags: [Central Lab]
 *     responses:
 *       200:
 *         description: Dropdown list
 */
router.get("/dropdown", auth, permit("lab", "read"), controller.getDropdown);

/**
 * @swagger
 * /api/central-lab:
 *   get:
 *     summary: Get all labs
 *     tags: [Central Lab]
 *     responses:
 *       200:
 *         description: List of labs
 */
router.get("/", auth, permit("lab", "read"), controller.getAll);

/**
 * @swagger
 * /api/central-lab/{code}:
 *   get:
 *     summary: Get lab by code
 *     tags: [Central Lab]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Lab Code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lab details
 *       404:
 *         description: Lab not found
 */
router.get("/:code", auth, permit("lab", "read"), controller.getByCode);

/**
 * @swagger
 * /api/central-lab/{code}:
 *   put:
 *     summary: Update lab
 *     tags: [Central Lab]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Lab Code
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             labName: "Updated Lab"
 *             location: "Surat"
 *             labType: "Biotech"
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:code", auth, permit("lab", "update"), controller.update);

/**
 * @swagger
 * /api/central-lab/{code}:
 *   delete:
 *     summary: Delete lab
 *     tags: [Central Lab]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Lab Code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:code", auth, permit("lab", "delete"), controller.delete);

module.exports = router;