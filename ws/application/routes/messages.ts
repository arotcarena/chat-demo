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

router.get('/count_unread_by_interlocutor/:receiver_id', async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { receiver_id: parseInt(req.params.receiver_id as string), status: 'unread' }
    });
    // on crée un tableau du nombre de messages non lus par interlocuteur
    const countUnreadByInterlocutorId = [];
    for (const message of messages) {
      if (!countUnreadByInterlocutorId[message.sender_id]) {
        countUnreadByInterlocutorId[message.sender_id] = 0;
      }
      countUnreadByInterlocutorId[message.sender_id]++;
    }

    res.json(countUnreadByInterlocutorId);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unread messages' });
  }
});

export default router;
