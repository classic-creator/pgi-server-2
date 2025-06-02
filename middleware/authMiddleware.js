// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};




export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};



export const isManagerOrAbove = (req, res, next) => {
  const allowedRoles = ['manager', 'admin'];
  if (!allowedRoles.includes(req.user?.role)) {
    return res.status(403).json({ error: 'Access denied. Manager or Admin required.' });
  }
  next();
};


export const isSupervisorOrAbove = (req, res, next) => {
  const allowedRoles = ['supervisor', 'manager', 'admin'];
  if (!allowedRoles.includes(req.user?.role)) {
    return res.status(403).json({ error: 'Access denied. Supervisor or higher required.' });
  }
  next();
};
export const isNotManagerOrAdmin = (req, res, next) => {
  const blockedRoles = ['manager', 'admin'];

  if (blockedRoles.includes(req.user?.role)) {
    return res.status(403).json({
      error: 'Access denied. Managers and Admins are not allowed to access this resource.',
    });
  }

  next();
};
