import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BASE_PATH = '/register';

export default (): Router => {
  const router = Router();

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    console.log({ req: req.body });

    const { clientId, redirectUri } = req.body;
    if (!clientId || !redirectUri) {
      res.status(400).json({
        message: 'Bad request.',
      });
      return;
    }
    // TODO: Data validation

    const existing = await prisma.client.findUnique({
      where: {
        clientId,
      },
    });

    if (existing) {
      res.status(400).json({
        message: 'This client ID is already used.',
      });
      return;
    }

    const user = await prisma.client.create({
      data: {
        clientId,
        redirectUri,
      },
    });
    console.log({ created: user });

    res.status(200).json({
      message: 'success',
      data: { user },
    });
  });

  return router;
};
