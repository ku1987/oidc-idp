import { Router, Request, Response } from 'express';
import { getClientByClientId, createClient } from '../models/client';

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

    const existing = await getClientByClientId(clientId);
    if (existing) {
      res.status(400).json({
        message: 'This client ID is already used.',
      });
      return;
    }

    const payload = {
      clientId,
      redirectUri,
    };
    try {
      const user = await createClient(payload);
      console.log({ created: user });

      res.status(200).json({
        message: 'success',
        data: { user },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Uncaught error.',
        detail: error.data,
      });
    }
  });

  return router;
};
