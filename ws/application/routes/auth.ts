import express from 'express';
import type { Request, Response, Router } from 'express';
import { prisma } from '../prisma/prisma-client.ts';
import { verifyPassword } from '../services/password-hasher.ts';
import { createJwt, verifyJwt } from '../services/jwt-manager.ts';
import { hashPassword } from '../services/password-hasher.ts';

type LoginBody = {
  username?: string;
  password?: string;
};

type LoginRequest = Request<unknown, unknown, LoginBody>;

const router: Router = express.Router();

router.post('/login', async (req: LoginRequest, res: Response) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await prisma.user.findFirst({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const isPasswordValid = await verifyPassword(user.password, password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = await createJwt({ userId: user.id, username: user.username });

  return res.json({ token });
});

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hashedPassword = await hashPassword(password);

  if (typeof username !== 'string' || typeof password !== 'string' || password.length < 6 || username.length < 3 || username.length > 200 || password.length > 200) {
    return res.status(400).json({ error: 'Formulaire invalide' });
  }

  const existingUser = await prisma.user.findFirst({
    where: { username },
  });
  if (existingUser) {
    return res.status(400).json({ error: 'Le nom d\'utilisateur existe déjà' });
  }

  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  return res.json(user);
});

router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = await verifyJwt(token);
    return res.json(payload);
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

// Juste pour le dev
router.get('/hash-password', async (req: Request, res: Response) => {
  const { password } = req.query;
  const hashedPassword = await hashPassword(password as string);
  return res.json({ hashedPassword });
});

export default router;
