import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma-client.ts';

const router: any = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // First, find the conversation between the two users
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            first_user_id: parseInt(req.query.first_user_id as string),
            second_user_id: parseInt(req.query.second_user_id as string),
          },
          {
            first_user_id: parseInt(req.query.second_user_id as string),
            second_user_id: parseInt(req.query.first_user_id as string),
          }
        ]
      }
    });

    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: {
                first_user_id: parseInt(req.query.first_user_id as string),
                second_user_id: parseInt(req.query.second_user_id as string),
            }
        });
    }

    // Then, get the messages for this conversation
    const messages = await prisma.message.findMany({
      where: {
        conversation_id: conversation.id
      },
      orderBy: {
        created_at: 'asc'
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });
    
    res.json({
        messages,
        conversation_id: conversation.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
