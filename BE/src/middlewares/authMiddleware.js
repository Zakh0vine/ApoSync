const { verifyToken } = require("../utils/jwt");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token)
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak tersedia" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak: role tidak diizinkan" });
    }
    next();
  };
};
