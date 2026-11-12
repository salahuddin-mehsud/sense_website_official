import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export const requireAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Authentication required. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'sense_secret_key_change_me');
    const user = await AdminUser.findById(decoded.id).select('-passwordHash');

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Unauthorized. User account inactive or removed.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Session expired or token invalid.' });
  }
};

