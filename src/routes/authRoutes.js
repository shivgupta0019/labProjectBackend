const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const menuConfig = require("../config/menu");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & Authorization APIs
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and generate OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "admin"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "user1"
 *             full_name: "Ashish"
 *             email: "user@gmail.com"
 *             phone: "9999999999"
 *             password: "123456"
 *             role: "user"
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             otp: "123456"
 *     responses:
 *       200:
 *         description: Login successful, JWT cookie set
 */
router.post("/verify-otp", authController.verifyOtp);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user (clear cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile data
 */
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user
  });
});

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Admin-only route
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Admin access granted
 *       403:
 *         description: Access denied
 */
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin 🔥",
      user: req.user
    });
  }
);

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: User route (user/admin)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User access granted
 */
router.get(
  "/user",
  authMiddleware,
  roleMiddleware("user"),
  (req, res) => {
    res.json({
      message: "Welcome User",
      user: req.user
    });
  }
);

/**
 * @swagger
 * /api/auth/menu:
 *   get:
 *     summary: Get menu based on user role
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Dynamic menu items
 */
router.get("/menu", authMiddleware, (req, res) => {
  const roles = req.user.roles || [];

  let menu = [];

  if (roles.includes("admin")) {
    menu = Object.values(menuConfig);
  } else if (roles.includes("user")) {
    menu = [
      menuConfig.centralLab,
      menuConfig.project,
      menuConfig.instrument,
      menuConfig.test
    ];
  }

  res.json(menu);
});

module.exports = router;