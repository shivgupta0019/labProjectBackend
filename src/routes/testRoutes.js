const express = require("express");
const router = express.Router();

const controller = require("../controllers/testController");
const auth = require("../middlewares/authMiddleware");
const permit = require("../middlewares/permissionMiddleware");

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test management APIs
 */

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Get all tests
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: List of tests
 */
router.get("/", auth, permit("test", "read"), controller.getAll);

/**
 * @swagger
 * /api/test/{id}:
 *   get:
 *     summary: Get test by ID
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Test ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Test details
 *       404:
 *         description: Not found
 */
router.get("/:id", auth, permit("test", "read"), controller.getById);

/**
 * @swagger
 * /api/test:
 *   post:
 *     summary: Create new test
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             testName: "Water Test"
 *             labCode: "LAB001"
 *             method: "Chemical"
 *             unit: "mg/L"
 *     responses:
 *       200:
 *         description: Created successfully
 */
router.post("/", auth, permit("test", "create"), controller.create);

/**
 * @swagger
 * /api/test/{id}:
 *   put:
 *     summary: Update test
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             testName: "Updated Test"
 *             labCode: "LAB001"
 *             method: "Advanced"
 *             unit: "ppm"
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:id", auth, permit("test", "update"), controller.update);

/**
 * @swagger
 * /api/test/{id}:
 *   delete:
 *     summary: Delete test
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", auth, permit("test", "delete"), controller.delete);

module.exports = router;