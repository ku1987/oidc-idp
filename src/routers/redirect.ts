// Dummy redirect URI.

import { Router, Request, Response } from 'express';
import { URLSearchParams } from 'url';
import { v4 as uuidv4 } from 'uuid';

const BASE_PATH = '/redirect';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { query } = req;
    const { state, code } = query;

    const data = {
      state,
      code,
    };

    res.status(200).json({
      status: 'success',
      data,
    });
  });

  return router;
};
