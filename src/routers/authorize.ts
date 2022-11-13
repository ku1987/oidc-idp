import { Router, Request, Response } from 'express';
import { URLSearchParams } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { getClientByClientId } from '../models/client';
import { saveCode } from '../models/code';

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
        message: 'Invalid client ID.',
      });
      return;
    }

    if (client.redirectUri !== redirectUri) {
      res.status(400).json({
        message: `Requested redirect URI: ${redirectUri} does not match the registered one with this client ID: ${clientId}.`,
      });
      return;
    }

    const urlParams = new URLSearchParams();
    const code = uuidv4();

    try {
      const savedCode = await saveCode({
        code,
        codeChallenge: codeChallenge as string,
        client: {
          create: {
            clientId: clientId as string,
            redirectUri: redirectUri,
          },
        },
      });

      urlParams.append('state', state as string);
      urlParams.append('code', code);

      res.json(savedCode);
      // res.redirect(`${client.redirectUri}?${urlParams.toString()}`);
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
