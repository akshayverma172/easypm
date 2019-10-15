import * as express from 'express';
import { Request, Response } from 'express';
import { Property, Unit } from '../types';
import { PropertyService } from './property.service';

const propertyService = new PropertyService();
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
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

router.post('/mera', async (req: Request, res: Response) => {
  res.status(200).send('mera loda');
});

export { router as PropertyController };
