const express = require("express");
const router = express.Router();

const controller = require("../controllers/instrumentController");
const auth = require("../middlewares/authMiddleware");
const permit = require("../middlewares/permissionMiddleware");

/**
 * @swagger
 * tags:
 *   name: Instrument
 *   description: Instrument management APIs
 */

/**
 * @swagger
 * /api/instrument:
 *   post:
 *     summary: Create a new instrument
 *     tags: [Instrument]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             instrumentName: "Microscope"
 *             labId: 1
 *             model: "XYZ-100"
 *             calibrationDate: "2026-03-20"
 *             status: "active"
 *     responses:
 *       200:
 *         description: Instrument created successfully
 */
router.post("/", auth, permit("instrument", "create"), controller.create);

/**
 * @swagger
 * /api/instrument:
 *   get:
 *     summary: Get all instruments
 *     tags: [Instrument]
 *     responses:
 *       200:
 *         description: List of instruments
 */
router.get("/", auth, permit("instrument", "read"), controller.getAll);

/**
 * @swagger
 * /api/instrument/{id}:
 *   get:
 *     summary: Get instrument by ID
 *     tags: [Instrument]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Instrument ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instrument details
 *       404:
 *         description: Instrument not found
 */
router.get("/:id", auth, permit("instrument", "read"), controller.getById);

/**
 * @swagger
 * /api/instrument/{id}:
 *   put:
 *     summary: Update instrument
 *     tags: [Instrument]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Instrument ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             instrumentName: "Updated Microscope"
 *             labId: 2
 *             model: "XYZ-200"
 *             calibrationDate: "2026-04-01"
 *             status: "maintenance"
 *     responses:
 *       200:
 *         description: Instrument updated successfully
 */
router.put("/:id", auth, permit("instrument", "update"), controller.update);

/**
 * @swagger
 * /api/instrument/{id}:
 *   delete:
 *     summary: Delete instrument
 *     tags: [Instrument]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Instrument ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instrument deleted successfully
 */
router.delete("/:id", auth, permit("instrument", "delete"), controller.delete);

module.exports = router;