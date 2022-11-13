import { Router, Request, Response } from 'express';
import { getAuthCodeByCode } from '../models/code';

const BASE_PATH = '/token';

export default (): Router => {
  const router = Router();

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { code, code_verifier: codeVerifier, client_id: clientId, redirect_uri: redirectUri } = req.body;

    if (!code || !clientId || !codeVerifier || !redirectUri) {
      res.status(400).json({
        message: 'Bad request.',
      });
      return;
    }
    const authCode = await getAuthCodeByCode(code);
    if (!authCode) {
      res.status(404).json({
        message: 'Code not found.',
      });
      return;
    }
    if (authCode.Client.clientId !== clientId) {
      res.status(404).json({
        message: 'Invalid code.',
      });
      return;
    }
    // TODO: Check code_verifier
    // TODO: Update code is_used
    // TODO: Generate token

    const data = {
      token: 'token',
    };

    res.status(200).json({
      status: 'success',
      data,
    });
  });

  return router;
};
