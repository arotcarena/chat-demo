import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma-client.ts';

const router: any = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:username', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({ where: { username: req.params.username } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;
