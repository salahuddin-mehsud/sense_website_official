export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }
    if (req.user.role !== role && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ message: `Access denied. Requires role: ${role}` });
    }
    next();
  };
};

