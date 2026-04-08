const express = require("express");
const router = express.Router();

const controller = require("../controllers/rawMaterialController");
const auth = require("../middlewares/authMiddleware");
const permit = require("../middlewares/permissionMiddleware");

/**
 * @swagger
 * tags:
 *   name: Raw Material
 *   description: Raw Material management APIs
 */

/**
 * @swagger
 * /api/raw-material:
 *   post:
 *     summary: Create raw material
 *     tags: [Raw Material]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             materialCode: "RM001"
 *             materialName: "Steel"
 *             category: "Metal"
 *             supplier: "ABC Supplier"
 *             storage: "Warehouse A"
 *     responses:
 *       200:
 *         description: Material created successfully
 */
router.post("/", auth, permit("rawMaterial", "create"), controller.create);

/**
 * @swagger
 * /api/raw-material:
 *   get:
 *     summary: Get all raw materials
 *     tags: [Raw Material]
 *     responses:
 *       200:
 *         description: List of raw materials
 */
router.get("/", auth, permit("rawMaterial", "read"), controller.getAll);

/**
 * @swagger
 * /api/raw-material/{code}:
 *   get:
 *     summary: Get raw material by code
 *     tags: [Raw Material]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Material Code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Material details
 *       404:
 *         description: Not found
 */
router.get("/:code", auth, permit("rawMaterial", "read"), controller.getByCode);

/**
 * @swagger
 * /api/raw-material/{code}:
 *   put:
 *     summary: Update raw material
 *     tags: [Raw Material]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Material Code
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             materialName: "Updated Steel"
 *             category: "Alloy"
 *             supplier: "XYZ Supplier"
 *             storage: "Warehouse B"
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:code", auth, permit("rawMaterial", "update"), controller.update);

/**
 * @swagger
 * /api/raw-material/{code}:
 *   delete:
 *     summary: Delete raw material
 *     tags: [Raw Material]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Material Code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:code", auth, permit("rawMaterial", "delete"), controller.delete);

module.exports = router;