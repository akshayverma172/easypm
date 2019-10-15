import * as express from 'express';
import { Request, Response } from 'express';

const controller = express.Router();

controller.post('/', async (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);

  res.status(200).send({ result: 'OK' });
});

export { controller as AuthController };
