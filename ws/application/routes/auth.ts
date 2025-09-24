import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma-client.ts';
import { verifyPassword } from '../services/password-hasher.ts';
import { createJwt, verifyJwt } from '../services/jwt-manager.ts';
import { hashPassword } from '../services/password-hasher.ts';

const router: any = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    console.log(req.body);
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
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
