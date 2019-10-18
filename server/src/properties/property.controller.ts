import * as express from 'express';
import { Request, Response } from 'express';
import { Property, Unit } from '../types';
import { propertyService } from './property.service';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log(req.headers.authorization);
  // console.log(req.headers.referer);
  const query = req.body;

  const properties = await propertyService.listProperties(
    query,
    req.query.offset,
    req.query.limit
  );

  res.status(200).send(properties);
});

router.post('/add', async (req: Request, res: Response) => {
  const { name, address, floor, number, rent, vacant } = req.query;
  const units: [Unit] = [{ floor, number, rent, vacant }];
  const property: Property = { address, name, units };

  const result = await propertyService.addProperty(property);

  res.status(200).send('success');
});

export { router as PropertyController };
