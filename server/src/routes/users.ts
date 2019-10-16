import * as express from 'express';
import { Request, Response } from 'express';
import { userService } from '../lib/user';
const controller = express.Router();

controller.post('/users', async (req: Request, res: Response) => {});

controller.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = { username, password };

  await userService.addUser(user);
  res.status(200).send({ result: 'ok' });
});

controller.post('/find', async (req: Request, res: Response) => {
  const username = req.body.username;
  const query = { username };

  const users = await userService.listUsers(query);
  if (users.length > 0) {
    res.status(200).send({ result: 'error' });
  } else {
    res.status(200).send({ result: 'ok' });
  }
});

export { controller as UserController };
