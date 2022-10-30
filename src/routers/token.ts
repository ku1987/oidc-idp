import { Router, Request, Response } from 'express';

const BASE_PATH = '/token';

export default (): Router => {
  const router = Router();

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    const { code, code_verifier: codeVerifier } = req.body;

    const data = {
      code,
    };

    // TODO: Verify code and code_challenge
    // TODO: Generate token

    res.status(200).json({
      status: 'success',
      data,
    });
  });

  return router;
};
