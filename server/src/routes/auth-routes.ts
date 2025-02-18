import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'Cannot Authenticate' });
  }

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(401).json({ message: 'Cannot Authenticate' });
  }

  const privKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, privKey, {
    expiresIn: '1hr'
  });
  return res.json({ token })
};
const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
