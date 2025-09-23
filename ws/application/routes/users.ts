import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ data: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }] });
});

export default router;
