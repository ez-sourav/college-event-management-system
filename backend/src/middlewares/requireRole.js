export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res
        .status(403)
        .json({ message: "you are unauthorized to access this route." });
    }

    next();
  };
}
