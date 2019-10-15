import * as express from 'express';
import { Request, Response } from 'express';

const controller = express.Router();

controller.post('/auth', async (req: Request, res: Response) => {});

export { controller as AuthController };
