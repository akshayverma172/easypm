import * as express from 'express';
import { Request, Response } from 'express';
import { userService } from '../lib/user';
import * as expressJwt from 'jsonwebtoken';
import { User } from '../types';
const controller = express.Router();

controller.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.query;
  const query = { username, password };
  const result: User[] = await userService.listUsers(query);

  if (result.length > 0) {
    const userId = result[0]._id;
    const token = expressJwt.sign({ userId }, 'test', { expiresIn: '2h' });
    res.status(200).send({ result: token });
  } else {
    res.status(200).send({ result: 'error' });
  }
});

export { controller as AuthController };
