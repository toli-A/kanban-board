import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const privKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, privKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    })
  }
  else {
    res.sendStatus(401);
  }
};
