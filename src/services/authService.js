const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../services/mailService");

exports.loginUser = async (username, password) => {
    const conn = await pool.getConnection();

    try {
        // start transaction
        await conn.beginTransaction();

        const [rows] = await conn.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            throw new Error("Invalid password");
        }

        // 👉 Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // expiry (5 min)
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        // delete old OTP
        await conn.query(
            "DELETE FROM otp_verifications WHERE user_id = ?",
            [user.id]
        );

        // insert new OTP
        await conn.query(
            `INSERT INTO otp_verifications (user_id, otp_code, expires_at)
             VALUES (?, ?, ?)`,
            [user.id, otp, expiry]
        );

        // commit DB changes first
        await conn.commit();

        // 👉 Send mail AFTER commit
        const html = `<h2>Your OTP: ${otp}</h2>`;
        const isSent = await sendMail(user.email, "OTP Verification", html);

        if (!isSent) {
            // optional: log failure or retry queue
            console.error("Mail sending failed for user:", user.email);
        }

        console.log(`OTP generated for user ${user.username}`);

        return {
            message: "OTP sent successfully",
            userId: user.id,
            username: user.username
        };

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
};

exports.registerUser = async (data) => {
    const { username, full_name, email, phone, password, role } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    // 👉 Insert user
    const [userResult] = await pool.query(
        `INSERT INTO users 
    (username, full_name, email, phone, password_hash) 
    VALUES (?, ?, ?, ?, ?)`,
        [username, full_name, email, phone, hashedPassword]
    );

    const userId = userResult.insertId;

    // 👉 Get role id
    const [roles] = await pool.query(
        "SELECT id FROM roles WHERE role_name = ?",
        [role || "user"]
    );

    const roleId = roles[0].id;

    // 👉 Map user ↔ role
    await pool.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
        [userId, roleId]
    );

    return userId;
};

exports.verifyOtp = async (userId, otp) => {
    const [rows] = await pool.query(
        `SELECT * FROM otp_verifications
         WHERE user_id = ? AND otp_code = ?
         AND is_used = FALSE
         AND expires_at > NOW()`,
        [userId, otp]
    );

    if (rows.length === 0) {
        throw new Error("Invalid or expired OTP");
    }

    // mark OTP used
    await pool.query(
        "UPDATE otp_verifications SET is_used = TRUE WHERE id = ?",
        [rows[0].id]
    );

    // 🔥 STEP 1: FETCH ROLES
    const [roles] = await pool.query(
        `SELECT r.role_name 
         FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = ?`,
        [userId]
    );

    console.log("Roles from DB:", roles); // 👈 DEBUG

    const roleNames = roles.map(r => r.role_name);

    // 👉 get username from DB
    const [users] = await pool.query(
        "SELECT username FROM users WHERE id = ?",
        [userId]
    );

    const user = users[0];

    const token = jwt.sign(
        {
            userId: userId,
            username: user.username,   // ✅ ADD THIS
            roles: roleNames
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return token;
};
