module.exports = (requiredRole) => {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];

    console.log("User roles:", userRoles);
    console.log("Required role:", requiredRole);

    if (!userRoles.includes(requiredRole)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};