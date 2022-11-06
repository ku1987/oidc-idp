import { Router, Request, Response } from 'express';
import { URLSearchParams } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { getClientByClientId } from '../models/client';

const BASE_PATH = '/authorize';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { query } = req;
    const { state, clientId, codeChallenge, redirectUri } = query;

    if (!clientId || !codeChallenge || !redirectUri) {
      res.status(400).json({
        message: 'Bad request.',
      });
      return;
    }

    const client = await getClientByClientId(clientId as string);
    if (!client) {
      res.status(404).json({
        message: 'Client ID not found.',
      });
      return;
    }

    if (client.redirectUri !== redirectUri) {
      res.status(400).json({
        message: 'Invalid request.',
      });
      return;
    }

    const urlParams = new URLSearchParams();
    const code = uuidv4();
    // TODO: Save authorization code
    // TODO: Save codeChallenge

    urlParams.append('state', state as string);
    urlParams.append('code', code);

    res.redirect(`${client.redirectUri}?${urlParams.toString()}`);
  });

  return router;
};
