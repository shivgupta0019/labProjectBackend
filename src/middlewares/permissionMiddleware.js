const permissions = require("../config/permissions");

module.exports = (resource, action) => {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];

    console.log("User Roles:", userRoles);
    console.log("Checking:", resource, action);

    // 👉 get allowed roles
    const allowedRoles =
      permissions[resource]?.[action] || [];

    const hasAccess = userRoles.some(role =>
      allowedRoles.includes(role)
    );

    if (!hasAccess) {
      return res.status(403).json({
        message: `Access denied for ${action} on ${resource}`
      });
    }

    next();
  };
};