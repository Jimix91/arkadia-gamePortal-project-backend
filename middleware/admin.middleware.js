const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Usar el mismo secreto que el resto de la app
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (err) {
    console.log("Admin middleware error", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { isAdmin };
