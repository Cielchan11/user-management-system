// backend/src/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// ฟังก์ชัน Higher-Order Function เพื่อสร้าง middleware ที่ตรวจสอบ role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' }); // Should not happen if authenticateToken runs first
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
    }

    next();
  };
};