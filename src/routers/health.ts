import { Router, Request, Response } from 'express';

const BASE_PATH = '/health';

export default (): Router => {
  const router = Router();

  router.get(`${BASE_PATH}`, async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      data: 'OK',
    });
  });

  router.post(`${BASE_PATH}`, async (req: Request, res: Response) => {
    console.log(req.body);

    const { health = null } = req.body;
    if (health === 'good') {
      res.status(200).json({
        status: 'success',
        data: health,
      });
    } else {
      res.status(400).json({
        status: 'fail',
      });
    }
  });

  return router;
};
