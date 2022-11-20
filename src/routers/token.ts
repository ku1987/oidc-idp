import { Router, Request, Response } from 'express';
import { getAuthCodeByCode } from '../models/code';
import * as crypto from 'crypto';
import base64url from 'base64url';

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
        message: 'Invalid code.',
      });
      return;
    }
    if (authCode.isUsed) {
      res.status(400).json({
        message: 'Code is already used.',
      });
      return;
    }
    if (authCode.Client.clientId !== clientId) {
      res.status(404).json({
        message: 'Invalid client.',
      });
      return;
    }
    // TODO: Check redirect_uri is correct.

    const base64Digest = crypto.createHash('sha256').update(codeVerifier).digest('base64');
    const challenge = base64url.fromBase64(base64Digest);

    if (authCode.codeChallenge !== challenge) {
      res.status(400).json({
        message: 'Invalid code challenge.',
      });
      return;
    }

    // TODO: Update code is_used

    // TODO: Generate token
    const token = {
      token_type: 'Bearer',
      expires_in: 3600,
      access_token: 'eyJraWQiOiI3bFV0aGJyR2hWVmx...',
      id_token: 'eyJraWQiOiI3bFV0aGJyR2hWVmx...',
      scope: 'profile openid email',
    };

    const data = {
      token,
    };

    res.status(200).json({
      status: 'success',
      data,
    });
  });

  return router;
};
