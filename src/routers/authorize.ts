import { Router, Request, Response } from 'express';
import { URLSearchParams } from 'url';
import { getClientByClientId } from '../models/client';
import { saveCode } from '../models/code';
import { generateAuthCode } from '../lib/code';

const BASE_PATH = '/authorize';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { query } = req;
    const { state, client_id: clientId, code_challenge: codeChallenge, redirect_uri: redirectUri } = query;

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

    // Let's assume the user gives permission to access the resource server,
    // TODO: Create frontend app for user consent page.

    const urlParams = new URLSearchParams();
    const code = generateAuthCode();

    try {
      const savedCode = await saveCode({
        code,
        codeChallenge: codeChallenge as string,
        Client: {
          connect: {
            id: client.id,
          },
        },
      });

      console.log(`Authorization code has been saved. code: ${code} client: ${savedCode.clientId}`);

      urlParams.append('state', state as string);
      urlParams.append('code', code);

      res.redirect(`${client.redirectUri}?${urlParams.toString()}`);
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
