import { Router, Request, Response } from 'express';
import { URLSearchParams } from 'url';
import { v4 as uuidv4 } from 'uuid';

const BASE_PATH = '/authorize';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { query } = req;
    const { state, client_id: clientId, code_challenge: codeChallenge } = query;

    const urlParams = new URLSearchParams();
    const code = uuidv4();
    urlParams.append('state', state as string);
    urlParams.append('code', code);

    res.redirect(`/redirect?${urlParams.toString()}`);
  });

  return router;
};
