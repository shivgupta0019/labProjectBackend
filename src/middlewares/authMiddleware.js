const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 👇 safe check
  const token = req.cookies?.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log("Decoded JWT:", decoded);  // 👈 ADD THIS

  req.user = decoded;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};