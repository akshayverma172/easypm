import * as express from 'express';
import { Request, Response } from 'express';

const controller = express.Router();

controller.post('/users', async (req: Request, res: Response) => {});

controller.post('/signup', async (req: Request, res: Response) => {});

export { controller as UserController };
