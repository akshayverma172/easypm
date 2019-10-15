import * as express from 'express';
import { Request, Response } from 'express';
import { Property, Unit } from './property.model';
import { PropertyService } from './property.service';

const propertyService = new PropertyService();
const controller = express.Router();

controller.post('/', async (req: Request, res: Response) => {
  const query = req.body;

  const properties = await propertyService.listProperties(
    query,
    req.query.offset,
    req.query.limit
  );

  res.status(200).send(properties);
});

controller.post('/add', async (req: Request, res: Response) => {
  const { name, address, floor, number, rent, vacant } = req.query;
  const units: [Unit] = [{ floor, number, rent, vacant }];
  const property: Property = { address, name, units };

  const result = await propertyService.addProperty(property);

  res.status(200).send('success');
});

export { controller as PropertyController };
